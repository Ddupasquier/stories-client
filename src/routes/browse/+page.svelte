<script lang="ts">
	import StoryCard from '$lib/components/BrowseStoryCard.svelte';
	import { sortSwitch } from '$lib/utils';

	let filterTerm: string = '';
	let sortTerm: string = 'updatedAt';
	let order: string = 'desc';

	export let data: Stories;

	interface Stories {
		stories: Story[];
	}

	$: filteredStories = data?.stories.filter((story) =>
		story.title.toLowerCase().includes(filterTerm.toLowerCase())
	);

	$: sortedStories = sortSwitch(filteredStories, sortTerm, order as 'desc' | 'asc');
</script>

<div class="stories">
	<div class="buttons-head">
		<div class="sortfilter">
			<input type="text" placeholder="Search" bind:value={filterTerm} class="input search" />
			<select bind:value={sortTerm} class="input">
				<option value="updatedAt">Recently Updated</option>
				<option value="createdAt">Date Created</option>
				<option value="title">A-Z</option>
			</select>
			<button class="button ascdesc" on:click={() => (order = order === 'asc' ? 'desc' : 'asc')}
				>{order === 'asc' ? '⬇' : '⬆'}</button
			>
		</div>
	</div>
	{#if data}
		{#each sortedStories as story}
			<StoryCard {story} />
		{/each}
	{/if}
</div>

<style lang="scss">
	.stories {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		align-self: center;
		gap: 4rem;
		width: 100%;
	}

	.buttons-head {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-end;
		align-items: center;
		align-self: center;
		gap: 1rem;
		width: 100%;
		padding: 0.7rem 1rem;
		background: var(--color-bg-2);
		border-radius: 5px;
		.sortfilter {
			display: flex;
			flex-flow: row;
			align-items: center;
			align-self: center;
			gap: 0.5rem;
		}

		.ascdesc {
			text-align: center;
			width: 2rem;
			height: 2rem;
			padding: 0;
		}
	}
</style>
