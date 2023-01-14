<script lang="ts">
	import { unsavedTrue } from '$lib/stores/storyStore';
	export let element: PageElement;

	export let left: number;
	export let top: number;
	export let height: number;
	export let zIndex: number;
	export let rotation: number;
	export let text: string | undefined;
	export let color: string | undefined;

	export let resize: (value: number) => void;
	export let changeZindex: (value: number) => void;
	export let rotate: (value: number) => void;
	export let changeText: (value: string) => void;
	export let setColor: (value: string) => void;
	export let closeContextMenu: () => void;

	import {
		deleteElement,
		saveRotation,
		saveSize,
		saveZindex,
		editText,
		editTextColor
	} from '$lib/services/elementActions';
	import ColorPicker from '../ColorPicker.svelte';
	let contextRef: HTMLDivElement;

	const handleTextSubmit = () => {
		if (text && element.text !== text) {
			editText(element.id, text);
			changeText(text);
		}
		if (color && element.color !== color) {
			editTextColor(element.id, color);
			setColor(color);
		}
		if ((text && element.text !== text) || (color && element.color !== color)) {
			unsavedTrue();
		}
		closeContextMenu();
	};
</script>

<svelte:window
	on:click={(e) => {
		if (e.target instanceof HTMLElement) {
			if (!contextRef.contains(e.target)) {
				if (height !== element.size) {
					saveSize(element.id, height);
				}
				if (zIndex !== element.zIndex) {
					saveZindex(element.id, zIndex);
				}
				if (rotation !== element.rotate) {
					saveRotation(element.id, rotation);
				}
				if (text && element.text !== text) {
					changeText(text);
				}
				if (color && element.color !== color) {
					setColor(color);
				}
				if (rotation !== element.rotate || height !== element.size || zIndex !== element.zIndex) {
					unsavedTrue();
				}
				closeContextMenu();
			}
		}
	}}
/>

<div
	id="context-menu"
	style="position: fixed; top: {top + 'px'}; left: {left + 'px'}"
	bind:this={contextRef}
>
	<ul>
		<b>
			{element.elementName}
		</b>
		{#if element.type === 'text'}
			<li class="text-edit-form">
				<form on:submit|preventDefault={handleTextSubmit}>
					<textarea
						value={element.text}
						class="input context-input text-edit-input"
						on:change={(e) => {
							if (e.target instanceof HTMLTextAreaElement) {
								changeText(e.target.value);
							}
						}}
					/>
					<ColorPicker {color} {setColor} />
					<button type="submit" class="text-edit-button">Save</button>
				</form>
			</li>
		{/if}
		<li>
			Size: <input
				type="number"
				value={height}
				class="input context-input"
				min="0"
				on:change={(e) => {
					if (e.target instanceof HTMLInputElement) {
						resize(Number(e.target.value));
					}
				}}
			/>
		</li>
		<li>
			Rotation: <input
				type="number"
				value={rotation}
				class="input context-input"
				min="-360"
				max="360"
				on:change={(e) => {
					if (e.target instanceof HTMLInputElement) {
						rotate(Number(e.target.value));
					}
				}}
			/>
		</li>
		<li>
			Z-Index: <input
				type="number"
				value={zIndex}
				class="input context-input"
				min="0"
				max="500"
				on:change={(e) => {
					if (e.target instanceof HTMLInputElement) {
						changeZindex(Number(e.target.value));
					}
				}}
			/>
		</li>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<li
			on:click={() => {
				deleteElement(element.id, unsavedTrue);
				closeContextMenu();
			}}
		>
			Delete
		</li>
	</ul>
</div>

<style lang="scss">
	#context-menu {
		z-index: 10000;
	}

	.context-input {
		width: 40px;
	}

	.text-edit-input {
		width: 80%;
		resize: vertical;
		min-height: 2rem;
		max-height: 10rem;
	}

	.text-edit-button {
		// position: relative;
		// top: -0.5rem;
		// width: 19%;
		border: green solid;
	}

	.text-edit-form {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: fit-content;
		background: #fff;
		border: 1px solid #ccc;
		b {
			padding: 0.5rem;
			font-weight: bold;
		}
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0.5rem;
			cursor: pointer;
			transition: 0.5s;
			&:hover {
				background-color: rgb(219, 219, 219);
			}
		}
	}
</style>
