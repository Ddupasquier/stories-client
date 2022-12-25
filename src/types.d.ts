// // See https://kit.svelte.dev/docs/types#app
// // for information about these interfaces
// // and what to do when importing types
declare namespace App {}

interface PagesLayoutProps {
	sortedPages: PagesProps['data']['sortedPages'];
}

interface PagesProps {
	data: {
		sortedPages: {
			id: number;
			background: string;
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
	page: {
		id: number;
		pageNumber: number;
		background: string;
		elements: PageElement[];
	}[];
}

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