<script lang="ts">
	export let open: boolean = false;
	export let left: number;
	export let top: number;
	export let element: PageElement;

      $: console.log(open)

</script>

{#if open}
	<div
		id="context-menu"
		style="position: absolute; top: {top + 'px'}; left: {left + 'px'}"
	>
		<ul>
			<b>
				{element.elementName}
			</b>
			<li>Resize</li>
			<li>Delete</li>
			<li>Forward</li>
			<li>Backward</li>
			<li>Bring to Front</li>
			<li>Send to Back</li>
		</ul>
	</div>
{/if}

<style lang="scss">
	#context-menu {
		z-index: 1000;
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
			padding: 0.5rem;
			cursor: pointer;
			transition: 0.5s;
			&:hover {
				background-color: rgb(219, 219, 219);
			}
		}
	}
</style>
