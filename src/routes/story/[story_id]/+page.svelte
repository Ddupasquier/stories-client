<script lang="ts">
	import { currentPageId } from '$lib/stores/storyStore';

	let pageIndex: number;

	currentPageId.subscribe((value) => {
		pageIndex = value - 1;
	});

	/** @type {import('./$types').PageData} */
	export let data: PageProps;
	console.log(data);
</script>

<div style="background: {data.story.pages[pageIndex].background}">
	{data.story.pages[pageIndex].background}
</div>

<style lang="scss">
	div {
		width: 100%;
		height: 100%;
	}
</style>
