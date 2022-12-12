<script lang="ts">
	import { currentPageId } from '$lib/stores/storyStore';
	/** @type {import('./$types').PageData} */
	export let data: StoryProps;

	const changePageId = (id: number) => {
		currentPageId.set(id);
	};
</script>

<div class="container">
	{#each data.story[0].pages as page, i}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			style={`background: ${page.background}`}
			class="page-selection"
			on:click={() => changePageId(i + 1)}
		/>
	{/each}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		width: 100%;
		height: 8em;
		background: #222;
		color: white;
		overflow-x: auto;
	}

	.page-selection {
		height: 80%;
		aspect-ratio: 16/9;
	}
</style>
