<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { getPageThumbnail } from '$lib/services/getImages';
	import { deletePage } from '$lib/services/pageActions';

	export let pageData: SliderPageProps['page'];

	let image: { publicUrl: string } | undefined;

	onMount(async () => {
		image = await getPageThumbnail(pageData.screenshot);

		supabase
			.channel('public:pages')
			.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'pages' }, (payload) => {
				if (payload.new.id === pageData.id) {
					image = payload.new.screenshot;
				}
			})
			.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'pages' }, (payload) => {
				if (payload.old.id === pageData.id) {
					image = undefined;
				}
			})
			.subscribe();
	});
</script>

<a
	href="/story/{$page.route.id?.includes('edit') ? 'edit' : 'view'}/{$page.params.story_id}/{pageData.id}"
	class="page-selection"
>
	{#if image}
		<img src={image?.publicUrl} alt="page" class="thumbnail" />
		<div class="page-number">{pageData.pageNumber}</div>
		{#if $page.route.id?.includes('edit')}
			<button
				class="delete-page"
				title="Delete Page"
				on:click={() => {
					deletePage(pageData.id);
				}}
			>
				×
			</button>
		{/if}
	{/if}
</a>

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
	.page-selection:hover .delete-page {
		opacity: 1;
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

	.delete-page {
		@include floats;
		top: 0.5rem;
		right: 0.5rem;
		color: rgba(0, 0, 0);
		border: none;
		background: red;
		opacity: 0;
		transition: all 0.2s ease-in-out;
		&:hover {
			transform: scale(1.1);
		}
	}
</style>
