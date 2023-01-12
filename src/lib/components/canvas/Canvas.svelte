<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { onMount } from 'svelte';
	import {beforeNavigate} from '$app/navigation';
	import { page } from '$app/stores';
	import { screenshotCanvas, isLocalhost } from '$lib/utils';
	import ImgElement from '$lib/components/canvas/ImgElement.svelte';
	import { uploadThumbnail, saveBgColor } from '$lib/services/pageActions';
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import HowToModal from '$lib/components/modals/HowToModal.svelte';
	import { howToIsOpen } from '$lib/stores/modalStore';
	import { unsaved, unsavedTrue, unsavedFalse } from '$lib/stores/storyStore';
	import { toast } from '@zerodevx/svelte-toast';
	import Clipboard from '$lib/components/canvas/Clipboard.svelte';

	export let info: CanvasProps;
	export let firstPage: number;
	export let isPublic: boolean;
	export let storyId: number;

	$: background = info.background;

	const setColor = (color: string) => {
		background = color;
		unsavedTrue();
	};

	onMount(() => {
		supabase
			.channel('public:elements')
			.on('postgres_changes', { event: '*', schema: 'public', table: 'elements' }, (payload) => {
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
			})
			.subscribe();
	});

	beforeNavigate(({cancel}) => {
		if ($unsaved) {
			cancel();
			toast.push('Please save your changes before leaving.');
		}
	})

	const doScreenshot = async () => {
		const file = await screenshotCanvas('#canvas');
		file && uploadThumbnail(file, $page.params.page_id);
	};

	const updateIsPublic = async (id: number) => {
		const { data, error } = await supabase
			.from('stories')
			.update({ isPublic: !isPublic })
			.match({ id: id })
			.select('isPublic');
		if (error) {
			toast.push('Oops, something went wrong.');
			throw new Error(error.message);
		} else {
			isPublic = data[0].isPublic;
			toast.push('Story is now ' + (isPublic ? 'public' : 'private'));
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
		<div id="tools">
			<ColorPicker color={background} {setColor} />
		</div>
		<div id="actions">
			<button
				class="publish"
				on:click={() => {
					updateIsPublic(storyId);
				}}
				title={isPublic ? 'Make story private' : 'Make story public'}
			>
				<svg
					fill={isPublic ? 'green' : 'red'}
					width="30px"
					height="30px"
					viewBox="0 0 32 32"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M17 26c0 0 6.188-2.062 11 1.812 0-0.062 0-1.812 0-1.812-5.625-3.125-11 0-11 0zM2 6v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938v-19.625c0 0-2.688-2.25-6.5-2.25s-6.5 2-6.5 2zM4 8h4v5h-4v-5zM13 21h-9v-1h9v1zM13 19h-9v-1h9v1zM13 17h-9v-1h9v1zM13 15h-9v-1h9v1zM9 8h4v1h-4v-1zM9 10h4v1h-4v-1zM9 12h4v1h-4v-1zM22.5 4c-3.812 0-6.5 2-6.5 2v19.875c0 0 2.688-1.938 6.5-1.938s6.5 1.938 6.5 1.938v-19.625c0 0-2.688-2.25-6.5-2.25zM27 21h-9v-1h9v1zM27 19h-9v-1h9v1zM27 17h-9v-1h9v1zM27 15h-9v-1h9v1zM27 13h-9v-1h9v1zM27 11h-9v-1h9v1zM27 9h-9v-1h9v1zM3 26c0 0 0 1.75 0 1.812 4.812-3.874 11-1.812 11-1.812s-5.375-3.125-11 0z"
					/>
				</svg>
			</button>
			<button
				class={$unsaved ? 'save unsaved' : 'save'}
				on:click={() => {
					unsavedFalse();
					doScreenshot();
					saveBgColor(info.id, background);
					toast.push({
						component: {
							src: Clipboard,
							props: {
								link: `${isLocalhost()}/story/view/${info.storyId}/${firstPage}`
							}
						},
						duration: 10000,
						pausable: true,
						theme: {
							'--toastPadding': '1rem',
							'--toastWidth': 'auto'
						}
					});
				}}
				title="Save"
			>
				<svg
					fill="#fff"
					width="30px"
					height="30px"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="Save_Up_2" data-name="Save Up 2">
						<g>
							<path
								d="M18.437,20.937H5.563a2.372,2.372,0,0,1-2.5-2.211v-11a2.372,2.372,0,0,1,2.5-2.212h.462a.5.5,0,0,1,0,1H5.563a1.381,1.381,0,0,0-1.5,1.212v11a1.38,1.38,0,0,0,1.5,1.211H18.437a1.38,1.38,0,0,0,1.5-1.211v-11a1.381,1.381,0,0,0-1.5-1.212h-.462a.5.5,0,0,1,0-1h.462a2.372,2.372,0,0,1,2.5,2.212v11A2.372,2.372,0,0,1,18.437,20.937Z"
							/>
							<path
								d="M8.645,6.213l3-3a.5.5,0,0,1,.35-.15.508.508,0,0,1,.36.15l3,3a.5.5,0,0,1-.71.71l-2.14-2.14v8.47a.508.508,0,0,1-.5.5.5.5,0,0,1-.5-.5V4.763l-2.15,2.16a.5.5,0,0,1-.71-.71Z"
							/>
						</g>
					</g>
				</svg>
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

	#tools {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		z-index: 1000;
	}

	@mixin action-buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		aspect-ratio: 1/1;
		border: none;
		background: black;
		border-radius: 50%;
		cursor: pointer;
		transition: all 0.5s;
		&:hover {
			transform: scale(1.1);
		}
		&:active {
			transform: scale(0.9);
		}
		svg {
			pointer-events: none;
		}
	}

	#actions {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		z-index: 1000;
		.publish {
			@include action-buttons;
		}
		.save {
			@include action-buttons;
		}
		.unsaved {
			animation: pulse-border 1s infinite;
		}
		@keyframes pulse-border {
			0% {
				box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
			}
			70% {
				box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
			}
			100% {
				box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
			}
		}
	}
</style>
