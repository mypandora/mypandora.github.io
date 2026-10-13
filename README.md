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

可以通过 Cloudflare Pages 的 Git 集成自动部署，也可以在本地用 Wrangler 手动部署。当前仓库已删除 GitHub Actions 工作流，不会通过 GitHub Actions 自动部署。

### 方式一:Git 集成(推荐,无需 CI)

1. 将仓库连接到 Cloudflare Pages
2. 构建设置:
   - 框架预设(Framework preset):**无 / None**
   - 构建命令:`pnpm build`
   - 构建输出目录:`build`
3. 部署即可。推送 `main` 自动发布,预生成 Pull Request 预览。

### 方式二:Wrangler 本地手动部署(可选)

仓库保留 Wrangler 命令，供本地预览和手动发布使用:

```bash
pnpm pages:dev  # 本地模拟 Cloudflare Pages
pnpm deploy
```

`wrangler` 依赖和根目录的 [`wrangler.jsonc`](wrangler.jsonc) 仅在使用这些 Wrangler 命令时需要；如果只用 Cloudflare Pages Git 集成，可以移除它们以及 `pages:dev`、`deploy` 脚本。`.wrangler/` 是 Wrangler 本地生成的缓存目录，不是项目配置，也不需要提交。

静态资源缓存与安全头在 [`static/_headers`](static/_headers) 中配置。若 `*.pages.dev` 已更新而自定义域名仍显示旧页面，可检查 Cloudflare Cache Rules / Browser Cache TTL，并清除该域名的缓存；仓库的 `_headers` 已设置预渲染 HTML 不缓存、带哈希静态资源长期缓存。

> 旧的 GitHub Actions + SSH/rsync 部署方式已废弃；当前没有 GitHub Actions 部署工作流。仓库中原有的 Umami 统计脚本也已移除。

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
