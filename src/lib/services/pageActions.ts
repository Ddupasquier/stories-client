import { supabase } from '$lib/supabase';

export const uploadThumbnail = async (
	file: File | null,
	id: number
) => {
	const { data, error } = await supabase.storage
		.from('page-screenshots')
		.upload(`thumbnail-${id}.webp`, file, {
			upsert: true,
			contentType: 'image/webp'
		});

	if (error) {
		throw new Error(error.message);
	}
//TODO: addto screenshot column
	// maybe peramlink
	return data;
};
