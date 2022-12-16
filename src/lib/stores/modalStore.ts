import { writable, type Writable } from 'svelte/store';

export const storyToDelete: Writable<Story> = writable();
export const deleteIsOpen: Writable<boolean> = writable(false);
