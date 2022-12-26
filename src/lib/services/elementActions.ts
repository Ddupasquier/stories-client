import { supabase } from '$lib/supabase';

export const getElement = async (element: string) => {
	const { data: url } = supabase.storage.from('svg-assets').getPublicUrl(element);
	return url;
};

export const deleteElement = async (e: { preventDefault: () => void }, id: number | undefined) => {
	e.preventDefault();
	const { error } = await supabase.from('elements').delete().eq('id', id);

	if (error) {
		throw new Error(error.message);
	}
};

export const savePosition = async (top: number, left: number, id: number) => {
	const { error } = await supabase.from('elements').update({ x: left, y: top }).eq('id', id);

	if (error) {
		throw new Error(error.message);
	}
};
