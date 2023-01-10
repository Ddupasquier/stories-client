<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { screenshotCanvas } from '$lib/utils';
	import ImgElement from '$lib/components/canvas/ImgElement.svelte';
	import { uploadThumbnail, saveBgColor } from '$lib/services/pageActions';
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import HowToModal from '$lib/components/modals/HowToModal.svelte';
	import { howToIsOpen } from '$lib/stores/modalStore';

	export let info: {
		id: number;
		pageNumber: number;
		background: string;
		elements: PageElement[];
	};

	export let isPublic: boolean;
	export let storyId: number;

	$: background = info.background;

	const setColor = (color: string) => {
		background = color;
	};

	onMount(() => {
		supabase
			.channel('public:elements')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'elements' },
				(payload) => {
					if (payload.eventType === 'INSERT') {
						info.elements = [...info.elements, payload.new] as PageElement[];
					}
					if (payload.eventType === 'DELETE') {
						info.elements = info.elements.filter((element) => element.id !== payload.old.id);
					}
					if (payload.eventType === 'UPDATE') {
						info.elements = info.elements.map((element) => {
							if (element.id === payload.new.id) {
								return payload.new;
							}
							return element;
						});
					}
				}
				
			)
			.subscribe();
	});

	const doScreenshot = async () => {
		const file = await screenshotCanvas('#canvas');
		file && uploadThumbnail(file, $page.params.page_id);
	};

	const updateIsPublic = async (id: number) => {
		const { data, error } = await supabase
			.from('stories')
			.update({ isPublic: !isPublic })
			.match({ id: id })
			.select('isPublic')
		if (error) {
			throw new Error(error.message);
		} else {
			isPublic = data[0].isPublic;
		}
	};
</script>

{#if info.background}
	<div id="canvas" style="background: {background}">
		{#if info.elements}
			{#each info.elements as element}
				<ImgElement {element} />
			{/each}
		{/if}
		{#if $howToIsOpen}
			<HowToModal />
		{/if}
		<div id="controls">
			<button class="public" on:click={() => {updateIsPublic(storyId)}} title="Make Public?">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill={isPublic ? 'yellow' : 'rgba(255, 255, 255, 0.5)'}
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="feather feather-star"
				>
					<path d="M12 2L15.54 8.46 22 9.74 17.27 14.27 18.55 21 12 18.18 5.45 21 6.73 14.27 2 9.74 8.46 8.46 12 2z"></path>
				</svg>
			</button>
			<ColorPicker color={background} {setColor} />
			<button
				class="save"
				on:click={() => {
					doScreenshot();
					saveBgColor(info.id, background);
				}}
			>
				Save
			</button>
		</div>
	</div>
{/if}

<style lang="scss">
	#canvas {
		position: relative;
		width: 100%;
		aspect-ratio: 16/7;
		overflow: hidden;
	}

	#controls {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		z-index: 1000;
		.public {
			width: fit-content;
			aspect-ratio: 1/1;
			border: none;
			background: none;
			cursor: pointer;
			svg {
				pointer-events: none;

			}
		}
	}
	.save {
		width: fit-content;
		aspect-ratio: 1/1;
		padding: 0.5rem;
		background-color: rgba(255, 255, 255, 0.493);
		border-radius: 50%;
		border: none;
		color: rgb(0, 0, 0);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: .8rem;
		font-weight: 600;
		transition: all .5s;
		&:hover {
			transform: scale(1.1);
		}
		&:active {
			transform: scale(0.9);
		}
	}
</style>
