import html2canvas from 'html2canvas';

export const convToPublicUrl = (img: ImgUrl) => {
	const publicUrl = `https://latdcbfvbassfihdwpwi.supabase.co/storage/v1/object/public/svg-assets/${img.name}`;
	return publicUrl;
};

export const screenshotCanvas = async (element: string): Promise<File | null> => {
	const el: HTMLElement | null = document.querySelector(element);
	const svgAssets = document.querySelectorAll('img');
	if (el) {
		const canvas = await html2canvas(el, {
			allowTaint: true,
			useCORS: true,
			logging: true,
			imageTimeout: 0,
			proxy: 'https://cors-anywhere.herokuapp.com/',
			onclone: (doc) => {
				svgAssets.forEach((asset) => {
					console.log('assets', asset, asset.width, asset.height)
					const img = doc.createElement('img');
					img.src = asset.src;
					img.width = asset.width;
					img.height = asset.height;
					doc.body.appendChild(img);
					console.log('img', img, img.width, img.height)
				});
			}
		});

		const blob = await new Promise((resolve) => canvas.toBlob(resolve));
		// TODO handle error if blob is null somehow
		const file = new File([blob], 'thumbnail.webp', { type: 'image/webp' });
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
