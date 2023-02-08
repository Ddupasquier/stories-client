<script lang="ts">
	import { checkIfLiked, likeStory, unlikeStory } from '$lib/services/storyActions';
	import { userId } from '$lib/stores/userStore';
	import { addCommasToNumber } from '$lib/utils';
	import { Thumbs } from '$lib/assets';
	import { onMount } from 'svelte';

	export let id: number;
	export let likes = 0;

	$: isLiked = false;
	$: console.log(isLiked, id);

	onMount(async () => {
		if (!$userId) return;
		isLiked = await checkIfLiked(id, $userId);
	});

	let button: HTMLElement | null;

	const doAnimation = () => {
		button?.animate(
			[{ transform: `scale(1) ` }, { transform: 'scale(1.3)' }, { transform: `scale(1) ` }],
			{
				duration: 800,
				easing: 'cubic-bezier(0.83, 0.67, 0.17, 0.67)',
				fill: 'forwards'
			}
		);
	};

	const doLike = async () => {
		doAnimation();
		likeStory(id, $userId);
		isLiked = true;
		likes++;
	};

	const doUnlike = async () => {
		doAnimation();
		unlikeStory(id, $userId);
		isLiked = false;
		likes--;
	};
</script>

<div class="likes">
	{addCommasToNumber(likes)} likes
	<button
		class="like-button"
		on:click={isLiked ? doUnlike : doLike}
		bind:this={button}
		
	>
		<Thumbs color={isLiked ? 'black' : 'green'} height="15px" title={isLiked ? 'Unlike' : 'Like'} {isLiked}/>
	</button>
</div>

<style lang="scss">
	.likes {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.like-button {
		height: 30px;
		width: 30px;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition: background 0.5s;
		&:hover {
			background: var(--color-bg-1);
		}
	}
</style>
