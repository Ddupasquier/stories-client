import { error } from '@sveltejs/kit';
import { fakerStories } from '$lib/placeholderData';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const story = fakerStories.find((story) => story.id === +params.story_id);
	if (!story) {
		return error(404, 'Story not found');
	}
	return {
		story
	};
}
