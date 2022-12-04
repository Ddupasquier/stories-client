<script lang="ts">
	export let info: PageInfoProps;
	import ImgElement from '$lib/components/ImgElement.svelte';

	$: elements = info.elements;
</script>

<div class="canvas">
	{#if elements}
		{#each elements as element}
			<ImgElement {element} />
		{/each}
	{/if}
	Page {info.id}
</div>

<style lang="scss">
	.canvas {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
