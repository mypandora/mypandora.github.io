<script>
	import { onMount } from 'svelte';
	// import { clickOutside } from '$lib/utils/clickOutside';
	import Search from '$lib/components/Search.svelte';
	import Light from '$lib/components/Light.svelte';
	import Dark from '$lib/components/Dark.svelte';
	import System from '$lib/components/System.svelte';

	/** @type {string|undefined} */
	let theme;
	let popoverOpen = false;

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
</script>

<header class="relative px-4 sm:px-6 md:px-8">
	<div
		class="relative pt-6 lg:pt-8 flex items-center justify-between text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200"
	>
		<div class="text-slate-900 dark:text-white w-auto h-5">mypandora</div>

		<div class="flex items-center">
			<button
				type="button"
				class="text-slate-500 hover:text-slate-600 w-8 h-8 -my-1 flex items-center justify-center md:hidden dark:hover:text-slate-300"
			>
				<span class="sr-only">Search</span>
				<svelte:component this={Search} />
			</button>

			<div class="-my-1 ml-2 -mr-1 md:hidden">
				<button
					type="button"
					class="text-slate-500 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
				>
					<span class="sr-only">Navigation</span>
					<svg width="24" height="24" fill="none" aria-hidden="true">
						<path
							d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
				</button>

				<div
					class="bg-white rounded-lg shadow-lg font-semibold dark:bg-slate-800 dark:highlight-white/5 absolute z-50 top-full right-0 ring-1 ring-slate-900/10 overflow-hidden w-36 py-1 text-sm text-slate-700 dark:ring-0 dark:text-slate-300 mt-4 md:fixed md:top-4 md:right-4 md:w-full md:max-w-xs md:p-6 md:text-base md:text-slate-900 md:dark:text-slate-400"
				>
					<div
						class="fixed top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5"
					>
						<button
							type="button"
							class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
						>
							<span class="sr-only">Close navigation</span>
							<svg viewBox="0 0 10 10" class="w-2.5 h-2.5 overflow-visible" aria-hidden="true">
								<path
									d="M0 0L10 10M10 0L0 10"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
								></path>
							</svg>
						</button>
						<ul class="space-y-6">
							<li>
								<a class="hover:text-sky-500 dark:hover:text-sky-400" href="/">Docs</a>
							</li>
							<li>
								<a class="hover:text-sky-500 dark:hover:text-sky-400" href="/">Blog</a>
							</li>
							<li>
								<a class="hover:text-sky-500 dark:hover:text-sky-400" href="/showcase">Showcase</a>
							</li>
						</ul>
						<div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-200/10">
							<div class="flex items-center justify-between">
								<label for="theme" class="text-slate-700 font-normal dark:text-slate-400"
									>Switch theme</label
								>
								<div
									class="relative flex items-center ring-1 ring-slate-900/10 rounded-lg shadow-sm p-2 text-slate-700 font-semibold dark:bg-slate-600 dark:ring-0 dark:highlight-white/5 dark:text-slate-200"
								>
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="w-6 h-6 mr-2 dark:hidden"
									>
										<path
											d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
											class="stroke-slate-400 dark:stroke-slate-500"
										></path>
										<path
											d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
											class="stroke-slate-400 dark:stroke-slate-500"
										></path>
									</svg>
									<svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 mr-2 hidden dark:block">
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
											class="fill-transparent"
										></path>
										<path
											d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
											class="fill-slate-400"
										></path>
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
											class="fill-slate-400"
										></path>
									</svg>
									Light
									<svg class="w-6 h-6 ml-2 text-slate-400" fill="none">
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
										class="absolute appearance-none inset-0 w-full h-full opacity-0"
									>
										<option value="light">Light</option>
										<option value="dark">Dark</option>
										<option value="system">System</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="hidden md:flex items-center">
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

				<div class="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
					<!-- use:clickOutside
					on:click_outside={() => (popoverOpen = false)} -->
					<button type="button" on:click={() => (popoverOpen = !popoverOpen)}>
						<span class="dark:hidden">
							<svelte:component this={Light} isSelected={theme === 'light'} />
						</span>
						<span class="hidden dark:inline">
							<svelte:component this={Dark} isSelected={theme === 'dark'} />
						</span>
					</button>

					{#if popoverOpen}
						<div
							class="absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-4"
						>
							<div
								class={theme === 'light'
									? 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30 bg-slate-50 dark:bg-slate-600/30 text-sky-500'
									: 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30'}
								on:click={() => handleChangeTheme('light')}
								on:keydown={() => handleChangeTheme('light')}
								tabindex="-1"
								role="option"
								aria-selected={theme === 'light'}
							>
								<svelte:component this={Light} isSelected={theme === 'light'} />Light
							</div>
							<div
								class={theme === 'dark'
									? 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30 bg-slate-50 dark:bg-slate-600/30 text-sky-500'
									: 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30'}
								on:click={() => handleChangeTheme('dark')}
								on:keydown={() => handleChangeTheme('dark')}
								tabindex="-1"
								role="option"
								aria-selected={theme === 'dark'}
							>
								<svelte:component this={Dark} isSelected={theme === 'dark'} />Dark
							</div>
							<div
								class={theme === 'system'
									? 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30 bg-slate-50 dark:bg-slate-600/30 text-sky-500'
									: 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30'}
								on:click|preventDefault={() => handleChangeTheme('system')}
								on:keydown={() => handleChangeTheme('system')}
								tabindex="-1"
								role="option"
								aria-selected={theme === 'system'}
							>
								<svelte:component this={System} isSelected={theme === 'system'} />System
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</header>
