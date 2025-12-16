<script>
	import { setMode, mode, userPrefersMode } from 'mode-watcher';
	import { Sun, Moon, Monitor, Search, X, EllipsisVertical } from '@lucide/svelte';
	// import { clickOutside } from '$lib/utils/clickOutside';

	/** @type {'light' | 'dark' | 'system'} */
	let theme = $state('system');
	let popoverOpen = $state(false);

	/**
	 * @param {'light' | 'dark' |'system'} theme
	 */
	function changeTheme(theme) {
		popoverOpen = !popoverOpen;
		setMode(theme);
	}

	$inspect(userPrefersMode.current);
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
					<EllipsisVertical />
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
								<X />
							</button>
							<ul class="space-y-6">
								<li>
									<a class="hover:text-sky-500 dark:hover:text-sky-400" href="/">首页</a>
								</li>
								<li>
									<a class="hover:text-sky-500 dark:hover:text-sky-400" href="/product">产品</a>
								</li>
								<li>
									<a class="hover:text-sky-500 dark:hover:text-sky-400" href="/showcase">示例</a>
								</li>
							</ul>
							<div class="mt-6 border-t border-slate-200 pt-6 dark:border-slate-200/10">
								<div class="flex items-center justify-between">
									<label for="theme" class="font-normal text-slate-700 dark:text-slate-400"
										>切换主题</label
									>
									<div
										class="dark:highlight-white/5 relative flex items-center rounded-lg p-2 font-semibold text-slate-700 shadow-sm ring-1 ring-slate-900/10 dark:bg-slate-600 dark:text-slate-200 dark:ring-0"
									>
										{#if mode.current === 'light'}
											<Sun size={20} />
										{:else}
											<Moon size={20} />
										{/if}

										{userPrefersMode.current === 'light'
											? '浅色'
											: userPrefersMode.current === 'dark'
												? '深色'
												: '自动'}
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
											id="mode.current"
											class="absolute inset-0 h-full w-full appearance-none opacity-0"
											bind:value={theme}
											onchange={() => setMode(theme)}
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
							<Sun
								size={20}
								class={mode.current === 'light'
									? 'stroke-sky-500'
									: 'stroke-slate-400 dark:stroke-slate-500'}
							/>
						</span>
						<span class="hidden dark:inline">
							<Moon
								size={20}
								class={mode.current === 'dark'
									? 'stroke-sky-500'
									: 'stroke-slate-400 dark:stroke-slate-500'}
							/>
						</span>
					</button>

					{#if popoverOpen}
						<div
							class="dark:highlight-white/5 absolute top-full right-0 z-50 mt-4 w-36 overflow-hidden rounded-lg bg-white py-1 text-sm font-semibold text-slate-700 shadow-lg ring-1 ring-slate-900/10 dark:bg-slate-800 dark:text-slate-300 dark:ring-0"
						>
							<div
								class={userPrefersMode.current === 'light'
									? 'flex cursor-pointer items-center bg-slate-50 px-2 py-1 text-sky-500 hover:bg-slate-50 dark:bg-slate-600/30 hover:dark:bg-slate-600/30'
									: 'flex cursor-pointer items-center px-2 py-1 hover:bg-slate-50 hover:dark:bg-slate-600/30'}
								onclick={() => changeTheme('light')}
								onkeydown={() => changeTheme('light')}
								tabindex="-1"
								role="option"
								aria-selected={userPrefersMode.current === 'light'}
							>
								<Sun
									size={20}
									class={userPrefersMode.current === 'light'
										? 'stroke-sky-500'
										: 'stroke-slate-400 dark:stroke-slate-500'}
								/>
								浅色
							</div>
							<div
								class={userPrefersMode.current === 'dark'
									? 'flex cursor-pointer items-center bg-slate-50 px-2 py-1 text-sky-500 hover:bg-slate-50 dark:bg-slate-600/30 hover:dark:bg-slate-600/30'
									: 'flex cursor-pointer items-center px-2 py-1 hover:bg-slate-50 hover:dark:bg-slate-600/30'}
								onclick={() => changeTheme('dark')}
								onkeydown={() => changeTheme('dark')}
								tabindex="-1"
								role="option"
								aria-selected={userPrefersMode.current === 'dark'}
							>
								<Moon
									size={20}
									class={userPrefersMode.current === 'dark'
										? 'stroke-sky-500'
										: 'stroke-slate-400 dark:stroke-slate-500'}
								/>
								深色
							</div>
							<div
								class={userPrefersMode.current === 'system'
									? 'flex cursor-pointer items-center bg-slate-50 px-2 py-1 text-sky-500 hover:bg-slate-50 dark:bg-slate-600/30 hover:dark:bg-slate-600/30'
									: 'flex cursor-pointer items-center px-2 py-1 hover:bg-slate-50 hover:dark:bg-slate-600/30'}
								onclick={() => changeTheme('system')}
								onkeydown={() => changeTheme('system')}
								tabindex="-1"
								role="option"
								aria-selected={userPrefersMode.current === 'system'}
							>
								<Monitor
									size={20}
									class={userPrefersMode.current === 'system'
										? 'stroke-sky-500'
										: 'stroke-slate-400 dark:stroke-slate-500'}
								/>
								自动
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</header>
