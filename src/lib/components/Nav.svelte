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
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
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
  <div class="relative pt-6 lg:pt-8 flex items-center justify-between text-slate-700 font-semibold text-sm leading-6 dark:text-slate-200">
    <div class="text-slate-900 dark:text-white w-auto h-5">mypandora</div>

    <div class="flex items-center">
      <button type="button" class="text-slate-500 hover:text-slate-600 w-8 h-8 -my-1 flex items-center justify-center md:hidden dark:hover:text-slate-300">
        <span class="sr-only">Search</span>
        <Search />
      </button>

      <div class="-my-1 ml-2 -mr-1 md:hidden">
        <button
          type="button"
          class="text-slate-500 w-8 h-8 flex items-center justify-center hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
          onclick={() => (popoverOpen = !popoverOpen)}
        >
          <span class="sr-only">Navigation</span>
          <Navigation />
        </button>

        {#if popoverOpen}
          <div
            class="bg-white rounded-lg shadow-lg font-semibold dark:bg-slate-800 dark:highlight-white/5 absolute z-50 top-full right-0 ring-1 ring-slate-900/10 overflow-hidden w-36 py-1 text-sm text-slate-700 dark:ring-0 dark:text-slate-300 mt-4 md:fixed md:top-4 md:right-4 md:w-full md:max-w-xs md:p-6 md:text-base md:text-slate-900 md:dark:text-slate-400"
          >
            <div class="fixed top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5">
              <button
                type="button"
                class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
                onclick={() => (popoverOpen = false)}
              >
                <span class="sr-only">Close navigation</span>
                <Close />
              </button>
              <ul class="space-y-6">
                <li>
                  <a class="hover:text-sky-500 dark:hover:text-sky-400" href="/" onclick={preventDefault(() => handleGoto('/'))}>首页</a>
                </li>
                <li>
                  <a class="hover:text-sky-500 dark:hover:text-sky-400" href="/product" onclick={preventDefault(() => handleGoto('/product'))}>产品</a>
                </li>
                <li>
                  <a class="hover:text-sky-500 dark:hover:text-sky-400" href="/showcase" onclick={preventDefault(() => handleGoto('/showcase'))}>示例</a>
                </li>
              </ul>
              <div class="mt-6 pt-6 border-t border-slate-200 dark:border-slate-200/10">
                <div class="flex items-center justify-between">
                  <label for="theme" class="text-slate-700 font-normal dark:text-slate-400">切换主题</label>
                  <div
                    class="relative flex items-center ring-1 ring-slate-900/10 rounded-lg shadow-sm p-2 text-slate-700 font-semibold dark:bg-slate-600 dark:ring-0 dark:highlight-white/5 dark:text-slate-200"
                  >
                    {#if theme === 'light'}
                      <Light />
                    {:else}
                      <Dark />
                    {/if}

                    {theme === 'light' ? '浅色' : theme === 'dark' ? '深色' : '自动'}
                    <svg class="w-6 h-6 ml-2 text-slate-400" fill="none">
                      <path d="m15 11-3 3-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <select id="theme" class="absolute appearance-none inset-0 w-full h-full opacity-0" bind:value={theme} onchange={() => handleChangeTheme(theme || '')}>
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
              class="absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-4"
            >
              <div
                class={theme === 'light'
                  ? 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30 bg-slate-50 dark:bg-slate-600/30 text-sky-500'
                  : 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30'}
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
                  ? 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30 bg-slate-50 dark:bg-slate-600/30 text-sky-500'
                  : 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30'}
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
                  ? 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30 bg-slate-50 dark:bg-slate-600/30 text-sky-500'
                  : 'py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 hover:dark:bg-slate-600/30'}
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
