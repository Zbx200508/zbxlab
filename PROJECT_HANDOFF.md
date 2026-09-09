# 个人网站搭建项目交接文件

## 1. 项目背景

这是一个用于秋招展示的个人作品集网站，域名为：

```text
zbxlab.cn
```

当前主要访问入口为：

```text
https://www.zbxlab.cn
```

项目最初从“个人网站/作品集原型”开始，目标不是做一个花哨的展示页，而是让 HR、面试官或业务方能快速看到真实项目、项目能力和可交付成果。用户希望网站中文为主，风格专业、简洁、干净，同时保留一定设计感。

用户正在实习，部分早期文件和思路来自另一台公司电脑，因此项目需要迁移到 GitHub，避免代码、文案、截图和设计决策散落在不同电脑或不同聊天里。

## 2. 项目目标

网站目标：

- 建立一个可公开访问的个人作品集站点。
- 首页快速呈现项目入口、简历入口、联系方式。
- 每个重点项目拥有独立 Case 页面。
- Case 页面承载 Demo、PRD、操作 GIF、截图、设计说明与复盘内容。
- 后续通过 GitHub 管理代码，通过自动部署同步到腾讯云 COS/CDN。

当前定位：

```text
个人作品集
```

不要在首页强行堆叠“AI 产品 / 数据分析 / 自动化报告 / 产品 Demo”等标签，避免显得生硬。能力标签和方法论可以放进项目页或简历页，用真实案例证明。

## 3. 当前已知进度

已完成：

- 域名 `zbxlab.cn` 已注册。
- 第一版首页已经完成。
- 首页采用纸张质感背景，整体偏简洁、专业。
- 首页保留右上角导航：`Projects / Resume / Contact`。
- 首页主标题为 `个人作品集`。
- 首页项目区标题为 `我的项目`，辅助提示为 `点击查看`。
- 项目卡片整体可点击，不再使用单独“查看 Case”按钮。
- 项目卡片有轻微 hover 反馈和品牌色提示。
- 项目卡片中嵌入品牌 Logo 水印，不使用单独灰色蒙版。
- 已引入 Hisense、Yadea、Hong Kong Disneyland 的 SVG Logo。
- 海信项目页已做背景原型，当前回退并保留“最初第一版”的深色绿色光束背景。
- 腾讯云 COS 香港桶已创建。
- 腾讯云 CDN 中国境外加速已配置。
- `www.zbxlab.cn` 的 CNAME 已生效。
- 免费 SSL 证书已签发并绑定到 CDN。
- HTTPS 已开启。
- HTTP 自动跳转 HTTPS 已开启。
- 根路径 `/` 已通过 CDN 回源 URL 重写到 `/index.html`。
- 当前网站已经可通过 `https://www.zbxlab.cn` 访问。
- GitHub 仓库已创建并推送初始代码：`https://github.com/Zbx200508/zbxlab`
- 已添加 GitHub Actions 自动部署工作流：`.github/workflows/deploy.yml`
- 已通过 `main` 分支推送触发 GitHub Actions，同步部署到腾讯云 COS/CDN。
- 已新增在线简历第一版：`resume/index.html`。
- 已新增简历页样式：`css/resume.css`。
- 首页“查看简历”和“在线查看 HTML 简历”已指向 `/resume/`。
- 已接入 PDF 简历下载：`assets/resume/zhang-beixuan-resume.pdf`。
- 首页 GitHub 联系入口已指向 `https://github.com/Zbx200508/zbxlab`。
- GitHub Actions 部署清单已加入 `resume/` 目录。
- 首页雅迪、香港迪士尼项目卡片已改为真实占位 Case 页面，避免空链接。
- 已新增 `assets/favicon.svg` 并接入首页、简历页和 Case 页面。
- 在线简历已根据用户提供的 PDF 版本同步为 HTML，包含教育背景、实习经历、项目经历、技能荣誉和个人优势。
- 已从 PDF 提取证件照并放入在线简历：`assets/resume/portrait.jpg`。
- 海信 Case 已从背景原型扩展为项目页骨架，包含业务问题、角色、核心链路、Demo 展示区、PRD 展示结构和数据打标链路验证延展判断。
- 用户确认海信页改为“展览空间”方向：背景保留氛围感，原型作为整页缩略展品出现，点击展品进入具体原型页。
- 已保留正式原型参考文件：`demos/hisense-weekly-config.html`，来源为海信周报中心配置 7.29 原型。
- 已新增初期自建工作台静态原型：`demos/hisense-self-built-prototype.html`。
- 海信 Case 当前采用上下两组展示：上方展示“交付前内部工具”，下方展示“正式周报配置中心”。
- 已新增交付前内部工具说明页：`prd/hisense-internal-workbench.html`，重点说明人工周报流程、指标口径、返工来源、自动化处理流程、生成进度可视化和交付结果。
- 已新增正式周报配置中心产品方案页：`prd/hisense-formal-weekly-center-prd.html`，重点说明正式版页面结构、5 步配置、交互校验、状态流转、配置快照和复用规则。
- 两个说明方案页已采用统一桌面端配置：隐藏滚动条、页面顶部返回箭头、右下角回到顶部按钮。
- 本地与线上均已验证海信项目总览页、交付前内部工具说明页、正式周报配置中心产品方案页可正常访问。
- 已对项目详情页、方案页和 Demo 页增加 `noindex`，避免搜索“海信”等项目关键词时直接展示具体项目页面；首页保留收录，用于搜索 `ZBX Lab` 或网站名称时展示。
- 雅迪和香港迪士尼占位页已重新设计不同背景方向，不再沿用海信深色绿光视觉。

