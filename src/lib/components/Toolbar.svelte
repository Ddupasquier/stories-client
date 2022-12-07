<script lang="ts">
	import * as SVGs from '$lib/images';
	// console.log(SVGs);
</script>

<div class="container">
	{#each Object.keys(SVGs) as key}
		<img src={SVGs[key]} alt={key} class="toolbar-item" />
	{/each}
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: .5rem;
		width: 100%;
		background: #222;
		color: white;
		height: 6em;
	}

      .toolbar-item {
		height: 80%;
      }
</style>
