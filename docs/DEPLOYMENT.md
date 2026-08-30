# zbxlab.cn 部署记录

## 当前部署路线

第一版已经采用腾讯云 COS + CDN 路线跑通，正式入口为：

```text
https://www.zbxlab.cn
```

当前链路：

```text
腾讯云 COS 香港存储桶
→ 腾讯云 CDN 中国境外加速
→ DNSPod CNAME 解析
→ 腾讯云 SSL 免费证书
→ HTTPS 访问
```

## 当前网站类型

```text
纯静态网站
HTML / CSS / JavaScript
无需构建命令
```

## COS 配置

存储桶：

```text
zbxlab-1476825963
```

地域：

```text
中国香港 / ap-hongkong
```

权限：

```text
公有读私有写
```

静态网站：

```text
状态：开启
默认首页：index.html
默认 404 页：index.html
错误码：原始错误码
强制 HTTPS：关闭，由 CDN 侧统一处理
```

线上文件结构：

```text
index.html
assets/
cases/
css/
js/
```

注意：COS 默认域名或静态网站默认域名可能会下载 HTML 或返回目录访问错误，最终访问以 CDN 自定义域名为准。

## CDN 配置

加速域名：

```text
www.zbxlab.cn
```

服务地域：

```text
中国境外
```

加速类型：

```text
CDN 网页小文件
```

源站：

```text
源站类型：COS 源
源站地址：zbxlab-1476825963 / 默认域名
回源协议：HTTP
回源 Host：zbxlab-1476825963.cos.ap-hongkong.myqcloud.com
私有存储桶访问：关闭
```

缓存：

```text
全部文件：缓存 10 分钟
强制修改：否
```

智能压缩：

```text
开启 gzip
适用文件：js / html / css / xml / shtml / htm / json
```

用量封顶：

```text
统计类型：瞬间用量
统计周期：每 5 分钟
封顶配置：流量封顶
阈值：10 GB
解封时间：永不解封
超出阈值：访问返回 404
告警阈值：未开启
```

HTTPS：

```text
证书域名：www.zbxlab.cn
证书类型：腾讯云免费 SSL 证书
验证方式：自动 DNS 验证
HTTPS 服务：开启
强制跳转：Http -> Https
跳转方式：302
携带头部：否
```

根路径重写：

```text
待重写回源 URL：/
目标回源 Host：zbxlab-1476825963.cos.ap-hongkong.myqcloud.com
目标回源 Path：/index.html
```

这条规则用于解决访问 `https://www.zbxlab.cn` 时 COS 默认域名不会自动查找 `index.html` 的问题。

## DNS 配置

DNSPod 中已配置：

```text
主机记录：www
记录类型：CNAME
记录值：www.zbxlab.cn.cdn.dnsv1.com
```

证书申请时腾讯云自动添加过 `_dnsauth` TXT 验证记录，不要手动删除，除非确认后续证书续签不再依赖该记录。

## 当前可访问地址

```text
https://www.zbxlab.cn
https://www.zbxlab.cn/index.html
```

`http://www.zbxlab.cn` 已配置自动跳转到 HTTPS。

## 后续更新流程

当前可以手动更新：

1. 本地修改网页文件。
2. 将更新后的线上文件同步到 `deploy/site-root/`。
3. 将 `deploy/site-root/` 中的文件按目录上传到 COS 根目录。
4. 如果同名文件已存在，直接覆盖。
5. 等待 CDN 缓存 10 分钟自动更新，或在 CDN 控制台手动刷新缓存。

推荐后续升级为 GitHub 自动部署：

```text
本地改网页
→ 提交到 GitHub 仓库 zbxlab
→ GitHub Actions 自动同步到 COS
→ 自动刷新 CDN 缓存
→ www.zbxlab.cn 更新
```

后续不要长期依赖控制台一个文件一个文件上传，这只适合首次跑通链路。

## GitHub Actions 自动部署

已添加自动部署工作流：

```text
.github/workflows/deploy.yml
```

触发方式：

```text
推送 main 分支时自动部署
也可以在 GitHub Actions 页面手动运行
```

工作流会执行：

```text
1. 拉取仓库代码
2. 生成临时 dist/ 目录
3. 只复制线上需要的文件：index.html、assets/、cases/、css/、js/
4. 使用 COSCMD 同步到腾讯云 COS
5. 使用腾讯云 CLI 刷新 CDN 目录缓存
```

COSCMD 同步命令中使用 `-y` 自动确认删除提示，避免 GitHub Actions 无法输入确认而失败。

需要在 GitHub 仓库中配置 Secrets：

```text
TENCENT_SECRET_ID
TENCENT_SECRET_KEY
```

腾讯云密钥权限建议最小化：

```text
COS：PutObject、DeleteObject、GetBucket、HeadObject、HeadBucket
CDN：PurgePathCache、PurgeUrlsCache、DescribePurgeTasks
```

注意：

```text
不要把 SecretId / SecretKey 写入代码、文档或截图。
```

GitHub Actions 中使用的固定配置：

```text
COS_BUCKET：zbxlab-1476825963
COS_REGION：ap-hongkong
CDN_REFRESH_PATH：https://www.zbxlab.cn/
```

## GitHub 仓库

仓库名：

```text
zbxlab
```

GitHub 用作长期代码源。明天创建仓库后，需要继续补：

- 远程仓库绑定
- 第一次 push
- `.github/workflows/deploy.yml`
- 腾讯云密钥放入 GitHub Secrets
- 自动上传 COS
- 自动刷新 CDN
