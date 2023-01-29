<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { signout } from '$lib/services/auth';
	import type { AuthSession } from '@supabase/supabase-js';
	import { page } from '$app/stores';
	import { username } from '$lib/stores/userStore';
	import { domainName } from './constants';

	export let session: AuthSession | null;
</script>

<header>
	<div class="logo">
		<h1>{domainName}</h1>
	</div>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">{session ? $username : 'Login'}</a>
			</li>
			<li aria-current={$page.url.pathname === '/browse' ? 'page' : undefined}>
				<a href="/browse">Browse</a>
			</li>
		</ul>
	</nav>
	<div class="logout-container">
		{#if session}
			<button
				type="button"
				on:click={() => {
					supabase.auth.signOut();
					signout();
				}}
				class="button logout"
			>
				Sign Out
			</button>
		{/if}
	</div>
</header>

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 3rem;
	}

	.logo {
		display: flex;
		align-items: center;
		position: relative;
		top: 0.5rem;
		left: 0.5rem;
	}

	.logo h1 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
		background: -webkit-linear-gradient(
			50deg,
			rgba(244, 67, 54, 1) 20%,
			rgba(108, 108, 108, 1) 40%
		);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.logout {
		white-space: nowrap;
	}

	.logout-container {
		position: relative;
		top: 0.5rem;
		right: 0.5rem;
		width: 6.1rem;
	}

	nav {
		display: flex;
		justify-content: center;
		justify-self: center;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	@media (max-width: 600px) {
		header {
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 1rem;
		}

		.logo {
			left: 0;
		}

		.logo > * {
			margin: 0;
			padding: 0;
			width: 100%;
			text-align: center;
		}

		.logout-container {
			position: absolute;
			.logout {
				transform: scale(0.8);
			}
		}
	}
</style>
