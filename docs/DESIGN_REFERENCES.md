# ZBX Lab 首页设计参考

> 目标：为个人作品集首页寻找更有设计感、但仍然贴合数据产品经理身份的视觉方向。

## 参考来源

1. Product Manager Portfolio Template
   - GitHub: https://github.com/lisafeets/product_portfolio
   - 可借鉴：产品作品集要重视 case study、截图、项目 walkthrough，而不是只写技能。

2. Product People Portfolios
   - GitHub: https://github.com/mirrorstage/product-people-portfolios
   - 可借鉴：产品人作品集通常以清晰定位和项目入口为主，不宜过度装饰。

3. TailAdmin Dashboard
   - GitHub: https://github.com/TailAdmin/free-nextjs-admin-dashboard
   - 可借鉴：数据产品气质可以来自 KPI 卡片、表格、图表、浅色面板和清晰网格。

4. Shadcn Fintech Dashboard
   - GitHub: https://github.com/abderrahimghazali/shadcn-fintech
   - 可借鉴：金融/数据类页面适合使用深浅对比、信息卡片、趋势图、ticker 和细腻交互。

5. Shadcn Resume / Portfolio Template
   - GitHub: https://github.com/shadcnspace/resume-shadcn-ui-resume-and-portfolio-template
   - 可借鉴：简历和作品集需要清楚分区、响应式、现代但克制。

6. Awesome Shadcn UI
   - GitHub: https://github.com/birobirobiro/awesome-shadcn-ui
   - 可借鉴：可参考 dashboard、animated components、portfolio template，但不直接套炫技模板。

7. Shadcn UI Blocks
   - GitHub: https://github.com/shadcnblockscom/shadcn-ui-blocks
   - 可借鉴：可从 dashboard blocks、portfolio blocks、AI app blocks 中抽取组件语言。

## 适合 ZBX Lab 的设计方向

### 推荐方向：Data Product Portfolio

关键词：

```text
简洁 / 数据感 / 产品感 / 轻 dashboard / 作品索引 / 高级但不喧宾夺主
```

首页不做普通纯文本列表，也不做完整后台仪表盘，而是做成一个“数据产品经理的作品控制台”。

## 首页可以采用的设计元素

### 1. 顶部保留极简导航

```text
ZBX Lab    Projects    Resume    Contact
```

### 2. 首屏加入轻量 dashboard 背景

不是大面积花哨背景，而是在页面背景中加入低透明度元素：

- 网格线
- 微弱数据折线
- 浅色坐标轴
- 半透明指标卡片轮廓
- 项目状态小标签

### 3. 项目卡片做成数据产品卡

每个项目卡片可以包含：

```text
项目名称
一句话价值
项目类型
状态标签
2-3 个能力关键词
轻量项目色
```

### 4. 首页增加一条“能力指标栏”

用很轻的形式展示：

```text
3 Projects
6 Core Skills
2 Case Studies
1 Live Domain
```

这会比普通技能标签更有数据产品气质。

### 5. 配色建议

首页主色仍使用中性石墨灰，项目卡片保留项目主题色。

推荐首页底色：

```text
背景：#F7F7F4
卡片：#FFFFFF
文字：#171717
辅助文字：#6B6B6B
边框：#E3E1DC
```

推荐背景增强色：

```text
微弱线条：rgba(23, 23, 23, 0.06)
微弱数据图形：rgba(23, 23, 23, 0.04)
```

项目色：

```text
海信：青绿色
雅迪 VOC：军蓝色
AI 实验：暖棕灰 / 紫灰
```

## 不建议采用的方向

- 大面积黑色科技风首页。
- 赛博朋克霓虹风。
- 纯后台系统首页。
- 过多组件堆叠。
- 首屏放大图表但没有项目入口。
- 每个区域都做卡片，导致页面像模板。

## 推荐的首页新版结构

```text
顶部导航
↓
首屏：个人作品集 + 简短定位 + 数据产品封面
↓
三个摘要信号：Case Studies / Product Demo / Live Domain
↓
精选项目卡片
↓
联系入口
```

## 一句话设计判断

```text
让首页看起来像“一个数据产品经理整理自己的项目控制台”，而不是普通简历页，也不是后台管理系统。
```

## 当前采用的设计调整

为了避免“普通 AI 白底模板”的感觉，首页首屏改为深色产品封面：

- 深色底承载品牌感和第一印象。
- 规整网格表达数据产品气质。
- 三个摘要信号卡提前露出项目重点。
- 项目区仍然保持白底和高可读性。
- 项目卡片 hover 使用各自项目色，不占用首页主色。

这个方向参考了 open-source portfolio、motion-forward portfolio 和 shadcn/dashboard 模板的组合，而不是直接套用某一个模板。
