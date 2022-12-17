<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { convToPublicUrl } from '$lib/utils';
	import Loading from './Loading.svelte';

	const getAllImages = async () => {
		const { data, error } = await supabase.storage.from('svg-assets').list();

		if (error) {
			throw new Error(error.message);
		} else {
			return data;
		}
	};

	let images: ImgURL[] = [];
	let loading = true;

	onMount(async () => {
		images = await getAllImages();

		setTimeout(() => {
			loading = false;
		}, 1000);
	});
</script>

<div class="container">
	{#each images as image}
		{#if image.name !== '.emptyFolderPlaceholder'}
			{#if loading}
				<Loading />
			{:else}
				<img src={convToPublicUrl(image)} alt={image.name} class="toolbar-item" />
			{/if}
		{/if}
	{/each}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		gap: 1rem;
		width: 100%;
		padding: 0 1rem;
		background: #222;
		color: white;
		height: 6em;
	}

	.toolbar-item {
		height: 80%;
	}
</style>
