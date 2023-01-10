import { supabase } from '$lib/supabase';

export async function load() {
	const { data: stories, error } = await supabase
		.from('stories')
		.select(
			'id, title, author, updatedAt, isPublic, profileId (id, username, avatarUrl), pages: pages (id, background, screenshot, pageNumber, createdAt)'
		)
		.eq('isPublic', true)
		.order('createdAt', { ascending: false });

	if (error) {
		throw new Error(error.message);
	}

	return {
		stories
	};
}
