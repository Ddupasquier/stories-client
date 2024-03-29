<script lang="ts">
	import {
		charsIcon,
		fishIcon,
		miscIcon,
		plantsIcon,
		rpgIcon,
		backgroundIcon,
		speechIcon,
		foodIcon
	} from '$lib/assets';
	import type { FileObject } from '@supabase/storage-js';
	import { howToIsOpen } from '$lib/stores/modalStore';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import Folder from './Folder.svelte';

	let backgrounds: FileObject[];
	let char_icon: FileObject[];
	let food: FileObject[];
	let misc: FileObject[];
	let nautical: FileObject[];
	let plants: FileObject[];
	let rpg: FileObject[];
	let speech: FileObject[];

	const getFolder = async (folder: string) => {
		const { data, error } = await supabase.storage.from('svg-assets').list(folder);

		if (error) {
			throw new Error(error.message);
		}

		if (data) {
			switch (folder) {
				case 'backgrounds':
					backgrounds = data;
					break;
				case 'char_icon':
					char_icon = data;
					break;
				case 'food':
					food = data;
					break;
				case 'misc':
					misc = data;
					break;
				case 'nautical':
					nautical = data;
					break;
				case 'plants':
					plants = data;
					break;
				case 'rpg':
					rpg = data;
					break;
				case 'speech':
					speech = data;
					break;
				default:
					break;
			}
		}
	};

	const getAllImages = async () => {
		const { data, error } = await supabase.storage.from('svg-assets').list();

		if (error) {
			throw new Error(error.message);
		} else {
			if (data) {
				for (let i of data) {
					getFolder(i.name);
				}
			}
			return data;
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

	const showHowTo = () => {
		howToIsOpen.set(true);
	};
</script>

<div class="container">
	<button class="info" on:click={() => showHowTo()}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="40"
			height="40"
			viewBox="0 0 24 24"
			fill="none"
			stroke="white"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			style="pointer-events: none"
		>
			<circle cx="12" cy="12" r="10" />
			<line x1="12" y1="16" x2="12" y2="12" />
			<line x1="12" y1="8" x2="12.01" y2="8" />
		</svg>
	</button>

	{#if misc}
		<Folder folder={misc} folderIcon={miscIcon} folderName="misc" />
	{/if}
	{#if backgrounds}
		<Folder folder={backgrounds} folderIcon={backgroundIcon} folderName="backgrounds" />
	{/if}
	{#if speech}
		<Folder folder={speech} folderIcon={speechIcon} folderName="speech" />
	{/if}
	{#if nautical}
		<Folder folder={nautical} folderIcon={fishIcon} folderName="nautical" />
	{/if}
	{#if plants}
		<Folder folder={plants} folderIcon={plantsIcon} folderName="plants" />
	{/if}
	{#if rpg}
		<Folder folder={rpg} folderIcon={rpgIcon} folderName="rpg" />
	{/if}
	{#if char_icon}
		<Folder folder={char_icon} folderIcon={charsIcon} folderName="char_icon" />
	{/if}
	{#if food}
		<Folder folder={food} folderIcon={foodIcon} folderName="food" />
	{/if}
</div>

<style lang="scss">
	.container {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
		gap: 1rem;
		padding-left: 0;
		padding-right: 1rem;
		background: #222;
		color: white;
		height: 5rem;
		overflow-x: auto;
	}
	.container::-webkit-scrollbar {
		background: rgb(158, 158, 158);
		height: 0.8rem;
	}

	.container::-webkit-scrollbar-thumb {
		background: var(--orange);
		border-radius: 8px;
	}

	.container::-webkit-scrollbar-track-piece:start {
		background: #222;
	}

	.info {
		height: 100%;
		width: 3.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		background: transparent;
		border: none;
		cursor: pointer;
		&:hover {
			background: rgba(0, 0, 0, 0.2);
		}
		&:active {
			background: rgba(0, 0, 0, 0.4);
		}
	}
</style>
