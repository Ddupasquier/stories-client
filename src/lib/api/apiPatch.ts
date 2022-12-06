import { currentStory } from "$lib/stores/storyStore";

export const savePosition = (story: object, page: number, element: PageElement, top: number, left: number) => {
      const storyId = story.id;


      fetch(`/api/story/${story.id}/page/${page}/element/${element.id}`, {
            method: 'PATCH',
            headers: {
                  'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                  x: left,
                  y: top,
            }),
      });
};