当前本地核心文件：

```text
index.html
css/styles.css
js/main.js
resume/index.html
css/resume.css
cases/hisense.html
demos/hisense-weekly-config.html
demos/hisense-self-built-prototype.html
demos/hisense-weekly-report/index.html
demos/hisense-weekly-report/styles.css
demos/hisense-weekly-report/app.js
demos/hisense-weekly-report/sample-report.html
prd/hisense-weekly-report-prd.html
prd/hisense-internal-workbench.html
prd/hisense-formal-weekly-center-prd.html
cases/yadea-voc.html
cases/disney.html
css/hisense.css
css/case-placeholder.css
assets/paper-texture.png
assets/favicon.svg
assets/resume/zhang-beixuan-resume.pdf
assets/resume/portrait.jpg
assets/logos/hisense.svg
assets/logos/yadea.svg
assets/logos/hong-kong-disneyland.svg
```

部署目录：

```text
deploy/site-root/
```

## 4. 推荐作品集结构

首页只做入口，不承载大量解释。

推荐结构：

```text
顶部导航
↓
个人作品集标题区
↓
我的项目
↓
简历入口
↓
联系方式
```

首页只保留三类内容：

- 项目卡片：点击进入独立 Case 页面。
- 简历入口：在线查看 HTML 简历，另有下载按钮。
- 联系方式：GitHub、邮箱、手机号。

不建议首页放：

- 长篇个人介绍。
- 大量能力标签。
- 方法论长文。
- 每个项目的完整过程。
- 过多装饰性数据图形。

这些内容应该进入项目详情页或简历页。

## 5. 主项目展示优先级

当前项目优先级建议：

1. 海信自动化报告工作台
2. 雅迪 VOC 用户洞察看板
3. 香港迪士尼项目
4. AI 原型与效率工具实验

优先级原因：

- 海信项目目前最适合作为主项目，因为它能展示自动化报告、数据整理、业务流程拆解和产品化表达。
- 雅迪 VOC 适合作为数据洞察与用户反馈分析方向的补充案例。
- 香港迪士尼项目适合展示品牌体验、用户旅程、项目展示或运营相关能力。
- AI 原型与效率工具可以放在后面，用于展示 Vibe Coding、快速原型和自动化能力，但不要抢走主项目叙事。

## 6. 海信 Case 页面结构

海信页面当前先确定视觉方向，后续再补内容。

视觉方向：

```text
深色背景
绿色/青绿色光效
高级感
不要像传统后台系统截图页
不要过于恐怖、压抑或廉价科技风
```

用户曾尝试描述为：

- 夜晚海岸。
- 海浪被光线照射后的反光。
- 水面波光粼粼。
- 不要直接做成真实水面，而是抽象解构。
- 后续曾多次迭代水面视觉，但最终决定回退到最初第一版深色绿色光束背景。

内容结构建议：

```text
Hero：项目名称 + 一句话说明 + Demo 入口
项目背景：业务问题是什么
我的角色：负责什么
解决方案：如何把报表流程产品化
核心流程：数据输入 → 指标整理 → 报告生成 → 可视化展示
Demo 展示：可操作原型或录屏 GIF
PRD 展示：需求结构、功能模块、交互说明
关键页面：截图 + 设计说明
结果与复盘：效率提升、可复用价值、限制与下一步
```

