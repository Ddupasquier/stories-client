import { supabase } from '$lib/supabase';
import { generateUuid } from '$lib/utils';

export const addPage = async (storyId: number, background: string, lastPage: number) => {
	const { data, error } = await supabase.from('pages').insert([{ storyId, background, pageNumber: lastPage + 1 }]);

	if (error) {
		throw new Error(error.message);
	} else {
		return data;
	}
};

export const newStory = async (id: string | null, user: string | null) => {
	const { data, error } = await supabase
		.from('stories')
		.insert([{ profileId: id, title: `Untitled Story - ${generateUuid()}`, author: user, updatedAt: new Date() }]);

	if (error) {
		throw new Error(error.message);
	} else {
		if (data !== null) console.log(data);
	}
};
