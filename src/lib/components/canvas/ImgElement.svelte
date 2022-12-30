<script lang="ts">
	import { onMount } from 'svelte';
	import { savePosition, getElement } from '$lib/services/elementActions';
	import Loading from '$lib/components/Loading.svelte';
	import ContextMenu from '../ContextMenu.svelte';

	export let element: PageElement;

	$: top = element.y;
	$: left = element.x;
	$: zIndex = element.zIndex;
	$: height = element.size;
	let image: { publicUrl: string };
	let loading = true;

	onMount(async () => {
		image = await getElement(element.elementName);

		setTimeout(() => {
			loading = false;
		}, 1000);
	});

	let moving = false;

	const startMoving = () => {
		moving = true;
	};

	const resize = (value: number) => {
		height = value;
	};

	const changeZindex = (value: number) => {
		zIndex = value;
	};

	export const move = (e: { movementX: number; movementY: number }) => {
		if (moving) {
			left += e.movementX / 16;
			top += e.movementY / 7;
		}
	};

	const closeContextMenu = () => {
		isOpen = false;
	};

	let mouseLocation = { x: 0, y: 0 };
	$: isOpen = false;

	const contextMenu = (e: {
		clientY: number;
		clientX: number;
		preventDefault(): unknown;
		movementX: number;
		movementY: number;
	}) => {
		e.preventDefault();
		mouseLocation = { x: e.clientX - 73, y: e.clientY - 200 };
	};
</script>

<svelte:window
	on:mousemove={move}
	on:mouseup={() => {
		moving = false;
		if (top !== element.y || left !== element.x) savePosition(top, left, element.id);
	}}
/>

<div
	class="canvas-element"
	style="display: flex; justify-content: center; align-items: center; position: absolute; top: {top +
		'%'}; left: {left + '%'}; z-index: {zIndex}; height: {height + '%'};"
>
	{#if loading}
		<Loading />
	{/if}
	{#if image && !loading}
		<img
			src={image.publicUrl}
			alt={element.elementName}
			on:mousedown={startMoving}
			draggable="false"
			on:contextmenu={(e) => {
				contextMenu(e);
				isOpen = true;
			}}
		/>
	{/if}
</div>

{#if isOpen}
	<ContextMenu
		top={mouseLocation.y}
		left={mouseLocation.x}
		{element}
		{height}
		{zIndex}
		{resize}
		{changeZindex}
		{closeContextMenu}
	/>
{/if}

<style lang="scss">
	.canvas-element {
		width: fit-content;
		aspect-ratio: 1.1;
		img {
			user-select: none;
		}
	}
</style>
