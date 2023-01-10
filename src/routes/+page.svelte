<script lang="ts">
	import { username } from '$lib/stores/userStore';
	import { deleteIsOpen } from '$lib/stores/modalStore';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import type { AuthSession } from '@supabase/supabase-js';
	import Profile from '$lib/components/profile/Profile.svelte';
	import Auth from '$lib/components/auth/Auth.svelte';
	import StoryCard from '$lib/components/ProfileStoryCard.svelte';
	import DeleteModal from '$lib/components/modals/DeleteModal.svelte';
	import { newStory } from '$lib/services/storyActions';

	let stories: Story[] | null | undefined = [];

	export let data: AuthSession | null = null;

	const getMyStories = async () => {
		if (data?.session) {
			const { data: theseStories, error } = await supabase
				.from('stories')
				.select(
					'id, title, author, updatedAt, isPublic, profileId (id, username, avatarUrl), pages: pages (id, background, screenshot, createdAt, pageNumber)'
				)
				.eq('profileId', data.session.user.id)
				.order('updatedAt', { ascending: false });
			if (error) {
				throw new Error(error.message);
			}

			stories = theseStories;
			return;
		}

		supabase
			.channel('public:stories')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'stories' }, (payload) => {
				if (payload.eventType === 'INSERT') {
					stories = stories?.unshift(payload.new);
				}
				if (payload.eventType === 'DELETE') {
					stories = stories?.filter((story) => story.id !== payload.old.id);
				}
				if (payload.eventType === 'UPDATE') {
					stories = stories?.map((story) => {
						if (story.id === payload.new.id) {
							return payload.new;
						}
						return story;
					});
				}
			})
			.subscribe();
	};

	onMount(() => {
		setTimeout(() => {
			getMyStories();
		}, 500);
	});
</script>

<svelte:head>
	<title>{$username ? `${$username}'s Stories` : 'Stories We Tell'}</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container">
	{#if !data?.session}
		<Auth />
	{:else}
		<div class="responsive-grid">
			<div class="left">
				<Profile session={data?.session} />
			</div>
			<div class="right">
				<div class="buttons-head">
					<button class="button" on:click={() => newStory(data?.session.user.id, $username)}
						>New Story</button
					>
				</div>

				<div class="stories">
					{#if stories}
						{#each stories as story}
							<StoryCard {story} />
						{/each}
					{:else}
						<p>You have no stories yet.</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

{#if $deleteIsOpen}
	<DeleteModal />
{/if}

<style lang="scss">
	.container {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		align-self: center;
		gap: 5rem;
	}

	.buttons-head {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		align-self: center;
		gap: 1rem;
		width: 100%;
		margin-bottom: 2rem;
	}

	.responsive-grid {
		display: grid;
		grid-template-columns: 20rem auto;
		grid-gap: 1rem;
	}

	.left {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}

	.right {
		grid-column: 2 / 3;
		grid-row: 1 / 2;
	}

	// media query 840px wide right appears underneath left
	@media screen and (max-width: 840px) {
		.responsive-grid {
			grid-template-columns: auto;
			grid-template-rows: auto auto;
		}

		.left {
			grid-column: 1 / 2;
			grid-row: 1 / 2;
		}

		.right {
			grid-column: 1 / 2;
			grid-row: 2 / 3;
		}
	}

	.stories {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		align-self: center;
		gap: 3rem;
		width: 100%;
	}
</style>
