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

	let session: AuthSession | null;

	interface Story {
		id: number;
		title: string;
		author: string;
		pages: Page[] | null;
		profileId: {
			id: string;
			username: string;
			avatarUrl: string;
		};
	}

	interface Page {
		id: number;
		background: string;
		screenshot: string;
	}

	let stories: Story[] | undefined;

	const getMyStories = async () => {
		if ($id) {
			const { data, error } = await supabase
				.from('stories')
				.select(
					'id, title, author, profileId (id, username, avatarUrl), pages: pages (id, background, screenshot)'
				)
				.eq('profileId', $id);
			if (error) {
				throw new Error(error.message);
			} else {
				stories = data.sort((a, b) => b.id + a.id);
			}
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
		<div class="stories">
			{#if stories !== undefined}
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
