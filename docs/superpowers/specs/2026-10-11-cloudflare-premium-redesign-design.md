# mypandora Cloudflare 部署与高端化重设计

- 日期:2026-10-11
- 状态:已批准(口头),待书面 spec 复核
- 目标:将现有 SvelteKit 静态站部署到 Cloudflare Pages,并以"深邃科技风"对全站进行高端化视觉与交互重设计。内容、路由、外链、CDN、备案信息保持不变;缺失内容以占位符补齐。

## 1. 背景与现状

现有项目:

- SvelteKit 2 + Svelte 5(runes)+ Tailwind CSS 4 + mode-watcher + @lucide/svelte + Swiper
- `@sveltejs/adapter-static`,`export const prerender = true`,全站静态预渲染
- 路由:`/`(首页)、`/product`、`/showcase`、`/uniform`
- 数据:`src/lib/data/projects.js`(6 个开源组件、3 个在线产品、1 个模板),`src/lib/data/uniforms.js`(3 个分类 × 15 所学校 = 45 套方案,每校 4 张图,图片走 `https://img.mypandora.cn`)
- 部署:GitHub Actions 通过 SSH(rsync)把 `build/` 推到自有服务器
- 页脚含 ICP 备案号 京ICP备2024065750号-1;app.html 含 Umami 统计脚本

## 2. 目标与非目标

### 目标

1. 部署目标改为 Cloudflare Pages,保留 Git 推送自动部署
2. 全站视觉升级为"暗夜发布会"风格:深色优先、极光渐变、玻璃拟态、聚光卡片、超大标题排版
3. 增加高级交互:滚动入场动画、鼠标聚光、Hero 动态极光、滚动视差,且尊重 `prefers-reduced-motion`
4. 内容不变的前提下重构首页信息层次,新增占位区块(特性、数据条、CTA)
5. 保留暗色/浅色/跟随系统主题切换;默认深色;浅色可用
6. 移动端与桌面端均精致

### 非目标

- 不引入服务端逻辑、数据库、CMS;不更换 adapter 到 Workers(保持纯静态)
- 不改动任何外链 URL、CDN 域名、备案号、Umami ID
- 不新增重型动画库(GSAP 等);动效用原生 CSS / Svelte action 实现,保持轻量
- 不做 i18n、不做新路由内容(校服详情仍用灯箱)

## 3. 视觉设计语言

### 3.1 色彩(Tailwind v4 `@theme` 令牌,定义于 app.css)

- 背景基底:`#05070f`(近黑深蓝);页面可叠加微弱径向渐变
- 表面层:`rgba(255,255,255,0.04)` 玻璃面 + `backdrop-blur-xl` + 1px `rgba(255,255,255,0.08)` 描边
- 品牌主色:电光蓝 `#3b82f6` → 青 `#22d3ee`;辅助极光色:靛 `#6366f1`、紫 `#a855f7`
- 文字:主文字 `#e7ecf5`,次要 `#9aa7bd`;浅色模式:主 `#0b1220`,次 `#475569`
- 渐变文字与按钮统一使用 `linear-gradient(135deg,#60a5fa,#22d3ee)`

### 3.2 排版

- 英文/数字字体:Inter Variable(以 `@fontsource-variable/inter` 自托管,避免 Google Fonts 国内/隐私问题);中文回退 `PingFang SC / Noto Sans SC / system-ui`
- Hero 标题:桌面 `clamp(2.75rem, 6vw, 5rem)`,字重 800,字距 -0.03em,`text-balance`
- 各区标题:2xl–4xl;正文 15–17px,行高 1.7
- 大字号装饰序号/标签用等宽感的 tabular-nums

### 3.3 质感元素

- 极光:Aurora 组件 = 2–3 个大尺寸模糊渐变色块,CSS 关键帧缓慢漂移;Hero 上叠细网格 + 顶部光晕
- 玻璃卡片:半透明底 + blur + 顶部高光(inset border 渐变)
- 聚光卡片:on `pointermove` 用 CSS 变量设置径向高光位置,形成跟随鼠标的边框/光斑
- 滚动入场:`reveal` Svelte action,IntersectionObserver 添加 `.in` 类,支持延迟指数(data-delay),一次性
- 视差:`parallax` action,pointer/scroll 驱动 `transform: translate3d`,在 reduced-motion 下禁用
- 统一圆角 `rounded-2xl/3xl`、阴影以发光阴影为主(colored glow),少用灰色投影

## 4. 页面与组件设计

### 4.1 新增/改造组件(src/lib/components)

- `site/Logo.svelte`:新品牌标识 —— 渐变底 + 抽象"潘多拉盒/光点"SVG 标记 + 字标;favicon 复用同一 SVG
- `site/Nav.svelte`(改造):玻璃浮岛导航(桌面居内悬浮圆角条,顶部间距),含 Logo、链接、主题切换;滚动时增强背景不透明度。移动端改为**悬浮底部胶囊 Tab 栏**(更现代),保留 4 个入口与图标
- `site/Footer.svelte`(新增):多列页脚(品牌/简介占位、产品链接、资源链接占位、备案),从首页移入 layout 全站显示
- `site/SpotlightCard.svelte`(由 ProjectCard 重设计):玻璃卡 + 鼠标聚光 + 渐变头部(保留在线服务/开源角标与 stack 标签),同名导出兼容现有引用
- `site/Aurora.svelte`:极光背景色块(可放在 Hero 与 CTA 后)
- `site/Reveal.svelte` 或 `lib/action/reveal.js`:滚动入场
- `site/SectionHeading.svelte`:统一的小节眉标(eyebrow)+ 标题 + 副标题
- `site/BrowserMockup.svelte`:Hero 右侧/下方的浏览器窗口占位框(内含仪表盘风格的纯 CSS/SVG 占位 UI)
- `site/Stat.svelte`:数据条数字项
- `uniform/UniformLightbox.svelte`(改造):深色玻璃灯箱,保留 Swiper 与前后切换,加键盘支持(已有则保留)与打开/关闭过渡动画
- `PreloadingIndicator.svelte`:改为顶部渐变进度光条

