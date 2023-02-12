import { supabase } from '$lib/supabase';
import { username, fullname, avatar, userId } from '$lib/stores/userStore';
import { toast } from '@zerodevx/svelte-toast';

export const signout = () => {
	username.set(null);
	fullname.set(null);
	avatar.set(null);
	userId.set(null);

	supabase.auth.signOut();

	location.reload()
	toast.push('Signed out', { duration: 2000, pausable: true });
};


// * TODO: Add error handling for profile not existing
export const getProfile = async (id: string | undefined) => {
	if (id) {
		const { data, error } = await supabase
			.from('profiles')
			.select('username, fullName, avatarUrl')
			.eq('id', id)
			.single();

		if (error) {
			return
		}

		if (data) {
			username.set(data.username);
			fullname.set(data.fullName);
			avatar.set(data.avatarUrl);
			userId.set(id);
		}
	}
};
