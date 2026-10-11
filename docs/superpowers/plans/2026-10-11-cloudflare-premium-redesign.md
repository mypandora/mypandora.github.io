# mypandora Cloudflare 高端化重设计 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不改变内容与路由的前提下,把 mypandora 静态站升级为深邃科技风、全套动效的高端站点,并迁移部署到 Cloudflare Pages。

**Architecture:** 保持 SvelteKit 2 + adapter-static 全站预渲染;新增设计令牌层(app.css `@theme`)、动效 actions、玻璃拟态组件库,逐页替换视图;部署侧用 `static/_headers` + wrangler 配置 + Cloudflare CI 替换旧 SSH 部署。

**Tech Stack:** SvelteKit 2 / Svelte 5(runes)/ Tailwind CSS v4 / mode-watcher / @lucide/svelte / Swiper / @fontsource-variable/inter / wrangler(仅部署)

**Spec:** `docs/superpowers/specs/2026-10-11-cloudflare-premium-redesign-design.md`

## Global Constraints

- 路由 `/`、`/product`、`/showcase`、`/uniform` 与数据结构(`projects.js`、`uniforms.js`)不变;外链、CDN 域名 `img.mypandora.cn`、备案号 `京ICP备2024065750号-1` 一字不改
- 移除 Umami,且不引入任何替代统计脚本
- 保持纯静态:`adapter-static` + `export const prerender = true`,构建输出目录仍为 `build/`
- 不引入 GSAP 等动画库;动效用原生 CSS + Svelte action;不引入组件库
- 所有动效必须在 `@media (prefers-reduced-motion: reduce)` 下降级(内容默认可见)
- 内部链接统一 `resolve()`(来自 `$app/paths`),外链 `target="_blank" rel="external noopener noreferrer"`
- 包管理用 pnpm;每个任务结束必须通过:`pnpm check && pnpm lint && pnpm build`
- 本仓库无测试框架;纯视觉组件不新建测试运行器,验证手段为 svelte-check + eslint + build + 每任务列出的人工视觉检查项
- 代码风格:tabs 缩进、双引号、prettier 默认;Tailwind class 遵循现有排序习惯

## Review Focus

1. **reduced-motion**:系统开启"减少动态效果"后,首屏与所有区块内容必须默认可见(不能停留在 opacity:0),极光静止、视差失效 —— Task 2 人工验证。
2. **深色首屏闪烁(FOUC)**:硬刷新/慢速加载时 html 在 hydration 前就是深色,不能先白后黑 —— Task 1 设置初始 class,Task 3 验证。
3. **触屏设备**:聚光卡的 pointermove 仅在 `pointer: fine` 下绑定;卡片悬停效果不能导致移动端布局位移或点击失效 —— Task 4 人工验证。
4. **悬浮移动导航遮挡**:底部胶囊导航不能遮住页面内容、校服卡片或灯箱按钮;需适配 `env(safe-area-inset-bottom)`,灯箱 z-index 高于导航 —— Task 3/7 人工验证。
5. **缓存正确性**:`_headers` 中 HTML 不缓存、`/_app/*` 与 `/assets/*` 长缓存;文件必须原样出现在 `build/` 产物根 —— Task 8 用 build 产物验证。

---

### Task 1: 设计基座 —— 依赖、令牌、全局样式、app.html

**Files:**
- Modify: `package.json`(新增依赖与脚本)
- Modify: `src/app.css`(整体重写)
- Modify: `src/app.html`
- Create: `static/favicon.svg`
- Modify: `src/routes/+error.svelte`

**Interfaces:**
- Produces: CSS 令牌与工具类,被后续所有组件使用:
  - 背景/文字:`bg-base`、`text-muted`(通过 `@theme` 的 `--color-base:#05070f`、`--color-surface`、`--color-muted:#9aa7bd`、品牌色 `--color-brand-*`)
  - 工具类(在 app.css 用 `@utility` 或普通 class 定义):`.glass`(玻璃面:bg-white/5 + border-white/10 + backdrop-blur-xl + 顶部高光)、`.text-gradient`(蓝→青渐变文字)、`.glow`(发光阴影)
  - 关键帧:`aurora`(漂移)、`float`、`fade-up`(reveal 使用);并定义 `.aurora-blob` 类:`position:absolute; will-change:transform; animation: aurora var(--aurora-duration,18s) ease-in-out infinite alternate`(duration/延迟由组件行内变量覆盖)
  - `.reveal{opacity:0;translate:0 16px;transition:.7s cubic-bezier(.22,1,.36,1)} .reveal.in{opacity:1;translate:0 0}`

