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
