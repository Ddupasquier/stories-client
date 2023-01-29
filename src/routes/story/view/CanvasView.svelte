<script lang="ts">
	import {currentPage} from '$lib/stores/viewStore';
</script>

<div id="canvas">
	{#if $currentPage}
		<img src={$currentPage} alt="Page" />
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
