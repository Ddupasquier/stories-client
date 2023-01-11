import { supabase } from '$lib/supabase';
import { toast } from '@zerodevx/svelte-toast';

export const downloadAvatar = async (path: string) => {
	try {
		const { data, error } = await supabase.storage.from('avatars').download(path);

		if (error) {
			toast.push(`Something went wrong! ${error.message}`, { duration: 5000, pausable: true })
			throw error;
		}

		const url = URL.createObjectURL(data);
		return url;
	} catch (error) {
		if (error instanceof Error) {
			toast.push(`Something went wrong! ${error.message}`, { duration: 5000, pausable: true })
		}
	}
};

export const getElements = async (pageId: number) => {
	const { data, error } = await supabase.from('elements').select().eq('pageId', pageId);

	if (error) {
		toast.push(`Error downloading image! ${error.message}`, { duration: 5000, pausable: true })
		throw new Error(error.message);
	} else {
		toast.push('Elements loaded', { duration: 2000, pausable: true });
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