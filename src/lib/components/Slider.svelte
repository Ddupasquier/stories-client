<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { addPage } from '$lib/services/storyActions';
	import SliderPage from './SliderPage.svelte';

	export let data: PagesLayoutProps;

	onMount(() => {
		supabase
			.channel('public:elements')
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pages' }, (payload) => {
				console.log('insert');
				data.pages = [...data.pages, payload.new] as Page[];
			})
			.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'pages' }, (payload) => {
				data.pages = data.pages.filter((page) => page.id !== payload.old.id);
			})
			.subscribe();
	});
</script>

<div class="container">
	{#each data.pages as page}
		<SliderPage {page} />
	{/each}
	<button
		class="page-selection add-page"
		title="Add Page"
		on:click={() =>
			addPage(data.pages[0].storyId.id, '#ffffff', data.pages[data.pages.length - 1].pageNumber)}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				addPage(data.pages[0].storyId.id, '#ffffff', data.pages[data.pages.length - 1].pageNumber);
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
		overflow-y: hidden;
	}

	.page-selection {
		height: 80%;
		aspect-ratio: 16/9;
		position: relative;
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
