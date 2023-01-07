<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { page } from '$app/stores';
	import { convToPublicUrlFromFolder } from '$lib/utils';
	import type { FileObject } from '@supabase/storage-js';
	export let folder: FileObject[];
	export let folderText: string;
	export let folderName: string;

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
</script>

<button class="folder-icon" on:click={() => (open = !open)}>
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<path
			d="M19 3h-14c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-14c0-1.103-.897-2-2-2zm-1 16h-12v-12h12v12z"
		/>
	</svg>
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<text
			x="50%"
			y="50%"
			dominant-baseline="middle"
			text-anchor="middle"
			fill="white"
			font-size="12px"
			font-family="sans-serif"
		>
			{folderText}
		</text>
	</svg>
</button>

{#if open}
	<div class="folder-contents">
		<div class="modal-header">
			<h2>{folderText}</h2>
			<button class="close" on:click={() => (open = false)}> X </button>
		</div>
		<div class="modal-body">
			{#each folder as image}
				{#if image.name !== '.emptyFolderPlaceholder'}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="toolbar-item">
						<img
							src={convToPublicUrlFromFolder(folderName, image)}
							alt={image.name}
							title={image.name}
							on:click={() => {
								addElementToPage(folderName, image.name);
							}}
						/>
						<div class="add-icon">+</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	.folder-icon {
		background-color: #2c3e50;
		border: none;
		border-radius: 5px;
		padding: 10px;
		margin: 10px;
		cursor: pointer;
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

	.close-button {
		background-color: rgba(255, 255, 255, 0.856);
		border: none;
		border-radius: 50%;
		padding: 10px;
		margin: 10px;
		cursor: pointer;
	}
</style>
