import { writable, type Writable } from 'svelte/store';

export const currentPageId: Writable<number> = writable(1);