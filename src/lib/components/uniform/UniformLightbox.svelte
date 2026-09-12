<script>
	import { X, ChevronLeft, ChevronRight } from '@lucide/svelte';

	let { school, categoryName, onClose, onPrev, onNext } = $props();
	let current = $state(0);

	function prevImage() {
		current = (current - 1 + school.images.length) % school.images.length;
	}

	function nextImage() {
		current = (current + 1) % school.images.length;
	}

	$effect(() => {
		// 预加载：当前套其余图 + 相邻套封面
		school.images.forEach((/** @type {string} */ src) => {
			const img = new Image();
			img.src = src;
		});
		current = 0;
	});

	$effect(() => {
		/** @param {KeyboardEvent} e */
		function onKeydown(e) {
			if (e.key === 'Escape') onClose();
			if (e.key === 'ArrowLeft') prevImage();
			if (e.key === 'ArrowRight') nextImage();
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
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/85 pr-5 pb-5 pl-5 sm:pr-8 sm:pb-8 sm:pl-8"
	role="dialog"
	aria-modal="true"
	aria-label="{categoryName}编号{school.code}方案"
	tabindex="-1"
>
	<button type="button" aria-label="关闭" class="absolute inset-0 z-0 cursor-default bg-transparent" onclick={onClose}
	></button>

	<div class="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col">
		<div class="flex items-center justify-between text-white">
			<h2 class="text-sm font-semibold">{categoryName}编号{school.code}</h2>
			<button
				type="button"
				class="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
				aria-label="关闭"
				onclick={onClose}
			>
				<X size={18} />
			</button>
		</div>

		<div class="relative mt-4 flex min-h-0 flex-1 items-center justify-center">
			<button
				type="button"
				class="absolute left-1 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-3"
				aria-label="上一张"
				onclick={prevImage}
			>
				<ChevronLeft size={20} />
			</button>

			<img
				src={school.images[current]}
				alt="{categoryName}编号{school.code}第{current + 1}张"
				decoding="async"
				class="max-h-full w-auto max-w-full rounded-lg bg-neutral-900 object-contain shadow-xl"
			/>

			<button
				type="button"
				class="absolute right-1 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-3"
				aria-label="下一张"
				onclick={nextImage}
			>
				<ChevronRight size={20} />
			</button>
		</div>

		<div class="mt-4 flex items-center justify-between text-white">
			<button
				type="button"
				class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
				onclick={onPrev}
			>
				上一套
			</button>
			<span class="text-sm text-white/70">第 {current + 1} 张 / 共 {school.images.length} 张</span>
			<button
				type="button"
				class="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
				onclick={onNext}
			>
				下一套
			</button>
		</div>
	</div>
</div>
