<script lang="ts">
	export let labelShown: boolean = true;
	export let color: string | undefined;
	export let setColor: ((color: string) => void) | undefined;
	import { unsavedTrue } from '$lib/stores/storyStore';

	let colorPickerRef: HTMLInputElement;

	function updateColor() {
		if (colorPickerRef.value !== color && setColor) {
			setColor(colorPickerRef.value);
			unsavedTrue();
		}
	}
</script>

<div class="color-picker-container" title="Change color">
	{#if labelShown}
		<label for="color-picker">Color</label>
	{/if}
	<input
		type="color"
		bind:this={colorPickerRef}
		value={color}
		on:change={updateColor}
		id="color-picker"
	/>
</div>

<style lang="scss">
	label {
		font-weight: 600;
		font-size: 0.8rem;
	}
	.color-picker-container {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	input[type='color'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		width: 50px;
		height: 35px;
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
</style>
