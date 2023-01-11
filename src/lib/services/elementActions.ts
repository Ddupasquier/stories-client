import { supabase } from '$lib/supabase';
import { toast } from '@zerodevx/svelte-toast';

export const getElementFromFolder = (folder: string | undefined, element: string) => {
	const { data: url } = supabase.storage.from('svg-assets').getPublicUrl(`${folder}/${element}`);
	if (url) {
		return url;
	} else {
		toast.push(`This file may or may not exist...`, { duration: 5000, pausable: true })
	}
};

export const deleteElement = async (id: number | undefined) => {
	const { error } = await supabase.from('elements').delete().eq('id', id);

	if (error) {
		toast.push(`Couldn't delete this element! ${error.message}`, { duration: 5000, pausable: true })
		throw new Error(error.message);
	} else {
		toast.push('Element deleted', { duration: 1000, pausable: true });
	}
};

export const savePosition = async (top: number, left: number, id: number) => {
	const { error } = await supabase.from('elements').update({ x: left, y: top }).eq('id', id);

	if (error) {
		toast.push(`Couldn't save this element's position! ${error.message}`, { duration: 5000, pausable: true })
		throw new Error(error.message);
	} else {
		toast.push('Element position saved', { duration: 1000, pausable: true });
	}
};

export const saveZindex = async (id: number, zIndex: number) => {
	const { error } = await supabase.from('elements').update({ zIndex: zIndex }).eq('id', id);

	if (error) {
		toast.push(`Couldn't save this element's z-index! ${error.message}`, { duration: 5000, pausable: true })
		throw new Error(error.message);
	} else {
		toast.push('Element z-index saved', { duration: 1000, pausable: true });
	}
};

export const saveSize = async (id: number, size: number) => {
	const { error } = await supabase.from('elements').update({ size }).eq('id', id);

	if (error) {
		toast.push(`Couldn't save this element's size! ${error.message}`, { duration: 5000, pausable: true })
		throw new Error(error.message);
	} else {
		toast.push('Element size saved', { duration: 1000, pausable: true });
	}
};
