<script lang="ts">
	import { onMount } from 'svelte';
	import { changeTitle } from '$lib/services/storyActions';
	export let data: PagesLayoutProps;

	import Toolbar from '$lib/components/Toolbar/Toolbar.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import { truncate } from '$lib/utils';

	let titleInput: HTMLInputElement;

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
			on:focus={(event) => event.target instanceof HTMLInputElement && event.target.select()}
		/>
	</form>
	by {data.pages[0].storyId.profileId.username}
</h2>

<br />
<div class="story-container">
	<Toolbar />
	<slot />
	<Slider {data} />
</div>

<style lang="scss">
	h2 {
		display: flex;
		flex-direction: row;
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

	.story-container {
		display: flex;
		flex-direction: column;
		border: black solid;
		width: 75vw;
		max-width: 2000px;
		user-select: none;
	}
</style>
