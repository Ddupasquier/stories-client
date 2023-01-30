<script lang="ts">
	import type { FileObject } from '@supabase/storage-js';

	import { Close } from '$lib/assets';
	import FolderItem from './FolderItem.svelte';

	export let folder: FileObject[];
	export let folderIcon: string;
	export let folderName: string;

	let open = false;

	let folderRef: HTMLElement;
	let folderButtonRef: HTMLElement;

	let howManyButtons = Math.ceil(folder.length / 20);
	$: twentyItems = folder.slice(0, 20);
</script>

<svelte:window
	on:click={(e) => {
		if (e.target instanceof HTMLElement) {
			if (
				open === true &&
				folderRef !== e.target &&
				!folderRef.contains(e.target) &&
				folderButtonRef !== e.target
			) {
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
			<button class="close" on:click={() => (open = false)}><Close /></button>
		</div>
		<div class="modal-body">
			{#each twentyItems as image}
				{#if image.name !== '.emptyFolderPlaceholder'}
					<FolderItem {image} {folderName} />
				{/if}
			{/each}
		</div>
		{#if howManyButtons > 1}
			<div class="pagination-buttons">
				{#each Array(howManyButtons) as _, i}
					<button on:click={() => (twentyItems = folder.slice(i * 20, i * 20 + 20))}>{i + 1}</button
					>
				{/each}
			</div>
		{/if}
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

	.pagination-buttons {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		border-radius: 0 0 5px 5px;
	}

	.pagination-buttons button {
		color: white;
		background: #435e79;
		border: none;
		border-radius: 5px;
		padding: 0.5rem;
		cursor: pointer;
		height: 2rem;
		aspect-ratio: 1/1;
		transition: all 0.5s;
		&:hover {
			background-color: var(--orange);
		}
	}
</style>
