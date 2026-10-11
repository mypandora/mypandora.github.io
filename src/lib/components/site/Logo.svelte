<script>
	import { resolve } from '$app/paths';

	/**
	 * @type {{ class?: string, showWordmark?: boolean }}
	 */
	let { class: className = '', showWordmark = true } = $props();
</script>

<a
	href={resolve('/')}
	class="group flex shrink-0 items-center gap-2.5 font-bold tracking-tight text-slate-50 {className}"
	aria-label="mypandora 首页"
>
	<img
		src="/favicon.svg"
		alt=""
		class="h-8 w-8 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-transform duration-300 group-hover:scale-105"
	/>
	{#if showWordmark}<span class="text-lg">mypandora</span>{/if}
</a>
