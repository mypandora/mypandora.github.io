<script>
	import { fade, scale } from 'svelte/transition';
	import { X, ChevronLeft, ChevronRight } from '@lucide/svelte';
	import UniformGallery from './UniformGallery.svelte';

	let { school, categoryName, onClose, onPrev, onNext } = $props();
	let current = $state(0);
	/** @type {import('swiper').default | null} */
	let gallery = $state(null);

	$effect(() => {
		/** @param {KeyboardEvent} e */
		function onKeydown(e) {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowLeft') gallery?.slidePrev();
			if (e.key === 'ArrowRight') gallery?.slideNext();
		}
		window.addEventListener('keydown', onKeydown);
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			window.removeEventListener('keydown', onKeydown);
			document.body.style.overflow = prev;
		};
	});
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-md sm:p-8"
	role="dialog"
	aria-modal="true"
	aria-label="{categoryName}编号{school.code}方案"
	tabindex="-1"
	transition:fade={{ duration: 200 }}
>
	<button type="button" aria-label="关闭" class="absolute inset-0 z-0 cursor-default bg-transparent" onclick={onClose}
	></button>

	<div
		class="glass relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col rounded-3xl p-4 sm:p-6"
		transition:scale={{ duration: 220, start: 0.94 }}
	>
		<div class="flex items-center justify-between text-slate-100">
			<h2 class="flex items-center gap-2 text-sm font-semibold">
				<span
					class="from-brand-500 to-accent-cyan rounded-full bg-gradient-to-r px-2.5 py-0.5 text-xs font-bold text-white"
				>
					{school.code}
				</span>
				{categoryName}校服方案
			</h2>
			<button
				type="button"
				class="glass flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition hover:text-white"
				aria-label="关闭"
				onclick={onClose}
			>
				<X size={18} />
			</button>
		</div>

		<div class="relative mt-4 flex min-h-0 flex-1">
			{#key school.code}
				<UniformGallery
					images={school.images}
					alt="{categoryName}编号{school.code}"
					register={(swiper) => (gallery = swiper)}
					onchange={(index) => (current = index)}
				/>
			{/key}

			<button
				type="button"
				class="glass absolute top-1/2 left-1 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-slate-200 transition hover:text-white sm:left-3"
				aria-label="上一张"
				onclick={() => gallery?.slidePrev()}
			>
				<ChevronLeft size={20} />
			</button>

			<button
				type="button"
				class="glass absolute top-1/2 right-1 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-slate-200 transition hover:text-white sm:right-3"
				aria-label="下一张"
				onclick={() => gallery?.slideNext()}
			>
				<ChevronRight size={20} />
			</button>
		</div>

		<div class="mt-4 flex items-center justify-between text-slate-200">
			<button
				type="button"
				class="glass rounded-full px-4 py-2 text-sm font-semibold transition hover:text-white"
				onclick={onPrev}
			>
				上一套
			</button>
			<span class="text-sm text-slate-400 tabular-nums">
				第 {current + 1} 张 / 共 {school.images.length} 张
			</span>
			<button
				type="button"
				class="glass rounded-full px-4 py-2 text-sm font-semibold transition hover:text-white"
				onclick={onNext}
			>
				下一套
			</button>
		</div>
	</div>
</div>
