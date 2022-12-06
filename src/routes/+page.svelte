<script lang="ts">
	import { fakerStories } from '$lib/placeholderData';
	import LoginForm from '$lib/components/LoginForm.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<LoginForm />
<section>
	{#each fakerStories as story}
		<a href="/story/{story.id}">
			<h1>{story.title}</h1>
			<p>{story.author}</p>
		</a>
	{/each}
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
