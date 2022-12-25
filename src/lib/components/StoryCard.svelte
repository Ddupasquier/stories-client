<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { storyToDelete, deleteIsOpen } from '$lib/stores/modalStore';

	export let story: Story;

	export const getPageThumbnail = async () => {
		if (story) {
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
	});
</script>

<div class="container">
	<a href="/story/{story.id}/view">
		<div class="story" style="background-image: url('{url}')">
			<h1>
				{story.title}
			</h1>
		</div>
	</a>
	<div class="controls">
		<a href="/story/edit/{story.id}/{story.pages[0].id}">Edit</a> |
		<span
			class="delete"
			on:click={() => {
				storyToDelete.set(story);
				deleteIsOpen.set(true);
			}}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					storyToDelete.set(story);
					deleteIsOpen.set(true);
				}
			}}>Delete</span
		>
	</div>
</div>

<style lang="scss">
	.container {
		box-shadow: 0 -21px 25px 0 #5a5a5a4b
	}

	.story {
		position: relative;
		border-image: linear-gradient(45deg, purple, orange) 1;
		border-style: solid;
		border-width: 0.5rem 0;
		height: 200px;
		aspect-ratio: 16/7.4;
		background-repeat: no-repeat;
		background-size: contain;
	}

	.controls {
		text-align: center;
		background: rgb(237,240,248);
		padding: 0.5rem;
		border-radius: 0.5rem;
	}

	.delete {
		cursor: pointer;
		color: black;
		&:hover {
			text-decoration: underline;
		}
	}

	h1 {
		position: absolute;
		top: -2.5rem;
		left: -1rem;
		background: purple;
		padding: 0 1rem;
	}
</style>
