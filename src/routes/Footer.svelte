<script lang="ts">
	import { domainName } from '../lib/constants';

	const footerData = [
		{
			link: '/information/?topic=about',
			text: 'About'
		},
		{
			link: '/information/?topic=contact',
			text: 'Contact Us'
		},
		// {
		// 	link: '/information/?topic=privacy',
		// 	text: 'Privacy Policy'
		// },
		// {
		// 	link: '/information/?topic=terms',
		// 	text: 'Terms of Service'
		// }
	];
</script>

<footer>
	<div class="left" />
	<div class="center">
		{domainName} - &copy; {new Date().getFullYear()}
		<div>
			{#each footerData as { link, text }, i}
				{#if i !== footerData.length - 1}
					<a href={link}>{text}</a> |
				{:else}
					<a href={link}>{text}</a>
				{/if}
			{/each}
		</div>
	</div>
	<div class="right">
		<a href="https://www.buymeacoffee.com/dylandupasquier" target="_blank" rel="noopener noreferrer"
			><img
				src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=dylandupasquier&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=000000"
				alt="buy-me-a-coffee"
				title="I'm broke as heck."
			/></a
		>
	</div>
</footer>

<style lang="scss">
	footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	footer div {
		width: 30%;
	}

	.center {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		text-align: center;
		a {
			white-space: nowrap;
		}
		div {
			display: flex;
			flex-direction: row;
			align-self: center;
			width: fit-content;
			gap: 0.5rem;
		}
	}

	.right {
		text-align: right;
		padding-right: 1rem;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}

	@media (max-width: 940px) {
		footer {
			flex-direction: column;
			justify-content: center;
			text-align: center;
			gap: 1rem;
		}

		footer div {
			width: 100%;
		}

		.right {
			padding-right: 0;
			text-align: center;
			order: 1;
		}

		.center {
			order: 2;
		}
	}
</style>
