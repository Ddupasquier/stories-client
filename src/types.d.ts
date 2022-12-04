// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {}

interface PageElement {
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
	id: number;
	background: string; // a hex value,
	elements?: PageElement[];
}

interface Story {
	id: number;
	title: string;
	author: string;
	pages: Page[];
}

interface SVGAsset {
	id: string; // unique id
	label: string;
	// data: // svg data
}

// firebase store

//    assets: SVGAsset[]
//    stories: Story[]
interface StoryProps {
	story: Story;
}

interface PageProps {
	story: Story;
	background: string;
	page: Page;
}