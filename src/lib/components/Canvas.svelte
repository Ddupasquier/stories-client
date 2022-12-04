<script lang="ts">
	interface PageInfoProps {
		id: number;
		background: string;
		elements: PageElement[];
	}

	export let info: PageInfoProps;
	console.log(info);
</script>

<div class="canvas">
	{#each info.elements as element}
		<img
			src={element.id}
			alt={element.id}
			height={element.size + '%'}
			style="position: absolute; top: {element.x + '%'}; left: {element.y +
				'%'}; z-index: {element.zIndex};"
			class="canvas-element"
		/>
	{/each}
	Page {info.id}
</div>

<style lang="scss">
	.canvas {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.canvas-element {
		aspect-ratio: 1.1;
	}
</style>
