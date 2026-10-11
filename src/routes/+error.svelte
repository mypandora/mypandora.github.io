<script>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Home } from '@lucide/svelte';
</script>

<svelte:head>
	<title>{page.status} — mypandora</title>
</svelte:head>

<section class="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4">
	<div class="grid-overlay pointer-events-none absolute inset-0"></div>
	<div class="relative text-center">
		<p class="text-gradient text-7xl font-extrabold tracking-tight sm:text-8xl">{page.status}</p>
		<h1 class="mt-4 text-xl font-bold text-slate-100 sm:text-2xl">
			{page.status === 404 ? '页面走丢了' : '出了点小问题'}
		</h1>
		<p class="text-muted mt-2 text-sm">
			{page.status === 404 ? '你访问的页面不存在或已被移动。' : '请稍后再试,或返回首页继续浏览。'}
		</p>
		<a
			href={resolve('/')}
			class="btn-gradient glow focus-visible:ring-brand-400 focus-visible:ring-offset-base mt-8 inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
		>
			<Home size={16} />
			返回首页
		</a>
	</div>
</section>
