<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { fullScreenIsOpen } from '$lib/stores/modalStore';
	import { fullScreen } from '$lib/assets';
	import { detectDevice } from '$lib/utils';

	$: isMobile = false;

	onMount(() => {
		isMobile = detectDevice();
	});

	afterUpdate(() => {
		isMobile = detectDevice();
	});
</script>

<div class="modal-overlay" transition:fade>
	<div class={isMobile ? 'modal-mobile' : 'modal'} transition:scale>
		<button
			class="button full-screen"
			on:click={() => {
				fullScreenIsOpen.set(false);
			}}
		>
			<object type="image/svg+xml" data={fullScreen} title="full screen" />
		</button>
		<div class="modal-body">
			<slot name="content" />
		</div>
	</div>
</div>

<style lang="scss">
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal {
		position: relative;
		width: 100%;
		height: fit-content;
		display: flex;
		flex-direction: column;
		z-index: 1001;
		overflow: hidden;
		.modal-body {
			flex: 1;
			overflow-y: auto;
		}
	}

	.full-screen {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50rem;
		cursor: pointer;
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 1;
		object {
			width: 1.5rem;
			height: 1.5rem;
			pointer-events: none;
		}
	}

	@media (orientation: landscape) {
		.modal-mobile {
			position: fixed;
			top: 0;
			width: calc(100vh * 16 / 9);
			height: 100vh;
		}
	}

	@media (orientation: portrait) {
		.modal-mobile {
			position: relative;
			width: 100%;
			height: fit-content;
			display: flex;
			flex-direction: column;
			z-index: 1001;
			.modal-body {
				flex: 1;
				overflow-y: auto;
			}
		}
	}
</style>
