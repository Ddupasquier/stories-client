<script lang="ts">
	import SliderPageEdit from './SliderPageView.svelte';

	export let data: PagesLayoutProps;
</script>

<div class="container">
	{#each data.pages as pageData}
		<SliderPageEdit {pageData} />
	{/each}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
		height: 7em;
		background: #222;
		color: white;
		overflow-x: scroll;
		overflow-y: hidden;
		padding: 0 1rem;
	}

	.container::-webkit-scrollbar {
		background: rgb(158, 158, 158);
		height: 0.8rem;
	}

	.container::-webkit-scrollbar-thumb {
		background: var(--orange);
		border-radius: 8px;
	}

	.container::-webkit-scrollbar-track-piece:start {
		background: #222;
	}

	.page-selection {
		height: 80%;
		aspect-ratio: 16/9;
		position: relative;
	}

	.add-page {
		background: rgba(255, 255, 255, 0.2);
		font-size: 500%;
		font-weight: 700;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		&:active {
			transform: scale(0.95);
		}
	}
</style>
