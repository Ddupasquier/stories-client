<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { page } from '$app/stores';
	import { unsavedTrue } from '$lib/stores/storyStore';
	import { convToPublicUrlFromFolder, createLoadObserver } from '$lib/utils';
	import type { FileObject } from '@supabase/storage-js';
	import Loading from '$lib/components/Loading.svelte';
	import { toast } from '@zerodevx/svelte-toast';

	export let image: FileObject;
	export let folderName: string;

	$: loading = true;

	const onLoad = createLoadObserver(() => {
		loading = false;
	});

	const addElementToPage = async (folder: string, name: string) => {
		const { error } = await supabase.from('elements').insert([
			{
				elementName: name,
				pageId: $page.params.page_id,
				x: folder === 'backgrounds' ? 0 : 50,
				y: folder === 'backgrounds' ? 0 : 50,
				zIndex: folder === 'backgrounds' ? 0 : 1,
				size: folder === 'backgrounds' ? 120 : 50,
				type: folder
			}
		]);

		if (error) {
			throw new Error(error.message);
		} else {
			toast.push(`Added ${name} to page`);
			unsavedTrue();
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="toolbar-item">
	<div class="item-container">
		<img
			src={convToPublicUrlFromFolder(folderName, image)}
			alt={image.name}
			title={image.name}
			aria-label={`Add ${image.name} to page`}
			on:click={() => {
				addElementToPage(folderName, image.name);
			}}
			use:onLoad
			loading="lazy"
			style="visibility: {loading ? 'hidden' : 'visible'}"
		/>
	</div>

	<div class="add-icon">+</div>

	<div class="loading" style="display: {!loading ? 'none' : 'flex'}">
		<Loading />
	</div>
</div>

<style lang="scss">
	.toolbar-item {
		position: relative;
		height: 80%;
		cursor: pointer;
		filter: grayscale(100%);
		transition: filter 0.2s ease-in-out;
		&:hover {
			filter: grayscale(0%);
		}
		.item-container {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80px;
			aspect-ratio: 1/1;
			img {
				height: 100%;
				width: 100%;
				object-fit: contain;
				&:active {
					transform: scale(0.9);
				}
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
		background: rgb(255, 255, 255, 0.5);
		border-radius: 50%;
	}

	.loading {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
