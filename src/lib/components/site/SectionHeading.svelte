<script>
	import { reveal } from '$lib/actions/reveal.js';

	/**
	 * @type {{ eyebrow?: string, title: string, subtitle?: string, align?: 'left'|'center', class?: string }}
	 */
	let { eyebrow, title, subtitle, align = 'left', class: className = '' } = $props();
</script>

<div
	class="{align === 'center' ? 'items-center text-center' : 'items-start text-left'} flex flex-col {className}"
	use:reveal
>
	{#if eyebrow}
		<span class="text-gradient inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase">
			{eyebrow}
		</span>
	{/if}
	<h2 class="mt-3 text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">{title}</h2>
	{#if subtitle}
		<p class="mt-2 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">{subtitle}</p>
	{/if}
</div>
