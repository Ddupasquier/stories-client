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
