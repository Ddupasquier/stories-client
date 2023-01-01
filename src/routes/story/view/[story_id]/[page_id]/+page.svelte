<script lang="ts">
	import Canvas from '$lib/components/canvas/CanvasNoEdit.svelte';

	export let data: EditPageProps;
</script>

<Canvas info={data.page[0]} />
