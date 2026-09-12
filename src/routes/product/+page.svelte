<script>
	import ProjectCard from '$lib/components/site/ProjectCard.svelte';
	import { components, products, templates } from '$lib/data/projects';
</script>

<svelte:head>
	<title>产品 — mypandora</title>
	<meta name="description" content="mypandora 全部产品目录:开源组件、在线工具与完整模板。" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 sm:pt-14">
	<h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">产品</h1>
	<p class="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
		mypandora 的全部产品:可直接复用的开源组件、在线工具,以及开箱即用的模板。
	</p>
</div>

<section class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
	<div class="flex items-center gap-2">
		<h2 class="text-xl font-bold text-slate-900 dark:text-white">开源组件</h2>
		<span
			class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
			>{components.length}</span
		>
	</div>
	<div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
		{#each components as item, i (item.name)}
			<ProjectCard {item} index={i} />
		{/each}
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
	<div class="flex items-center gap-2">
		<h2 class="text-xl font-bold text-slate-900 dark:text-white">在线产品</h2>
		<span
			class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
			>{products.length}</span
		>
	</div>
	<div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
		{#each products as item, i (item.name)}
			<ProjectCard {item} index={i + components.length} />
		{/each}
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
	<div class="flex items-center gap-2">
		<h2 class="text-xl font-bold text-slate-900 dark:text-white">模板</h2>
		<span
			class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
			>{templates.length}</span
		>
	</div>
	<div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
		{#each templates as item, i (item.name)}
			<ProjectCard {item} index={i} />
		{/each}
	</div>
</section>
