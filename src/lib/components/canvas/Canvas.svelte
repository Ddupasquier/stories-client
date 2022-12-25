<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { screenshotCanvas } from '$lib/utils';
	import ImgElement from '$lib/components/canvas/ImgElement.svelte';
	import { uploadThumbnail } from '$lib/services/pageActions';
	
	export let info: {
		id: number;
		pageNumber: number;
		background: string;
		elements: PageElement[];
	};

	// onMount(async () => {
	// 	supabase
	// 		.channel('public:elements')
	// 		.on('postgres_changes', { event: 'INSERT', schema: 'public' }, (payload) => {
	// 			elements = [...elements, payload.new] as PageElement[];
	// 		})
	// 		.subscribe();

	// 	supabase
	// 		.channel('public:elements')
	// 		.on('postgres_changes', { event: 'DELETE', schema: 'public' }, (payload) => {
	// 			elements = elements.filter((element) => element.id !== payload.old.id);
	// 		})
	// 		.subscribe();
	// });

	const doScreenshot = async () => {
		const file = await screenshotCanvas('.canvas');
		file && uploadThumbnail(file, $page.params.page_id);
	};
</script>

{#if info.background}
	<div class="canvas" style="background: {info.background}">
		{#if info.elements}
			{#each info.elements as element}
				<ImgElement {element} />
			{/each}
		{/if}
		<div class="page">
			Page {info.pageNumber}
		</div>
	</div>
{/if}

<button class="save" on:click={() => doScreenshot()}> Save </button>

<style lang="scss">
	.canvas {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.page {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		width: fit-content;
		aspect-ratio: 1/1;
		padding: 0.5rem;
		background-color: rgba(255, 255, 255, 0.493);
		border-radius: 50%;
		color: rgb(0, 0, 0);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		font-weight: 600;
	}
	.save {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		width: fit-content;
		aspect-ratio: 1/1;
		padding: 0.5rem;
		background-color: rgba(255, 255, 255, 0.493);
		border-radius: 50%;
		border: 2px black solid;
		color: rgb(0, 0, 0);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		font-weight: 600;
		transition: all 2s;
		&:hover {
			cursor: pointer;
			box-shadow: black 0 0 5px 2px inset;
		}
	}
</style>
