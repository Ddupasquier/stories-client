<script lang="ts">
	export let color: string;
	export let setColor: (color: string) => void;

	let colorPickerRef: HTMLInputElement;

	function updateColor() {
		if (colorPickerRef.value !== color) {
			setColor(colorPickerRef.value);
		}
	}
</script>

<div class="color-picker-container">
	<label for="color-picker">Color</label>
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
            font-weight: bold;
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
