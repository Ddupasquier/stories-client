<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { downloadAvatar } from '$lib/services/getImages';

	import { storyToDelete, deleteIsOpen } from '$lib/stores/modalStore';

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
		// await downloadAvatar(story.profileId?.avatarUrl);
	});
</script>

<div class="container">
	<a href="/story/{story.id}/view">
		<div class="story" style="background: {background}">
			<h1>
				{story.title}
			</h1>
		</div>
	</a>
	{#if $page.route.id === '/'}
		<div class="controls">
			<a href="/story/{story.id}/edit">Edit</a> |
			<!-- svelte-ignore a11y-invalid-attribute -->
			<a
				href=""
				on:click={() => {
					storyToDelete.set(story);
					deleteIsOpen.set(true);
				}}>Delete</a
			>
		</div>
	{/if}
</div>

<style lang="scss">
	.container {
		box-shadow: -5px -5px 25px #5a5a5a, 5px 5px 25px #ffffff;
	}
	.story {
		position: relative;
		border-image: linear-gradient(45deg, purple, orange) 1;
		border-style: solid;
		border-width: 0.5rem 0;
		height: 200px;
		aspect-ratio: 16/9;
	}

	.controls {
		text-align: center;
		background: rgba(199, 199, 199, 0.205);
		padding: 0.5rem;
		border-radius: 0.5rem;
	}

	h1 {
		position: absolute;
		top: -2.5rem;
		left: -1rem;
		background: purple;
		padding: 0 1rem;
	}
</style>
