<script lang="ts">
	import { beforeUpdate, onMount, afterUpdate } from 'svelte';
	import { savePosition, getElementFromFolder } from '$lib/services/elementActions';
	import Loading from '$lib/components/Loading.svelte';
	import ContextMenu from './ContextMenu.svelte';

	export let element: PageElement;

	$: top = element.y;
	$: left = element.x;
	$: zIndex = element.zIndex;
	$: height = element.size;
	$: rotation = element.rotate;

	let image: { publicUrl: string };
	let loading = true;

	beforeUpdate(() => {
		image = getElementFromFolder(element.type, element.elementName);
	});

	let container: HTMLDivElement;
	$: containerWidth = container?.clientWidth;
	$: containerHeight = container?.clientHeight;

	afterUpdate(() => {
		containerHeight = container.clientHeight;
		containerWidth = container.clientWidth;
	});

	onMount(() => {
		if (element) {
			loading = false;
		}
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

	const rotate = (value: number) => {
		rotation = value;
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
		mouseLocation = { x: e.clientX, y: e.clientY };
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
		'%'}; left: {left + '%'}; z-index: {zIndex}; height: {element.type === 'backgrounds'
		? null
		: height + '%'}; width: {element.type === 'backgrounds' ? height + '%' : null}; transform: rotate({rotation + 'deg'});"
	bind:this={container}
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
		{rotation}
		{resize}
		{changeZindex}
		{rotate}
		{closeContextMenu}
	/>
{/if}

<style lang="scss">
	.canvas-element {
		aspect-ratio: 1/1;
		img {
			user-select: none;
			width: 100%;
			height: 100%;
		}
	}
</style>
