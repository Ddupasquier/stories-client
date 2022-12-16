<script lang="ts">
	import { currentStory, currentPageIndex } from '$lib/stores/storyStore';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import Loading from '$lib/components/Loading.svelte';

	export let element: PageElement;

	const getElement = async () => {
		const { data } = supabase.storage.from('svg-assets').getPublicUrl(element.elementName);
		return data;
	};

	let image: { publicUrl: string };
	let loading = true;

	onMount(async () => {
		image = await getElement();

		setTimeout(() => {
			loading = false;
		}, 1000);
	});

	let story: object;
	let page: number;

	currentStory.subscribe((value) => {
		story = value;
	});

	currentPageIndex.subscribe((value) => {
		page = value;
	});
</script>

<div
	class="canvas-element"
	style="position: absolute; top: {element.y + '%'}; left: {element.x +
		'%'}; z-index: {element.zIndex}; height: {element.size + '%'};"
>
	{#if loading}
		<Loading />
	{/if}
	{#if image && !loading}
		<img src={image.publicUrl} alt={element.elementName} draggable="false" />
	{/if}
</div>

<style lang="scss">
	.canvas-element {
		width: fit-content;
		aspect-ratio: 1.1;
		user-select: none;
		img {
			width: 100%;
			height: 100%;
			user-select: none;
		}
	}
</style>
