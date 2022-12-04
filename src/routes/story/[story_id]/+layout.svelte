<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data: StoryProps;

	import Toolbar from '$lib/components/Toolbar.svelte';
	import Slider from '$lib/components/Slider.svelte';
</script>

<svelte:head>
	<title>{data.story.title}</title>
	<meta name="description" content="View [this story]" />
</svelte:head>

<h2>
	{data.story.title} by {data.story.author}
</h2>
<div class="story-container">
	<Toolbar />
	<slot />
	<Slider {data} />
</div>

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
	}
</style>
