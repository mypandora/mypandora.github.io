<script>
	import { resolve } from '$app/paths';
	import SpotlightCard from '$lib/components/site/SpotlightCard.svelte';
	import SectionHeading from '$lib/components/site/SectionHeading.svelte';
	import Aurora from '$lib/components/site/Aurora.svelte';
	import BrowserMockup from '$lib/components/site/BrowserMockup.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { components, products, templates } from '$lib/data/projects';
	import { features } from '$lib/data/site';
	import { UNIFORMS } from '$lib/data/uniforms.js';
	import { ArrowRight, ArrowUpRight, Shirt } from '@lucide/svelte';

	const uniformCount = UNIFORMS.reduce((n, c) => n + c.schools.length, 0);
	const IMG_CDN = 'https://img.mypandora.cn';

	const stats = [
		{ value: components.length, label: '开源组件' },
		{ value: products.length, label: '在线产品' },
		{ value: uniformCount, label: '校服方案' },
		{ value: templates.length, label: '完整模板' }
	];
</script>

<svelte:head>
	<title>mypandora — 帮助你快速构建现代网站</title>
	<meta
		name="description"
		content="mypandora:开源组件与在线工具集合 — 报表、大屏设计器、表单设计器、聊天组件等,帮助你快速构建现代网站。"
	/>
</svelte:head>

<!-- Hero -->
<section class="relative overflow-hidden">
	<Aurora />
	<div class="grid-overlay pointer-events-none absolute inset-0"></div>

	<div class="relative mx-auto max-w-7xl px-4 pt-20 pb-10 text-center sm:px-6 sm:pt-28">
		<div use:reveal>
			<span class="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-slate-300">
				<span class="bg-accent-cyan h-1.5 w-1.5 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
				开源 · 现代 Web 工具与组件
			</span>
		</div>

		<h1
			use:reveal={{ delay: 80 }}
			class="mx-auto mt-7 max-w-4xl text-5xl leading-[1.08] font-extrabold tracking-tight text-balance text-slate-50 sm:text-7xl"
		>
			帮助你快速构建<br />
			<span class="text-gradient">现代网站</span>
		</h1>

		<p use:reveal={{ delay: 160 }} class="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
			提供各种有用的工具,包括:报表工具、大屏设计器、表单设计器、聊天组件、计算器组件、布局组件、季度选择器组件等等。
		</p>

		<div use:reveal={{ delay: 240 }} class="mt-9 flex flex-wrap items-center justify-center gap-3">
			<a
				href={resolve('/product')}
				class="btn-gradient glow focus-visible:ring-brand-400 focus-visible:ring-offset-base inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold text-white transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
			>
				浏览产品
				<ArrowRight size={16} />
			</a>
			<a
				href="https://github.com/mypandora"
				target="_blank"
				rel="external noopener noreferrer"
				class="glass inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold text-slate-200 transition hover:text-white"
			>
				<svg class="h-[18px] w-[18px]" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
					></path>
				</svg>
				GitHub
			</a>
		</div>
	</div>

	<!-- Browser preview -->
	<div class="relative mx-auto mt-6 max-w-5xl px-4 sm:px-6" use:reveal={{ delay: 200 }}>
		<BrowserMockup />
	</div>
</section>

