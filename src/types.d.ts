// // See https://kit.svelte.dev/docs/types#app
// // for information about these interfaces
// // and what to do when importing types

declare namespace App {}

interface Story {
	id: number;
	title: string;
	author: string;
	isPublic: boolean;
	pages: Page[];
	profileId: {
		id: string;
		username: string;
		avatarUrl: string;
	};
}

interface Page {
	createdAt: string;
	pageNumber?: number;
	storyId: StoryId;
	id: number;
	background: string;
	screenshot?: string;
	[key: string]: any;
}

interface PagesLayoutProps {
	pages: Page[];
}

interface SliderPageProps {
	page: Page;
}

interface StoryId {
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
	pages: any;
	page: {
		id: number;
		pageNumber: number;
		background: string;
		elements: PageElement[];
	}[];
}

interface ViewPageProps {
		page: {
			id: number;
			pageNumber: number;
			screenshot: string;
		}[];
	};

interface PageElement {
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