- [ ] **Step 1: 安装依赖**

Run: `pnpm add @fontsource-variable/inter && pnpm add -D wrangler`
Expected: package.json dependencies 出现 `@fontsource-variable/inter`,devDependencies 出现 `wrangler`;pnpm-lock 更新。

- [ ] **Step 2: 重写 `src/app.css`**

保留前两行(Tailwind 导入与 `.dark` custom variant)。新增:
  - `@theme { --color-base: #05070f; --color-surface: #0b1120; --color-muted: #9aa7bd; --color-brand-* 色阶(400:#60a5fa / 500:#3b82f6 / cyan:#22d3ee / violet:#a855f7); --font-sans: 'Inter Variable', 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif; }`
  - body 默认深色底(径向渐变叠 `--color-base`),浅色模式白底;`::selection` 品牌色
  - 上述 `.glass` / `.text-gradient` / `.glow` 工具类
  - `@keyframes aurora|float|fade-up`;`.reveal{opacity:0;translate:0 16px;transition:.7s cubic-bezier(.22,1,.36,1)} .reveal.in{opacity:1;translate:0 0}`
  - 全局降级:`@media (prefers-reduced-motion: reduce){ *,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important} .reveal{opacity:1;translate:none} }`
  - 深色自定义滚动条(webkit,细、半透明)

- [ ] **Step 3: 改造 `src/app.html`**

  - `<html lang="zh-CN" class="dark">`(保留 scrollbar-gutter 等现有工具类),消除 FOUC
  - body 基色改为 `bg-base text-muted`
  - 删除 Umami `<script>` 整块
  - favicon 改为 `/favicon.svg`(type 用 `<link rel="icon" type="image/svg+xml">`)
  - 新增:`<meta name="description">`(用现首页文案)、`theme-color` 深色 `#05070f`、OG/Twitter 占位标签(og:title/description/type=website、twitter:card=summary_large_image,图片先用占位 `/favicon.svg`)

- [ ] **Step 4: 创建 `static/favicon.svg`**

渐变方形圆角底(蓝→青)+ 抽象光点/盒子标记(与 Task 3 Logo 同一图形:圆角方块内一个发光圆点 + 两条盒盖斜线),viewBox 0 0 64 64。

- [ ] **Step 5: 重设计 `src/routes/+error.svelte`**

深色居中错误页:大号渐变 status 数字、简短中文说明(404:"页面走丢了";其他:"出了点小问题")、返回首页玻璃按钮(`resolve('/')`),复用 `.glass .text-gradient`。

- [ ] **Step 6: 验证与提交**

Run: `pnpm check && pnpm lint && pnpm build`
Expected: 全部通过;`build/favicon.svg`、`build/_headers` 暂不需要。
人工:`pnpm preview` 打开任意页,确认深色底、字体生效、无白屏闪烁(硬刷新)。
Commit: `feat: 深色设计令牌基座、全局样式与 app.html 改造(移除 Umami)`

---

### Task 2: 动效原语 —— reveal / parallax action、Aurora 背景

**Files:**
- Create: `src/lib/actions/reveal.js`
- Create: `src/lib/components/site/Aurora.svelte`

**Interfaces(后续任务依赖,名称固定):**
- `reveal(node: HTMLElement, options?: { delay?: number; threshold?: number; y?: number }): { destroy(): void }` —— IntersectionObserver,进入视口给 node 加 `in` 类;支持 `data-delay`;一次性 unobserve;reduced-motion 或不支持 IO 时立即加 `in`
- `parallax(node: HTMLElement, options?: { speed?: number }): { destroy(): void }` —— scroll 时按元素位置设 `node.style.transform = translate3d(0, ${offset}px, 0)`(speed 默认 0.15);rAF 节流;reduced-motion 下 no-op(只返回 destroy)
- `Aurora` 组件:无 props(可选 `class?: string`),渲染 `pointer-events-none absolute inset-0 overflow-hidden`,内含 3 个 `.aurora-blob` 模糊圆斑(blue/indigo/violet),用 `animation: aurora` 漂移;reduced-motion 下动画被全局 CSS 冻结

- [ ] **Step 1: 实现 `src/lib/actions/reveal.js`**

按上面接口实现两个导出(`reveal`、`parallax`),纯 JS、带 JSDoc 类型;文件顶部读 `const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches`。

