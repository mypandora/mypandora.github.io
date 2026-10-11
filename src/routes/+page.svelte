<script>
	import { resolve } from '$app/paths';
	import SpotlightCard from '$lib/components/site/SpotlightCard.svelte';
	import { components, products, templates } from '$lib/data/projects';
</script>

<svelte:head>
	<title>mypandora — 帮助你快速构建现代网站</title>
	<meta
		name="description"
		content="mypandora:开源组件与在线工具集合 — 报表、大屏设计器、表单设计器、聊天组件等,帮助你快速构建现代网站。"
	/>
</svelte:head>

<section class="hero-grid relative overflow-hidden">
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_50%_-10%,rgba(21,88,166,0.12),transparent)]"
	></div>
	<div class="relative mx-auto max-w-7xl px-4 pt-16 pb-14 text-center sm:px-6 sm:pt-24 sm:pb-20">
		<span
			class="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"
		>
			开源 · 现代 Web 工具与组件
		</span>
		<h1
			class="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-6xl dark:text-white"
		>
			帮助你快速构建
			<span class="bg-gradient-to-r from-[#1558a6] via-[#2563eb] to-[#0ea5e9] bg-clip-text text-transparent"
				>现代网站</span
			>
		</h1>
		<p class="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
			提供各种有用的工具,包括:报表工具、大屏设计器、表单设计器、聊天组件、计算器组件、布局组件、季度选择器组件等等。
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
			<a
				href={resolve('/product')}
				class="inline-flex h-11 items-center rounded-full bg-[#1558a6] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#175fb4] focus-visible:ring-2 focus-visible:ring-[#1558a6] focus-visible:ring-offset-2 focus-visible:outline-none"
				>浏览产品</a
			>
			<a
				href="https://github.com/mypandora"
				target="_blank"
				rel="external noopener noreferrer"
				class="inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
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
</section>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
	<div class="flex items-end justify-between">
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">开源组件</h2>
			<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">可复用的前端组件库</p>
		</div>
		<a href={resolve('/product')} class="hidden text-sm font-semibold text-[#1558a6] sm:block dark:text-sky-400">
			查看全部 →
		</a>
	</div>
	<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
		{#each components as item, i (item.name)}
			<SpotlightCard {item} index={i} />
		{/each}
	</div>
</section>

<section class="bg-slate-50 dark:bg-slate-800/40">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">在线产品</h2>
			<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">可直接使用的在线工具</p>
		</div>
		<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
			{#each products as item, i (item.name)}
				<SpotlightCard {item} index={i + components.length} />
			{/each}
		</div>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
	<div class="flex items-end justify-between">
		<div>
			<h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">模板</h2>
			<p class="mt-1 text-sm text-slate-500 dark:text-slate-400">开箱即用的完整模板</p>
		</div>
	</div>
	<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
		{#each templates as item, i (item.name)}
			<SpotlightCard {item} index={i} />
		{/each}
	</div>
</section>

<footer class="border-t border-slate-200 pt-10 pb-6 dark:border-slate-800">
	<div
		class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-sm text-slate-500 sm:px-6 md:flex-row md:justify-between dark:text-slate-400"
	>
		<p>© 2024 mypandora.cn</p>
		<nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" aria-label="页脚导航">
			<a href={resolve('/product')} class="hover:text-slate-900 dark:hover:text-white">产品</a>
			<a href={resolve('/showcase')} class="hover:text-slate-900 dark:hover:text-white">示例</a>
			<a href={resolve('/uniform')} class="hover:text-slate-900 dark:hover:text-white">校服</a>
			<a
				href="https://github.com/mypandora"
				target="_blank"
				rel="external noopener noreferrer"
				class="hover:text-slate-900 dark:hover:text-white"
			>
				GitHub
			</a>
		</nav>
		<a
			href="https://beian.miit.gov.cn/"
			target="_blank"
			rel="external noopener noreferrer"
			class="hover:text-slate-900 dark:hover:text-white"
		>
			京ICP备2024065750号-1
		</a>
	</div>
</footer>

<style>
	.hero-grid {
		background-image:
			linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
		background-size:
			24px 24px,
			24px 24px;
		background-position:
			-1px -1px,
			-1px -1px;
	}
	:global(.dark) .hero-grid {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
	}
</style>
