// // See https://kit.svelte.dev/docs/types#app
// // for information about these interfaces
// // and what to do when importing types

declare namespace App {}

interface Story {
	likes: number | undefined;
	id: number;
	title: string;
	author: string;
	isPublic: boolean;
	updatedAt: string;
	createdAt: string;
	pages: Page[] | null;
	profileId: {
		id: string;
		username: string;
		avatarUrl: string;
	};
}

interface Page {
	createdAt: string;
	pageNumber: number;
	storyId: StoryId;
	id: number;
	background: string;
	screenshot?: string | null;
	[key: string]: any;
}

interface PagesLayoutProps {
	pages: Page[];
}

interface SliderPageProps {
	page: Page;
}

interface CanvasProps {
	stories?: {
		profileId: string
	};
	storyId?: number;
	id: number;
	pageNumber: number;
	background: string;
	elements: PageElement[];
}

interface StoryId {
	isPublic: boolean;
	id: number;
	title: string;
	profileId: {
		id: string;
		username: string;
	};
}

interface PagesProps {
	data: {
		sortedPages: {
			id: number;
			background: string;
			pageNumber: number;
			storyId: {
				id: number;
				title: string;
				profileId: {
					username: string;
				};
			};
		}[];
	};
}

interface EditPageStoryId {
	id: string;
	title: string;
	profileId: {
		id: string;
		username: string;
	};
}

interface EditPageProps {
	storyId: number;
	firstPage: number;
	pages: Page[];
	page: {
		stories: any;
		id: number;
		pageNumber: number;
		background: string;
		elements: PageElement[];
	}[];
}

interface ViewPageProps {
	page: {
		stories: any;
		id: number;
		pageNumber: number;
		screenshot: string;
	}[];
}

interface PageElement {
	flip: boolean;
	rotate: number;
	id: number;
	color?: string;
	text?: string;
	type?: string;
	x: number;
	y: number;
	zIndex: number;
	elementName: string;
	size: number;
	pageId: number;
}

interface ImgUrl {
	created_at: string;
	id: string;
	last_accessed_at: string;
	name: string;
	updated_at: string;
}
