<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { page } from '$app/stores';
	import { beforeUpdate, onMount } from 'svelte';
	import { addPage } from '$lib/services/storyActions';
	import SliderPage from './SliderPage.svelte';

	export let data: PagesLayoutProps;

	let lastPage = data.pages[data.pages.length - 1].pageNumber;

	beforeUpdate(async () => {
		supabase
			.channel('public:pages')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'pages' }, (payload) => {
				if (payload.eventType === 'INSERT') {
					data.pages = [...data.pages, payload.new] as Page[];
				}
				if (payload.eventType === 'DELETE') {
					data.pages = data.pages.filter((page) => page.id !== payload.old.id);
				}
				if (payload.eventType === 'UPDATE') {
					data.pages = data.pages.map((page) => {
						if (page.id === payload.new.id) {
							return payload.new;
						}
						return page;
					});
				}
			})
			.subscribe();
	});
</script>

<div class="container">
	{#each data.pages as pageData}
		<SliderPage {pageData} />
	{/each}
	{#if $page.route.id?.includes('edit')}
		<button
			class="page-selection add-page"
			title="Add Page"
			on:click={() => {
				if (lastPage) {
					addPage(data.pages[0].storyId.id, '#ffffff', lastPage);
					lastPage++;
				}
			}}
			on:keydown={(e) => {
				if (e.key === 'Enter' && lastPage) {
					addPage(data.pages[0].storyId.id, '#ffffff', lastPage);
					lastPage++;
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
		height: 6em;
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
		cursor: pointer;
		&:active {
			transform: scale(0.95);
		}
	}
</style>
