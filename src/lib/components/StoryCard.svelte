<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	export let story: Story;

	let background: string = '';

	const getFirstPageBackground = async (thisId: number) => {
		const { data, error } = await supabase
			.from('pages')
			.select('background')
			.eq('storyId', thisId)
			.limit(1);

		if (error) {
			throw new Error(error.message);
		} else {
			background = data[0].background;
		}
	};

	onMount(async () => {
		await getFirstPageBackground(story.id);
	});
</script>

<a href="/story/{story.id}">
	<div class="story" style="background: {background}">
		<!-- {#if story.pages[0].elements?.length}
								{#each story.pages[0].elements as element}
									<ImgElement {element} />
								{/each}
							{/if} -->
		<h1>
			{story.title}
		</h1>
	</div>
</a>

<style lang="scss">
	.story {
		border: black solid;
		height: 200px;
		aspect-ratio: 16/9;
	}

	h1 {
		width: 100%;
	}
</style>
