<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';
	import { addPage } from '$lib/services/pageActions';
	import SliderPageEdit from './SliderPageEdit.svelte';

	export let data: PagesLayoutProps;

	let lastPage = data.pages[data.pages.length - 1].pageNumber;

	function isPage(obj: any): obj is Page {
		return (
			obj &&
			typeof obj.id === 'number' &&
			// include checks for all other required properties of Page here...
			true
		);
	}

	beforeUpdate(async () => {
		supabase
			.channel('public:pages')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'pages' }, (payload) => {
				if (payload.eventType === 'INSERT') {
					if (isPage(payload.new)) {
						data.pages = [...data.pages, payload.new];
					}
				}
				if (payload.eventType === 'DELETE') {
					data.pages = data.pages.filter((page) => page.id !== payload.old.id);
				}
				if (payload.eventType === 'UPDATE') {
					data.pages = data.pages.map((page) => {
						if (page.id === payload.new.id && isPage(payload.new)) {
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
		<SliderPageEdit {pageData} />
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
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		height: 7em;
		background: #222;
		color: white;
		overflow-x: scroll;
		overflow-y: hidden;
		padding: 0 1rem;
	}

	.container::-webkit-scrollbar {
		background: rgb(158, 158, 158);
		height: 0.8rem;
	}

	.container::-webkit-scrollbar-thumb {
		background: var(--orange);
		border-radius: 8px;
	}

	.container::-webkit-scrollbar-track-piece:start {
		background: #222;
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
