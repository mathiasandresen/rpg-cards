import fs, {createWriteStream} from 'fs';
import fse from 'fs-extra';
// import request from 'request';
import path from 'path';
import {promisify} from "util"
import { pipeline } from "stream";
import yauzl from "yauzl";

const downloadUrl = "https://game-icons.net/archives/svg/zip/ffffff/transparent/game-icons.net.svg.zip";
const tempDir = "./temp";
const tempFilePath = tempDir + "/temp" + Date.now() + ".zip";
const iconDir = "./generator/icons";
const customIconDir = "./resources/custom-icons";
const cssPath = "./generator/css/icons.css";
const jsPath = "./generator/js/icons.js";
const streamPipeline = promisify(pipeline);


// ----------------------------------------------------------------------------
// Download
// ----------------------------------------------------------------------------
async function downloadFile(url: string, dest: string) {
    console.log("  Downloading...");
    
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Unexpected response: ${res.statusText}`);
    }

    await streamPipeline(res.body, createWriteStream(dest))
}

// ----------------------------------------------------------------------------
// Unzip
// ----------------------------------------------------------------------------
async function unzipAll(src: string, dest: string) {
    console.log("  Unzipping...");

    return new Promise((resolve, reject) => {
        yauzl.open(src, {lazyEntries: true}, function(err, zipfile) {
            if (err) {
                reject(err);
                return;
            }
            zipfile.readEntry();
            zipfile.on("entry", function(entry) {
                if (/\/$/.test(entry.fileName)) {
                    // Directory file names end with '/'. Note that entries for
                    // directories themselves are optional. An entry's fileName
                    // implicitly requires its parent directories to exist.
                    zipfile.readEntry();
                } else {
                    const entryPath = path.parse(entry.fileName);
                    let fileName = entryPath.base;
                    let targetFile = path.join(dest, fileName);
                    let i = 2;
                    while (true) {
                        if (!fs.existsSync(targetFile)) {
                            break;
                        }
                        fileName = entryPath.name + "-" + i++ + entryPath.ext;
                        targetFile = path.join(dest, fileName);
                    }
                    zipfile.openReadStream(entry, function(err, readStream) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        readStream
                            .on("end", function() {
                                zipfile.readEntry();
                            }).pipe(
                                fs.createWriteStream(targetFile)
                                    .on("error", reject)
                            ).on("error", reject);
                    });
                }
            }).on("close", resolve);
        });
    });
}

// ----------------------------------------------------------------------------
// Generate CSS
// ----------------------------------------------------------------------------
function generateCSS(src, dest) {
    console.log("  Generating CSS...");
    return new Promise<void>((resolve, reject) => {
        fs.readdir(src, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                const imageExtensions = [".svg", ".png"];
                const content = files
                    .filter(fileName => imageExtensions.find(ext => ext === path.extname(fileName)))
                    .map(name => `.icon-${path.basename(name, path.extname(name))} { background-image: url(../icons/${name});}\n`)
                    .join("");
                fs.writeFile(dest, content, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    });
}

// ----------------------------------------------------------------------------
// Generate JS
// ----------------------------------------------------------------------------
function generateJS(src, dest) {
    console.log("  Generating JS...");
    return new Promise<void>((resolve, reject) => {
        fs.readdir(src, (err, files) => {
            if (err) {
                reject(err);
            }
            else {
                const imageExtensions = [".svg", ".png"];
                const content = "var icon_names = [\n" + files
                    .filter(fileName => imageExtensions.find(ext => ext === path.extname(fileName)))
                    .map(name => `    "${path.basename(name, path.extname(name))}"`)
                    .join(",\n") + "\n]";
                fs.writeFile(dest, content, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            }
        });
    });
}

// ----------------------------------------------------------------------------
// Copy
// ----------------------------------------------------------------------------
function cleanDirectory(src) {
    console.log("  Cleaning...");
    return new Promise<void>((resolve, reject) => {
        fse.emptyDir(src, (err) => {
            if (err) { reject(); return; }
            resolve();
        });
    }); 
}

function removeFile(filePath) {
    console.log("  Removing file...");
    return new Promise<void>((resolve, _) => {
        fse.remove(filePath, () => resolve());
    }); 
}

function copyAll(src, dest) {
    console.log("  Copying...");
    return new Promise<void>((resolve, reject) => {
        fse.copy(src, dest, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

export function moveAll(src, dest) {
    console.log("  Moving...");
    return new Promise<void>((resolve, reject) => {
        fse.copy(src, dest, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

fse.emptyDir(tempDir)
    .then(() => console.log("Icons: start"))
    .then(() => cleanDirectory(tempDir))
    .then(() => downloadFile(downloadUrl, tempFilePath))
    .then(() => unzipAll(tempFilePath, tempDir))
    .then(() => removeFile(tempFilePath))
    .then(() => cleanDirectory(iconDir))
    .then(() => moveAll(tempDir, iconDir))
    .then(() => copyAll(customIconDir, iconDir))
    .then(() => generateCSS(iconDir, cssPath))
    .then(() => generateJS(iconDir, jsPath))
    .then(() => cleanDirectory(tempDir))
    .then(() => console.log("Icons: done"))
    .catch(err => console.log("Icons: error", err));
