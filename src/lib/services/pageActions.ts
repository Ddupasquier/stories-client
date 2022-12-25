import { supabase } from '$lib/supabase';

const updateScreenshotColumn = async (pageId: string, screenshot: string) => {
	const { error: pageError } = await supabase.from('pages').update({ screenshot }).eq('id', pageId);

	if (pageError) {
		throw new Error(pageError.message);
	}
};

export const uploadThumbnail = async (file: File, id: string) => {
	const { data, error } = await supabase.storage
		.from('page-screenshots')
		.upload(`thumbnail-${id}.webp`, file, {
			upsert: true,
			contentType: 'image/webp'
		});

	if (error) {
		throw new Error(error.message);
	} else {
		updateScreenshotColumn(id, data.path);
	}
};
