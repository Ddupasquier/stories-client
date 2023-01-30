<script lang="ts">
	import CanvasEdit from '../../CanvasEdit.svelte';
	import TextInputModal from '$lib/components/modals/TextInputModal.svelte';
	import HowToModal from '$lib/components/modals/HowToModal.svelte';
	
	import { textInsertIsOpen, howToIsOpen } from '$lib/stores/modalStore';
	import { page } from '$app/stores';

	export let data: EditPageProps;
	const profileId = data.page[0].stories.profileId;
	const hasPermission: boolean | undefined = $page.data.session?.user.id === profileId;
</script>

<CanvasEdit
	info={data.page[0]}
	isPublic={data.pages[0].storyId.isPublic}
	storyId={data.pages[0].storyId.id}
	firstPage={data.firstPage}
	{hasPermission}
/>

{#if $textInsertIsOpen}
	<TextInputModal pageId={data.page[0].id} />
{/if}

{#if $howToIsOpen}
	<HowToModal />
{/if}