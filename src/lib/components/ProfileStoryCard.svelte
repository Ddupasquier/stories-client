<script lang="ts">
	import { onMount, beforeUpdate } from 'svelte';
	import { storyToDelete, deleteIsOpen } from '$lib/stores/modalStore';
	import { truncate } from '$lib/utils';
	import { getPageThumbnail } from '$lib/services/getImages';

	export let story: Story | null;
	let sortedDesc: Page[] | undefined = undefined;

	let background: { publicUrl: string } | undefined;
	$: url = background?.publicUrl;

	beforeUpdate(() => {
		if (story?.pages) {
			sortedDesc = story.pages.sort((a, b) => {
				if (a.pageNumber && b.pageNumber) {
					if (a.pageNumber > b.pageNumber) {
						return 1;
					}
					if (a.pageNumber < b.pageNumber) {
						return -1;
					}
					return 0;
				}
				return 0;
			});
		}
	});

	onMount(() => {
		setTimeout(async () => {
			if (sortedDesc) {
				background = await getPageThumbnail(sortedDesc[0].screenshot);
			}
		}, 10);
	});
</script>

{#if story && sortedDesc}
	<div class="container">
		<a href="/story/view/{story.id}/{sortedDesc[0].id}">
			<div class="story">
				<h1>
					{truncate(story.title, 15)}
				</h1>
				<img src={url} alt="avatar" class="thumbnail" />
			</div>
		</a>
		<div class="controls">
			{#if story?.pages}
				<a href="/story/edit/{story.id}/{sortedDesc[0].id}">Edit</a> |
			{/if}
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

	.controls {
		text-align: center;
		background: rgb(237, 240, 248);
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
