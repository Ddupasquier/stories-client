// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {}

interface PageElement {
	[x: string]: string;
	id?: string;
	x: number;
	y: number;
	zIndex: number;
	size?: number;
}

interface VisualElement extends PageElement {
	width: number; // percentage
	height: number; // percentage
	assetId: string;
}

interface TextElement extends PageElement {
	fontSize: number;
	fontColor: string;
}

interface Page {
	storyId: { id: number; profileId: { username: string }; title: string };
	id: number;
	background: string; // a hex value,
}

interface Story {
	id: number;
	title: string;
	author?: string;
	pages?: Page[];
}

interface StoryProps {
	story: Story;
}

interface PageProps {
	pages: Page[];
}

interface PageInfoProps {
	storyId: any;
	id: number;
	background: string;
	elements?: PageElement[];
}
