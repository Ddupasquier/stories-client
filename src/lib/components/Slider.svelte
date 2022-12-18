<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { currentPageIndex, pageId } from '$lib/stores/storyStore';
	import { page } from '$app/stores';
	import { addPage } from '$lib/services/storyActions';
	/** @type {import('./$types').PageData} */
	export let data: PageProps;
	// $: pages = data.pages;

	const changePageId = (id: number) => {
		currentPageIndex.set(id);
	};

	// onMount(async () => {
	// 	supabase
	// 		.channel('public:pages')
	// 		.on('postgres_changes', { event: 'INSERT', schema: 'public' }, (payload) => {
	// 			pages = [...pages, payload.new] as PageProps[];
	// 		})
	// 		.subscribe();
	// });
</script>

<div class="container">
	{#each data.pages as page, i}
		<div
			style={`background: ${page.background}`}
			class="page-selection"
			on:click={() => {
				changePageId(i + 1);
				pageId.set(page.id);
			}}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					changePageId(i + 1);
					pageId.set(page.id);
				}
			}}
		/>
	{/each}
	{#if $page.route.id?.includes('/edit')}
		<button
			class="page-selection add-page"
			title="Add Page"
			on:click={() => addPage(data.pages[0].storyId.id, '#ffffff')}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					addPage(data.pages[0].storyId.id, '#ffffff');
				}
			}}
		>
			+
		</button>
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
