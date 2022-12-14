<script lang="ts">
	import { onMount } from 'svelte';
	import type { AuthSession } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabase';

	export let session: AuthSession;

	let loading = false;
	let username: string | null = null;
	let fullName: string | null = null;
	let avatarUrl: string | null = null;

	onMount(() => {
		getProfile();
	});

	const getProfile = async () => {
		try {
			loading = true;
			const { user } = session;

      // user.id is a string
			console.log(user.id, typeof user.id, 'get');

			const { data, error, status } = await supabase
				.from('profiles')
				.select('username, fullName, avatarUrl')
				.eq('id', user.id)
				.single();

      // data is an object but is for some reason null
			console.log(data, error, status);

			if (error && status !== 406) throw error;

			if (data) {
				username = data.username;
				fullName = data.fullName;
				avatarUrl = data.avatarUrl;
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};

	const updateProfile = async () => {
		try {
			loading = true;
			const { user } = session;

			console.log(user.id, 'update');

			const updates = {
				id: user.id,
				username,
				fullName,
				avatarUrl,
				updatedAt: new Date().toISOString()
			};

			let { error } = await supabase.from('profiles').upsert(updates);

			if (error) {
				throw error;
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	};
</script>

<form on:submit|preventDefault={updateProfile}>
	<div>Email: {session.user.email}</div>
	<div>
		<label for="username">Username</label>
		<input id="username" type="text" placeholder={username} bind:value={username} required />
	</div>
	<div>
		<label for="full_name">Full Name</label>
		<input id="full_name" type="text" placeholder={fullName} bind:value={fullName} required />
	</div>
	<div>
		<label for="avatar_url">Avatar</label>
		<input id="avatar_url" type="text" placeholder={avatarUrl} bind:value={avatarUrl} required />
	</div>
	<div>
		<button type="submit" disabled={loading}>
			{loading ? 'Saving ...' : 'Update profile'}
		</button>
	</div>
	<button type="button" on:click={() => supabase.auth.signOut()}> Sign Out </button>
</form>
