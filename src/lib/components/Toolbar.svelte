<script lang="ts">
	// import { images } from '$lib/images';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';

	// const getAllImages = async () => {
	// 	// const { data: svgAssets, error } = await supabase.storage.getBucket('svg-assets')
	// 	const { data, error } = await supabase.storage.from('svg-assets').list()

	// 	if (error) {
	// 		console.log(error);
	// 	} else {
	// 		console.log(data);
	// 		return data;
	// 	}
	// };

	// let images = [];

	// onMount(async () => {
	// 	images = await getAllImages();
	// });
</script>

<div class="container">
	<!-- {#each images as image}
		<img src={image.src} alt={image.name} class="toolbar-item" />
	{/each} -->
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		background: #222;
		color: white;
		height: 6em;
	}

	.toolbar-item {
		height: 80%;
	}
</style>
