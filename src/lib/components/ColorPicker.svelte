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

<input
      type="color"
      bind:this={colorPickerRef}
      value={color}
      on:change={updateColor}
/>

<style lang="scss">
      input[type="color"] {
            border: none;
            border-radius: 0;
            padding: 0;
            margin: 0;
            background: none;
      }
</style>
