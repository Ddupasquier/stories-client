<script lang="ts">
	import Canvas from '$lib/components/Canvas.svelte';
	import { currentPageId } from '$lib/stores/storyStore';

	let pageIndex: number;

	currentPageId.subscribe((value) => {
		pageIndex = value - 1;
	});

	export let data: PageProps;
</script>

<div style="background: {data.pages[pageIndex].background}">
	<Canvas info={data.pages[pageIndex]} />
</div>

<style lang="scss">
	div {
		width: 100%;
		height: 100%;
	}
</style>
