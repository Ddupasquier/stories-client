export const convToPublicUrl = (img: ImgURL) => {
	const publicUrl = `https://latdcbfvbassfihdwpwi.supabase.co/storage/v1/object/public/svg-assets/${img.name}`;
	return publicUrl;
};
