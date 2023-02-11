<h1>Contact</h1>
<p>
	You can contact me on <a href="https://www.linkedin.com/in/dylan-dupasquier/">Linkedin</a>
</p>

<style lang="scss">
	@mixin font-style {
		font-family: 'Roboto', sans-serif;
		font-weight: bold;
		color: black;
		text-align: center;
	}

	p {
		font-size: 18px;
		@include font-style;
            a {
                  color: var(--orange);
            }
	}

	.highlight {
            display: inline-block;
		color: orange;
		font-weight: bold;
            transform: scale(1.4);
            margin: 1rem;
            text-transform: capitalize;
            line-height: 0;
	}
</style>