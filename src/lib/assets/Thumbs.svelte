<script lang="ts">
	export let color = 'black';
	export let height = '0';
	export let title: string
	export let isLiked: boolean;
</script>

<div style="transition: .5s; transform: rotate({isLiked ? '180deg' : '0deg'})">
	<svg width={height} {height} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<title>{title}</title>
		<g id="Complete">
			<g id="thumbs-up">
				<path
					d="M7.3,11.4,10.1,3a.6.6,0,0,1,.8-.3l1,.5a2.6,2.6,0,0,1,1.4,2.3V9.4h6.4a2,2,0,0,1,1.9,2.5l-2,8a2,2,0,0,1-1.9,1.5H4.3a2,2,0,0,1-2-2v-6a2,2,0,0,1,2-2h3v10"
					fill="none"
					stroke={color}
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
				/>
			</g>
		</g>
	</svg>
</div>
