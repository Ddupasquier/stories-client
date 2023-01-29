<script lang="ts">
	import { onMount } from 'svelte';
	import { getPageThumbnail } from '$lib/services/getImages';
	import { currentPage } from '$lib/stores/viewStore';

	export let pageData: SliderPageProps['page'];

	let image: { publicUrl: string } | undefined;

	onMount(async () => {
		image = await getPageThumbnail(pageData.screenshot);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="page-selection" on:click={() => currentPage.set(image?.publicUrl)}>
	{#if pageData}
		{#if image}
			<img src={image?.publicUrl} alt="page" class="thumbnail" />
		{/if}
		<div class="page-number">{pageData.pageNumber}</div>
	{/if}
</div>

<style lang="scss">
	.thumbnail {
		width: 100%;
		height: 100%;
	}

	.page-selection {
		height: 80%;
		aspect-ratio: 16/9;
		position: relative;
		background: white;
		&:active {
			transform: scale(0.95);
		}
	}

	@mixin floats {
		position: absolute;
		width: 0.5rem;
		height: 0.5rem;
		padding: 0.5rem;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		font-weight: 600;
	}

	.page-number {
		@include floats;
		bottom: 0.5rem;
		right: 0.5rem;
		background-color: rgba(255, 255, 255, 0.493);
		color: rgb(0, 0, 0);
	}
</style>
