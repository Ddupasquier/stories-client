<script lang="ts">
	// import { beforeNavigate } from '$app/navigation';
	// import { page } from '$app/stores';
	import Canvas from '$lib/components/canvas/CanvasNoEdit.svelte';
	import { getPageThumbnail } from '$lib/services/getImages';
	// import { toast } from '@zerodevx/svelte-toast';
	// import {signout} from '$lib/services/auth';

	export let data: ViewPageProps;
	// const profileId = data.page[0].stories.profileId
	let screenshot: { publicUrl: string } | undefined;

	// const hasPermission = $page.data.session?.user.id !== profileId

	// beforeNavigate(({cancel}) => {
	// 	if ($page.route.id?.includes('view')) {
	// 		if (!hasPermission) {
	// 			cancel();
	// 			toast.push('You do not have permission to edit this story.');
	// 			signout();
	// 		}
	// 	}
	// });

	$: if (data) {
		getPageThumbnail(data.page[0].screenshot).then((res) => {
			screenshot = res;
		});
	}
</script>

<Canvas screenshot={screenshot?.publicUrl}/>