- [ ] **Step 2: 实现 `src/lib/components/site/Aurora.svelte`**

div 容器 + 3 个绝对定位圆斑(`h-[40rem] w-[40rem] rounded-full blur-[120px] opacity-30`),颜色分别 brand/indigo/violet,各自 `animation-delay` 与位移不同;容器常配合 `[mask-image:radial-gradient(...)]` 以便自然消隐(该 class 由调用方加或内置,选内置)。

- [ ] **Step 3: 验证与提交**

Run: `pnpm check && pnpm lint && pnpm build`,全过。
人工:临时在首页挂一个 `<div use:reveal>` 与 `<Aurora />` 验证(验证后移除);DevTools 模拟 prefers-reduced-motion:元素直接可见、圆斑不动。
Commit: `feat: 滚动入场/视差 actions 与极光背景组件`

---

### Task 3: 全站框架 —— Logo、悬浮 Nav、Footer、进度条、layout

**Files:**
- Create: `src/lib/components/site/Logo.svelte`
- Create: `src/lib/components/site/Footer.svelte`
- Modify: `src/lib/components/Nav.svelte`
- Modify: `src/lib/components/PreloadingIndicator.svelte`
- Modify: `src/routes/+layout.svelte`

**Interfaces:**
- `Logo` props: `{ class?: string; showWordmark?: boolean }` —— 渲染与 favicon 同形的渐变 SVG 标记 + `mypandora` 字标
- `Footer`:无 props;内部含品牌简介(占位文案,注释标明)、三列链接(产品/资源/关于,资源与关于为占位链接 `#` 但注明可替换)、GitHub 图标链接、备案号链接(URL 与文案不变)、`© {当前年份} mypandora.cn`(年份用 `new Date().getFullYear()`)
- Nav 消费:`links` 数组保持现有 4 项(href/label/icon 不变)
- layout 结构:`ModeWatcher defaultMode="dark"` → PreloadingIndicator → Nav → `main`(底部留出移动导航空间 `pb-24 md:pb-0`)→ Footer;引入字体:`import '@fontsource-variable/inter'`

- [ ] **Step 1: 创建 `Logo.svelte`**

SVG 标记高约 28px:圆角 8 渐变方块 + 白色发光圆点 + 盒盖斜线;字标 text-lg font-bold tracking-tight。

- [ ] **Step 2: 改造 `Nav.svelte`**

  - 桌面:顶部悬浮的"浮岛"导航 —— 外层 `sticky top-0`,内层 `mx-auto max-w-5xl mt-3` 的 `.glass rounded-full px-4` 胶囊;左 Logo、中 4 个链接(激活态用小圆点/渐变底色)、右主题切换钮(保留 light/dark/system 三态循环逻辑与 lucide 图标不变)
  - 滚动增强:`$state scrolled`,scroll 监听(rAF 节流,>8px 加更强背景/阴影)
  - 移动:底部悬浮胶囊 Tab 栏(`fixed bottom-4 inset-x-4 z-40`,`.glass rounded-2xl`,grid-cols-4,`padding-bottom: env(safe-area-inset-bottom)`),图标 + 中文,激活项渐变高亮;删除旧的全宽贴底边栏
  - 链接继续走 `resolve()` 与现有 `active()` 判定

- [ ] **Step 3: 创建 `Footer.svelte`**

深色顶边 `border-white/10`:上部品牌 + 链接三列(移动端单列堆叠);下部 flex 两端放版权与备案号;占位文案注释 `// 占位:品牌简介可替换`。

- [ ] **Step 4: 改造 `PreloadingIndicator.svelte`**

移除旧绿色条与白色全屏遮罩;改为贴顶 2px 渐变光条(brand→cyan)+ 头部柔光晕,逻辑(navigating 期间推进)沿用现有 runes 写法即可。

- [ ] **Step 5: 改造 `+layout.svelte`**

`<ModeWatcher defaultMode="dark" />`;按接口引入字体、Nav、Footer;保留 navigating 指示逻辑。

- [ ] **Step 6: 验证与提交**

Run: `pnpm check && pnpm lint && pnpm build`,全过。
人工:桌面/移动视口下检查悬浮导航不遮内容;主题三态循环正常、浅色可读;硬刷新无 FOUC;页脚备案号与链接正确。
Commit: `feat: 玻璃浮岛导航、新 Logo、全站页脚与渐变进度条`

---

### Task 4: 内容组件 —— 站点数据、SectionHeading、SpotlightCard、BrowserMockup

