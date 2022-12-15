import { writable, type Writable } from 'svelte/store';

export const user: Writable<string | null> = writable();
export const name: Writable<string | null> = writable();
export const avatar: Writable<string | null> = writable();
export const id: Writable<string | null> = writable();