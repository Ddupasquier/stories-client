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
