import { supabase } from '$lib/supabase';
import { toast } from '@zerodevx/svelte-toast';

const updateScreenshotColumn = async (pageId: string, screenshot: string) => {
	const { error: pageError } = await supabase
		.from('pages')
		.update({ screenshot, updatedAt: new Date() })
		.eq('id', pageId);

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
			cacheControl: '60'
		});

	if (error) {
		toast.push(error.message, { duration: 5000, pausable: true });
		throw new Error(error.message);
	} else {
		updateScreenshotColumn(id, data.path);
	}
};

export const saveBgColor = async (id: number, color: string) => {
	const { data, error } = await supabase
		.from('pages')
		.update({ background: color, updatedAt: new Date() })
		.eq('id', id)
		.select()

	if (error) {
		throw new Error(error.message);
	} else {
		if (data.length === 0) {
			toast.push('You are not authorized to make these changes!', { duration: 5000, pausable: true });
		} else {
			toast.push('Background color updated', { duration: 2000, pausable: true });
		}
	}
};

const deletePageThumbnail = async (assetName: string) => {
	const { error } = await supabase.storage.from('page-screenshots').remove([assetName]);

	if (error) {
		throw new Error(error.message);
	}
};

const getNewPages = async (storyId: number) => {
	const { data, error } = await supabase
		.from('pages')
		.select('id')
		.eq('storyId', storyId)
		.order('id', { ascending: true });

	if (error) {
		throw new Error(error.message);
	} else {
		return data;
	}
};

const returnFinalPage = (pages: string | any[]) => {
	const lastPage = pages[pages.length - 1];
	return lastPage.id;
};

export const deletePage = async (id: number, currentStory: string) => {
	const { data, error } = await supabase.from('pages').delete().eq('id', id).select();

	if (error) {
		toast.push(`Something went wrong! ${error.message}`, { duration: 5000, pausable: true });
		throw new Error(error.message);
	} else {
		toast.push('Page deleted', { duration: 2000, pausable: true });
		deletePageThumbnail(data[0].screenshot);
		const pages = await getNewPages(data[0].storyId);
		const finalPage = returnFinalPage(pages);
		window.location.replace(`/story/edit/${currentStory}/${finalPage}`);
	}
};

export const addPage = async (storyId: number, background: string, lastPage: number) => {
	const { data, error } = await supabase
		.from('pages')
		.insert([{ storyId, background, pageNumber: lastPage + 1 }])
		.select();

	if (error) {
		toast.push(`${error.message}`, { duration: 5000, pausable: true });
	} else {
		toast.push('Page added', { duration: 2000, pausable: true });
		return data;
	}
};
