<script>
	import { preventDefault } from 'svelte/legacy';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	// import { clickOutside } from '$lib/utils/clickOutside';
	import Search from '$lib/components/Search.svelte';
	import Light from '$lib/components/Light.svelte';
	import Dark from '$lib/components/Dark.svelte';
	import System from '$lib/components/System.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import Close from '$lib/components/Close.svelte';

	/** @type {string|undefined} */
	let theme = $state();
	let popoverOpen = $state(false);

	onMount(() => {
		theme = localStorage.getItem('theme') || 'system';
		doTheme();
	});

	/**
	 * Handles changing the theme.
	 * @param {string} param - The new theme to apply.
	 * @returns {void}
	 */
	function handleChangeTheme(param) {
		theme = param;
		if (['light', 'dark'].includes(theme)) {
			localStorage.setItem('theme', theme);
		} else {
			localStorage.removeItem('theme');
		}
		doTheme();
		popoverOpen = false;
	}

	function doTheme() {
		if (
			localStorage.getItem('theme') === 'dark' ||
			(!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	/**
	 * 关闭切换主题弹窗，并跳转到其它页面。
	 * @param {string} url - 页路路径.
	 * @returns {void}
	 */
	function handleGoto(url) {
		popoverOpen = false;
		goto(url);
	}
</script>

<header class="relative px-4 sm:px-6 md:px-8">
	<div
		class="relative flex items-center justify-between pt-6 text-sm leading-6 font-semibold text-slate-700 lg:pt-8 dark:text-slate-200"
	>
		<div class="h-5 w-auto text-slate-900 dark:text-white">mypandora</div>

		<div class="flex items-center">
			<button
				type="button"
				class="-my-1 flex h-8 w-8 items-center justify-center text-slate-500 hover:text-slate-600 md:hidden dark:hover:text-slate-300"
			>
				<span class="sr-only">Search</span>
				<Search />
			</button>

			<div class="-my-1 -mr-1 ml-2 md:hidden">
				<button
					type="button"
					class="flex h-8 w-8 items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
					onclick={() => (popoverOpen = !popoverOpen)}
				>
					<span class="sr-only">Navigation</span>
					<Navigation />
				</button>

				{#if popoverOpen}
					<div
						class="dark:highlight-white/5 absolute top-full right-0 z-50 mt-4 w-36 overflow-hidden rounded-lg bg-white py-1 text-sm font-semibold text-slate-700 shadow-lg ring-1 ring-slate-900/10 md:fixed md:top-4 md:right-4 md:w-full md:max-w-xs md:p-6 md:text-base md:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:ring-0 md:dark:text-slate-400"
					>
						<div
							class="dark:highlight-white/5 fixed top-4 right-4 w-full max-w-xs rounded-lg bg-white p-6 text-base font-semibold text-slate-900 shadow-lg dark:bg-slate-800 dark:text-slate-400"
						>
							<button
								type="button"
								class="absolute top-5 right-5 flex h-8 w-8 items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
								onclick={() => (popoverOpen = false)}
							>
								<span class="sr-only">Close navigation</span>
								<Close />
							</button>
							<ul class="space-y-6">
								<li>
									<a
										class="hover:text-sky-500 dark:hover:text-sky-400"
										href="/"
										onclick={preventDefault(() => handleGoto('/'))}>首页</a
									>
								</li>
								<li>
									<a
										class="hover:text-sky-500 dark:hover:text-sky-400"
										href="/product"
										onclick={preventDefault(() => handleGoto('/product'))}>产品</a
									>
								</li>
								<li>
									<a
										class="hover:text-sky-500 dark:hover:text-sky-400"
										href="/showcase"
										onclick={preventDefault(() => handleGoto('/showcase'))}>示例</a
									>
								</li>
							</ul>
							<div class="mt-6 border-t border-slate-200 pt-6 dark:border-slate-200/10">
								<div class="flex items-center justify-between">
									<label for="theme" class="font-normal text-slate-700 dark:text-slate-400">切换主题</label>
									<div
										class="dark:highlight-white/5 relative flex items-center rounded-lg p-2 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-900/10 dark:bg-slate-600 dark:text-slate-200 dark:ring-0"
									>
										{#if theme === 'light'}
											<Light />
										{:else}
											<Dark />
										{/if}

										{theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '自动'}
										<svg class="ml-2 h-6 w-6 text-slate-400" fill="none">
											<path
												d="m15 11-3 3-3-3"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											></path>
										</svg>
										<select
											id="theme"
											class="absolute inset-0 h-full w-full appearance-none opacity-0"
											bind:value={theme}
											onchange={() => handleChangeTheme(theme || '')}
										>
											<option value="light">浅色</option>
											<option value="dark">深色</option>
											<option value="system">自动</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>

			<div class="hidden items-center md:flex">
				<nav>
					<ul class="flex items-center gap-x-8">
						<li>
							<a href="/" class="hover:text-sky-500 dark:hover:text-sky-400">首页</a>
						</li>
						<li>
							<a href="/product" class="hover:text-sky-500 dark:hover:text-sky-400">产品</a>
						</li>
						<li>
							<a href="/showcase" class="hover:text-sky-500 dark:hover:text-sky-400">示例</a>
						</li>
					</ul>
				</nav>

				<div class="ml-6 flex items-center border-l border-slate-200 pl-6 dark:border-slate-800">
					<!-- use:clickOutside
					on:click_outside={() => (popoverOpen = false)} -->
					<button type="button" onclick={() => (popoverOpen = !popoverOpen)}>
						<span class="dark:hidden">
							<Light isSelected={theme === 'light'} />
						</span>
						<span class="hidden dark:inline">
							<Dark isSelected={theme === 'dark'} />
						</span>
					</button>

					{#if popoverOpen}
						<div
							class="dark:highlight-white/5 absolute top-full right-0 z-50 mt-4 w-36 overflow-hidden rounded-lg bg-white py-1 text-sm font-semibold text-slate-700 shadow-lg ring-1 ring-slate-900/10 dark:bg-slate-800 dark:text-slate-300 dark:ring-0"
						>
							<div
								class={theme === 'light'
									? 'flex cursor-pointer items-center bg-slate-50 px-2 py-1 text-sky-500 hover:bg-slate-50 dark:bg-slate-600/30 hover:dark:bg-slate-600/30'
									: 'flex cursor-pointer items-center px-2 py-1 hover:bg-slate-50 hover:dark:bg-slate-600/30'}
								onclick={() => handleChangeTheme('light')}
								onkeydown={() => handleChangeTheme('light')}
								tabindex="-1"
								role="option"
								aria-selected={theme === 'light'}
							>
								<Light isSelected={theme === 'light'} />浅色
							</div>
							<div
								class={theme === 'dark'
									? 'flex cursor-pointer items-center bg-slate-50 px-2 py-1 text-sky-500 hover:bg-slate-50 dark:bg-slate-600/30 hover:dark:bg-slate-600/30'
									: 'flex cursor-pointer items-center px-2 py-1 hover:bg-slate-50 hover:dark:bg-slate-600/30'}
								onclick={() => handleChangeTheme('dark')}
								onkeydown={() => handleChangeTheme('dark')}
								tabindex="-1"
								role="option"
								aria-selected={theme === 'dark'}
							>
								<Dark isSelected={theme === 'dark'} />深色
							</div>
							<div
								class={theme === 'system'
									? 'flex cursor-pointer items-center bg-slate-50 px-2 py-1 text-sky-500 hover:bg-slate-50 dark:bg-slate-600/30 hover:dark:bg-slate-600/30'
									: 'flex cursor-pointer items-center px-2 py-1 hover:bg-slate-50 hover:dark:bg-slate-600/30'}
								onclick={preventDefault(() => handleChangeTheme('system'))}
								onkeydown={() => handleChangeTheme('system')}
								tabindex="-1"
								role="option"
								aria-selected={theme === 'system'}
							>
								<System isSelected={theme === 'system'} />自动
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</header>
