import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import path from "path"
import { mdsvex } from "mdsvex"
import rehypeSlug from "rehype-slug";
import remarkHeadingId from "remark-heading-id";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svelte.md', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.svelte.md', '.md', '.svx'], 
			rehypePlugins: [rehypeSlug], 
			remarkPlugins: [remarkHeadingId],
		}),
		preprocess({sass: {}})
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		// trailingSlash: 'always',
		prerender: {
			default: true,
		},
		files: {
			serviceWorker: "src/service-worker/index.ts"
		},
		vite: {
			resolve: {
				alias: {
					"$components": path.resolve('src/components'),
					"$model": path.resolve('src/model'),
				}
			}
		}
	}
};

export default config;
