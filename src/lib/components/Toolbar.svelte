<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { convToPublicUrl } from '$lib/utils';
	import { pageId } from '$lib/stores/storyStore';
	import Loading from './Loading.svelte';

	const getAllImages = async () => {
		const { data, error } = await supabase.storage.from('svg-assets').list();

		if (error) {
			throw new Error(error.message);
		} else {
			return data;
		}
	};

	const addElementToPage = async (name: string) => {
		const { error } = await supabase.from('elements').insert([
			{
				elementName: name,
				pageId: $pageId,
				x: 50,
				y: 50,
				zIndex: 0,
				size: 30,
				type: 'svg'
			}
		]);

		if (error) {
			throw new Error(error.message);
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
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<img
					src={convToPublicUrl(image)}
					alt={image.name}
					title={image.name}
					class="toolbar-item"
					on:click={() => {
						addElementToPage(image.name);
						// setTimeout(() => {
						// 	window.location.reload();
						// }, 100);
					}}
				/>
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
		padding: 0 1rem;
		background: #222;
		color: white;
		height: 6em;
	}

	.toolbar-item {
		height: 80%;
	}
</style>
