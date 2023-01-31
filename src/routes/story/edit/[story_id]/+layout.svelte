<script lang="ts">
	import { onMount } from 'svelte';
	import { changeTitle } from '$lib/services/storyActions';
	import Toolbar from '../toolbar/Toolbar.svelte';
	import SliderEdit from '../SliderEdit.svelte';
	import { truncate } from '$lib/utils';
	import { indicateArrow } from '$lib/assets';
	import { toastOpen } from '$lib/stores/storyStore';

	export let data: PagesLayoutProps;
	let titleInput: HTMLInputElement;
	$: saveTitleShown = false;

	const resizeTitleInput = () => {
		titleInput.style.width = `${titleInput.value.length * 0.9}rem`;
	};

	onMount(() => {
		resizeTitleInput();
	});
</script>

<svelte:head>
	<title>{data.pages[0].storyId.title}</title>
	<meta name="description" content="View [this story]" />
</svelte:head>

<h2>
	<form on:submit|preventDefault={() => changeTitle(data.pages[0].storyId.id, titleInput.value)}>
		<input
			class="input title-input"
			value={truncate(data.pages[0].storyId.title, 25)}
			bind:this={titleInput}
			on:change={resizeTitleInput}
			on:focus={(event) => {
				event.target instanceof HTMLInputElement && event.target.select();
				saveTitleShown = true;
			}}
		/>
		{#if saveTitleShown}
			<button
				type="button"
				class="title-button"
				on:click={() => {
					changeTitle(data.pages[0].storyId.id, titleInput.value);
					saveTitleShown = false;
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="green"
					class="bi-check"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M13.854 4.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0z"
					/>
				</svg></button
			>
		{/if}
	</form>
	<div>
		by {data.pages[0].storyId.profileId.username}
	</div>
</h2>

<br />

{#if $toastOpen}
	<img src={indicateArrow} alt="indicate arrow" class="indicate-arrow" />
{/if}

<div class="story-container">
	<Toolbar />
	<slot />
	<SliderEdit {data} />
</div>

<style lang="scss">
	h2 {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		font-size: 1.5rem;
		margin: 0;
		font-weight: 800;
	}

	form {
		margin: 0;
		padding: 0;
	}

	.title-input {
		font-size: 1.5rem;
		margin: 0;
		font-weight: 800;
		border: none;
		background: none;
		color: var(--color-text);
		&:hover {
			border: none;
			background: rgb(255, 255, 255, 0.4);
			box-shadow: none;
		}
	}

	.title-button {
		background: var(--color-bg-2);
		border: none;
		border-radius: 50%;
		height: 1.7rem;
		width: 1.7rem;
		margin: 0;
		padding: 0;
		cursor: pointer;
		.bi-check {
			width: 1.5rem;
			height: 1.5rem;
			pointer-events: none;
		}
	}

	.story-container {
		display: flex;
		flex-direction: column;
		border: black solid;
		width: 75vw;
		max-width: 2000px;
		user-select: none;
	}

	.indicate-arrow {
		position: absolute;
		top: 18.5rem;
		right: 11%;
		width: 3rem;
		height: 3rem;
		z-index: 1002;
		pointer-events: none;
		transform-origin: bottom left;
		animation: rotate 1s infinite;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(40deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
