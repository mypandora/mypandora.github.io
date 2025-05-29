<!-- @migration task: review uses of `navigating` -->
<script>
	import { navigating } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import '../app.css';
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

{#if navigating}
	<PreloadingIndicator />
{/if}

<Nav />

<main>
	{@render children?.()}
</main>
