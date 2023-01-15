<script lang="ts">
	import { textInsertIsOpen } from '$lib/stores/modalStore';
	import { fade, scale } from 'svelte/transition';
	import { addText } from '$lib/services/elementActions';
	import ColorPicker from '$lib/components/ColorPicker.svelte';

	export let pageId: number;

	let text: string;
	let color: string = '#000000';
	let size: number = 5;

	const setColor = (fontColor: string) => {
		color = fontColor;
	};

	const handleSubmit = async () => {
		await addText(text, color, size, pageId);
		textInsertIsOpen.set(false);
	};
</script>

<div class="modal-overlay" transition:fade>
	<div class="modal" transition:scale>
		<button class="close" on:click={() => textInsertIsOpen.set(false)}> X </button>
		<br />
		<p>What would you like this to say?</p>
		<br />
		<form on:submit|preventDefault={handleSubmit} class="form">
			<div class="text-color">
				<input type="text" bind:value={text} class="input text-input" />
				<ColorPicker {color} {setColor} labelShown={false}/>
			</div>
			<input type="number" min="1" bind:value={size} class="input number-input" />
			<button type="submit" class="button">Add Text</button>
		</form>
		{#if text}
			<p class="text-preview" style="color: {color}; font-size: {size + 'vw'}">{text}</p>
		{/if}
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
		width: fit-content;
		height: fit-content;
		background-color: rgba(196, 196, 196, 0.98);
		padding: 2rem 1rem;
		border-radius: 0.8rem;
		display: flex;
		flex-direction: column;
		z-index: 1001;
		overflow: auto;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		.text-color {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
			.input {
				width: 80%;
			}
		}
		.number-input {
			width: 90%;
		}
	}

	p {
		font-size: 1.2rem;
		font-weight: 600;
		margin: auto;
	}
</style>
