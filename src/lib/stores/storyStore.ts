import { writable, type Writable } from 'svelte/store';

export const currentPageIndex: Writable<number> = writable(1);
export const currentStory: Writable<object> = writable();
export const pageId: Writable<number> = writable(1);
