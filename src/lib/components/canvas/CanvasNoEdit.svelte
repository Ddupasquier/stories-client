<script lang="ts">
	import ImgElement from '$lib/components/canvas/ImgElementNoEdit.svelte';

	export let info: {
		id: number;
		pageNumber: number;
		background: string;
		elements: PageElement[];
	};

	$: background = info.background;
</script>

{#if info.background}
	<div id="canvas" style="background: {background}">
		{#if info.elements}
			{#each info.elements as element}
				<ImgElement {element} />
			{/each}
		{/if}
	</div>
{/if}

<style lang="scss">
	#canvas {
		position: relative;
		width: 100%;
		aspect-ratio: 16/7;
		overflow: hidden;
	}
</style>
