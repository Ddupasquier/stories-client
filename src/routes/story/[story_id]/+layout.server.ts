import { error } from '@sveltejs/kit';
import prisma from '$lib/prisma';

interface StoryParams {
	story_id: string;
}

/** @type {import('./$types').PageLoad} */
export function load({ params }: { params: StoryParams }) {
	const story = prisma.story.findMany({
		where: {
			id: +params.story_id
		},
		include: {
			pages: {
				include: {
					elements: true
				}
			}
		}
	})

	if (!story) {
		return error(404, 'Story not found');
	}
	return {
		story
	};
}
