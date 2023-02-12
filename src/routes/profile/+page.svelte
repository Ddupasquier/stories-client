<script lang="ts">
	import { username } from '$lib/stores/userStore';
	import { deleteIsOpen } from '$lib/stores/modalStore';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import type { AuthSession } from '@supabase/supabase-js';
	import Profile from '$lib/components/profile/Profile.svelte';
	import Auth from '$lib/components/auth/Auth.svelte';
	import StoryCard from '$lib/components/ProfileStoryCard.svelte';
	import DeleteModal from '$lib/components/modals/DeleteModal.svelte';
	import { newStory } from '$lib/services/storyActions';
	import { sortSwitch } from '$lib/utils';
	import { domainName } from '../../lib/constants';

	let stories: Story[] | undefined = [];
	let filterTerm: string = '';
	let sortTerm: string = 'updatedAt';
	let order: string = 'desc';

	$: filteredStories = stories?.filter((story) =>
		story.title.toLowerCase().includes(filterTerm.toLowerCase())
	) as Story[];

	$: sortedStories = sortSwitch(filteredStories, sortTerm, order as 'desc' | 'asc') as Story[];

	export let data: AuthSession | null = null;


	// * TODO: Move client side fetches to SSR (+page.ts)
	const getMyStories = async () => {
		if (data?.session) {
			const { data: theseStories, error } = await supabase
				.from('stories')
				.select(
					'id, title, author, updatedAt, createdAt, isPublic, profileId (id, username, avatarUrl), pages: pages (id, background, screenshot, createdAt, pageNumber)'
				)
				.eq('profileId', data.session.user.id)
				.order('updatedAt', { ascending: true });
			if (error) {
				throw new Error(error.message);
			}
			stories = theseStories;
		}

		supabase
			.channel('public:stories')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'stories' }, (payload) => {
				if (payload.eventType === 'DELETE') {
					stories = stories?.filter((story) => story.id !== payload.old.id);
				}
				if (payload.eventType === 'UPDATE') {
					stories = stories?.map((story) => {
						if (story.id === payload.new.id) {
							return payload.new;
						}
						return story;
					});
				}
			})
			.subscribe();
	};

	onMount(() => {
		getMyStories();
	});

	
	$: setTitle = () => {
		if (typeof $username !== 'undefined' && $username !== '[Object Object]') {
			return `${$username}'s Stories`;
		} else {
			return domainName;
		}
	};
</script>

<svelte:head>
	<title>{setTitle()}</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="container">
	{#if !data?.session}
		<Auth />
	{:else}
		<div class="responsive-grid">
			<div class="left">
				<Profile session={data?.session} />
			</div>
			<div class="right">
				<div class="stories">
					<div class="buttons-head">
						<div class="sortfilter">
							<div>
								<input
									type="text"
									placeholder="Search"
									bind:value={filterTerm}
									class="input search"
								/>
							</div>
							<div>
								<select bind:value={sortTerm} class="input">
									<option value="updatedAt">Recently Updated</option>
									<option value="createdAt">Date Created</option>
									<option value="title">A-Z</option>
								</select>
								<button
									class="button ascdesc"
									on:click={() => (order = order === 'asc' ? 'desc' : 'asc')}
									>{order === 'asc' ? '⬇' : '⬆'}</button
								>
							</div>
							<button class="button" on:click={() => newStory(data?.session.user.id, $username)}
								>New Story</button
							>
						</div>
					</div>
					{#if stories}
						{#each sortedStories as story}
							<StoryCard {story} />
						{/each}
					{:else}
						<p>You have no stories yet.</p>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

{#if $deleteIsOpen}
	<DeleteModal />
{/if}

<style lang="scss">
	.container {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		align-self: center;
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
			div {
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}
		}

		.ascdesc {
			text-align: center;
			width: 2rem;
			height: 2rem;
			padding: 0;
		}
	}

	.responsive-grid {
		display: grid;
		grid-template-columns: 20rem auto;
		grid-gap: 3rem;
	}

	.left {
		grid-column: 1 / 2;
		grid-row: 1 / 2;
	}

	.right {
		grid-column: 2 / 3;
		grid-row: 1 / 2;
	}

	@media screen and (max-width: 840px) {
		.responsive-grid {
			grid-template-columns: auto;
			grid-template-rows: auto auto;
		}

		.left {
			grid-column: 1 / 2;
			grid-row: 1 / 2;
		}

		.right {
			grid-column: 1 / 2;
			grid-row: 2 / 3;
		}
	}

	@media (max-width: 670px) {
		.buttons-head {
			width: 80%;
			.sortfilter {
				flex-direction: column;
				justify-content: center;
				width: 100%;
				div {
					display: flex;
					align-items: center;
					gap: 0.5rem;
					width: 100%;
					select {
						width: 100%;
					}
				}
				.search {
					width: 93%;
				}
			}
		}
	}

	.stories {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		align-items: center;
		align-self: center;
		gap: 3rem;
	}
</style>