**Files:**
- Create: `src/lib/data/site.js`
- Create: `src/lib/components/site/SectionHeading.svelte`
- Create: `src/lib/components/site/SpotlightCard.svelte`
- Create: `src/lib/components/site/BrowserMockup.svelte`
- Delete: `src/lib/components/site/ProjectCard.svelte`(被 SpotlightCard 取代)

**Interfaces:**
- `site.js` 导出:
  - `features`:6 项 `{ title: string, description: string, icon: Component }`;**直接在 site.js 中 `import { BarChart3, MonitorPlay, TextCursorInput, MessageSquare, Calculator, LayoutTemplate } from '@lucide/svelte'` 并存组件引用**(不是字符串);JSDoc 用 `import('svelte').Component` 标注;文案取自现有产品描述改写;文件顶部注释标明文案可替换
- `SectionHeading` props:`{ eyebrow?: string, title: string, subtitle?: string, align?: 'left'|'center' }` —— eyebrow 为小号渐变大写标签;`use:reveal`
- `SpotlightCard` props 与旧 ProjectCard 完全一致:`{ item: Project, index?: number }`,仍消费 `{name, description, link, stack}`;视觉为玻璃卡 + 鼠标聚光(CSS 变量 `--mx/--my` 驱动的 radial-gradient 边框光)+ 渐变头部(保留 3 组渐变与"在线服务/开源"角标、stack 标签、"查看 ArrowUpRight");`pointer: fine` 媒体查询通过后才绑 pointermove
- `BrowserMockup`:无 props;玻璃浏览器框(三圆点 + 地址栏占位),内部纯 CSS/SVG 仪表盘占位(侧栏、图表柱、卡片),配 `.glow`;外层元素挂 `use:parallax={{ speed: 0.08 }}`(由 Task 5 首页挂也可,本组件内挂更内聚)

- [ ] **Step 1: 创建 `src/lib/data/site.js`**

按接口写 features(含 JSDoc typedef),注释标注占位性质。

- [ ] **Step 2: 创建 `SectionHeading.svelte`**

- [ ] **Step 3: 创建 `SpotlightCard.svelte`**

基于旧 ProjectCard 结构重写视觉;保留 external 判断、`resolve` eslint-disable 注释惯例;pointermove 处理器内 `node.style.setProperty('--mx', ...)`;触屏不绑定(挂载时检测 `window.matchMedia('(pointer: fine)').matches`)。

- [ ] **Step 4: 创建 `BrowserMockup.svelte`**

- [ ] **Step 5: 删除 ProjectCard 并全量替换引用**

Run: `grep -rn "ProjectCard" src`(应出现 +page、product、showcase 三处),本步先把引用改为 `SpotlightCard`(三个页面 import 与标签同步改名),再删文件。

- [ ] **Step 6: 验证与提交**

Run: `pnpm check && pnpm lint && pnpm build`,全过;grep 确认无 `ProjectCard` 残留。
人工:移动视口点击卡片正常跳转、无残留悬停位移;桌面鼠标移动有聚光跟随。
Commit: `feat: 聚光卡片、章节标题、仪表盘占位与站点展示数据`

---

### Task 5: 首页重设计

**Files:**
- Modify: `src/routes/+page.svelte`

**Interfaces:**
- Consumes: components/products/templates(projects.js)、UNIFORMS(统计派生)、features(site.js)、Aurora、Logo(不需)、SectionHeading、SpotlightCard、BrowserMockup、reveal/parallax actions、Footer 已在 layout(删除页内旧 footer)

- [ ] **Step 1: 重写 Hero**

结构:Aurora 背景 + 细网格(保留旧 hero-grid 网格思路但调为白色低透明)+ 顶部径向光;内容 use:reveal 依次 stagger(delay 80ms 递增):徽章(开源 · 现代 Web 工具与组件,玻璃胶囊)、H1(原中文文案不变,"现代网站"四字 `.text-gradient`)、副标题(原句保留)、双按钮("浏览产品"渐变实心 + GitHub 玻璃描边,图标与 href 不变)。

- [ ] **Step 2: BrowserMockup 区**

Hero 下方 `max-w-5xl` 居中,负 margin 上浮叠在 Hero 上,`use:parallax`;reveal 入场。

- [ ] **Step 3: 数据条**

`.glass rounded-3xl` 内 4 列(移动 2 列):开源组件 `components.length`、在线产品 `products.length`、校服方案 `UNIFORMS.reduce((n,c)=>n+c.schools.length,0)`、模板 `templates.length`;数字大号 tabular-nums + 渐变;数字用派生值,不得写死。

