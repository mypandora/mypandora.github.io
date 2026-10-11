<script>
	import SpotlightCard from '$lib/components/site/SpotlightCard.svelte';
	import SectionHeading from '$lib/components/site/SectionHeading.svelte';
	import Aurora from '$lib/components/site/Aurora.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { components, products, templates } from '$lib/data/projects';
</script>

<svelte:head>
	<title>产品 — mypandora</title>
	<meta name="description" content="mypandora 全部产品目录:开源组件、在线工具与完整模板。" />
</svelte:head>

<section class="relative overflow-hidden">
	<Aurora />
	<div class="grid-overlay pointer-events-none absolute inset-0"></div>
	<div class="relative mx-auto max-w-7xl px-4 pt-16 pb-4 sm:px-6 sm:pt-20">
		<p use:reveal class="text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase">mypandora / 产品</p>
		<h1 use:reveal={{ delay: 80 }} class="mt-3 text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl">
			<span class="text-gradient">产品</span>目录
		</h1>
		<p use:reveal={{ delay: 140 }} class="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
			mypandora 的全部产品:可直接复用的开源组件、在线工具,以及开箱即用的模板。
		</p>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
	<div class="flex items-center gap-3">
		<SectionHeading eyebrow="Components" title="开源组件" />
		<span class="text-brand-300 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold"
			>{components.length}</span
		>
	</div>
	<div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
		{#each components as item, i (item.name)}
			<div use:reveal={{ delay: (i % 3) * 80 }}>
				<SpotlightCard {item} index={i} />
			</div>
		{/each}
	</div>
</section>

<section class="relative border-y border-white/5 bg-white/[0.02]">
	<div class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
		<div class="flex items-center gap-3">
			<SectionHeading eyebrow="Products" title="在线产品" />
			<span class="text-brand-300 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold"
				>{products.length}</span
			>
		</div>
		<div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
			{#each products as item, i (item.name)}
				<div use:reveal={{ delay: (i % 3) * 80 }}>
					<SpotlightCard {item} index={i + components.length} />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 py-10 sm:px-6">
	<div class="flex items-center gap-3">
		<SectionHeading eyebrow="Templates" title="模板" />
		<span class="text-brand-300 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold"
			>{templates.length}</span
		>
	</div>
	<div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
		{#each templates as item, i (item.name)}
			<div use:reveal={{ delay: (i % 3) * 80 }}>
				<SpotlightCard {item} index={i} />
			</div>
		{/each}
	</div>
</section>
