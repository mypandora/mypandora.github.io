<script>
	import Swiper from 'swiper';
	import { Pagination } from 'swiper/modules';
	import 'swiper/css';
	import 'swiper/css/pagination';

	/** @type {{ images: string[], alt: string, register: (swiper: import('swiper').default) => void, onchange: (index: number) => void }} */
	let { images, alt, register, onchange } = $props();

	/** @type {HTMLDivElement | undefined} */
	let el = $state();

	$effect(() => {
		if (!el) return;
		const swiper = new Swiper(el, {
			modules: [Pagination],
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 300,
			pagination: { el: '.swiper-pagination', clickable: true }
		});
		register(swiper);
		onchange(0);
		swiper.on('slideChange', () => onchange(swiper.activeIndex));
		return () => swiper.destroy(true, true);
	});
</script>

<div bind:this={el} class="swiper h-full w-full">
	<div class="swiper-wrapper">
		{#each images as src, i (src)}
			<div class="swiper-slide flex items-center justify-center">
				<img
					{src}
					alt="{alt}第{i + 1}张"
					decoding="async"
					class="max-h-full max-w-full rounded-lg bg-neutral-900 object-contain shadow-xl"
				/>
			</div>
		{/each}
	</div>
	<div class="swiper-pagination"></div>
</div>

<style>
	:global(.swiper-pagination-bullet) {
		background: rgb(255 255 255 / 40%);
		opacity: 1;
	}
	:global(.swiper-pagination-bullet-active) {
		background: #fff;
	}
</style>
