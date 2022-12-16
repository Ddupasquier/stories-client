<script lang="ts">
	import { supabase } from '$lib/supabase';
	import Header from './Header.svelte';
	import './styles.scss';
</script>

<div class="app">
	<Header />
	<button type="button" on:click={() => supabase.auth.signOut()} class="button logout">
		Sign Out
	</button>

	<main>
		<slot />
	</main>

	<footer>Dylan and Ramiro are pretty cool</footer>
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

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	.logout {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	/* footer a {
		font-weight: bold;
	} */

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
