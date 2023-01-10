<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';
	import { username, fullname, avatar, userId } from '$lib/stores/userStore';
	import type { AuthSession } from '@supabase/supabase-js';
	import { supabase } from '$lib/supabase';

	import Avatar from './Avatar.svelte';
	import { getProfile } from '$lib/services/auth';

	export let session: AuthSession;

	let profileLoading = false;
	$: userName = $username;
	$: fullName = $fullname;
	$: avatarUrl = $avatar;

	const updateUserStore = (
		a: string | null,
		b: string | null,
		c: string | null,
		d: string | null
	) => {
		username.set(a);
		fullname.set(b);
		avatar.set(c);
		userId.set(d);
	};

	beforeUpdate(() => {
		getProfile(session?.user.id);
	})

	const updateProfile = async () => {
		try {
			profileLoading = true;
			const { user } = session;

			const updates = {
				id: user.id,
				username: userName,
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
			updateUserStore(userName, fullName, avatarUrl, session.user.id);
		}
	};
</script>

<form on:submit|preventDefault={updateProfile}>
	<Avatar bind:url={avatarUrl} size={200} on:upload={updateProfile} />
	{#if session}
	<div><b>Email: {session.user.email}</b></div>
	{/if}
	<div>
		<label for="username">Username</label>
		<input
			id="username"
			type="text"
			placeholder={userName}
			bind:value={userName}
			class="input"
			required
		/>
	</div>
	<div>
		<label for="full_name">Full Name</label>
		<input
			id="full_name"
			type="text"
			placeholder={fullName}
			bind:value={fullName}
			class="input"
			required
		/>
	</div>
	<div>
		<label for="avatar_url">Avatar</label>
		<input
			id="avatar_url"
			type="text"
			placeholder={avatarUrl}
			bind:value={avatarUrl}
			class="input"
		/>
	</div>
	<button type="submit" disabled={profileLoading} class="button">
		{profileLoading ? 'Saving ...' : 'Update profile'}
	</button>
</form>

<style lang="scss">
	form {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		margin: auto;
		gap: 1rem;
		width: fit-content;
		padding: 0 3rem;
		background: rgb
		div {
			display: flex;
			flex-flow: column nowrap;
		}
		button {
			align-self: center;
		}
	}
</style>
