/**
 * Svelte action: scroll-into-view reveal.
 * Owns the `reveal`/`in` classes paired with the `.reveal` CSS, so markup
 * only needs `use:reveal`. Activates once when the element enters the
 * viewport. Content stays visible when JS/IntersectionObserver is missing.
 *
 * Apply to wrapper elements: the activated transition owns the node's
 * `transition` property, so interactive hover transitions belong on a
 * child element.
 *
 * @param {HTMLElement} node
 * @param {{ delay?: number, threshold?: number }} [options]
 * @returns {{ destroy(): void }}
 */
export function reveal(node, options = {}) {
	const { delay = 0, threshold = 0.15 } = options;
	const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (prefersReduced() || typeof IntersectionObserver === 'undefined') {
		node.classList.add('reveal', 'in');
		return { destroy() {} };
	}

	node.classList.add('reveal');
	if (delay) node.style.transitionDelay = `${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('in');
					node.addEventListener(
						'transitionend',
						() => {
							node.style.transitionDelay = '';
						},
						{ once: true }
					);
					observer.unobserve(node);
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}

/**
 * Svelte action: subtle scroll parallax. Translates the element vertically
 * based on its position relative to the viewport center. No-op when the
 * user prefers reduced motion.
 *
 * @param {HTMLElement} node
 * @param {{ speed?: number }} [options]
 * @returns {{ destroy(): void }}
 */
export function parallax(node, options = {}) {
	const { speed = 0.15 } = options;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return { destroy() {} };
	}

	let frame = 0;

	function update() {
		frame = 0;
		const rect = node.getBoundingClientRect();
		const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
		node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
	}

	function onScroll() {
		if (!frame) frame = requestAnimationFrame(update);
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
	update();

	return {
		destroy() {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			if (frame) cancelAnimationFrame(frame);
		}
	};
}
