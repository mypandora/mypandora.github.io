<script>
	import { onMount } from 'svelte';

	let p = $state(0);
	let visible = $state(false);

	onMount(() => {
		visible = true;
		/** @type {ReturnType<typeof setTimeout> | undefined} */
		let timer;
		function next() {
			p += 0.1;
			const remaining = 1 - p;
			if (remaining > 0.15) {
				timer = setTimeout(next, 500 / remaining);
			}
		}
		timer = setTimeout(next, 80);
		return () => {
			if (timer) clearTimeout(timer);
		};
	});
</script>

{#if visible}
	<div class="fixed inset-x-0 top-0 z-[60] h-0.5">
		<div
			class="from-brand-500 via-brand-400 to-accent-cyan h-full rounded-r-full bg-gradient-to-r shadow-[0_0_12px_rgba(56,189,248,0.8)] transition-[width] duration-300 ease-out"
			style="width: {p * 100}%"
		></div>
	</div>
{/if}
