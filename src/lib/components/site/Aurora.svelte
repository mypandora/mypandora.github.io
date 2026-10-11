<script>
	/**
	 * Decorative drifting aurora background. Purely visual; pointer-events
	 * disabled and frozen under prefers-reduced-motion via global CSS.
	 *
	 * @type {{ class?: string }}
	 */
	let { class: className = '' } = $props();
</script>

<div class="pointer-events-none absolute inset-0 overflow-hidden {className}" aria-hidden="true">
	<div
		class="aurora-blob bg-brand-500/25 top-[-20%] left-[-10%] h-[38rem] w-[38rem]"
		style="--aurora-duration: 20s"
	></div>
	<div
		class="aurora-blob bg-accent-indigo/25 top-[-10%] right-[-12%] h-[34rem] w-[34rem]"
		style="--aurora-duration: 26s; animation-delay: -6s"
	></div>
	<div
		class="aurora-blob bg-accent-violet/20 bottom-[-35%] left-[30%] h-[36rem] w-[36rem]"
		style="--aurora-duration: 30s; animation-delay: -12s"
	></div>
</div>
