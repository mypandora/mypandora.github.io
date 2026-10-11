<script>
	import { parallax } from '$lib/actions/reveal.js';

	const bars = [42, 68, 55, 82, 61, 90, 74];
</script>

<div use:parallax={{ speed: 0.06 }} class="relative">
	<div
		class="from-brand-500/20 via-accent-indigo/20 to-accent-cyan/20 absolute -inset-x-10 -top-10 -bottom-10 -z-10 bg-gradient-to-r blur-3xl"
	></div>
	<div class="glass glow overflow-hidden rounded-2xl">
		<!-- browser chrome -->
		<div class="flex items-center gap-2 border-b border-white/10 px-4 py-3">
			<span class="h-3 w-3 rounded-full bg-[#ff5f57]"></span>
			<span class="h-3 w-3 rounded-full bg-[#febc2e]"></span>
			<span class="h-3 w-3 rounded-full bg-[#28c840]"></span>
			<div class="ml-3 hidden h-6 flex-1 items-center rounded-md bg-white/5 px-3 text-[11px] text-slate-500 sm:flex">
				mypandora.cn
			</div>
		</div>

		<!-- placeholder dashboard -->
		<div class="grid grid-cols-[88px_1fr]">
			<aside class="hidden flex-col gap-2 border-r border-white/10 p-3 sm:flex">
				<div class="from-brand-500/70 to-accent-cyan/60 h-7 rounded-md bg-gradient-to-r"></div>
				<div class="h-4 rounded-md bg-white/8"></div>
				<div class="h-4 rounded-md bg-white/8"></div>
				<div class="h-4 rounded-md bg-white/8"></div>
				<div class="h-4 rounded-md bg-white/8"></div>
				<div class="h-4 rounded-md bg-white/8"></div>
			</aside>

			<div class="space-y-4 p-4 sm:p-5">
				<div class="grid grid-cols-3 gap-3">
					<div class="glass rounded-xl p-3">
						<div class="h-2.5 w-2/3 rounded bg-white/15"></div>
						<div class="from-brand-400 to-accent-cyan mt-2 h-5 w-1/2 rounded bg-gradient-to-r"></div>
					</div>
					<div class="glass rounded-xl p-3">
						<div class="h-2.5 w-2/3 rounded bg-white/15"></div>
						<div class="from-brand-400 to-accent-cyan mt-2 h-5 w-1/2 rounded bg-gradient-to-r"></div>
					</div>
					<div class="glass rounded-xl p-3">
						<div class="h-2.5 w-2/3 rounded bg-white/15"></div>
						<div class="from-brand-400 to-accent-cyan mt-2 h-5 w-1/2 rounded bg-gradient-to-r"></div>
					</div>
				</div>

				<div class="glass rounded-xl p-4">
					<div class="mb-4 flex items-center justify-between">
						<div class="h-3 w-28 rounded bg-white/20"></div>
						<div class="h-3 w-14 rounded bg-white/10"></div>
					</div>
					<div class="flex h-28 items-end gap-2 sm:h-36">
						{#each bars as h, i (i)}
							<div
								class="from-brand-600/50 to-accent-cyan/80 flex-1 rounded-t-md bg-gradient-to-t"
								style="height: {h}%"
							></div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
