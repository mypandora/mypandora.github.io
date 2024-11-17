<script>
  let components = [
    {
      name: '@mypandora/chat',
      description: '一个基于 Vanilla JavaScript 的聊天组件。',
      link: 'https://github.com/mypandora/chat',
      image: '/favicon.png',
      stack: 'JavaScript'
    },
    {
      name: '@mypandora/calculator',
      description: '一个基于 Vanilla JavaScript 的计算器组件。',
      link: 'https://github.com/mypandora/calculator',
      image: '/favicon.png',
      stack: 'JavaScript'
    },
    {
      name: '@mypandora/spreadsheet',
      description: '一个基于 canvas 的轻量级报表。',
      link: 'https://github.com/mypandora/spreadsheet',
      image: '/favicon.png',
      stack: 'JavaScript'
    },
    {
      name: '@mypandora/element-layout',
      description: '一个基于 Vue2, element-ui 的布局组件。',
      link: 'https://github.com/mypandora/element-layout',
      image: '/favicon.png',
      stack: 'Vue.js, ElementUI'
    },
    {
      name: '@mypandora/element-datepicker',
      description: '一个基于 Vue2, element-ui 的季度选择器组件。',
      link: 'https://github.com/mypandora/element-datepicker',
      image: '/favicon.png',
      stack: 'Vue.js, ElementUI'
    },
    {
      name: '@mypandora/element-select',
      description: '一个基于 Vue2, element-ui 的下拉框单选按钮组件。',
      link: 'https://github.com/mypandora/element-select',
      image: '/favicon.png',
      stack: 'Vue.js, ElementUI'
    }
  ];
  let products = [
    {
      name: '社保选择助手',
      description: '一个方便的社保医院选择助手。',
      link: 'https://poi.mypandora.cn/',
      image: '/favicon.png',
      stack: 'Nestjs, Svelte,'
    },
    {
      name: '@mypandora/datav',
      description: '一个基于 Vue 的大屏设计器。',
      link: 'https://github.com/mypandora/datav',
      image: '/favicon.png',
      stack: 'Vue.js, ElementUI, Echarts'
    },
    {
      name: '@mypandora/form-designer',
      description: '一个基于 Vue 的表单设计器。',
      link: 'https://github.com/mypandora/form-designer',
      image: '/favicon.png',
      stack: 'JavaScript, Vue.js'
    }
  ];
  let templates = [
    {
      name: '模板示例1',
      description: '这是支持 PC、移动端，且支持暗黑模式的模板示例。',
      link: '',
      image: '/favicon.png',
      stack: 'JavaScript'
    }
  ];
  let showMore = false;
</script>

<div
  class="foo mb-20 overflow-hidden sm:mb-32 md:mb-40"
  style="mask-image: linear-gradient(to bottom, transparent, black);
-webkit-mask-image: linear-gradient(to bottom, transparent, black);"
>
  <div class="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
    <h1 class="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">帮助你快速构建现代网站</h1>
    <p class="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
      提供各种有用的工具，包括：报表工具、大屏设计器、表单设计器、聊天组件、计算器组件、布局组件、季度选择器组件等等。
    </p>
  </div>
</div>

<section tabindex="-1" class="relative max-w-7xl mx-auto px-4 focus:outline-none sm:px-3 md:px-5 bg-grid-slate-100">
  <h2 class="sr-only">产品</h2>
  <div class="grid grid-cols-1 gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3" class:max-h-[33rem]={!showMore} class:overflow-hidden={!showMore}>
    <ul class="space-y-8 hidden sm:block">
      {#each components as item}
        <li class="text-sm leading-6">
          <figure class="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
            <blockquote class="mt-6 text-slate-700 dark:text-slate-300">
              <p>{item.description}</p>
            </blockquote>
            <figcaption class="flex items-center space-x-4">
              <img src={item.image} alt="" class="flex-none w-14 h-14 rounded-full object-cover" loading="lazy" decoding="async" />
              <div class="flex-auto">
                <div class="text-base text-slate-900 font-semibold dark:text-slate-300">
                  <a href={item.link} tabindex="0"><span class="absolute inset-0"></span>{item.name}</a>
                </div>
                <div class="mt-0.5">{item.stack}</div>
              </div>
            </figcaption>
          </figure>
        </li>
      {/each}
    </ul>
    <ul class="space-y-8">
      {#each products as item}
        <li class="text-sm leading-6">
          <figure class="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
            <blockquote class="mt-6 text-slate-700 dark:text-slate-300">
              <p>{item.description}</p>
            </blockquote>
            <figcaption class="flex items-center space-x-4">
              <img src={item.image} alt="" class="flex-none w-14 h-14 rounded-full object-cover" loading="lazy" decoding="async" />
              <div class="flex-auto">
                <div class="text-base text-slate-900 font-semibold dark:text-slate-300">
                  <a href={item.link} tabindex="0"><span class="absolute inset-0"></span>{item.name}</a>
                </div>
                <div class="mt-0.5">{item.stack}</div>
              </div>
            </figcaption>
          </figure>
        </li>
      {/each}
    </ul>
    <ul class="space-y-8 hidden lg:block">
      {#each templates as item}
        <li class="text-sm leading-6">
          <figure class="relative flex flex-col-reverse bg-slate-50 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
            <blockquote class="mt-6 text-slate-700 dark:text-slate-300">
              <p>{item.description}</p>
            </blockquote>
            <figcaption class="flex items-center space-x-4">
              <img src={item.image} alt="" class="flex-none w-14 h-14 rounded-full object-cover" loading="lazy" decoding="async" />
              <div class="flex-auto">
                <div class="text-base text-slate-900 font-semibold dark:text-slate-300">
                  <a href={item.link} tabindex="0"><span class="absolute inset-0"></span>{item.name}</a>
                </div>
                <div class="mt-0.5">{item.stack}</div>
              </div>
            </figcaption>
          </figure>
        </li>
      {/each}
    </ul>
  </div>
  <div
    class="inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 pointer-events-none dark:from-slate-900 absolute"
    class:sticky={showMore}
    class:-mt-52={showMore}
    class:transition-opacity={showMore}
    class:duration-300={showMore}
    class:opacity-100={showMore}
  >
    <button
      on:click={() => (showMore = !showMore)}
      type="button"
      class="relative bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 text-sm text-white font-semibold h-12 px-6 rounded-lg flex items-center dark:bg-slate-700 dark:hover:bg-slate-600 pointer-events-auto"
      >{showMore ? '收起' : '显示更多'}</button
    >
  </div>
</section>

<footer class="pt-20 sm:pt-32 text-center pb-16">
  <div class="text-center">
    <p class="mt-4 text-sm leading-6 text-slate-500">
      <span>© 2024 mypandora.cn</span>
      <a target="_blank" rel="noopener noreferrer" href="https://beian.miit.gov.cn/" class="hover:text-slate-900 dark:hover:text-slate-400">京ICP备2024065750号-1</a>
    </p>
  </div>
</footer>

<style>
  .foo {
    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size:
      20px 20px,
      20px 20px;
    background-position:
      -1px -1px,
      -1px -1px;
  }
</style>
