<script lang="ts">
	

	export let data: PagesLayoutProps;

	import Toolbar from '$lib/components/Toolbar.svelte';
	import Slider from '$lib/components/Slider.svelte';
</script>

<svelte:head>
	<title>{data.sortedPages[0].storyId.title}</title>
	<meta name="description" content="View [this story]" />
</svelte:head>

<h2>
	<h2>{data.sortedPages[0].storyId.title} by {data.sortedPages[0].storyId.profileId.username}</h2>
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
		user-select: none;
	}
</style>
