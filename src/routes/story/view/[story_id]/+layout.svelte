<script lang="ts">
	export let data: PagesLayoutProps;
	import Slider from '$lib/components/Slider.svelte';
</script>

<svelte:head>
	<title>{data.pages[0].storyId.title}</title>
	<meta name="description" content="View [this story]" />
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

	form {
		margin: 0;
		padding: 0;
	}

	.title-input {
		font-size: 1.5rem;
		margin: 0;
		font-weight: 800;
		border: none;
		background: none;
		color: var(--color-text);
		&:hover {
			border: none;
			background: rgb(255, 255, 255, 0.4);
			box-shadow: none;
		}
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
