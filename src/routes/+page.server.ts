import prisma from '$lib/prisma';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const stories = await prisma.story.findMany({
            include: {
                  pages: true
            }
      });
	return {
		stories
	};
}
