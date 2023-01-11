import { supabase } from '$lib/supabase';

export async function load({ params }: { params: { page_id: number } }) {
	const { data: page, error } = await supabase
		.from('pages')
		.select(
			'id, pageNumber, background, elements: elements (id, elementName, x, y, zIndex, size, rotate, type, color, text, pageId)'
		)
		.eq('id', params.page_id);

	if (error) {
		throw new Error(error.message);
	}

	return {
		page
	};
}
