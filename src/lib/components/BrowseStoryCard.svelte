<script lang="ts">
	import { beforeUpdate, onMount, afterUpdate } from 'svelte';
	import { truncate } from '$lib/utils';
	import { getPageThumbnail, getThumbnailAvatar } from '$lib/services/getImages';
	import { createLoadObserver } from '$lib/utils';
	import Loading from '$lib/components/Loading.svelte';
	import { avatarPlaceholder } from '$lib/assets';
	import Likes from './Likes.svelte';

	export let story: Story | null;
	let sortedDesc: Page[] | null = null;

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

	const doImages = async () => {
		if (sortedDesc) {
			background = await getPageThumbnail(sortedDesc[0].screenshot);
		}
		avatar = await getThumbnailAvatar(story?.profileId.avatarUrl);
	};

	onMount(async () => {
		doImages();
	});

	afterUpdate(() => {
		setTimeout(async () => {
			await doImages();
		}, 4);
	});
</script>

{#if story}
	<div class="container">
		<div style="visibility: {loading ? 'hidden' : 'visible'}">
			<div class="header">
				{#if avatarUrl}
					<img src={avatarUrl} alt={story.title} class="avatar" loading="lazy" />
				{:else}
					<img src={avatarPlaceholder} alt="No avatar uploaded" class="avatar" />
				{/if}
				<div>
					<h2>
						{truncate(story.title, 15)}
					</h2>
					<h3>
						{truncate(story.author, 30)}
					</h3>
				</div>
			</div>
			<a href="/story/view/{story.id}">
				<div class="story" title={story.title}>
					<img src={bgUrl} alt="avatar" class="thumbnail" use:onLoad loading="lazy" />
				</div>
			</a>
			<div class="footer"><Likes likes={story.likes} id={story.id} /></div>
		</div>
		<div class="loading" style="display: {!loading ? 'none' : 'flex'}">
			<Loading />
		</div>
	</div>
{/if}

<style lang="scss">
	.container {
		filter: drop-shadow(0 -10px 20px #5a5a5a75);
		transition: all 0.2s ease-in-out;
		&:hover {
			filter: drop-shadow(0 -17px 25px #5a5a5a3f);
		}
	}

	.story {
		position: relative;
		height: 160px;
		aspect-ratio: 16/7.4;
		transition: all 0.5s;
	}

	.header {
		display: flex;
		background: rgb(237, 240, 248);
		padding: 0.5rem;
		border-radius: 0.5rem 0.5rem 0 0;
		font-size: 20px;
		font-weight: 600;
		div {
			text-align: left;
			align-self: center;
			margin-left: 0.5rem;
		}
	}

	.thumbnail {
		width: 100%;
		height: 100%;
		filter: grayscale(100%);
		transition: all 0.2s ease-in-out;
		&:hover {
			filter: grayscale(0%);
			transform: scale(1.05);
		}
	}

	.footer {
		text-align: center;
		background: rgb(237, 240, 248);
		padding: 0.5rem;
		border-radius: 0 0 0.5rem 0.5rem;
	}

	.avatar {
		// position: absolute;
		// top: 0.28rem;
		// right: 0.28rem;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgb(139, 139, 139);
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

	@media only screen and (max-width: 800px) {
		.story {
			height: 100px;
		}
		.banner {
			left: 1.1rem;
			h2 {
				font-size: 1rem;
			}
			h3 {
				font-size: 0.8rem;
			}
		}
		.avatar {
			top: -1.5rem;
			left: -1.5rem;
			width: 3.5rem;
			height: 3.5rem;
		}
	}
</style>
