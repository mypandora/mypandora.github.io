<script>
	import { userPrefersMode, setMode } from 'mode-watcher';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Sun, Moon, Monitor, Home, Package, Shirt, Sparkles } from '@lucide/svelte';
	import Logo from './site/Logo.svelte';
	import { onMount } from 'svelte';

	/** @type {Array<{ href: '/' | '/product' | '/uniform' | '/showcase', label: string, icon: typeof Home }>} */
	const links = [
		{ href: '/', label: '首页', icon: Home },
		{ href: '/product', label: '产品', icon: Package },
		{ href: '/uniform', label: '校服', icon: Shirt },
		{ href: '/showcase', label: '示例', icon: Sparkles }
	];

	/** @param {string} href */
	const active = (href) => {
		const p = page.url.pathname;
		return href === '/' ? p === '/' : p.startsWith(href);
	};

	function cycleTheme() {
		const current = userPrefersMode.current;
		setMode(current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light');
	}

	let scrolled = $state(false);
	let frame = 0;

	onMount(() => {
		function onScroll() {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				scrolled = window.scrollY > 8;
			});
		}
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	});
</script>

<!-- Desktop floating island -->
<header class="pointer-events-none sticky top-0 z-40 px-4 pt-3">
	<div
		class="pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full px-4 pl-5 transition-all duration-300 md:px-5 {scrolled
			? 'glass glow'
			: 'border border-transparent bg-transparent'}"
	>
		<Logo />

		<nav class="hidden items-center gap-1 md:flex" aria-label="主导航">
			{#each links as link (link.href)}
				<a
					href={resolve(link.href)}
					class="relative rounded-full px-4 py-2 text-sm font-medium transition {active(link.href)
						? 'text-white'
						: 'text-slate-400 hover:text-white'}"
				>
					{#if active(link.href)}
						<span class="btn-gradient absolute inset-0 rounded-full opacity-95"></span>
					{/if}
					<span class="relative">{link.label}</span>
				</a>
			{/each}
		</nav>

		<button
			type="button"
			aria-label="切换主题"
			class="glass flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition hover:text-white"
			onclick={cycleTheme}
		>
			{#if userPrefersMode.current === 'light'}
				<Sun size={17} />
			{:else if userPrefersMode.current === 'dark'}
				<Moon size={17} />
			{:else}
				<Monitor size={17} />
			{/if}
		</button>
	</div>
</header>

<!-- Mobile floating dock -->
<nav
	class="glass fixed inset-x-4 bottom-4 z-40 grid grid-cols-4 rounded-2xl py-1.5 md:hidden"
	style="padding-bottom: calc(0.375rem + env(safe-area-inset-bottom))"
	aria-label="移动端导航"
>
	{#each links as link (link.href)}
		<a
			href={resolve(link.href)}
			class="flex flex-col items-center gap-0.5 py-1.5 text-[11px] font-medium transition {active(link.href)
				? 'text-brand-400'
				: 'text-slate-500'}"
		>
			<link.icon size={20} strokeWidth={active(link.href) ? 2.5 : 2} />
			{link.label}
		</a>
	{/each}
</nav>
