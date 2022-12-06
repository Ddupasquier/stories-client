import { writable, type Writable } from 'svelte/store';

export const userEmail: Writable<string> = writable();