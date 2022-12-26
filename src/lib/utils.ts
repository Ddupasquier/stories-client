import html2canvas from 'html2canvas';

export const convToPublicUrl = (img: ImgURL) => {
	const publicUrl = `https://latdcbfvbassfihdwpwi.supabase.co/storage/v1/object/public/svg-assets/${img.name}`;
	return publicUrl;
};

export const restart = (variable: object) => {
	variable = {};
};

export const screenshotCanvas = async (element: string): Promise<File | null> => {
	const el: HTMLElement | null = document.querySelector(element);
	if (el) {
		const canvas = await html2canvas(el);

		// draw SVGs on canvas

		const blob = await new Promise((resolve) => canvas.toBlob(resolve));
		// TODO handle error if blob is null somehow
		const file = new File([blob], 'thumbnail.webp', { type: 'image/webp' });
		return file;
	}
	return null;
};

export const generateUuid = () => {
	const uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	return uuid;
}

export const truncate = (str: string, n: number) => {
	return str.length > n ? str.substr(0, n - 1) + '...' : str;
}