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
	profileId?: number;
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

interface ImgURLmeta {
	cacheControl?: string;
	contentLength?: number;
	eTag?: string;
	httpStatusCode?: number;
	lastModified?: string;
	mimetype?: string;
	size?: number;
}

interface ImgURL {
	created_at: string;
	id: string;
	last_accessed_at: string;
	metadata?: ImgURLmeta;
	name: string;
	updated_at: string;
}