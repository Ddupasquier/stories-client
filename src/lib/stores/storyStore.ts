import { writable, type Writable } from 'svelte/store';

export const unsaved: Writable<boolean | null> = writable(false);
export const toastOpen: Writable<boolean | null> = writable(false);

export const toastOpenTrue = () => {
      toastOpen.set(true);
};

export const toastOpenFalse = () => {
      toastOpen.set(false);
};

export const unsavedTrue = () => {
      unsaved.set(true);
};

export const unsavedFalse = () => {
      unsaved.set(false);
}