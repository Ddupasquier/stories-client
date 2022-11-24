<script lang="ts">
	export let data: string[] = [];
	console.log(data)

	import Toolbar from '$lib/components/Toolbar.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import Slider from '$lib/components/Slider.svelte';
</script>

<svelte:head>
	<title>Story</title>
	<meta name="description" content="View [this story]" />
</svelte:head>

<div class="story-container">
	<Toolbar data={data} />
	<Canvas />
	<Slider />
</div>

<style lang="scss">
	.story-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 10% 80% 10%;
		grid-template-areas:
			'toolbar'
			'canvas'
			'slider';
		border: black solid;
		aspect-ratio: 16/9;
	}
</style>
