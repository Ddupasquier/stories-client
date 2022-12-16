import { supabase } from '$lib/supabase';

export const downloadAvatar = async (path: string,) => {
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
