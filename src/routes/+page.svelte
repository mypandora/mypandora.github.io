<script>
	import favicon from '$lib/assets/favicon.svg';

	let components = [
		{
			name: '@mypandora/chat',
			description: '一个基于 Vanilla JavaScript 的聊天组件。',
			link: 'https://github.com/mypandora/chat',
			image: favicon,
			stack: 'JavaScript'
		},
		{
			name: '@mypandora/calculator',
			description: '一个基于 Vanilla JavaScript 的计算器组件。',
			link: 'https://github.com/mypandora/calculator',
			image: favicon,
			stack: 'JavaScript'
		},
		{
			name: '@mypandora/spreadsheet',
			description: '一个基于 canvas 的轻量级报表。',
			link: 'https://github.com/mypandora/spreadsheet',
			image: favicon,
			stack: 'JavaScript'
		},
		{
			name: '@mypandora/element-layout',
			description: '一个基于 Vue2, element-ui 的布局组件。',
			link: 'https://github.com/mypandora/element-layout',
			image: favicon,
			stack: 'Vue.js, ElementUI'
		},
		{
			name: '@mypandora/element-datepicker',
			description: '一个基于 Vue2, element-ui 的季度选择器组件。',
			link: 'https://github.com/mypandora/element-datepicker',
			image: favicon,
			stack: 'Vue.js, ElementUI'
		},
		{
			name: '@mypandora/element-select',
			description: '一个基于 Vue2, element-ui 的下拉框单选按钮组件。',
			link: 'https://github.com/mypandora/element-select',
			image: favicon,
			stack: 'Vue.js, ElementUI'
		}
	];
	let products = [
		{
			name: '社保选择助手',
			description: '一个方便的社保医院选择助手。',
			link: 'https://poi.mypandora.cn/',
			image: favicon,
			stack: 'Nestjs, Svelte,'
		},
		{
			name: '@mypandora/datav',
			description: '一个基于 Vue 的大屏设计器。',
			link: 'https://github.com/mypandora/datav',
			image: favicon,
			stack: 'Vue.js, ElementUI, Echarts'
		},
		{
			name: '@mypandora/form-designer',
			description: '一个基于 Vue 的表单设计器。',
			link: 'https://github.com/mypandora/form-designer',
			image: favicon,
			stack: 'JavaScript, Vue.js'
		}
	];
	let templates = [
		{
			name: '模板示例1',
			description: '这是支持 PC、移动端，且支持暗黑模式的模板示例。',
			link: '',
			image: favicon,
			stack: 'JavaScript'
		}
	];
	let showMore = $state(false);
</script>

<div
	class="foo mb-20 overflow-hidden sm:mb-32 md:mb-40"
	style="mask-image: linear-gradient(to bottom, transparent, black);
-webkit-mask-image: linear-gradient(to bottom, transparent, black);"
>
	<div class="relative mx-auto max-w-5xl pt-20 sm:pt-24 lg:pt-32">
		<h1
			class="text-center text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
		>
			帮助你快速构建现代网站
		</h1>
		<p class="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-600 dark:text-slate-400">
			提供各种有用的工具，包括：报表工具、大屏设计器、表单设计器、聊天组件、计算器组件、布局组件、季度选择器组件等等。
		</p>
	</div>
</div>

<section
	tabindex="-1"
	class="bg-grid-slate-100 relative mx-auto max-w-7xl px-4 focus:outline-none sm:px-3 md:px-5"
>
	<h2 class="sr-only">产品</h2>
	<div
		class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
		class:max-h-[33rem]={!showMore}
		class:overflow-hidden={!showMore}
	>
		<ul class="hidden space-y-8 sm:block">
			{#each components as item (item.name)}
				<li class="text-sm leading-6">
					<figure
						class="dark:highlight-white/5 relative flex flex-col-reverse rounded-lg bg-slate-50 p-6 dark:bg-slate-800"
					>
						<blockquote class="mt-6 text-slate-700 dark:text-slate-300">
							<p>{item.description}</p>
						</blockquote>
						<figcaption class="flex items-center space-x-4">

							<img
								src={item.image}
								alt=""
								class="h-14 w-14 flex-none rounded-full object-cover"
								loading="lazy"
								decoding="async"
							/>
							<div class="flex-auto">
								<div class="text-base font-semibold text-slate-900 dark:text-slate-300">
									<a href={item.link} tabindex="0"
										><span class="absolute inset-0"></span>{item.name}</a
									>
								</div>
								<div class="mt-0.5">{item.stack}</div>
							</div>
						</figcaption>
					</figure>
				</li>
			{/each}
		</ul>
		<ul class="space-y-8">
			{#each products as item (item.name)}
				<li class="text-sm leading-6">
					<figure
						class="dark:highlight-white/5 relative flex flex-col-reverse rounded-lg bg-slate-50 p-6 dark:bg-slate-800"
					>
						<blockquote class="mt-6 text-slate-700 dark:text-slate-300">
							<p>{item.description}</p>
						</blockquote>
						<figcaption class="flex items-center space-x-4">
							<img
								src={item.image}
								alt=""
								class="h-14 w-14 flex-none rounded-full object-cover"
								loading="lazy"
								decoding="async"
							/>
							<div class="flex-auto">
								<div class="text-base font-semibold text-slate-900 dark:text-slate-300">
									<a href={item.link} tabindex="0"
										><span class="absolute inset-0"></span>{item.name}</a
									>
								</div>
								<div class="mt-0.5">{item.stack}</div>
							</div>
						</figcaption>
					</figure>
				</li>
			{/each}
		</ul>
		<ul class="hidden space-y-8 lg:block">
			{#each templates as item (item.name)}
				<li class="text-sm leading-6">
					<figure
						class="dark:highlight-white/5 relative flex flex-col-reverse rounded-lg bg-slate-50 p-6 dark:bg-slate-800"
					>
						<blockquote class="mt-6 text-slate-700 dark:text-slate-300">
							<p>{item.description}</p>
						</blockquote>
						<figcaption class="flex items-center space-x-4">
							<img
								src={item.image}
								alt=""
								class="h-14 w-14 flex-none rounded-full object-cover"
								loading="lazy"
								decoding="async"
							/>
							<div class="flex-auto">
								<div class="text-base font-semibold text-slate-900 dark:text-slate-300">
									<a href={item.link} tabindex="0"
										><span class="absolute inset-0"></span>{item.name}</a
									>
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
		class="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-white pt-32 pb-8 dark:from-slate-900"
		class:sticky={showMore}
		class:-mt-52={showMore}
		class:transition-opacity={showMore}
		class:duration-300={showMore}
		class:opacity-100={showMore}
	>
		<button
			onclick={() => (showMore = !showMore)}
			type="button"
			class="pointer-events-auto relative flex h-12 items-center rounded-lg bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:outline-none dark:bg-slate-700 dark:hover:bg-slate-600"
			>{showMore ? '收起' : '显示更多'}</button
		>
	</div>
</section>

<footer class="pt-20 pb-16 text-center sm:pt-32">
	<div class="text-center">
		<p class="mt-4 text-sm leading-6 text-slate-500">
			<span>© 2024 mypandora.cn</span>
			<a
				target="_blank"
				rel="noopener noreferrer"
				href="https://beian.miit.gov.cn/"
				class="hover:text-slate-900 dark:hover:text-slate-400">京ICP备2024065750号-1</a
			>
		</p>
	</div>
</footer>

<style>
	.foo {
		background-image:
			linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
		background-size:
			20px 20px,
			20px 20px;
		background-position:
			-1px -1px,
			-1px -1px;
	}
</style>
