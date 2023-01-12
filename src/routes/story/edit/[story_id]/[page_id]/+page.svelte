<script lang="ts">
	import Canvas from '$lib/components/canvas/Canvas.svelte';

	export let data: EditPageProps;
</script>

<Canvas
	info={data.page[0]}
	isPublic={data.pages[0].storyId.isPublic}
	storyId={data.pages[0].storyId.id}
	firstPage={data.firstPage}
/>
