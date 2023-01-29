<script lang="ts">
	
	import CanvasView from '../CanvasView.svelte';
	import { getPageThumbnail } from '$lib/services/getImages';

	export let data: ViewPageProps;
	// $: console.log(data)
	
	let screenshot: { publicUrl: string } | undefined;

	

	// $: if (data) {
	// 	getPageThumbnail(data.page[0].screenshot).then((res) => {
	// 		screenshot = res;
	// 	});
	// }
</script>

<CanvasView screenshot={screenshot?.publicUrl}/>
