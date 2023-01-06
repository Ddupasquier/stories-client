import { supabase } from '$lib/supabase';

const updateScreenshotColumn = async (pageId: string, screenshot: string) => {
	const { error: pageError } = await supabase.from('pages').update({ screenshot, updatedAt: new Date() }).eq('id', pageId);

	if (pageError) {
		throw new Error(pageError.message);
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
		throw new Error(error.message);
	}
	
	else {
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
		throw new Error(error.message);
	} else {
		return data;
	}
}