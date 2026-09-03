# ZBX Lab

个人作品集网站，正式访问地址：

```text
https://www.zbxlab.cn
```

当前第一版已完成首页、简历页与海信项目页，用于展示：

- 重点项目入口
- 简历入口
- 联系方式
- 项目详情页、作品集 Demo、产品方案页与 PRD 片段

当前部署链路：

```text
腾讯云 COS 香港桶
→ 腾讯云 CDN 中国境外加速
→ www.zbxlab.cn
→ HTTPS 证书
→ HTTP 自动跳转 HTTPS
```

当前进度：

- 海信自动化报告工作台项目详情页（已改为交付前内部工具 + 正式周报配置中心两个阶段）
- 海信交付前内部工具说明页已完成第一版
- 海信正式周报配置中心产品方案页已完成第一版
- 两个说明方案页已隐藏滚动条，并增加右下角回到顶部按钮

后续重点：

- 雅迪 VOC 用户洞察看板项目详情页
- 项目 Demo、操作 GIF、PRD 片段和脱敏截图展示
- GitHub 仓库 `zbxlab`
- GitHub Actions 自动同步到 COS 并刷新 CDN

更多交接信息见：

```text
PROJECT_HANDOFF.md
docs/DEPLOYMENT.md
docs/HOMEPAGE_PROTOTYPE.md
```
