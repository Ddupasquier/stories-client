<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';

	import Loading from '$lib/components/Loading.svelte';

	export let element: PageElement;

	const getElement = async () => {
		const { data: url } = supabase.storage.from('svg-assets').getPublicUrl(element.elementName);
		return url;
	};

	let image: { publicUrl: string };
	let loading = true;

	// $: console.log(image, element.elementName)

	onMount(async () => {
		image = await getElement();
		

		setTimeout(() => {
			loading = false;
		}, 1000);
	});

	$: top = element.y;
	$: left = element.x;
	$: zIndex = element.zIndex;
	$: height = element.size;

	let moving = false;

	const startMoving = () => {
		moving = true;
	};

	const move = (e: { movementX: number; movementY: number }) => {
		if (moving) {
			left += e.movementX / 16;
			top += e.movementY / 7;
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
	};

	const deleteElement = async (e: { preventDefault: () => void }, id: number | undefined) => {
		e.preventDefault();
		const { error } = await supabase.from('elements').delete().eq('id', id);

		if (error) {
			throw new Error(error.message);
		}
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
	style="display: flex; justify-content: center; align-items: center; position: absolute; top: {top +
		'%'}; left: {left + '%'}; z-index: {element.zIndex}; height: {element.size + '%'};"
>
	{#if loading}
		<Loading />
	{/if}
	{#if image && !loading && image.publicUrl.split('/').pop() === element.elementName}
		<img
			src={image.publicUrl}
			alt={element.elementName}
			on:mousedown={startMoving}
			draggable="false"
			on:contextmenu={(e) => deleteElement(e, element.id)}
		/>
	{/if}
</div>

<style lang="scss">
	.canvas-element {
		width: fit-content;
		aspect-ratio: 1.1;
		img {
			user-select: none;
		}
	}
</style>
