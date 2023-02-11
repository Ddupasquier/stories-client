<script lang="ts">
	import { page } from '$app/stores';
	import About from './About.svelte';
	import Contact from './Contact.svelte';
	import Privacy from './Privacy.svelte';
	import Terms from './Terms.svelte';

	$: topic = $page.url.searchParams.get('topic');
</script>

{#if topic === 'about'}
	<About />
{:else if topic === 'contact'}
	<Contact />
{:else if topic === 'privacy'}
	<Privacy />
{:else if topic === 'terms'}
	<Terms />
{/if}