- [ ] **Step 4: 能力特性区**

SectionHeading + features 6 卡网格:玻璃小卡、lucide 图标(`{#each features}<svelte:component this={f.icon} />{/each}`)、use:reveal stagger。

- [ ] **Step 5: 三个产品分区**

开源组件(6 卡)/在线产品(3 卡)/模板(1 卡),均 SectionHeading + SpotlightCard 网格;组件分区保留"查看全部 →"链接;产品区放深色微妙分块背景。保持原 keyed each 与 index 传参。

- [ ] **Step 6: 校服引流 Banner**

大幅玻璃卡:左文(标题"石家庄市校服方案展示"、副标"45 套中小学校服方案 · 在线浏览"数字派生、CTA 胶囊按钮 → `resolve('/uniform')`),右图:3 张真实 CDN 图拼贴(`https://img.mypandora.cn/primary/A1/1.webp`、`/junior/B1/1.webp`、`/primary/A2/1.webp`),图片 `loading="lazy"`、圆角、悬停缩放,整卡 use:reveal。

- [ ] **Step 7: 结尾 CTA**

Aurora 局部背景 + 玻璃大卡:"在 GitHub 上关注 mypandora"(占位文案)+ GitHub 按钮(沿用原链接 https://github.com/mypandora)。

- [ ] **Step 8: 删除页内旧 footer 与旧 `<style>hero-grid` 中被取代的部分**

页脚由 layout Footer 承担;网格样式如仍被 Hero 使用则迁移进 app.css 或保留精简。

- [ ] **Step 9: 验证与提交**

Run: `pnpm check && pnpm lint && pnpm build`,全过。
人工:桌面/移动逐屏检查顺序、stagger 入场、视差、按钮内外链正确;校服图能加载(依赖 CDN);reduced-motion 下全内容可见。
Commit: `feat: 首页深邃科技风重设计(极光 Hero/数据条/特性/校服引流/CTA)`

---

### Task 6: 产品页与示例页重设计

**Files:**
- Modify: `src/routes/product/+page.svelte`
- Modify: `src/routes/showcase/+page.svelte`

- [ ] **Step 1: 重写 `/product` 页头与分区**

窄版 Aurora/光晕页头:面包屑小字"mypandora / 产品"、H1"产品"(渐变强调)、原副标保留;三个分区用 SectionHeading + 计数徽章(保留数量徽章样式,玻璃化)+ SpotlightCard 网格,卡片 use:reveal stagger。

- [ ] **Step 2: 重写 `/showcase`**

同款页头(标题"示例"、原副标)+ 单区模板卡网格。

- [ ] **Step 3: 验证与提交**

Run: `pnpm check && pnpm lint && pnpm build`,全过。
人工:两页移动/桌面排版、计数与首页一致、链接行为正确。
Commit: `feat: 产品页与示例页深色化与入场动效`

---

### Task 7: 校服展示页与灯箱重设计

**Files:**
- Modify: `src/routes/uniform/+page.svelte`
- Modify: `src/lib/components/uniform/UniformLightbox.svelte`
- Modify(仅在需要时): `src/lib/components/uniform/UniformGallery.svelte`

- [ ] **Step 1: 重设计校服页页头与吸顶 Tab**

页头:H1"石家庄市校服展示"渐变强调、副标保留、`preconnect` 保留;吸顶分类条改为玻璃胶囊容器(`.glass` + sticky 位置与现有 top 值适配新 Nav 高度),按钮激活态改为渐变发光;逻辑(runes `active`/`activeInfo`/`schools`)不变。

- [ ] **Step 2: 重设计学校卡片网格**

玻璃卡:图片区 `group-hover:scale-105` 过渡 + 渐变遮罩 + 编号角标(B1 等)玻璃徽标;卡片 use:reveal,按索引 `delay: (i % 12) * 40` stagger;保留 keyed each、lazy、aspect-3/2、aria-label 与打开灯箱逻辑。

- [ ] **Step 3: 深色化 `UniformLightbox`**

遮罩改为 `bg-black/70 backdrop-blur-md`;面板/按钮玻璃化(white/10→统一玻璃风)、关闭与前后按钮加 hover 发光;加入开/关过渡(用 Svelte transition 或 mounted class fade/scale,~200ms,respect reduced-motion);现有 Swiper、键盘(Esc/方向键)、body overflow 锁定、上一套/下一套、计数文案逻辑全部保留。

- [ ] **Step 4: 验证与提交**

Run: `pnpm check && pnpm lint && pnpm build`,全过。
人工:三类 Tab 切换、灯箱开/关动画、左右切换与上一套/下一套循环、键盘操作、移动端底部导航不与灯箱按钮重叠(灯箱 z-50 高于 z-40 导航)、滚动到最后一组卡片仍有入场。
Commit: `feat: 校服展示页与灯箱深色玻璃化重设计`

---

### Task 8: Cloudflare Pages 部署配置与文档

**Files:**
- Create: `static/_headers`
- Create: `wrangler.jsonc`
- Modify: `package.json`(deploy 脚本)
- Modify: `.github/workflows/main.yml`(整体替换)
- Modify: `README.md`

**Interfaces:**
- `wrangler.jsonc`:`{ "name": "mypandora", "pages_build_output_dir": "build" }`(name 占位,注明可改)
- package.json 新增脚本:`"deploy": "pnpm build && wrangler pages deploy build"`

- [ ] **Step 1: 创建 `static/_headers`**

规则:
  - `/*`:`X-Content-Type-Options: nosniff`、`Referrer-Policy: strict-origin-when-cross-origin`、`Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `/_app/*` 与 `/assets/*`:`Cache-Control: public, max-age=31536000, immutable`
  - HTML(根 `/`、`/*` 冲突的处理:把通用规则放最后,HTML 路径显式 `Cache-Control: no-cache`):列出 `/`、`/product`、`/showcase`、`/uniform` 四条 no-cache(静态预渲染为目录索引,同时加 `/index.html` 等不写——验证产物结构后决定,见 Step 5)

- [ ] **Step 2: 创建 `wrangler.jsonc` 并加脚本**

- [ ] **Step 3: 重写 `.github/workflows/main.yml`**

name 改 `Deploy to Cloudflare Pages`;触发 push(可限定分支 main,检查现有默认分支名:`git branch --show-current`);jobs:checkout(`actions/checkout@v4`)→ pnpm(`pnpm/action-setup@v4` 读 lockfile 版本)→ Node(`actions/setup-node@v4` node 20 + pnpm cache)→ `pnpm install --frozen-lockfile` → `pnpm check` → `pnpm lint` → `pnpm build` → `cloudflare/wrangler-action@v3`(apiToken `${{ secrets.CLOUDFLARE_API_TOKEN }}`、accountId `${{ secrets.CLOUDFLARE_ACCOUNT_ID }}`、command `pages deploy build --project-name=mypandora`)。

- [ ] **Step 4: 更新 README.md**

替换模板 README:项目简介、技术栈、本地开发(pnpm i / dev / build / check / lint)、Cloudflare Pages 部署两种方式(Git 集成:框架预设"无"、输出目录 `build`;Wrangler/CI:所需两个 secrets 说明);注明旧 SSH 部署已废弃、Umami 已移除。

- [ ] **Step 5: 验证与提交**

Run: `pnpm build`;随后检查 `build/` 根存在 `_headers`,且 HTML 位置(`ls build`)与 Step 1 的 no-cache 规则一致(目录形式则按 Cloudflare 约定用路径 `/product/` 等,必要时回改)。
Run: `pnpm check && pnpm lint` 全过。
本地试服务(可选,无需登录):`pnpm dlx wrangler pages dev build`,首页 200、`_headers` 生效可从响应头抽查。
Commit: `feat: Cloudflare Pages 部署配置(_headers/wrangler/CI)与文档`

---

### Task 9: 全站终验与打磨

**Files:** 无新增;按发现回改。

- [ ] **Step 1: 静态质量门**

Run: `pnpm check && pnpm lint && pnpm build`,全部通过,无新增 warning。

- [ ] **Step 2: 四页人工走查清单**

`pnpm preview` 逐项核对:四页面内容完整(6 组件/3 产品/1 模板/45 校服)、内外链、主题三态、移动浮岛导航与安全区、灯箱全套交互、reduced-motion、FOUC、1280/390px 两断点无横向滚动。

- [ ] **Step 3: Lighthouse(可选但建议)**

对 preview 站点跑桌面与移动 Performance/Accessibility/Best Practices,目标 ≥95;记录结果,不达标项回改(常见:图片宽高、超大 blur 面积)。

- [ ] **Step 4: 收尾提交**

如有打磨改动:`style: 终验打磨(...)`;工作区干净则跳过。
