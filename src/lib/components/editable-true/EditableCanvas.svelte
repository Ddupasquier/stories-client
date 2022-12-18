<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { getElements } from '$lib/services/getImages';
	import { onMount } from 'svelte';
	import ImgElement from '$lib/components/editable-true/EditableImgElement.svelte';
	import { currentPageIndex, pageId } from '$lib/stores/storyStore';
	export let info: PageInfoProps;
	
	let pageIndex: number;

	currentPageIndex.subscribe((value) => {
		pageIndex = value;
	});

	$: elements = [] as PageElement[];

	onMount(async () => {
		pageId.set(info.id);
		elements = await getElements(info.id);
		
		supabase
			.channel('public:elements')
			.on('postgres_changes', { event: 'INSERT', schema: 'public' }, (payload) => {
				elements = [...elements, payload.new] as PageElement[]
			})
			.subscribe();

		supabase
			.channel('public:elements')
			.on('postgres_changes', { event: 'DELETE', schema: 'public' }, (payload) => {
				elements = elements.filter((element) => element.id !== payload.old.id);
			})
			.subscribe();
	});

	const screenshotCanvas = () => {}
</script>

<div class="canvas">
	{#if elements}
		{#each elements as element}
			{#if Number(element.pageId) === Number($pageId)}
				<ImgElement {element} />
			{/if}
		{/each}
	{/if}
	<div class="page">
		Page {pageIndex}
	</div>
</div>
<button class="save" on:click={() => screenshotCanvas()}>
	Save
</button>

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