<!-- Stats -->
<section class="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
	<div use:reveal class="glass grid grid-cols-2 gap-6 rounded-3xl px-6 py-8 sm:grid-cols-4 sm:px-10">
		{#each stats as stat (stat.label)}
			<div class="text-center">
				<p class="text-gradient text-4xl font-extrabold tabular-nums sm:text-5xl">{stat.value}</p>
				<p class="mt-2 text-sm text-slate-400">{stat.label}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Features -->
<section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
	<SectionHeading
		align="center"
		eyebrow="能力"
		title="构建现代网站所需的一切"
		subtitle="从数据可视化到表单与对话,一套可复用的前端能力。"
	/>
	<div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each features as feature, i (feature.title)}
			<div use:reveal={{ delay: (i % 3) * 90 }}>
				<div class="glass group h-full rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
					<div
						class="from-brand-500/20 to-accent-cyan/20 text-brand-400 group-hover:text-accent-cyan flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ring-1 ring-white/10 transition"
					>
						<feature.icon size={21} />
					</div>
					<h3 class="mt-5 text-base font-bold text-slate-100">{feature.title}</h3>
					<p class="mt-2 text-sm leading-7 text-slate-400">{feature.description}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Open source components -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
	<div class="flex items-end justify-between gap-4">
		<SectionHeading eyebrow="Components" title="开源组件" subtitle="可复用的前端组件库" />
		<a
			href={resolve('/product')}
			class="text-brand-400 hidden shrink-0 items-center gap-1 text-sm font-semibold transition hover:gap-1.5 sm:inline-flex"
		>
			查看全部 <ArrowRight size={15} />
		</a>
	</div>
	<div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
		{#each components as item, i (item.name)}
			<div use:reveal={{ delay: (i % 3) * 80 }}>
				<SpotlightCard {item} index={i} />
			</div>
		{/each}
	</div>
</section>

<!-- Online products -->
<section class="relative border-y border-white/5 bg-white/[0.02]">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
		<SectionHeading eyebrow="Products" title="在线产品" subtitle="可直接使用的在线工具" />
		<div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
			{#each products as item, i (item.name)}
				<div use:reveal={{ delay: (i % 3) * 80 }}>
					<SpotlightCard {item} index={i + components.length} />
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Uniform showcase banner -->
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
	<div use:reveal class="spotlight-card glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
		<div class="grid items-center gap-10 md:grid-cols-2">
			<div>
				<span
					class="text-brand-300 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold"
				>
					<Shirt size={13} />
					校服方案
				</span>
				<h2 class="mt-5 text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl">
					石家庄市<span class="text-gradient">校服方案展示</span>
				</h2>
				<p class="mt-4 max-w-md text-sm leading-7 text-slate-400">
					小学、初中、高中(中职){uniformCount} 套校服方案在线浏览,支持大图灯箱与键盘切换。
				</p>
				<a
					href={resolve('/uniform')}
					class="btn-gradient glow mt-7 inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white"
				>
					进入展示
					<ArrowRight size={16} />
				</a>
			</div>

			<div class="relative grid grid-cols-3 gap-3">
				<img
					src="{IMG_CDN}/primary/A1/1.webp"
					alt="小学校服方案 A1"
					loading="lazy"
					decoding="async"
					class="mt-6 aspect-3/4 w-full rounded-2xl object-cover ring-1 ring-white/10 transition duration-500 hover:scale-105"
				/>
				<img
					src="{IMG_CDN}/junior/B1/1.webp"
					alt="初中校服方案 B1"
					loading="lazy"
					decoding="async"
					class="aspect-3/4 w-full rounded-2xl object-cover ring-1 ring-white/10 transition duration-500 hover:scale-105"
				/>
				<img
					src="{IMG_CDN}/primary/A2/1.webp"
					alt="小学校服方案 A2"
					loading="lazy"
					decoding="async"
					class="mt-6 aspect-3/4 w-full rounded-2xl object-cover ring-1 ring-white/10 transition duration-500 hover:scale-105"
				/>
			</div>
		</div>
	</div>
</section>

<!-- Templates -->
<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
	<SectionHeading eyebrow="Templates" title="模板" subtitle="开箱即用的完整模板" />
	<div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
		{#each templates as item, i (item.name)}
			<div use:reveal={{ delay: (i % 3) * 80 }}>
				<SpotlightCard {item} index={i} />
			</div>
		{/each}
	</div>
</section>

<!-- Final CTA -->
<section class="relative mx-auto max-w-7xl overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
	<div use:reveal class="glass relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:py-20">
		<Aurora />
		<div class="relative">
			<h2 class="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-balance text-slate-50 sm:text-4xl">
				在 GitHub 上关注 <span class="text-gradient">mypandora</span>
			</h2>
			<p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
				所有开源组件持续更新,欢迎 Star、反馈与共建。
			</p>
			<a
				href="https://github.com/mypandora"
				target="_blank"
				rel="external noopener noreferrer"
				class="glass mt-8 inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-semibold text-slate-100 transition hover:text-white"
			>
				访问 GitHub
				<ArrowUpRight size={16} />
			</a>
		</div>
	</div>
</section>
