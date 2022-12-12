<script lang="ts">
	export let data: any = [];

	import LoginForm from '$lib/components/LoginForm.svelte';
	import ImgElement from '$lib/components/ImgElement.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<LoginForm />

<div class="stories">
	{#each data.stories as story}
		<a href="/story/{story.id}">
			<div class="story" style="background: {story.pages[0].background}">
				<!-- {#if story.pages[0].elements?.length}
					{#each story.pages[0].elements as element}
						<ImgElement {element} />
					{/each}
				{/if} -->
				<h1>
					{story.title}
				</h1>
			</div>
		</a>
	{/each}
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
