<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: StoryProps;

	import Toolbar from '$lib/components/Toolbar.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import { currentPageId } from '$lib/stores/storyStore';

	const changePageId = (id: number) => {
		currentPageId.set(id);
	};

	changePageId(1);
</script>

<svelte:head>
	<title>{data.story[0]?.title}</title>
	<meta name="description" content="View [this story]" />
</svelte:head>

<h2>
	{data.story[0]?.title} by {data.story[0]?.author}
</h2>
<div class="story-container">
	<Toolbar />
	<slot />
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
