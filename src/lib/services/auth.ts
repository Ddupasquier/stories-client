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

export const getProfile = async (id: string | undefined) => {
	if (id) {
		const { data, error } = await supabase
			.from('profiles')
			.select('username, fullName, avatarUrl')
			.eq('id', id)
			.single();
		if (error) {
			//do nothing
			toast.push(`Welcome! <br /><br /> You'll need to fill out your profile information before you can make a story :)`, { duration: 5000, pausable: true });
			return
			// throw new Error(error.message);
		}
		if (data) {
			username.set(data.username);
			fullname.set(data.fullName);
			avatar.set(data.avatarUrl);
			userId.set(id);
		}
	}
};
