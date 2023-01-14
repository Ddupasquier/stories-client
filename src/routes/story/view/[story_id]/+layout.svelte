<script lang="ts">
	export let data: PagesLayoutProps;
	import Slider from '$lib/components/Slider.svelte';
</script>

<svelte:head>
	<title>{data.pages[0].storyId.title}</title>
	<meta name="description" content="View {data.pages[0].storyId.title}" />
</svelte:head>

<h2>
	{data.pages[0].storyId.title}
	by {data.pages[0].storyId.profileId.username}
</h2>

<br />
<div class="story-container">
	<slot />
	<Slider {data} />
</div>

<style lang="scss">
	h2 {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 1.5rem;
		margin: 0;
		font-weight: 800;
	}

	.story-container {
		display: flex;
		flex-direction: column;
		border: black solid;
		width: 75vw;
		max-width: 2000px;
		user-select: none;
	}
</style>
