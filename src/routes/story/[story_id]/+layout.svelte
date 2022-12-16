<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: PageProps;

	import Toolbar from '$lib/components/Toolbar.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import { currentPageIndex } from '$lib/stores/storyStore';

	const changePageId = (id: number) => {
		currentPageIndex.set(id);
	};

	changePageId(1);
</script>

<svelte:head>
	<title>{data.pages[0].storyId.title}</title>
	<meta name="description" content="View [this story]" />
</svelte:head>

<h2>
	<!-- {data.story[0]?.title} by {data.story[0]?.author} -->
</h2>
<div class="story-container">
	<Toolbar />
	<slot {data} />
	<Slider {data} />
</div>

<!-- <button class="save" on:click={() => saveChanges()}>SAVE</button> -->
<style lang="scss">
	h2 {
		font-size: 1.5rem;
		margin: 0;
		font-weight: 800;
	}

	.story-container {
		display: flex;
		flex-direction: column;
		border: black solid;
		aspect-ratio: 16/9;
		width: 90vw;
		user-select: none;
	}
</style>
