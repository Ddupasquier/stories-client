<script lang="ts">
	import { currentStory, currentPageIndex } from '$lib/stores/storyStore';
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	import Loading from '$lib/components/Loading.svelte';

	export let element: PageElement;

	const getElement = async () => {
		const { data } = supabase.storage.from('svg-assets').getPublicUrl(element.elementName);
		return data;
	};

	let image: { publicUrl: string };
	let loading = true;

	onMount(async () => {
		image = await getElement();

		setTimeout(() => {
			loading = false;
		}, 1000);
	});

	let story: object;
	let page: number;

	currentStory.subscribe((value) => {
		story = value;
	});

	currentPageIndex.subscribe((value) => {
		page = value;
	});

	$: top = element.y;
	$: left = element.x;

	let moving = false;

	const startMoving = () => {
		moving = true;
	};

	const move = (e: { movementX: number; movementY: number }) => {
		if (moving) {
			left += e.movementX / 12;
			top += e.movementY / 12;
		}
	};

	const savePosition = async (top: number, left: number) => {
		const { error } = await supabase
			.from('elements')
			.update({ x: left, y: top })
			.eq('id', element.id);

		if (error) {
			throw new Error(error.message);
		}

		console.log('saved');
	};
</script>

<svelte:window
	on:mousemove={move}
	on:mouseup={() => {
		moving = false;
		savePosition(top, left);
	}}
/>

<div
	class="canvas-element"
	style="position: absolute; top: {top + '%'}; left: {left +
		'%'}; z-index: {element.zIndex}; height: {element.size + '%'};"
>
	{#if loading}
		<Loading />
	{/if}
	{#if image && !loading}
		<img src={image.publicUrl} alt={element.elementName} />
	{/if}
	<div class="move-icon" on:mousedown={startMoving}>Move</div>
</div>

<style lang="scss">
	.canvas-element {
		width: fit-content;
		aspect-ratio: 1.1;
		img {
			width: 100%;
			height: 100%;
			user-select: none;
		}

		.move-icon {
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
			top: 50%;
			left: 48%;
			transform: translate(-50%, -50%);
			height: 80%;
			width: 60%;
			opacity: 0;
			&:hover {
				cursor: move;
				opacity: 1;
			}
		}
	}
</style>
