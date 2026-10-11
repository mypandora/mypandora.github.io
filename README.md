# mypandora

mypandora 官网 —— 开源组件与在线工具集合,帮助你快速构建现代网站。

包含:开源组件、在线产品、模板示例,以及石家庄市校服方案展示。

## 技术栈

- [SvelteKit 2](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/)(runes)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [mode-watcher](https://github.com/svecosystem/mode-watcher)(明/暗/跟随系统主题,默认深色)
- Swiper(校服灯箱)、Lucide 图标
- 全站预渲染(`@sveltejs/adapter-static`),纯静态产物

## 本地开发

```bash
pnpm install
pnpm dev        # 启动开发服务器
pnpm build      # 生产构建,产物输出到 build/
pnpm preview    # 本地预览构建产物
pnpm check      # svelte-check 类型检查
pnpm lint       # prettier + eslint
```

## 部署到 Cloudflare Pages

两种方式任选其一。

### 方式一:Git 集成(推荐,无需 CI)

1. 将仓库连接到 Cloudflare Pages
2. 构建设置:
   - 框架预设(Framework preset):**无 / None**
   - 构建命令:`pnpm build`
   - 构建输出目录:`build`
3. 部署即可。推送 `main` 自动发布,预生成 Pull Request 预览。

### 方式二:Wrangler / GitHub Actions

本地手动部署:

```bash
pnpm deploy
```

通过 CI:仓库已包含 `.github/workflows/main.yml`,在 GitHub 仓库 Secrets 中配置:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

推送到 `main` 后会自动执行 check / lint / build 并部署。

静态资源缓存与安全头在 [`static/_headers`](static/_headers) 中配置;Wrangler 配置见 [`wrangler.jsonc`](wrangler.jsonc)。

## 目录结构

```
src/
  lib/
    actions/reveal.js       # 滚动入场 / 视差 actions
    components/
      site/                 # 导航、页脚、卡片、极光背景等
      uniform/              # 校服画廊与灯箱
    data/                   # 产品、校服、站点展示数据
  routes/                   # /、/product、/showcase、/uniform
static/
  _headers                  # Cloudflare Pages 响应头
  favicon.svg
```
