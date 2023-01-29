<script lang="ts">
	import { onMount } from 'svelte';
	export let data: PagesLayoutProps;
	import Slider from '$lib/components/Slider.svelte';
	import { getPageThumbnail } from '$lib/services/getImages';

	let previewImage: string | undefined;
	let screenshot: { publicUrl: string } | undefined;

	onMount(() => {
		previewImage = data.pages[0].screenshot;

		getPageThumbnail(previewImage).then((res) => {
			screenshot = res;
		});
	});
</script>

<svelte:head>
	<title>{data.pages[0].storyId.title}</title>
	<meta name="description" content="View {data.pages[0].storyId.title}" />
	<meta property="og:title" content="{data.pages[0].storyId.title}" />
	<meta property="og:description" content="View {data.pages[0].storyId.title}" />
	<meta property="og:image" content="{screenshot?.publicUrl}" />
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

	@media only screen and (max-width: 600px) {
		.story-container {
			width: 95vw;
		}
	}
</style>
