<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import type { AuthSession } from '@supabase/supabase-js';
	import Profile from '$lib/views/profile/Profile.svelte';
	import Auth from '$lib/views/auth/Auth.svelte';

	let session: AuthSession;

	onMount(() => {
		supabase.auth.getSession().then(({ data }) => {
			session = data.session;
		});

		supabase.auth.onAuthStateChange((_event, _session) => {
			session = _session;
		});
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="stories">
	<div class="container" style="padding: 50px 0 100px 0">
		{#if !session}
			<Auth />
		{:else}
			<Profile {session} />
		{/if}
	</div>
	<!-- {#each data.stories as story}
		<a href="/story/{story.id}">
			<div class="story" style="background: {story.pages[0].background}">
				{#if story.pages[0].elements?.length}
					{#each story.pages[0].elements as element}
						<ImgElement {element} />
					{/each}
				{/if}
				<h1>
					{story.title}
				</h1>
			</div>
		</a>
	{/each} -->
</div>

<style lang="scss">
	.stories {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
		align-self: center;
		width: fit-content;
		gap: 2rem;
	}

	.story {
		border: black solid;
		height: 200px;
		aspect-ratio: 16/9;
	}

	h1 {
		width: 100%;
	}
</style>
