<script lang="ts">
	import Canvas from '$lib/components/canvas/CanvasNoEdit.svelte';
	import { getPageThumbnail } from '$lib/services/getImages';

	export let data: ViewPageProps;
	let screenshot: { publicUrl: string } | undefined;

	$: if (data) {
		getPageThumbnail(data.page[0].screenshot).then((res) => {
			screenshot = res;
		});
	}
</script>

<Canvas screenshot={screenshot?.publicUrl} />
