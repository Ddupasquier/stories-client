<script lang="ts">
	import { currentPageIndex, currentStoryId, pageId } from '$lib/stores/storyStore';
	import { page } from '$app/stores';
	import { addPage } from '$lib/services/storyActions';
	/** @type {import('./$types').PageData} */
	export let data: PageProps;

	const changePageId = (id: number) => {
		currentPageIndex.set(id);
	};
</script>

<div class="container">
	{#each data.pages as page, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			style={`background: ${page.background}`}
			class="page-selection"
			on:click={() => {
				changePageId(i + 1);
				pageId.set(page.id);
			}}
		/>
	{/each}
	{#if $page.route.id?.includes('/edit')}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="page-selection add-page"
			title="Add Page"
			on:click={() => addPage($currentStoryId, '#000000')}
		>
			+
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		width: 100%;
		height: 8em;
		background: #222;
		color: white;
		overflow-x: auto;
	}

	.page-selection {
		height: 80%;
		aspect-ratio: 16/9;
	}

	.add-page {
		background: rgba(255, 255, 255, 0.2);
		font-size: 500%;
		font-weight: 700;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
