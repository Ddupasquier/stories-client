<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { truncate } from '$lib/utils';

	export let story: Story | null;

	export const getPageThumbnail = async () => {
		if (story?.pages[0].screenshot) {
			const { data: url } = supabase.storage
				.from('page-screenshots')
				.getPublicUrl(story.pages[0].screenshot);
			return url;
		}
	};

	let background: { publicUrl: string } | undefined;
	$: url = background?.publicUrl;

	onMount(() => {
		setTimeout(async () => {
			background = await getPageThumbnail();
		}, 10);

		supabase
			.channel('public:pages')
			.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'pages' }, async (payload) => {
				if (payload.new.story_id === story?.id) {
					background = await getPageThumbnail();
				}
			})
			.subscribe();	
	});
</script>

{#if story}
	<div class="container">
			<a href="/story/view/{story.id}/{story.pages[0].id}">
			<div class="story">
				<h1>
					{truncate(story.title, 15)}
				</h1>
				<img src="{url}" alt="avatar" class="thumbnail" />
			</div>
		</a>
	</div>
{/if}

<style lang="scss">
	.container {
		box-shadow: 0 -21px 25px 0 #5a5a5a4b;
	}

	.story {
		position: relative;
		border-image: linear-gradient(45deg, purple, orange) 1;
		border-style: solid;
		border-width: 0.5rem 0;
		height: 200px;
		aspect-ratio: 16/7.4;
	}

	.thumbnail {
		width: 100%;
		height: 100%;
	}

	h1 {
		position: absolute;
		top: -2.5rem;
		left: -1rem;
		background: purple;
		padding: 0 1rem;
	}
</style>
