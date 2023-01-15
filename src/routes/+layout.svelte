<script lang="ts">
	import { onMount, beforeUpdate } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { signout, getProfile } from '$lib/services/auth';
	import { flipToLandscape } from '$lib/utils';
	import './styles.scss';

	import type { AuthSession } from '@supabase/supabase-js';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	export let data: { session: AuthSession | null };

	beforeUpdate(() => {
		
	});

	onMount(() => {
		getProfile(data.session?.user.id);
		flipToLandscape();
	});
</script>

<div class="app">
	<SvelteToast />
	<Header session={data.session} />
	{#if data.session}
		<button
			type="button"
			on:click={() => {
				supabase.auth.signOut();
				signout();
			}}
			class="button logout"
		>
			Sign Out
		</button>
	{/if}

	<main>
		<slot session={data.session} />
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 4rem;
	}

	.logout {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
</style>
