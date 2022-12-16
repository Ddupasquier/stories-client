import { supabase } from '$lib/supabase';

export async function load({ params }: { params: { story_id: number } }) {
	const { data: pages, error } = await supabase
		.from('pages')
		.select('id, background, storyId (id, title, profileId (username))')
		.eq('storyId', Number(params.story_id));

	if (error) {
		throw new Error(error.message);
	}

	return {
		pages
	};
}
