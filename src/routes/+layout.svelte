<script lang="ts">
	import {onMount} from 'svelte';
	import { supabase } from '$lib/supabase';
	import type { AuthSession } from '@supabase/supabase-js';
	import Header from './Header.svelte';
	import './styles.scss';
	import { signout, getProfile } from '$lib/services/auth';
	import Footer from './Footer.svelte';

	export let data: { session: AuthSession | null };
	
	onMount(() => {
		getProfile(data.session?.user.id)
	})
	</script>
	
	
	

<div class="app">
	<Header session={data.session}/>
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
		<slot session={data.session}/>
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
