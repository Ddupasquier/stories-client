<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { getProfile } from '$lib/services/auth';
	import { detectDevice } from '$lib/utils';
	import './styles.scss';

	import type { AuthSession } from '@supabase/supabase-js';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Analytic from '$lib/components/Analytic.svelte';

	export let data: { session: AuthSession | null };

	$: isMobile = false;

	onMount(() => {
		getProfile(data.session?.user.id);
		isMobile = detectDevice();
	});

	afterUpdate(() => {
		if (isMobile) {
			document.body.classList.add('mobile');
		} else {
			document.body.classList.remove('mobile');
		}
	});
</script>

<Analytic />

<div class="app">
	<SvelteToast />

	<Header session={data.session} />
	

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

	@media (max-width: 600px) {
		main {
			padding: 1rem 0rem;
		}
	}
</style>
