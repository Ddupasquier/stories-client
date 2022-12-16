import { user, name, avatar, id } from '$lib/stores/userStore';

export const signout = () => {
      user.set(null);
      name.set(null);
      avatar.set(null);
      id.set(null);
};
