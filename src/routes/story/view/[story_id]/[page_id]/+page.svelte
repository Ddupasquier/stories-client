<script lang="ts">
	
	import CanvasView from '$lib/components/canvas/CanvasView.svelte';
	import { getPageThumbnail } from '$lib/services/getImages';

	export let data: ViewPageProps;
	
	let screenshot: { publicUrl: string } | undefined;

	

	$: if (data) {
		getPageThumbnail(data.page[0].screenshot).then((res) => {
			screenshot = res;
		});
	}
</script>

<CanvasView screenshot={screenshot?.publicUrl}/>
