<script>
	import { ArrowUpRight } from '@lucide/svelte';
	import { external } from '$lib/data/projects';

	const covers = [
		'from-[#1558a6] via-[#2563eb] to-[#0ea5e9]',
		'from-[#6d28d9] via-[#7c3aed] to-[#38bdf8]',
		'from-[#0f766e] via-[#0d9488] to-[#22d3ee]'
	];

	/** @type {{ item: import('$lib/data/projects.js').Project, index?: number }} */
	let { item, index = 0 } = $props();

	const isExternal = $derived(external(item.link));
	const cover = $derived(covers[index % covers.length]);
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	href={item.link}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'external noopener noreferrer' : undefined}
	class="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-800/60"
>
	<div class="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br {cover}">
		<span class="px-4 text-center font-mono text-lg font-bold tracking-tight break-words text-white/90 sm:text-2xl"
			>{item.name}</span
		>
		<span
			class="absolute top-3 left-3 rounded-full bg-black/25 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-sm"
		>
			{isExternal ? '在线服务' : '开源'}
		</span>
	</div>
	<div class="flex flex-1 flex-col p-4 sm:p-5">
		<p class="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
		<div class="mt-3 flex flex-wrap gap-1.5">
			{#each item.stack.split(',') as tag, ti (ti)}
				<span
					class="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700/70 dark:text-slate-300"
					>{tag.trim()}</span
				>
			{/each}
		</div>
		<span
			class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1558a6] transition group-hover:gap-1.5 dark:text-sky-400"
		>
			查看
			<ArrowUpRight size={15} />
		</span>
	</div>
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
