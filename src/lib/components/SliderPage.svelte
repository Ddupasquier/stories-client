<script lang="ts">
	import { onMount } from 'svelte';
	import {supabase} from '$lib/supabase';
	import { getPageThumbnail } from '$lib/services/getImages';

	export let page: SliderPageProps['page'];

	let image: { publicUrl: string } | undefined;

	onMount(async () => {
		image = await getPageThumbnail(page.screenshot);

		supabase
			.channel('public:pages')
			.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'pages' }, (payload) => {
				if (payload.new.id === page.id) {
					image = payload.new.screenshot;
				}
			})
			.subscribe();
	});
</script>

<a href="/story/edit/{page.storyId.id}/{page.id}" class="page-selection">
	{#if image}
		<img src={image?.publicUrl} alt="page" class="thumbnail" />
            <div class="page-number">{page.pageNumber}</div>
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
</style>
