<script lang="ts">
	import { user, id, name } from '$lib/stores/userStore';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import type { AuthSession } from '@supabase/supabase-js';
	import Profile from '$lib/components/profile/Profile.svelte';
	import Auth from '$lib/components/auth/Auth.svelte';
	import StoryCard from '$lib/components/StoryCard.svelte';

	let session: AuthSession | null;
	let stories: Story[] = [];
	let background: string = 'white';

	const getMyStories = async () => {
		const { data, error } = await supabase.from('stories').select('id, title').eq('profileId', $id);

		if (error) {
			throw new Error(error.message);
		} else {
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

		setTimeout(async () => {
			await getMyStories();
		}, 500);
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
			{#if stories.length}
				{#each stories as story}
					<StoryCard {story} />
				{/each}
			{/if}
		</div>
	{/if}
</div>

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
		gap: 2rem;
		width: 100%;
	}
</style>
