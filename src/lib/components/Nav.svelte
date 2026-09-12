<script>
	import { userPrefersMode, setMode } from 'mode-watcher';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Sun, Moon, Monitor, Home, Package, Shirt, Sparkles } from '@lucide/svelte';

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
</script>

<header
	class="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/85"
>
	<div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-16">
		<a href={resolve('/')} class="flex items-center gap-2 font-bold tracking-tight text-slate-900 dark:text-white">
			<span
				class="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#1558a6] to-[#0ea5e9] text-sm text-white"
				>m</span
			>
			mypandora
		</a>

		<nav class="hidden items-center gap-7 md:flex" aria-label="主导航">
			{#each links as link (link.href)}
				<a
					href={resolve(link.href)}
					class="text-sm font-medium transition hover:text-slate-900 {active(link.href)
						? 'text-slate-900 dark:text-white'
						: 'text-slate-500 dark:text-slate-400 dark:hover:text-white'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-2">
			<button
				type="button"
				aria-label="切换主题"
				class="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
				onclick={cycleTheme}
			>
				{#if userPrefersMode.current === 'light'}
					<Sun size={19} />
				{:else if userPrefersMode.current === 'dark'}
					<Moon size={19} />
				{:else}
					<Monitor size={19} />
				{/if}
			</button>
		</div>
	</div>
</header>

<nav
	class="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/70 bg-white/90 backdrop-blur-md md:hidden dark:border-slate-800 dark:bg-slate-900/90"
	aria-label="移动端导航"
>
	<div class="grid grid-cols-4 pb-[env(safe-area-inset-bottom)]">
		{#each links as link (link.href)}
			<a
				href={resolve(link.href)}
				class="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium {active(link.href)
					? 'text-[#1558a6] dark:text-sky-400'
					: 'text-slate-400 dark:text-slate-500'}"
			>
				<link.icon size={20} strokeWidth={active(link.href) ? 2.4 : 2} />
				{link.label}
			</a>
		{/each}
	</div>
</nav>
