<script lang="ts">
	export let link: string;
	import { toast } from '@zerodevx/svelte-toast';

	const copyToClipboard = (link: string) => {
		navigator.clipboard.writeText(link);
	};
</script>

<div class="clipboard-toast">
	<p>All changes have been saved!<br /> Here's a link to share with your friends!</p>
	<br />
	<button
		class="button"
		on:click={() => {
			copyToClipboard(link);
			toast.push('Link copied to clipboard!', { duration: 3000 });
		}}
	>
		Link here!
	</button>
</div>

<style lang="scss">
	.clipboard-toast {
		text-align: center;
	}
</style>
