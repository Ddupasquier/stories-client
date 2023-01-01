import { writable, type Writable } from 'svelte/store';

export const username: Writable<string | null> = writable();
export const fullname: Writable<string | null> = writable();
export const avatar: Writable<string | null> = writable();
export const userId: Writable<string | null> = writable();