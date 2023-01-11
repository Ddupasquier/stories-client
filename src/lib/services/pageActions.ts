import { supabase } from '$lib/supabase';
import { toast } from '@zerodevx/svelte-toast';

const updateScreenshotColumn = async (pageId: string, screenshot: string) => {
	const { error: pageError } = await supabase.from('pages').update({ screenshot, updatedAt: new Date() }).eq('id', pageId);

	if (pageError) {
		throw new Error(pageError.message);
	} else {
		toast.push('Thumbnail and background color saved', { duration: 2000, pausable: true });
	}
};

export const uploadThumbnail = async (file: File, id: string) => {
	const { data, error } = await supabase.storage
		.from('page-screenshots')
		.upload(`thumbnail-${id}.webp`, file, {
			upsert: true,
			contentType: 'image/webp',
			cacheControl: '60',
		});

	if (error) {
		toast.push(error.message, { duration: 5000, pausable: true })
		throw new Error(error.message);
	} else {
		updateScreenshotColumn(id, data.path);
	}
};

export const saveBgColor = async (id: number, color: string) => {
	const { error } = await supabase.from('pages').update({ background: color, updatedAt: new Date() }).eq('id', id);

	if (error) {
		throw new Error(error.message);
	}
}

export const deletePage = async (id: number) => {
	const { data, error } = await supabase.from('pages').delete().eq('id', id);

	if (error) {
		toast.push(`Something went wrong! ${error.message}`, { duration: 5000, pausable: true })
		throw new Error(error.message);
	} else {
		toast.push('Page deleted', { duration: 2000, pausable: true });
		return data;
	}
}