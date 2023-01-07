<script lang="ts">
	import { supabase } from '$lib/supabase';

	let loading = false;
	let email = '';

	const handleLogin = async () => {
		const isLocalhost = () => {
			let local;
			if (window.location.hostname === 'localhost') local = 'http://localhost:5173';
			else local = 'https://stories-client.vercel.app/';
			console.log(local, 'local?');
			return local;
		};

		try {
			loading = true;
			const { error } = await supabase.auth.signInWithOtp({
				email,
				options: {
					emailRedirectTo: isLocalhost(),
				}
			});

			if (error) throw error;
			alert('Check your email for login link!');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<div class="login" aria-live="polite">
	<form class="form-widget" on:submit|preventDefault={handleLogin}>
		<p class="description">Sign in with your email.</p>
		<p class="sub-description">NO PASSWORD REQUIRED!</p>
		<div>
			<label for="email">Email</label>
			<input id="email" class="input" type="email" placeholder="Your email" bind:value={email} />
		</div>
		<br />
		<div>
			<button type="submit" class="button" aria-live="polite" disabled={loading}>
				<span>{loading ? 'Loading' : 'Send magic link'}</span>
			</button>
		</div>
	</form>
</div>

<style lang="scss">
	.login {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: fit-content;

		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			height: 100%;
			div {
				display: flex;
				flex-flow: column nowrap;
				gap: 0.5rem;
			}
			button {
				align-self: center;
			}
		}
	}

	.description {
		font-size: 1.6rem;
		color: #f44336;
		margin: 0;
	}

	.sub-description {
		font-size: 0.8rem;
		color: #000000;
		margin: 0;
		margin-bottom: 1.3rem;
	}
</style>
