<script lang="ts">
	import Canvas from '$lib/components/canvas/Canvas.svelte';
	import TextInputModal from '$lib/components/modals/TextInputModal.svelte';
	import { textInsertIsOpen } from '$lib/stores/modalStore';

	export let data: EditPageProps;
</script>

<Canvas
	info={data.page[0]}
	isPublic={data.pages[0].storyId.isPublic}
	storyId={data.pages[0].storyId.id}
	firstPage={data.firstPage}
/>

{#if $textInsertIsOpen}
	<TextInputModal pageId={data.page[0].id}/>
{/if}