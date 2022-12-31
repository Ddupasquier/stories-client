import { supabase } from '$lib/supabase';

export async function load() {
	const { data: stories, error } = await supabase
		.from('stories')
		.select(
			'id, title, author, updatedAt, profileId (id, username, avatarUrl), pages: pages (id, background, screenshot, createdAt)'
		)
		.order('updatedAt', { ascending: false });

	if (error) {
		throw new Error(error.message);
	}

	return {
		stories
	};
}
