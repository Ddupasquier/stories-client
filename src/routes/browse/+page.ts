import { supabase } from '$lib/supabase';

export async function load() {
	const { data: stories, error } = await supabase.from('stories').select();

	if (error) {
		throw new Error(error.message);
	}

	return {
		stories
	};
}
