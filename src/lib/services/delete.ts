import { supabase } from '$lib/supabase';

export const deleteStory = async (id: number) => {
	const { error } = await supabase.from('stories').delete().eq('id', id);

	if (error) {
		throw new Error(error.message);
	}
};
