import { browser } from "$app/env";
import { writable } from "svelte/store";
import type PageLayout from "../model/page-layout";

const LOCALSTORAGE_KEY = "pageLayout"

const defaultPageLayout: PageLayout = {
  paperSize: {
    width: 210,
    height: 297,
  },
  adjust: {
    x: undefined,
    y: undefined,
  }  
}

const fromLocalStorage = browser 
  ? (JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) ?? defaultPageLayout)
  : defaultPageLayout


export const pageLayout = writable<PageLayout>(
  {
    ...defaultPageLayout,
    ...fromLocalStorage,
  }
)

pageLayout.subscribe((layout) => {
  if (browser) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(layout))
  }
})
