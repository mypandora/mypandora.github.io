<!-- @migration task: review uses of `navigating` -->
<script>
	import { ModeWatcher } from 'mode-watcher';
	import { navigating } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher />

{#if navigating.to}
	<PreloadingIndicator />
{/if}

<Nav />

<main>
	{@render children?.()}
</main>
