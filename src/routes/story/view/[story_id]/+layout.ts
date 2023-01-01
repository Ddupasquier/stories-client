import { supabase } from '$lib/supabase';

export async function load({ params }: { params: { story_id: number } }) {
	const { data: pages, error } = await supabase
		.from('pages')
		.select(
			'id, background, createdAt, pageNumber, screenshot, storyId (id, title, profileId (username))'
		)
		.eq('storyId', params.story_id)
		.order('pageNumber', { ascending: true });

	if (error) {
		throw new Error(error.message);
	}

	return {
		pages
	};
}
