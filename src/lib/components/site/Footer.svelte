<script>
	import { resolve } from '$app/paths';
	import Logo from './Logo.svelte';

	const year = new Date().getFullYear();

	/** @typedef {'/' | '/product' | '/showcase' | '/uniform'} InternalRoute */

	/** @type {{ label: string, href: InternalRoute }[]} */
	const productLinks = [
		{ label: '开源组件', href: '/product' },
		{ label: '在线产品', href: '/product' },
		{ label: '模板示例', href: '/showcase' },
		{ label: '校服展示', href: '/uniform' }
	];

	// 占位:资源链接可替换为真实文档/博客地址
	const resourceLinks = [
		{ label: 'GitHub', href: 'https://github.com/mypandora' },
		{ label: '组件仓库', href: 'https://github.com/mypandora/chat' },
		{ label: '大屏设计器', href: 'https://github.com/mypandora/datav' },
		{ label: '表单设计器', href: 'https://github.com/mypandora/form-designer' }
	];

	// 占位:关于类链接,地址待补充
	const aboutLinks = [
		{ label: '关于我们', href: '#' },
		{ label: '更新日志', href: '#' },
		{ label: '联系方式', href: '#' }
	];
</script>

<footer class="relative mt-24 border-t border-white/10">
	<div class="mx-auto max-w-7xl px-6 py-14">
		<div class="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
			<div>
				<Logo />
				<p class="mt-4 max-w-xs text-sm leading-7 text-slate-400">
					<!-- 占位:品牌简介可替换 -->
					开源组件与在线工具集合,帮助你快速构建现代网站。
				</p>
			</div>

			<div>
				<h3 class="text-sm font-semibold text-slate-200">产品</h3>
				<ul class="mt-4 space-y-3 text-sm">
					{#each productLinks as link (link.label)}
						<li>
							<a href={resolve(link.href)} class="text-slate-400 transition hover:text-white">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="text-sm font-semibold text-slate-200">资源</h3>
				<ul class="mt-4 space-y-3 text-sm">
					{#each resourceLinks as link (link.label)}
						<li>
							<a
								href={link.href}
								target="_blank"
								rel="external noopener noreferrer"
								class="text-slate-400 transition hover:text-white"
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div>
				<h3 class="text-sm font-semibold text-slate-200">关于</h3>
				<ul class="mt-4 space-y-3 text-sm">
					{#each aboutLinks as link (link.label)}
						<li>
							<!-- eslint-disable svelte/no-navigation-without-resolve -->
							<a
								href={link.href}
								class="text-slate-400 transition hover:text-white"
								aria-disabled={link.href === '#' ? 'true' : undefined}
							>
								{link.label}
							</a>
							<!-- eslint-enable svelte/no-navigation-without-resolve -->
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div
			class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row"
		>
			<p>© {year} mypandora.cn</p>
			<a
				href="https://beian.miit.gov.cn/"
				target="_blank"
				rel="external noopener noreferrer"
				class="transition hover:text-slate-300"
			>
				京ICP备2024065750号-1
			</a>
		</div>
	</div>
</footer>
