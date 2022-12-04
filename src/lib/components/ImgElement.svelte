<script lang="ts">
	export let element: PageElement;

	$: top = element.y;
	$: left = element.x;

	let moving = false;

	const startMoving = () => {
		moving = true;
	};

	const move = (e: { movementX: number; movementY: number }) => {
		if (moving) {
			left += e.movementX / 10;
			top += e.movementY / 10;
		}
	};
</script>

<svelte:window
	on:mousemove={move}
	on:mouseup={() => {
		moving = false;
	}}
/>

<div
	class="canvas-element"
	style="position: absolute; top: {top + '%'}; left: {left +
		'%'}; z-index: {element.zIndex}; height: {element.size + '%'};"
>
	<img src={element.id} alt={element.id} />
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
