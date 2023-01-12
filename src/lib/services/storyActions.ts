import { supabase } from '$lib/supabase';
import { generateUuid } from '$lib/utils';
import { goto } from '$app/navigation';
import { toast } from '@zerodevx/svelte-toast';
import { addPage } from '$lib/services/pageActions';

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
		toast.push(`Something went wrong! ${error.message}`, { duration: 5000, pausable: true });
		throw new Error(error.message);
	} else {
		let page;
		let pageId: number;
		if (data !== null) {
			page = await addPage(data[0].id, '#000000', 0);
			pageId = await page[0].id;
		}
		setTimeout(() => {
			goto(`/story/edit/${data[0].id}/${pageId}`);
		}, 10);
		toast.push('Happy creating!!!', { duration: 2000, pausable: true });
	}
};

export const deleteStory = async (id: number | undefined) => {
	const { error } = await supabase.from('stories').delete().eq('id', id);

	if (error) {
		toast.push(`Something went wrong! ${error.message}`, { duration: 5000, pausable: true });
		throw new Error(error.message);
	} else {
		toast.push('Story deleted', { duration: 2000, pausable: true });
		goto('/');
	}
};

export const changeTitle = async (storyId: number, title: string) => {
	const { data, error } = await supabase
		.from('stories')
		.update({ title, updatedAt: new Date() })
		.eq('id', storyId);

	if (error) {
		toast.push(`Something went wrong! ${error.message}`, { duration: 5000, pausable: true });
		throw new Error(error.message);
	} else {
		toast.push('Title updated', { duration: 2000, pausable: true });
		return data;
	}
};
