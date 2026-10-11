<script>
	import { onMount } from 'svelte';
	import { ArrowUpRight } from '@lucide/svelte';
	import { external } from '$lib/data/projects';

	const covers = [
		'from-brand-500 via-brand-400 to-accent-cyan',
		'from-accent-indigo via-brand-500 to-accent-cyan',
		'from-violet-600 via-accent-indigo to-brand-400'
	];

	/** @type {{ item: import('$lib/data/projects.js').Project, index?: number }} */
	let { item, index = 0 } = $props();

	const isExternal = $derived(external(item.link));
	const cover = $derived(covers[index % covers.length]);

	/** @type {HTMLElement | null} */
	let card = $state(null);

	onMount(() => {
		if (!card || !window.matchMedia('(pointer: fine)').matches) return;
		/** @param {PointerEvent} e */
		function onMove(e) {
			if (!card) return;
			const rect = card.getBoundingClientRect();
			card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
			card.style.setProperty('--my', `${e.clientY - rect.top}px`);
		}
		card.addEventListener('pointermove', onMove);
		return () => card?.removeEventListener('pointermove', onMove);
	});
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	bind:this={card}
	href={item.link}
	target={isExternal ? '_blank' : undefined}
	rel={isExternal ? 'external noopener noreferrer' : undefined}
	class="spotlight-card glass group flex flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1.5"
>
	<div class="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br {cover}">
		<div
			class="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [mask-image:radial-gradient(14rem_at_50%_40%,black,transparent)] [background-size:28px_28px] opacity-40"
		></div>
		<span
			class="relative px-4 text-center font-mono text-lg font-bold tracking-tight break-words text-white drop-shadow sm:text-xl"
			>{item.name}</span
		>
		<span
			class="absolute top-3 left-3 rounded-full border border-white/20 bg-black/30 px-2.5 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-sm"
		>
			{isExternal ? '在线服务' : '开源'}
		</span>
	</div>
	<div class="flex flex-1 flex-col p-4 sm:p-5">
		<p class="line-clamp-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
		<div class="mt-3 flex flex-wrap gap-1.5">
			{#each item.stack.split(',') as tag, ti (ti)}
				<span class="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium text-slate-300"
					>{tag.trim()}</span
				>
			{/each}
		</div>
		<span
			class="text-brand-400 mt-4 inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-1.5"
		>
			查看
			<ArrowUpRight size={15} />
		</span>
	</div>
</a>
<!-- eslint-enable svelte/no-navigation-without-resolve -->
