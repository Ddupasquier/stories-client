<script lang="ts">
	export let screenshot: string | undefined;

	$: img = screenshot;
</script>

<div id="canvas">
	{#if img}
		<img src={img} alt="Page" />
	{/if}
</div>

<style lang="scss">
	#canvas {
		position: relative;
		width: 100%;
		aspect-ratio: 16/7;
		overflow: hidden;
		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
		}
	}
</style>
