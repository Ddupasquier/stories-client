<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import ImgElement from '$lib/components/editable-true/EditableImgElement.svelte';

	let pageIndex: number;

	import { currentPageIndex, pageId } from '$lib/stores/storyStore';

	currentPageIndex.subscribe((value) => {
		pageIndex = value;
	});

	export let info: PageInfoProps;
	console.log(info)

	let elements: PageElement[] = [];

	const getElements = async () => {
		const { data, error } = await supabase
			.from('elements')
			.select()
			.eq('pageId', info.id);

		if (error) {
			throw new Error(error.message);
		} else {
			return data;
		}
	};

	onMount(async () => {
		elements = await getElements();
	});
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
</style>
