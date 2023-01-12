<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';
	import { truncate } from '$lib/utils';
	import { getPageThumbnail, getThumbnailAvatar } from '$lib/services/getImages';
	import { createLoadObserver } from '$lib/utils';
	import Loading from '$lib/components/Loading.svelte';
	import { avatarPlaceholder } from '$lib/assets';

	export let story: Story | null;
	let sortedDesc: Page[] | undefined = undefined;

	let avatar: { publicUrl: string } | undefined;
	let background: { publicUrl: string } | undefined;
	$: bgUrl = background?.publicUrl;
	$: avatarUrl = avatar?.publicUrl;

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

	onMount(async () => {
		if (sortedDesc) {
			background = await getPageThumbnail(sortedDesc[0].screenshot);
		}
		avatar = await getThumbnailAvatar(story?.profileId.avatarUrl);
	});
</script>

{#if story}
	<div class="container">
		<a href="/story/view/{story.id}/{story.pages[0].id}">
			<div class="story" title={story.title}>
				{#if avatarUrl}
					<img use:onLoad src={avatarUrl} alt={story.title} class="avatar" />
				{:else}
					<img src={avatarPlaceholder} alt="No avatar uploaded" class="avatar"/>
				{/if}

				<div class="banner">
					<h2>
						{truncate(story.title, 15)}
					</h2>
					<h3>
						{truncate(story.author, 30)}
					</h3>
				</div>
				<img src={bgUrl} alt="avatar" class="thumbnail" />
			</div>
		</a>
	</div>
{/if}

<style lang="scss">
	.container {
		box-shadow: 0 -21px 25px 0 #5a5a5a75;
		transition: all 0.2s ease-in-out;
		&:hover {
			transform: scale(1.02);
			box-shadow: 0 -17px 25px 0 #5a5a5a3f;
		}
	}

	.story {
		position: relative;
		border-image: linear-gradient(45deg, purple, orange) 1;
		border-style: solid;
		border-width: 0.5rem 0;
		height: 160px;
		aspect-ratio: 16/7.4;
	}

	.thumbnail {
		width: 100%;
		height: 100%;
		filter: grayscale(100%);
		transition: all 0.4s ease-in-out;
		&:hover {
			filter: grayscale(0%);
		}
	}

	.avatar {
		position: absolute;
		top: -1.9rem;
		left: -2.5rem;
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(139, 139, 139);
	}

	.banner {
		position: absolute;
		top: -1.1rem;
		left: 1.9rem;
		height: fit-content;
		background: purple;
		padding: 0.25rem 1rem;
		z-index: 1;
	}
</style>
