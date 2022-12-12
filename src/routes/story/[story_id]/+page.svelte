<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import { currentPageId, currentStory } from '$lib/stores/storyStore';

	let pageIndex: number;

	currentPageId.subscribe((value) => {
		pageIndex = value - 1;
	});

	/** @type {import('./$types').PageData} */
	export let data: PageProps;

	currentStory.set(data.story[0]);
</script>

<div style="background: {data.story[0]?.pages[pageIndex].background}">
	<Canvas info={data.story[0]?.pages[pageIndex]} />
</div>

<style lang="scss">
	div {
		width: 100%;
		height: 100%;
	}
</style>
