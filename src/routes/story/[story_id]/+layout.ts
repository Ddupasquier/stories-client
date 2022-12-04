import { error } from '@sveltejs/kit';
import { fakerStories } from '$lib/placeholderData';

interface StoryParams {
	story_id: string;
}

/** @type {import('./$types').PageLoad} */
export function load({ params }: { params: StoryParams }) {
	const story = fakerStories.find((story) => story.id === +params.story_id);

	if (!story) {
		return error(404, 'Story not found');
	}
	return {
		story
	};
}

// /** @type {import('./$types').PageLoad} */
// export function load({ params }: { params: StoryParams }) {
// 	const story = fakerStories.find((story) => story.id === +params.story_id);
// 	if (!story) {
// 		return error(404, 'Story not found');
// 	}
// 	return {
// 		story
// 	};
// }
