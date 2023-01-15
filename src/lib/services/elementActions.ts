import { supabase } from '$lib/supabase';
import { toast } from '@zerodevx/svelte-toast';

export const getElementFromFolder = (folder: string | undefined, element: string) => {
	const { data: url } = supabase.storage.from('svg-assets').getPublicUrl(`${folder}/${element}`);
	if (url) {
		return url;
	} else {
		toast.push(`This file may or may not exist...`, { duration: 5000, pausable: true });
	}
};

export const getFlip = async (id:number) => {
	const { data, error } = await supabase.from('elements').select('flip').eq('id', id);
	if (error) {
		toast.push(`Couldn't get flip! ${error.message}`, { duration: 5000, pausable: true });
		throw new Error(error.message);
	}
	return data;
};

export const addText = async (text: string, color: string, size: number, pageId: number) => {
	const { error } = await supabase.from('elements').insert([
		{
			elementName: text,
			pageId: pageId,
			type: 'text',
			text: text,
			color: color,
			x: 0,
			y: 0,
			size: size,
			zIndex: 5
		}
	]);

	if (error) {
		toast.push(`Couldn't add this text! ${error.message}`, { duration: 5000, pausable: true });
		throw new Error(error.message);
	} else {
		toast.push(`Added text! <br /> ${text}`, { duration: 5000, pausable: true });
	}
};

export const editText = async (id: number, text: string) => {
	const { error } = await supabase.from('elements').update({ text }).eq('id', id);

	if (error) {
		toast.push(`Couldn't edit this text! ${error.message}`, { duration: 5000, pausable: true });
		throw new Error(error.message);
	} else {
		toast.push(`Edited text! <br /> ${text}`, { duration: 5000, pausable: true });
	}
};

export const editTextColor = async (id: number, color: string) => {
	const { error } = await supabase.from('elements').update({ color }).eq('id', id);

	if (error) {
		toast.push(`Couldn't edit this text! ${error.message}`, { duration: 5000, pausable: true });
		throw new Error(error.message);
	}
};

export const deleteElement = async (id: number | undefined, unsaved: () => void) => {
	const { error } = await supabase.from('elements').delete().eq('id', id);

	if (error) {
		toast.push(`Couldn't delete this element! ${error.message}`, {
			duration: 5000,
			pausable: true
		});
		throw new Error(error.message);
	} else {
		unsaved();
	}
};

export const savePosition = async (top: number, left: number, id: number, unsaved: () => void) => {
	const { error } = await supabase.from('elements').update({ x: left, y: top }).eq('id', id);

	if (error) {
		toast.push(`Couldn't save this element's position! ${error.message}`, {
			duration: 5000,
			pausable: true
		});
		throw new Error(error.message);
	} else {
		unsaved();
	}
};

export const saveZindex = async (id: number, zIndex: number) => {
	const { error } = await supabase.from('elements').update({ zIndex: zIndex }).eq('id', id);

	if (error) {
		toast.push(`Couldn't save this element's z-index! ${error.message}`, {
			duration: 5000,
			pausable: true
		});
		throw new Error(error.message);
	}
};

export const saveSize = async (id: number, size: number) => {
	const { error } = await supabase.from('elements').update({ size }).eq('id', id);

	if (error) {
		toast.push(`Couldn't save this element's size! ${error.message}`, {
			duration: 5000,
			pausable: true
		});
		throw new Error(error.message);
	}
};

export const saveRotation = async (id: number, rotate: number) => {
	const { error } = await supabase.from('elements').update({ rotate }).eq('id', id);

	if (error) {
		toast.push(`Couldn't save this element's rotation! ${error.message}`, {
			duration: 5000,
			pausable: true
		});
		throw new Error(error.message);
	}
};

export const saveFlip = async (id: number, flip: boolean) => {
	const { error } = await supabase.from('elements').update({ flip }).eq('id', id);

	if (error) {
		toast.push(`Couldn't save this element's flip! ${error.message}`, {
			duration: 5000,
			pausable: true
		});
		throw new Error(error.message);
	}
}