import { supabase } from '$lib/supabase';
import type { AuthSession } from '@supabase/supabase-js';

export async function load() {
	let session: AuthSession | null = null;

	supabase.auth.onAuthStateChange((_event, _session) => {
		session = _session;
	});

	const { data: sessionData } = await supabase.auth.getSession();

	if (sessionData) {
		session = sessionData;
	}

	return session;
}
