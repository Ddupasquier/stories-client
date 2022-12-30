<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { addPage } from '$lib/services/storyActions';

	export let data: PagesLayoutProps;
</script>

<div class="container">
	{#each data.sortedPages as page, i}
		<a
			href="/story/edit/{page.storyId.id}/{page.id}"
			style={`background: ${page.background}`}
			class="page-selection"
		>
			<div class="page-number">
				{i + 1}
			</div>
		</a>
	{/each}
	<button
		class="page-selection add-page"
		title="Add Page"
		on:click={() => addPage(data.sortedPages[0].storyId.id, '#ffffff', data.sortedPages[data.sortedPages.length - 1].pageNumber)}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				addPage(data.sortedPages[0].storyId.id, '#ffffff', data.sortedPages[data.sortedPages.length - 1].pageNumber);
			}
		}}
	>
		+
	</button>
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
		position: relative;
	}

	.page-number {
		position: absolute;
		bottom: 0.5rem;
		right: 0.5rem;
		width: 0.5rem;
		height: 0.5rem;
		padding: 0.5rem;
		background-color: rgba(255, 255, 255, 0.493);
		border-radius: 50%;
		color: rgb(0, 0, 0);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		font-weight: 600;
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
