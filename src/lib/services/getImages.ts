import { supabase } from '$lib/supabase';

export const downloadAvatar = async (path: string) => {
	try {
		const { data, error } = await supabase.storage.from('avatars').download(path);

		if (error) {
			throw error;
		}

		const url = URL.createObjectURL(data);
		return url;
	} catch (error) {
		if (error instanceof Error) {
			console.log('Error downloading image: ', error.message);
		}
	}
};

export const getElements = async (pageId: number) => {
	const { data, error } = await supabase.from('elements').select().eq('pageId', pageId);

	if (error) {
		throw new Error(error.message);
	} else {
		return data;
	}
};

export const getPageThumbnail = async (data: string | undefined) => {
	if (data) {
		const { data: url } = supabase.storage
			.from('page-screenshots')
			.getPublicUrl(data);
		return url;
	}
};

export const getThumbnailAvatar = async (data: string | undefined) => {
	if (data) {
		const { data: url } = supabase.storage
			.from('avatars')
			.getPublicUrl(data);
		return url;
	}
}