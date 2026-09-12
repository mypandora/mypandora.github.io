<!-- @migration task: review uses of `navigating` -->
<script>
	import { ModeWatcher } from 'mode-watcher';
	import { navigating } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import '../app.css';

	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<ModeWatcher />

{#if navigating.to}
	<PreloadingIndicator />
{/if}

<Nav />

<main class="pb-16 md:pb-0">
	{@render children?.()}
</main>
