import { supabase } from '$lib/supabase';
import { generateUuid } from '$lib/utils';
import { goto } from '$app/navigation';

export const addPage = async (storyId: number, background: string, lastPage: number) => {
	const { data, error } = await supabase
		.from('pages')
		.insert([{ storyId, background, pageNumber: lastPage + 1 }])
		.select();

	if (error) {
		throw new Error(error.message);
	} else {
		console.log(data);
		return data;
	}
};

export const newStory = async (id: string | undefined, user: string | null) => {
	const { data, error } = await supabase
		.from('stories')
		.insert([
			{
				profileId: id,
				title: `Untitled Story - ${generateUuid()}`,
				author: user,
				updatedAt: new Date()
			}
		])
		.select();

	if (error) {
		throw new Error(error.message);
	} else {
		console.log(data);
		let page;
		let pageId: number;
		if (data !== null) {
			page = await addPage(data[0].id, '#000000', 0);
			pageId = await page[0].id;
		}
		setTimeout(() => {
			goto(`/story/edit/${data[0].id}/${pageId}`);
		}, 10);
	}
};

export const changeTitle = async (storyId: number, title: string) => {
	const { data, error } = await supabase
		.from('stories')
		.update({ title, updatedAt: new Date() })
		.eq('id', storyId);

	if (error) {
		throw new Error(error.message);
	} else {
		return data;
	}
};
