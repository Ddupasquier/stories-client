<script lang="ts">
	import { signupCTA } from '$lib/assets';
	import { fade } from 'svelte/transition';
	import {userId} from '$lib/stores/userStore';
</script>

<div class="above-the-fold">
	<object type="image/svg+xml" data={signupCTA} title="signup" />
	<a href="/profile" class="button" in:fade="{{delay: 5000}}">Sign Up</a>
</div>

<style lang="scss">
	.above-the-fold {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		aspect-ratio: 16/6;
		text-align: center;
		font-size: 1.5rem;
		font-weight: 600;
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: 100%;
		position: relative;
		a {
			position: absolute;
			top: 65%;
			text-decoration: none;
		}
	}

	@media (max-width: 768px) {
		.above-the-fold {
			font-size: .75rem;
		}
	}
</style>
