<script lang="ts">
	import { onMount } from 'svelte';
	import { savePosition } from '$lib/services/elementActions';
	import { unsavedTrue } from '$lib/stores/storyStore';
	import ContextMenu from './ContextMenu.svelte';

	export let element: PageElement;

	$: top = element.y;
	$: left = element.x;
	$: zIndex = element.zIndex;
	$: height = element.size;
	$: rotation = element.rotate;
	$: color = element.color;
	$: text = element.text;

	let loading = true;

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

	const changeText = (value: string) => {
		text = value;
	};

	const setColor = (value: string) => {
		color = value;
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
		if (top !== element.y || left !== element.x) savePosition(top, left, element.id, unsavedTrue);
	}}
/>


	<p
		class="text-element"
		style="position: absolute; top: {top + '%'}; left: {left + '%'}; z-index: {zIndex}; font-size: {height + 'vw'}; transform: rotate({rotation + 'deg'}); color: {color};"
		on:mousedown={startMoving}
		draggable="false"
		on:contextmenu={(e) => {
			contextMenu(e);
			isOpen = true;
		}}
	>
		{#if !loading}
			{text}
		{/if}
	</p>


{#if isOpen}
	<ContextMenu
		top={mouseLocation.y}
		left={mouseLocation.x}
		{element}
		{text}
		{color}
		{height}
		{zIndex}
		{rotation}
		{resize}
		{changeZindex}
		{rotate}
		{changeText}
		{setColor}
		{closeContextMenu}
	/>
{/if}