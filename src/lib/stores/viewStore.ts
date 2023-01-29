import { writable, type Writable } from 'svelte/store';

export const currentPage: Writable<string | undefined | null> = writable();
