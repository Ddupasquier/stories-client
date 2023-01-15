<script lang="ts">
	import StoryCard from '$lib/components/BrowseStoryCard.svelte';
	export let data: Stories;

	interface Stories {
		stories: Story[];
	}

</script>

<div class="stories">
	{#if data}
		{#each data.stories as story}
			<StoryCard {story} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.stories {
		display: flex;
		flex-flow: row wrap;
		justify-content:center;
		align-items: center;
		align-self: center;
		gap: 4rem;
		width: 100%;
	}
</style>
