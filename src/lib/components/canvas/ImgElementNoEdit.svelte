<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';
	import { getElement } from '$lib/services/elementActions';
	import Loading from '$lib/components/Loading.svelte';

	export let element: PageElement;

	$: top = element.y;
	$: left = element.x;
	$: zIndex = element.zIndex;
	$: height = element.size;
	let image: { publicUrl: string };
	let loading = true;

	beforeUpdate(() => {
		image = getElement(element.elementName);
	});

	onMount(() => {
		if (element) {
			loading = false;
		}
	});
</script>

<div
	class="canvas-element"
	style="display: flex; justify-content: center; align-items: center; position: absolute; top: {top +
		'%'}; left: {left + '%'}; z-index: {zIndex}; height: {height + '%'};"
>
	{#if loading}
		<Loading />
	{/if}
	{#if image && !loading}
		<img src={image.publicUrl} alt={element.elementName} draggable="false"/>
	{/if}
</div>

<style lang="scss">
	.canvas-element {
		width: fit-content;
		aspect-ratio: 1 / 1;

		img {
			user-select: none;
		}
	}
</style>
