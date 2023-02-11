<script lang="ts">
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	import { storyToDelete, deleteIsOpen } from '$lib/stores/modalStore';
	import { createLoadObserver, truncate } from '$lib/utils';
	import { getPageThumbnail } from '$lib/services/getImages';
	import Loading from './Loading.svelte';

	export let story: Story | null;
	let sortedDesc: Page[] | undefined = undefined;

	let background: { publicUrl: string } | undefined;
	$: url = background?.publicUrl;
	$: isPublic = story?.isPublic;

	let loading = true;

	const onLoad = createLoadObserver(() => {
		loading = false;
	});

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

	const doImages = async () => {
		if (sortedDesc) {
			background = await getPageThumbnail(sortedDesc[0].screenshot);
		}
	};

	onMount(async () => {
		doImages();
	});

	afterUpdate(() => {
		setTimeout(async () => {
			doImages();
		}, 10);
	});
</script>

{#if story && sortedDesc}
	<div class="container">
		<div style="visibility: {loading ? 'hidden' : 'visible'}">
			<div class="header">{truncate(story.title, 15)}</div>
			<a href="/story/view/{story.id}">
				<div class="story" title={story.title}>
					<div class="published-icon" title={isPublic ? 'Published' : 'Not Published'}>
						<svg
							fill={isPublic ? 'green' : 'red'}
							width="30px"
							height="30px"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							class="publish"
						>
							<path
								d="M17 26c0 0 6.188-2.062 11 1.812 0-0.062 0-1.812 0-1.812-5.625-3.125-11 0-11 0zM2 6v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938v-19.625c0 0-2.688-2.25-6.5-2.25s-6.5 2-6.5 2zM4 8h4v5h-4v-5zM13 21h-9v-1h9v1zM13 19h-9v-1h9v1zM13 17h-9v-1h9v1zM13 15h-9v-1h9v1zM9 8h4v1h-4v-1zM9 10h4v1h-4v-1zM9 12h4v1h-4v-1zM22.5 4c-3.812 0-6.5 2-6.5 2v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938v-19.625c0 0-2.688-2.25-6.5-2.25zM27 21h-9v-1h9v1zM27 19h-9v-1h9v1zM27 17h-9v-1h9v1zM27 15h-9v-1h9v1zM27 13h-9v-1h9v1zM27 11h-9v-1h9v1zM27 9h-9v-1h9v1zM3 26c0 0 0 1.75 0 1.812 4.812-3.874 11-1.812 11-1.812s-5.375-3.125-11 0z"
							/>
						</svg>
					</div>
					{#if url && !loading}
						<img src={url} alt="avatar" class="thumbnail" use:onLoad loading="lazy" />
					{:else}
						<img
							src="https://via.placeholder.com/433x200.png/000000/?text=No+Saved+Thumbnail"
							alt="placeholder"
							class="thumbnail"
							use:onLoad
							loading="lazy"
						/>
					{/if}
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

		<div class="loading" style="display: {!loading ? 'none' : 'flex'}">
			<Loading />
		</div>
	</div>
{/if}

<style lang="scss">
	.container {
		filter: drop-shadow(0 -15px 20px #5a5a5a75);
	}

	.story {
		position: relative;
		width: 20rem;
		height: 9rem;
		transition: all 0.5s;
	}

	.header {
		text-align: center;
		background: rgb(237, 240, 248);
		padding: 0.5rem;
		border-radius: 0.5rem 0.5rem 0 0;
		font-size: 20px;
		font-weight: 600;
	}

	.thumbnail {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.controls {
		text-align: center;
		background: rgb(237, 240, 248);
		padding: 0.5rem;
		border-radius: 0 0 0.5rem 0.5rem;
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

	.published-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		padding: 0.25rem;
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
	}

	.loading {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media only screen and (max-width: 848px) {
		.story {
			width: 75vw;
			height: 33vw;
		}
	}
</style>
