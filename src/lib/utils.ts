import { toast } from '@zerodevx/svelte-toast';
import html2canvas from 'html2canvas';

export const convToPublicUrlFromFolder = (folder: string, img: ImgUrl) => {
	const publicUrl = `https://latdcbfvbassfihdwpwi.supabase.co/storage/v1/object/public/svg-assets/${folder}/${img.name}`;
	return publicUrl;
};

export const screenshotCanvas = async (element: string): Promise<File | null> => {
	const el: HTMLElement | null = document.querySelector(element);
	const ignore = [document.querySelector('#actions'), document.querySelector('#tools')];

	if (el) {
		const canvas = await html2canvas(el, {
			allowTaint: true,
			useCORS: true,
			ignoreElements: (el) => {
				return ignore.includes(el);
			}
		});

		const dataUrl = canvas.toDataURL('image/png');
		const blob = await fetch(dataUrl).then((r) => r.blob());
		const file = new File([blob], 'screenshot.webp', { type: 'image/webp' });
		return file;
	}
	return null;
};

export const generateUuid = () => {
	const uuid =
		Math.random().toString(20).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	return uuid;
};

export const truncate = (str: string, n: number) => {
	return str.length > n ? str.substr(0, n - 1) + '...' : str;
};

export const addCommasToNumber = (num: number) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const createLoadObserver = (handler: () => void) => {
	let waiting = 0;

	const onload = (el: { addEventListener: (arg0: string, arg1: () => void) => void }) => {
		waiting++;
		el.addEventListener('load', () => {
			waiting--;
			if (waiting === 0) {
				handler();
			}
		});
	};

	return onload;
};

export const detectDevice = () => {
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	return isMobile;
};

// interface Story {
// 	updatedAt: any;
// 	createdAt: any;
// 	title: string;
// 	likes: number;
// 	isPublic: boolean;
// }

interface SortTerms {
	sortBy: "title" | "likes" | "isPublic" | "updatedAt" | "createdAt";
}

export const sortSwitch = (
	toSort: Story[],
	sortBy: SortTerms["sortBy"],
	order: "asc" | "desc" = "desc"
) => {
	if (!toSort || !sortBy) return toSort;

	toSort.sort((a: Story, b: Story) => {
		const sortValue = order === "asc" ? -1 : 1;

		switch (sortBy) {
			case "title":
				return sortValue * ((a.title < b.title) ? -1 : (a.title > b.title ? 1 : 0));
			case "likes":
				return sortValue * ((a.likes < b.likes) ? 1 : (a.likes > b.likes ? -1 : 0));
			case "updatedAt":
				return sortValue * ((a.updatedAt < b.updatedAt) ? 1 : (a.updatedAt > b.updatedAt ? -1 : 0));
			case "createdAt":
				return sortValue * ((a.createdAt < b.createdAt) ? 1 : (a.createdAt > b.createdAt ? -1 : 0));
			case "isPublic":
				return sortValue * ((a.isPublic < b.isPublic) ? 1 : (a.isPublic > b.isPublic ? -1 : 0));
			default:
				return 0;
		}
	});

	return toSort;
};


