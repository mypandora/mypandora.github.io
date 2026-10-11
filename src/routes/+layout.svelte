<script>
	import '@fontsource-variable/inter';
	import { ModeWatcher } from 'mode-watcher';
	import { navigating } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/site/Footer.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import '../app.css';

	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<ModeWatcher defaultMode="dark" />

{#if navigating.to}
	<PreloadingIndicator />
{/if}

<Nav />

<main class="pb-28 md:pb-0">
	{@render children?.()}
</main>

<Footer />