### 4.2 首页 `/`(自上而下)

1. Hero:极光 + 网格 + 视差;徽章(开源 · 现代 Web 工具与组件)、渐变超大标题("帮助你快速构建现代网站")、副标题、主按钮"浏览产品" + 次按钮 GitHub(图标保留)
2. BrowserMockup 预览图(占位仪表盘),滚动视差/轻微 3D tilt
3. 数据条:开源组件 6 / 在线产品 3 / 校服方案 45 / 模板 1(数字由数据模块派生,非硬编码;如需"GitHub Stars"等缺失数字用占位符并标注)
4. 能力特性区:6 张玻璃特性卡(报表、大屏、表单、聊天、计算器、布局),文案基于现有产品描述,图标用 lucide
5. 开源组件:SpotlightCard 网格 + SectionHeading + "查看全部"
6. 在线产品:同构(深色背景上用微妙分区)
7. 校服引流大幅卡(banner):使用真实 CDN 图(取 primary/A1/1.webp 等)做拼贴/视差背景 + 标题"石家庄市校服方案展示" + CTA `/uniform`
8. 模板区
9. 结尾 CTA:极光卡片 —— "在 GitHub 上关注 mypandora"(占位文案可调)
10. Footer

### 4.3 `/product`、`/showcase`

- 同款 Hero 小标题页头(极光收窄版)、计数徽章、聚光卡片网格、入场动画;结构保持三组分区(product)

### 4.4 `/uniform`

- 深色页头;吸顶分类 Tab 改为玻璃胶囊;学校卡片:图片缩放悬停、编号角标、入场 stagger;灯箱深色化,图片加载占位(aspect-ratio 防抖动已具备,保留)

### 4.5 全局

- `+layout.svelte`:Nav + main + Footer;保留 ModeWatcher 与 PreloadingIndicator
- `app.html`:`lang="zh-CN"`,新增 meta description 默认值、OG/Twitter 占位标签、`theme-color`(深色)、SVG favicon
- `app.css`:Tailwind 导入 + `@theme` 令牌 + 全局背景、选中色、滚动条、动效关键帧(reveal、aurora、float)、reduced-motion 全局降级

## 5. 数据与占位符策略

- 统计数字从 `projects.js` / `uniforms.js` 派生(`components.length` 等),不写死
- 新增纯展示型占位数据(特性列表、页脚链接)直接放在对应组件或新建 `src/lib/data/site.js`,注释标明"占位文案,可替换"
- 不删除任何现有数据字段;SpotlightCard 保持消费 `{name, description, link, stack}` 结构

## 6. Cloudflare Pages 部署

- 保持 adapter-static 与 prerender,不改构建产物目录(`build/`),配置 `paths` 维持现状(当前无 base)
- 新增:
  - `static/_headers`:`/_app/*` 与 `/assets/*` 长缓存(1y, immutable);HTML `no-cache`;安全头(X-Content-Type-Options、Referrer-Policy、Permissions-Policy 等;不加 CSP 以免挡住 Umami/CDN,或先放 Report-Only——首版不加强 CSP)
  - `wrangler.jsonc`:`{ "name": "mypandora", "pages_build_output_dir": "build" }`(占位 name,可改)
  - package.json 脚本:`"deploy": "pnpm build && wrangler pages deploy build"`(wrangler 作为 devDependency)
- CI:重写 `.github/workflows/main.yml`:pnpm install、`pnpm build`、`pnpm check`、`pnpm lint`,然后 `cloudflare/wrangler-action@v3`,`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` 走 secrets;同时保留"Cloudflare 控制台 Git 集成直连"的说明(无需 CI 也可)
- README 更新:简介、本地开发、Pages 部署两种方式与所需 secrets / 框架预设(无框架预设,输出目录 build)说明

## 7. 可访问性与降级

- 所有动效在 `@media (prefers-reduced-motion: reduce)` 下关闭(reveal 直接可见、极光静止、视差失效)
- 聚光卡对触屏(pointer: coarse)不绑定 pointermove;外链保留 aria-label/rel
- 导航、Tab、灯箱键盘可用;颜色对比度满足 AA

## 8. 验证计划

1. `pnpm check`、`pnpm lint`、`pnpm build` 全部通过
2. `wrangler pages dev build`(或 vite preview)逐页检查:/、/product、/showcase、/uniform
3. 手动验证:主题三态切换、移动端悬浮导航、灯箱前后切换/键盘、reduced-motion 模拟、断网时外链与 CDN 行为不受影响
4. Lighthouse 分桌面/移动各跑一次(性能、可访问性目标 ≥ 95)

## 9. 风险与缓解

- Inter 自托管增加体积:只引 variable latin 子集,font-display: swap,总量可控(<100KB)
- Tailwind v4 `@theme` 语法差异:严格按 v4 文档写法,构建验证
- Cloudflare 对 `_headers` 仅在 Pages 生效;Git 集成模式下无需 wrangler 配置,二者并存不冲突
- 旧 SSH CI 被替换:在 README 中记录原方式已废弃,secrets(SSH_*)可留可删
