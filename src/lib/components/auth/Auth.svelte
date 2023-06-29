<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { toast } from '@zerodevx/svelte-toast';

	let loading = false;
	let email = '';

	const handleLogin = async () => {
		const getRedirectURL = () => {
			let url;
			if (window.location.hostname.includes('www')) {
				url = 'https://www.pinchedparables.com/';
			} else {
				url =
					window.location.protocol +
					'//' +
					window.location.hostname +
					(window.location.port ? ':' + window.location.port : '');
			}
			return url;
		};

		try {
			loading = true;
			console.log(getRedirectURL());
			const { error } = await supabase.auth.signInWithOtp({
				email,
				options: {
					emailRedirectTo: getRedirectURL()
				}
			});

			if (error) throw error;
			toast.push('Check your email for the magic link!', {
				duration: 5000
			});
		} catch (error) {
			if (error instanceof Error) {
				toast.push(error.message, {
					duration: 5000
				});
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
		text-align: center;
	}

	.sub-description {
		font-size: 0.8rem;
		color: #000000;
		margin: 0;
		margin-bottom: 1.3rem;
	}
</style>
