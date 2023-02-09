<script lang="ts">
	import { howToIsOpen } from '$lib/stores/modalStore';
	import { fade, scale } from 'svelte/transition';
	import { Close } from '$lib/assets';
</script>

<div class="modal-overlay" transition:fade>
	<div class="modal" transition:scale>
		<div class="header">
			<button class="close" on:click={() => howToIsOpen.set(false)}><Close /></button>
		</div>
		<div class="modal-body">
			<!-- <p>
				While in development, you may need to refresh the page if certain actions are not appearing
				on command. This is an ongoing issue and I am working to fix it.
			</p> -->
			<ul>
				<li>
					To change your title, click on the title above your canvas, type the desired title, and
					press enter
				</li>
				<li>Click on an image in the toolbar to add it to your page</li>
				<li>Drag and drop your image to reposition it</li>
				<li>Right-click on an image to open the control menu</li>
				<li>The color picker at the top right will change your page color</li>
				<li>Click on the "Save" button to save your page</li>
				<li>Click the book in the top right of your canvas to make your story public!</li>
				<li>Click the "+" button at the bottom to add a page</li>
			</ul>
		</div>
	</div>
</div>

<style lang="scss">
	.modal-overlay {
		position: absolute;
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
		width: 100%;
		height: fit-content;
		max-width: 650px;
		background-color: var(--color-bg-2);
		padding: 2rem 1rem;
		border-radius: 0.8rem;
		display: flex;
		flex-direction: column;
		z-index: 1001;
		overflow: hidden;
		.header {
			margin-bottom: 1rem;
		}
		.modal-body {
			flex: 1;
			overflow-y: auto;
		}
	}

	ul {
		font-size: 1.2rem;
		font-weight: 600;
	}

	li {
		margin: 0.8rem;
	}
</style>
