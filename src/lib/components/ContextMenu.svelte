<script lang="ts">
	export let open: boolean;
	export let left: number;
	export let top: number;
	export let height: number;
	export let zIndex: number;
	export let element: PageElement;

	export let resize: (value: number) => void;
	export let changeZindex: (value: number) => void;

	import { deleteElement } from '$lib/services/elementActions';
</script>

{#if open}
	<div id="context-menu" style="position: absolute; top: {top + 'px'}; left: {left + 'px'}">
		<ul>
			<b>
				{element.elementName}
			</b>
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
				Z-Index: <input
					type="number"
					value={zIndex}
					class="input context-input"
					min="0"
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
					deleteElement(element.id);
					open = false;
				}}
			>
				Delete
			</li>
		</ul>
	</div>
{/if}

<style lang="scss">
	#context-menu {
		z-index: 1000;
	}

	.context-input {
		width: 40px;
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
