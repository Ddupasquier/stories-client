<script lang="ts">
	import { storyToDelete, deleteIsOpen } from '$lib/stores/modalStore';
	import { deleteStory } from '$lib/services/storyActions';
	import LoadSpinner from '../Loading.svelte';
	import { fade, scale } from 'svelte/transition';
	import {Close} from '$lib/assets';

	let loading: boolean = false;
</script>

<div class="modal-overlay" transition:fade>
	<div class="modal" transition:scale>
		{#if loading}
			<LoadSpinner />
		{:else}
			<button class="close" on:click={() => deleteIsOpen.set(false)}><Close color={"black"}/></button>
			<br />
			<h2>
				Are you sure you want to delete <span>
					{$storyToDelete?.title}
				</span>?
			</h2>
			<br />
			<button
				class="agree"
				on:click={() => {
					loading = true;
					deleteStory($storyToDelete?.id);
					setTimeout(() => {
						loading = false;
						deleteIsOpen.set(false);
					}, 1000);
				}}
			>
				Yes
			</button>
		{/if}
	</div>
</div>

<style lang="scss">
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal {
		position: relative;
		background-color: #fff;
		padding: 2rem 1rem;
		border-radius: 0.5rem;
		max-width: 400px;
		text-align: center;
	}

	.agree {
		background-color: #ff3e00;
		color: #fff;
		font-weight: 600;
		font-size: 1.2rem;
		border: none;
		padding: 0.8rem 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	span {
		color: #ff3e00;
	}
</style>
