<!-- GOOGLE ANALYTICS -->
<script lang="ts">
	import { page } from '$app/stores';

	const analyticsId = import.meta.env.VITE_ANALTYICS_ID;
	const googleAds = import.meta.env.VITE_ADSENSE_ID;

	$: {
		if (typeof gtag !== 'undefined') {
			gtag('config', analyticsId, {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=MEASUREMENT_ID">
	</script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', 'MEASUREMENT_ID');
	</script>
	<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={googleAds}"
     crossorigin="anonymous">

</script>
</svelte:head>
