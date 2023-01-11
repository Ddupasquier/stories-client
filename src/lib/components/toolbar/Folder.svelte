<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { page } from '$app/stores';
	import { convToPublicUrlFromFolder, createLoadObserver } from '$lib/utils';
	import type { FileObject } from '@supabase/storage-js';
	import Loading from '$lib/components/Loading.svelte';

	export let folder: FileObject[];
	export let folderIcon: string;
	export let folderName: string;

	let loading = true;
	const onLoad = createLoadObserver(() => {
		loading = false;
	});

	let open = false;

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
		}
	};

	let folderRef: HTMLElement
	let folderButtonRef: HTMLElement
</script>

<svelte:window
	on:click={(e) => {
		if (e.target instanceof HTMLElement) {
			if (open === true && folderRef !== e.target && !folderRef.contains(e.target) && folderButtonRef !== e.target) {
				open = false;
			}
		}
	}}
/>

<button class="folder-icon" on:click={() => (open = !open)} bind:this={folderButtonRef}>
	<img src={folderIcon} alt={folderName} />
</button>

{#if open}
	<div class="folder-contents" bind:this={folderRef}>
		<div class="modal-header">
			<button class="close" on:click={() => (open = false)}> X </button>
		</div>
		<div class="modal-body">
			{#each folder as image}
				{#if image.name !== '.emptyFolderPlaceholder'}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="toolbar-item">
						<!-- {#if loading}
							<div class="avatar">
								<Loading />
							</div>
						{/if}
						{#if !loading} -->
						<img
							src={convToPublicUrlFromFolder(folderName, image)}
							alt={image.name}
							title={image.name}
							on:click={() => {
								addElementToPage(folderName, image.name);
							}}
							use:onLoad
						/>
						<div class="add-icon">+</div>
						<!-- {/if} -->
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.folder-icon {
		background: none;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		height: 70%;
		aspect-ratio: 1/1;
		transition: all 0.5s;
		&:hover {
			background-color: var(--orange);
		}
		img {
			height: 70%;
			aspect-ratio: 1/1;
			transition: all 0.3s ease-in-out;
			color: white;
			pointer-events: none;
			&:active {
				transform: scale(0.9);
			}
		}
	}

	.folder-contents {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		background: #2c3e50;
		border-radius: 5px;
		max-height: 60vh;
		max-width: 75vw;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 10px;
		z-index: 1002;
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
			height: 80px;
			aspect-ratio: 1/1;
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
		background: rgb(255, 255, 255, 0.5);
		border-radius: 50%;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #2c3e50;
		width: 100%;
		margin-bottom: 1rem;
	}

	.modal-body {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		background-color: #2c3e50;
		border-radius: 0 0 5px 5px;
	}
</style>
