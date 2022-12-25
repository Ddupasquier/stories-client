import { supabase } from '$lib/supabase';

export async function load({ params }: { params: { story_id: number } }) {
	const { data: pages, error } = await supabase
		.from('pages')
		.select('id, background, storyId (id, title, profileId (username))')
		.eq('storyId', params.story_id);

	let sortedPages;

	if (error) {
		throw new Error(error.message);
	} else {
		sortedPages = pages.sort((a, b) => a.id + b.id);
	}

	return {
		sortedPages
	};
}
