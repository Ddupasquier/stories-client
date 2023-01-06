<script lang="ts">
	import { username, userId } from '$lib/stores/userStore';
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
					'id, title, author, updatedAt, profileId (id, username, avatarUrl), pages: pages (id, background, screenshot, createdAt, pageNumber)'
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
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'stories' },
				(payload) => {
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
				}
				
			)
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
		<Profile session={data?.session} />
		<button class="button" on:click={() => newStory(data?.session.user.id, $username)}
			>New Story</button
		>
		<div class="stories">
			{#if stories}
				{#each stories as story}
					<StoryCard {story} />
				{/each}
			{:else}
				<p>You have no stories yet.</p>
			{/if}
		</div>
	{/if}
</div>

{#if $deleteIsOpen}
	<DeleteModal />
{/if}

<style lang="scss">
	.container {
		display: flex;
		flex-flow: column wrap;
		justify-content: center;
		align-items: center;
		align-self: center;
		gap: 2rem;
		width: 100%;
	}

	.stories {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		align-self: center;
		gap: 5rem;
		width: 100%;
	}
</style>
