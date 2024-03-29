<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { avatarPlaceholder } from '$lib/assets';
	import { toast } from '@zerodevx/svelte-toast';

	export let size: number;
	export let url: string | null;

	let avatarUrl: string = '';
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			let { error } = await supabase.storage.from('avatars').upload(filePath, file);

			if (error) {
				throw error;
			}

			url = filePath;
			dispatch('upload');
		} catch (error) {
			if (error instanceof Error) {
				toast.push(error.message, {
					duration: 5000
				});
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div style="width: {size}px" aria-live="polite" class="container">
	{#if avatarUrl}
		<img src={avatarUrl} alt={avatarUrl ? 'Avatar' : 'No image'} />
	{:else}
		<img src={avatarPlaceholder} alt="No avatar uploaded" />
	{/if}
	<div style="width: {size}px" class="upload">
		<label class="button" for="single">
			{uploading ? 'Uploading ...' : 'Upload'}
		</label>
		<span style="display:none">
			<input
				type="file"
				id="single"
				accept="image/*"
				bind:files
				on:change={uploadAvatar}
				disabled={uploading}
			/>
		</span>
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;
	}

	img {
		width: 100%;
		border-radius: 50%;
		aspect-ratio: 1/1;
	}

	.upload {
		position: absolute;
		bottom: 1rem;
		right: -1rem;
		width: fit-content;
		text-align: right;
	}
</style>
