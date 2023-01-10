<script lang="ts">
	import {githubIcon} from '$lib/assets';
</script>

<footer>
	<div class="left">
		<a href="https://github.com/Ddupasquier/stories-client" target="_blank" rel="noopener noreferrer">
			<img src={githubIcon} alt="github" />
		</a>
	</div>
	<div class="center">
		Stories We Tell - &copy; {new Date().getFullYear()}
	</div>
	<div class="right">
		<a href="https://www.buymeacoffee.com/dylandupasquier" target="_blank" rel="noopener noreferrer"
			><img
				src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=dylandupasquier&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"
				alt="buy-me-a-coffee"
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

	.left {
		text-align: left;
		padding-left: 1rem;
		img {
			width: 2rem;
		}
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
</style>