海信页面后续要注意：

- 不要泄露真实业务数据。
- 不要展示公司内部系统、账号、客户信息。
- 截图需脱敏。
- 如果 Demo 是模拟数据，要明确使用模拟数据。

## 7. GitHub 仓库建议目录

仓库名：

```text
zbxlab
```

推荐目录：

```text
zbxlab/
├─ README.md
├─ PROJECT_HANDOFF.md
├─ TODO.md
├─ index.html
├─ assets/
│  ├─ paper-texture.png
│  └─ logos/
│     ├─ hisense.svg
│     ├─ yadea.svg
│     └─ hong-kong-disneyland.svg
├─ cases/
│  └─ hisense.html
├─ prd/
│  └─ hisense-weekly-report-prd.html
├─ css/
│  ├─ styles.css
│  └─ hisense.css
├─ js/
│  └─ main.js
├─ docs/
│  ├─ DEPLOYMENT.md
│  ├─ HOMEPAGE_PROTOTYPE.md
│  └─ DESIGN_REFERENCES.md
└─ deploy/
   └─ site-root/
```

后续可以增加：

```text
resume/
demos/
screenshots/
prd/
  hisense-weekly-report-prd.html
```

## 8. 跨电脑同步规则

长期规则：

```text
GitHub = 代码唯一源
ChatGPT 项目 = 讨论、规划、文案、决策记录
腾讯云 COS/CDN = 线上展示
```

不要把重要成果只留在：

- 某一台电脑本地。
- 某一个 ChatGPT 普通聊天。
- 腾讯云控制台文件列表。

每次完成一个明确阶段，就提交一次 Git：

```text
init portfolio site
update homepage layout
add hisense case prototype
update deployment docs
add resume page
add yadea voc case
```

GitHub 仓库已创建并推送当前项目。下一步是配置 GitHub Secrets，并手动运行一次 GitHub Actions 验证自动部署链路。

## 9. 部署路线：方案 B，偏国内稳定访问

当前实际采用的是：

```text
腾讯云 COS 香港桶 + 腾讯云 CDN 中国境外 + DNSPod + 免费 SSL
```

选择原因：

- 不需要购买云服务器。
- 当前域名尚未备案，不适合接中国境内 CDN。
- 香港 COS + 中国境外 CDN 可以先绕开备案要求，尽快用于秋招展示。
- 费用比云服务器低很多，适合静态作品集。

当前已跑通：

```text
https://www.zbxlab.cn
```

当前关键配置：

```text
COS 地域：中国香港
COS 权限：公有读私有写
CDN 加速区域：中国境外
CDN 加速类型：网页小文件
CDN 源站：COS 默认域名
缓存时间：10 分钟
HTTPS：已开启
HTTP 强制跳 HTTPS：已开启
根路径重写：/ → /index.html
```

后续如果完成 ICP 备案，可以考虑：

- 将 CDN 加速区域改为中国境内或全球。
- 或继续保持当前中国境外配置，视访问速度和成本决定。

## 10. 脱敏规则

所有项目展示必须遵守：

- 不展示真实客户数据。
- 不展示内部系统地址、账号、权限、接口、工单号。
- 不展示公司未公开的经营数据、销售数据、用户数据。
- 不展示未经允许的内部文档原文。
- 截图中出现姓名、电话、邮箱、订单号、设备号、地址等信息必须打码。
- 指标数值可以用模拟数据、比例化数据或区间表达。
- Demo 不连接内部接口、账号、Token 或 MCP 地址；可公开展示的品牌名、指标结构和样例报告数据可保留。
- 项目成果可以写“流程优化、效率提升、报告自动化、可复用模板”等，但具体数字必须有依据，不能编造。

推荐表达方式：

```text
基于模拟数据复刻核心业务流程
脱敏后展示核心交互与指标结构
不包含任何公司内部真实数据
```

## 11. 说明方案页配置规范

海信两个说明方案页已经形成可复用配置：

```text
prd/hisense-internal-workbench.html
prd/hisense-formal-weekly-center-prd.html
```

页面定位：

- 说明方案页用于展示项目方案、流程拆解、交互逻辑、PRD 片段和设计价值。
- 不作为普通后台系统页面处理，视觉上应保持作品集展示感。
- 页面内容允许纵向滚动，但不显示浏览器滚动条或页面内滚动条。

