<script lang="ts">
	import Canvas from '$lib/components/canvas/Canvas.svelte';

	export let data: EditPageProps;
</script>

<Canvas info={data.page[0]} />
