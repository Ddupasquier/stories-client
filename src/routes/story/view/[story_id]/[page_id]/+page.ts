import { supabase } from '$lib/supabase';

export async function load({ params }: { params: { page_id: number } }) {
	const { data: page, error } = await supabase
		.from('pages')
		.select('id, pageNumber, screenshot, stories: stories (profileId)')
		.eq('id', params.page_id);

	if (error) {
		throw new Error(error.message);
	}

	return {
		page
	};
}
