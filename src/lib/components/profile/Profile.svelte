<script lang="ts">
	import { onMount } from 'svelte';
	import { user, name, avatar, id} from '$lib/stores/userStore';
	import type { AuthSession } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabase';

	export let session: AuthSession;

	let profileLoading = false;
	let username: string | null = null;
	let fullName: string | null = null;
	let avatarUrl: string | null = null;

	const updateUserStore = (a: string, b: string, c: string, d: string) => {
		user.set(a);
		name.set(b);
		avatar.set(c);
		id.set(d)
	}

	onMount(() => {
		getProfile();
	});

	const getProfile = async () => {
		try {
			profileLoading = true;

			const { user } = session;

			const { data, error, status } = await supabase
				.from('profiles')
				.select('username, fullName, avatarUrl')
				.eq('id', user.id)
				.single();

			if (error && status !== 406) throw error;

			if (data) {
				username = data.username;
				fullName = data.fullName;
				avatarUrl = data.avatarUrl;
				updateUserStore(data.username, data.fullName, data.avatarUrl, user.id)
			}
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			profileLoading = false;
		}
	};

	const updateProfile = async () => {
		try {
			profileLoading = true;
			const { user } = session;

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
			profileLoading = false;
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
		<input id="avatar_url" type="text" placeholder={avatarUrl} bind:value={avatarUrl} />
	</div>
	<div>
		<button type="submit" disabled={profileLoading}>
			{profileLoading ? 'Saving ...' : 'Update profile'}
		</button>
	</div>
	<button type="button" on:click={() => supabase.auth.signOut()}> Sign Out </button>
</form>
