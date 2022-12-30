<script lang="ts">
	import { user, id } from '$lib/stores/userStore';
	import { deleteIsOpen } from '$lib/stores/modalStore';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import type { AuthSession } from '@supabase/supabase-js';
	import Profile from '$lib/components/profile/Profile.svelte';
	import Auth from '$lib/components/auth/Auth.svelte';
	import StoryCard from '$lib/components/StoryCard.svelte';
	import DeleteModal from '$lib/components/modals/DeleteModal.svelte';
	import { newStory } from '$lib/services/storyActions';

	let session: AuthSession | null = null;
	let stories: Story[] = [];

	let profileId: string | null;

	id.subscribe((value) => {
		if (value) profileId = value;
	});

	const getMyStories = async () => {
		if (profileId) {
			const { data, error } = await supabase
				.from('stories')
				.select(
					'id, title, author, updatedAt, profileId (id, username, avatarUrl), pages: pages (id, background, screenshot)'
				)
				.eq('profileId', profileId)
				.order('updatedAt', { ascending: false });
			if (error) {
				throw new Error(error.message);
			}

			stories = data;
		}
	};

	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			session = data.session;
		});

		supabase.auth.onAuthStateChange((_event, _session) => {
			session = _session;
		});

		getMyStories();
	});
</script>

<svelte:head>
	<title>{$user ? `${$user}'s Stories` : 'Your stories'}</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container">
	{#if !session}
		<Auth />
	{:else}
		<Profile {session} />
		{#if session.user.id}
			<button class="button" on:click={() => newStory(session?.user.id, $user)}>New Story</button>
		{/if}
		<div class="stories">
			{#if stories.length > 0}
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
