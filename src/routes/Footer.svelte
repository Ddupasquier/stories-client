<script lang="ts">
	import { domainName } from '../lib/constants';
	// import {githubIcon} from '$lib/assets';
</script>

<footer>
	<div class="left">
		<!-- <a href="https://github.com/Ddupasquier/stories-client" target="_blank" rel="noopener noreferrer">
			<img src={githubIcon} alt="github" />
		</a> -->
	</div>
	<div class="center">
		{domainName} - &copy; {new Date().getFullYear()}
	</div>
	<div class="right">
		<a href="https://www.buymeacoffee.com/dylandupasquier" target="_blank" rel="noopener noreferrer"
			><img
				src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=dylandupasquier&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
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
		text-align: center;
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

	@media (max-width: 600px) {
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
