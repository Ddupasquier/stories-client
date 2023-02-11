<script lang="ts">
	import { page } from '$app/stores';

	$: topic = $page.url.searchParams.get('topic');
</script>

<div class="container">
	<div class="sidebar">
		<a href="/information?topic=about" class="button">About</a>
		<a href="/information?topic=contact" class="button">Contact</a>
		<a href="/information?topic=privacy" class="button">Privacy</a>
		<a href="/information?topic=terms" class="button">Terms</a>
	</div>
	<div class="content">
		<slot {topic} />
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		width: 90%;
		align-self: center;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 1rem;
		width: fit-content;
		padding: 1rem;
		height: 100%;
	}

	.sidebar a {
		text-align: center;
		width: 5rem;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 1rem 2rem;
		width: auto;
		min-width: 190px;
		background: var(--offwhite);
		border-radius: 1rem;
	}

	@media (max-width: 1100px) {
		.container {
			flex-direction: column;
			gap: 1rem;
		}

		.sidebar {
			flex-direction: row;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			width: fit-content;
			padding: 0;
			margin: auto;
		}
	}

	@media (max-width: 700px) {
		.sidebar {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
