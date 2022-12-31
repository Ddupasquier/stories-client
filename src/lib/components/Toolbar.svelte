<script lang="ts">
	import { page } from '$app/stores';
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

	const addElementToPage = async (name: string) => {
		const { error } = await supabase.from('elements').insert([
			{
				elementName: name,
				pageId: $page.params.page_id,
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

	let images: ImgUrl[] = [];

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
				<div class="toolbar-item">
					<img
						src={convToPublicUrl(image)}
						alt={image.name}
						title={image.name}
						on:click={() => {
							addElementToPage(image.name);
						}}
					/>
					<div class="add-icon">+</div>
				</div>
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
		height: 8rem;
	}

	.toolbar-item {
		position: relative;
		height: 80%;
		cursor: pointer;
		filter: grayscale(100%);
		transition: filter 0.2s ease-in-out;
		&:hover {
			filter: grayscale(0%);
		}
		img {
			height: 100%;
			&:active {
				transform: scale(0.9);
			}
		}
	}

	.toolbar-item:hover .add-icon {
		opacity: 1;
	}

	.add-icon {
		position: absolute;
		top: 0;
		right: 0;
		width: 1.2rem;
		height: 1.2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		color: rgb(0, 0, 0);
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
		background: rgb(255, 255, 255, .5);
		border-radius: 50%;
	}
</style>
