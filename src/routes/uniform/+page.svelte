<script>
	import { UNIFORMS } from '$lib/data/uniforms.js';
	import UniformLightbox from '$lib/components/uniform/UniformLightbox.svelte';

	let active = $state(UNIFORMS[0].key);
	let open = $state(/** @type {import('$lib/data/uniforms.js').UniformSchool | null} */ (null));

	const activeInfo = $derived(UNIFORMS.find((c) => c.key === active) ?? UNIFORMS[0]);
	const schools = $derived(activeInfo.schools);
</script>

<svelte:head>
	<title>石家庄市校服展示</title>
	<meta name="description" content="石家庄市中小学生校服方案展示" />
</svelte:head>

<section class="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 md:px-8">
	<h1 class="text-3xl font-bold text-slate-900 dark:text-white">石家庄市校服展示</h1>
	<p class="mt-2 text-slate-600 dark:text-slate-400">石家庄市中小学生校服方案展示</p>

	<div class="mt-8 flex gap-3" role="tablist" aria-label="校服类别">
		{#each UNIFORMS as cat (cat.key)}
			<button
				type="button"
				role="tab"
				aria-selected={active === cat.key}
				class="rounded-full px-4 py-2 text-sm font-semibold transition
					{active === cat.key
					? 'bg-[#1558a6] text-white shadow-sm'
					: 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}"
				onclick={() => (active = cat.key)}
			>
				{cat.name}
			</button>
		{/each}
	</div>

	<div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
		{#each schools as school (school.code)}
			<button
				type="button"
				class="group overflow-hidden rounded-xl bg-slate-100 text-left ring-1 ring-slate-900/5 transition hover:ring-2 hover:ring-[#1558a6] dark:bg-slate-800 dark:ring-slate-800"
				aria-label="打开{activeInfo.name}编号{school.code}"
				onclick={() => (open = school)}
			>
				<img
					src={school.images[0]}
					alt="{activeInfo.name}编号{school.code}"
					loading="lazy"
					decoding="async"
					class="aspect-[3/2] w-full object-cover"
				/>
				<div class="px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-200">
					编号 {school.code}
				</div>
			</button>
		{/each}
	</div>
</section>

{#if open}
	<UniformLightbox
		school={open}
		categoryName={activeInfo.name}
		onClose={() => (open = null)}
		onPrev={() => {
			const idx = schools.findIndex((s) => s.code === open?.code);
			open = schools[(idx - 1 + schools.length) % schools.length];
		}}
		onNext={() => {
			const idx = schools.findIndex((s) => s.code === open?.code);
			open = schools[(idx + 1) % schools.length];
		}}
	/>
{/if}
