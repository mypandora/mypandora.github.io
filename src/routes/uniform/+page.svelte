<script>
	import { UNIFORMS } from '$lib/data/uniforms.js';
	import UniformLightbox from '$lib/components/uniform/UniformLightbox.svelte';
	import Aurora from '$lib/components/site/Aurora.svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { Shirt } from '@lucide/svelte';

	let active = $state(UNIFORMS[0].key);
	let open = $state(/** @type {import('$lib/data/uniforms.js').UniformSchool | null} */ (null));

	const activeInfo = $derived(UNIFORMS.find((c) => c.key === active) ?? UNIFORMS[0]);
	const schools = $derived(activeInfo.schools);
</script>

<svelte:head>
	<title>石家庄市校服展示</title>
	<meta name="description" content="石家庄市中小学生校服方案展示" />
	<link rel="preconnect" href="https://img.mypandora.cn" crossorigin="anonymous" />
</svelte:head>

<section class="relative overflow-hidden">
	<Aurora />
	<div class="grid-overlay pointer-events-none absolute inset-0"></div>
	<div class="relative mx-auto max-w-7xl px-4 pt-14 sm:px-6 sm:pt-20 md:px-8">
		<span
			use:reveal
			class="text-brand-300 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold"
		>
			<Shirt size={13} />
			校服方案
		</span>
		<h1 use:reveal={{ delay: 80 }} class="mt-4 text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl">
			石家庄市<span class="text-gradient">校服展示</span>
		</h1>
		<p use:reveal={{ delay: 140 }} class="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
			石家庄市中小学生校服方案展示,点击任意方案查看大图。
		</p>
	</div>
</section>

<section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-8">
	<div class="sticky top-[4.5rem] z-30 -mx-4 mt-8 px-4 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8">
		<div class="glass flex gap-2 rounded-full p-1.5" role="tablist" aria-label="校服类别">
			{#each UNIFORMS as cat (cat.key)}
				<button
					type="button"
					role="tab"
					aria-selected={active === cat.key}
					class="flex-1 rounded-full px-4 py-2 text-sm font-semibold transition sm:flex-none {active === cat.key
						? 'btn-gradient text-white shadow-[0_4px_16px_-4px_rgba(37,99,235,0.6)]'
						: 'text-slate-400 hover:text-white'}"
					onclick={() => (active = cat.key)}
				>
					{cat.name}
				</button>
			{/each}
		</div>
	</div>

	<div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
		{#each schools as school, i (school.code)}
			<div use:reveal={{ delay: (i % 12) * 40, threshold: 0.05 }}>
				<button
					type="button"
					class="glass spotlight-card group h-full overflow-hidden rounded-2xl p-0 text-left transition-transform duration-300 hover:-translate-y-1"
					aria-label="打开{activeInfo.name}编号{school.code}"
					onclick={() => (open = school)}
				>
					<div class="relative overflow-hidden">
						<img
							src={school.images[0]}
							alt="{activeInfo.name}编号{school.code}"
							loading="lazy"
							decoding="async"
							class="aspect-3/2 w-full object-cover transition duration-500 group-hover:scale-105"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"
						></div>
						<span
							class="absolute top-2.5 left-2.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm"
						>
							{school.code}
						</span>
					</div>
					<div class="flex items-center justify-between px-3.5 py-3">
						<span class="text-sm font-semibold text-slate-200">编号 {school.code}</span>
						<span class="text-xs text-slate-500">{school.images.length} 张</span>
					</div>
				</button>
			</div>
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
