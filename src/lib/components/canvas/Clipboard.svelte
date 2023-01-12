<script lang="ts">
	export let link: string;
	import { toast } from '@zerodevx/svelte-toast';

	const copyToClipboard = (link: string) => {
		navigator.clipboard.writeText(link);
	};
</script>

<div class="clipboard-toast">
	<p>All changes have been saved!<br /> Here's a link to share with your friends!</p>
	<p class="publish-prompt">Be sure to publish your story to make it public!</p>
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

	.publish-prompt {
		font-size: 1.2rem;
		animation: wiggle 1s ease-in-out infinite;
	}

	@keyframes wiggle {
		0% {
			transform: rotate(0deg);
		}
		25% {
			transform: rotate(2deg);
		}
		50% {
			transform: rotate(0deg);
		}
		75% {
			transform: rotate(-2deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}
</style>