桌面端交互配置：

- 页面顶部保留返回箭头，点击回到对应 Case 总览页；返回箭头不固定在视口上。
- 右下角固定回到顶部按钮，用户向下滚动超过约一屏后出现。
- 回到顶部按钮使用小尺寸圆形图标按钮，不使用文字 tag，避免干扰正文和素材展示。
- 页面顶部不再放固定跳转 tag，避免和阅读滚动、素材放大操作产生冲突。
- 如果页面内有 GIF / 视频素材，优先放在内容侧栏或弹窗中，避免占满整屏。

移动端配置：

- 移动端后续基于桌面端单独适配。
- 当前阶段先记录需求，不处理移动端布局。

## 12. 搜索引擎收录规则

当前网站采用“首页可收录，具体项目页不收录”的策略：

- 首页 `index.html` 保持可收录，用于搜索 `ZBX Lab`、`zbxlab` 或网站名称时展示。
- 项目详情页 `cases/` 增加 `noindex, nofollow, noarchive, nosnippet`。
- 方案与 PRD 页面 `prd/` 增加 `noindex, nofollow, noarchive, nosnippet`。
- Demo 页面 `demos/` 增加 `noindex, nofollow, noarchive, nosnippet`。
- 首页项目卡片避免直接使用“海信自动化报告工作台”等强搜索关键词，改为更概括的项目名。
- `robots.txt` 暂不禁止抓取 `cases/`、`prd/`、`demos/`，因为已被收录的页面需要搜索引擎重新抓取后读取 `noindex`，才能从结果中逐步移除。
- 等搜索结果消退后，可再考虑在 `robots.txt` 中进一步屏蔽详情目录。

注意：搜索引擎去索引不会立即生效，通常需要数天到数周。若需要更快移除，需在 Google Search Console、Bing Webmaster 或百度资源平台提交移除请求。

## 13. 另一台电脑需要补充/打包的内容

如果公司电脑上还有早期素材，需要尽快打包迁移：

- 当前 HTML / CSS / JS 文件。
- 海信自动化报告 Demo 原型。（公开入口为基于 7.29 正式原型重做的作品集 Demo）
- 海信 Case 文案草稿与 PRD 页面。（已新增作品集版 PRD）
- 雅迪 VOC 看板资料。
- 香港迪士尼项目资料。
- 所有截图、GIF、录屏。
- PRD 文档或产品说明。
- 之前 ChatGPT 生成的方案、文案、结构。
- 设计参考图。
- 待办清单。
- 已确定但未写进代码的设计决策。

建议在另一台电脑上生成一份：

```text
PROJECT_HANDOFF_FROM_WORK_PC.md
```

内容包括：

- 项目目标。
- 当前文件目录。
- 已完成页面。
- 未完成内容。
- 每个项目的当前状态。
- 素材列表。
- 脱敏注意事项。
- 下一步建议。

然后放入 GitHub 仓库。

## 14. 下一步待办

近期优先做：

1. 继续检查线上站点 `https://www.zbxlab.cn` 的首页、海信 Case、两个说明方案页和 Demo 页面。
2. 补充海信内部工作台的生成进度 GIF 或关键截图。
3. 梳理雅迪 VOC 项目页结构与展示素材。
4. 梳理香港迪士尼项目展示内容。
5. 检查移动端布局，海信说明方案页后续基于桌面端单独适配。

GitHub Actions 已配置：

```text
触发：push 到 main，或手动 workflow_dispatch
上传工具：COSCMD
刷新工具：腾讯云 CLI
同步目标：zbxlab-1476825963 / ap-hongkong
刷新路径：https://www.zbxlab.cn/
```

需要配置的 GitHub Secrets：

```text
TENCENT_SECRET_ID
TENCENT_SECRET_KEY
```

中期待办：

- 完成雅迪 VOC 项目页。
- 完成香港迪士尼项目页。
- 给每个项目建立统一但不同品牌调性的详情页视觉。
- 优化移动端展示。
- 增加简历 PDF 下载。
- 检查所有链接、图片、跳转和 HTTPS。

重要提醒：

```text
不要把 Tencent SecretId / SecretKey 写进代码或提交到 GitHub。
```

后续自动部署必须使用 GitHub Secrets 或本地环境变量。
