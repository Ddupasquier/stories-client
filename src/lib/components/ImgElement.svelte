<script lang="ts">
	export let element: PageElement;

	import { images } from '$lib/images';
	import { currentStory, currentPageId } from '$lib/stores/storyStore';

	interface Image {
		id: number;
		name: string;
		src: string;
	}

	const findImage = (id: string) => {
		return images.find((image) => image.id === Number(id));
	};

	$: image = findImage(element.elementId);

	let story: object;
	let page: number;

	currentStory.subscribe((value) => {
		story = value;
	});

	currentPageId.subscribe((value) => {
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
</script>

<svelte:window
	on:mousemove={move}
	on:mouseup={() => {
		moving = false;
		// savePosition(story, page, element, top, left);
	}}
/>

<div
	class="canvas-element"
	style="position: absolute; top: {top + '%'}; left: {left +
		'%'}; z-index: {element.zIndex}; height: {element.size + '%'};"
>
	<img src={image.src} alt={image.name} />
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
