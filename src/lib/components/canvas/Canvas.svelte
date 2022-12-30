<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { screenshotCanvas } from '$lib/utils';
	import ImgElement from '$lib/components/canvas/ImgElement.svelte';
	import { uploadThumbnail, saveBgColor } from '$lib/services/pageActions';
	import ColorPicker from '../ColorPicker.svelte';

	export let info: {
		id: number;
		pageNumber: number;
		background: string;
		elements: PageElement[];
	};

	$: background = info.background;

	const setColor = (color: string) => {
		background = color;
	};

	onMount(() => {
		supabase
			.channel('public:elements')
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'elements' }, (payload) => {
				console.log('INSERT', payload.new);
				info.elements = [...info.elements, payload.new] as PageElement[];
			})
			.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'elements' }, (payload) => {
				info.elements = info.elements.filter((element) => element.id !== payload.old.id);
			})
			.subscribe();
	});

	const doScreenshot = async () => {
		const file = await screenshotCanvas('#canvas');
		file && uploadThumbnail(file, $page.params.page_id);
	};
</script>

{#if info.background}
	<div id="canvas" style="background: {background}">
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

<div class="controls">
	<ColorPicker color={background} {setColor} />
	<button
		class="save"
		on:click={() => {
			doScreenshot();
			saveBgColor(info.id, background);
		}}
	>
		Save
	</button>
</div>

<style lang="scss">
	#canvas {
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

	.controls {
		position: absolute;
		top: 6.5rem;
		right: 5rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
	}
	.save {
		width: fit-content;
		aspect-ratio: 1/1;
		padding: 0.5rem;
		background-color: rgba(255, 255, 255, 0.493);
		border-radius: 50%;
		border: none;
		color: rgb(0, 0, 0);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		font-weight: 600;
		transition: all 2s;
		&:hover {
			cursor: pointer;
			box-shadow: var(--orange) 0 0 5px 2px inset;
		}
	}
</style>
