<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import ImgElement from '$lib/components/ImgElement.svelte';

	let pageIndex: number;
	import { currentPageId } from '$lib/stores/storyStore';

	currentPageId.subscribe((value) => {
		pageIndex = value;
	});

	export let info: PageInfoProps;

	let elements: PageElement[] = []

	const getElements = async () => {
		const { data, error } = await supabase.from('elements').select().eq('pageId', info.storyId.id - 1);

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
			<ImgElement {element} />
		{/each}
	{/if}
	Page {pageIndex}
</div>

<style lang="scss">
	.canvas {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
