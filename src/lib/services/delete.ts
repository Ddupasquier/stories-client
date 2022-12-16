import { supabase } from '$lib/supabase';

export const deleteStory = async (id: number) => {
	const { error } = await supabase.from('stories').delete().match({ id });

	if (error) {
            alert(error.message);
		throw new Error(error.message);
	}
};
