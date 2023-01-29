import { supabase } from '$lib/supabase';
import {currentPage} from '$lib/stores/viewStore';
import { getPageThumbnail } from '$lib/services/getImages';

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
	} else {
		const firstPage = pages[0].screenshot;
		const thumbnail = await getPageThumbnail(firstPage);
		currentPage.set(thumbnail?.publicUrl);
	}

	return {
		pages
	};
}
