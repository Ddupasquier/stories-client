import { supabase } from '$lib/supabase';

export async function load({ params }: { params: { story_id: number } }) {
	let firstPage;
	const { data: pages, error } = await supabase
		.from('pages')
		.select(
			'id, background, createdAt, pageNumber, screenshot, storyId (id, title, isPublic, profileId (username))'
		)
		.eq('storyId', params.story_id)
		.order('pageNumber', { ascending: true });

	if (pages) {
		firstPage = pages[0].id;
	}

	if (error) {
		throw new Error(error.message);
	}

	return {
		pages,
		firstPage
	};
}
