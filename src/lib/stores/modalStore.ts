import { writable, type Writable } from 'svelte/store';

export const storyToDelete: Writable<Story | null> = writable();
export const deleteIsOpen: Writable<boolean> = writable(false);

export const howToIsOpen: Writable<boolean> = writable(false);