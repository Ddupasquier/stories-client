<script lang="ts">
	import { onMount } from 'svelte';
	export let data: PagesLayoutProps;
	import Slider from '../SliderView.svelte';
	import { getPageThumbnail } from '$lib/services/getImages';
	import Likes from '$lib/components/Likes.svelte';
	import { metaDescription } from '$lib/constants';
	import { fullScreen } from '$lib/assets';
	import { fullScreenIsOpen } from '$lib/stores/modalStore';
	import FullScreenModal from '$lib/components/modals/FullScreenModal.svelte';

	let previewImage: string | undefined;
	let screenshot: { publicUrl: string } | undefined;

	onMount(() => {
		if (data.pages[0].screenshot) previewImage = data.pages[0].screenshot;

		getPageThumbnail(previewImage).then((res) => {
			screenshot = res;
		});
	});
</script>

<svelte:head>
	<title>{data.pages[0].storyId.title}</title>
	<meta name="description" content="View {data.pages[0].storyId.title}" />
	<meta property="og:title" content={data.pages[0].storyId.title} />
	<meta property="og:description" content={metaDescription} />
	<meta property="og:image" content={screenshot?.publicUrl} />
</svelte:head>

<h2>
	{data.pages[0].storyId.title}
	by {data.pages[0].storyId.profileId.username}
</h2>

<br />
<div class="story-container">
	<button
		class="button full-screen"
		on:click={() => {
			fullScreenIsOpen.set(true);
		}}
	>
		<object type="image/svg+xml" data={fullScreen} title="full screen" />
	</button>
	<slot />
	<Slider {data} />
</div>
<Likes id={data.pages[0].storyId.id} likes={data.pages[0].storyId.likes} />

{#if $fullScreenIsOpen}
	<FullScreenModal>
		<div slot="content">
			<slot />
			<Slider {data} />
		</div>
	</FullScreenModal>
{/if}

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
		position: relative;
		display: flex;
		flex-direction: column;
		border: black solid;
		width: 75vw;
		max-width: 2000px;
		user-select: none;
	}

	.full-screen {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50rem;
		cursor: pointer;
		position: absolute;
		top: -1rem;
		right: -1rem;
		z-index: 1;
		object {
			width: 1.5rem;
			height: 1.5rem;
			pointer-events: none;
		}
	}

	@media only screen and (max-width: 600px) {
		.story-container {
			width: 85vw;
		}
	}
</style>
