<script>
	import ProjectCard from '$lib/components/site/ProjectCard.svelte';
	import { templates } from '$lib/data/projects';
</script>

<svelte:head>
	<title>示例 — mypandora</title>
	<meta name="description" content="mypandora 模板与在线示例,支持 PC、移动端与暗黑模式。" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 sm:pt-14">
	<h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">示例</h1>
	<p class="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">基于 mypandora 能力构建的完整模板与在线示例。</p>
</div>

<section class="mx-auto max-w-7xl px-4 py-8 sm:px-6">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
		{#each templates as item, i (item.name)}
			<ProjectCard {item} index={i} />
		{/each}
	</div>
</section>
