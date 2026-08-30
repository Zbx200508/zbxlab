# ZBX Lab

个人作品集网站，正式访问地址：

```text
https://www.zbxlab.cn
```

当前第一版先完成首页与海信项目页背景原型，用于展示：

- 重点项目入口
- 简历入口
- 联系方式
- 项目详情页原型

当前部署链路：

```text
腾讯云 COS 香港桶
→ 腾讯云 CDN 中国境外加速
→ www.zbxlab.cn
→ HTTPS 证书
→ HTTP 自动跳转 HTTPS
```

后续重点：

- 海信自动化报告工作台项目详情页
- 雅迪 VOC 用户洞察看板项目详情页
- 项目 Demo、PRD、操作 GIF 和脱敏截图展示
- GitHub 仓库 `zbxlab`
- GitHub Actions 自动同步到 COS 并刷新 CDN

更多交接信息见：

```text
PROJECT_HANDOFF.md
docs/DEPLOYMENT.md
docs/HOMEPAGE_PROTOTYPE.md
```
