# zbxlab.cn 部署记录

## 当前部署路线

第一版采用腾讯云体系直接部署，优先跑通 `zbxlab.cn` 访问。

推荐平台：

```text
腾讯云 EdgeOne Pages / Makers
```

## 当前网站类型

```text
纯静态网站
HTML / CSS / JavaScript
无需构建命令
```

## 上传包

本地生成的上传包：

```text
deploy/zbxlab-site.zip
```

上传包只包含线上访问需要的文件：

```text
index.html
assets/
cases/
css/
js/
```

## EdgeOne 建议配置

```text
项目名称：zbxlab
构建命令：无
输出目录：/
```

## 自定义域名

```text
主域名：zbxlab.cn
建议同时配置：www.zbxlab.cn
```

## 后续流程

1. 在腾讯云 EdgeOne Pages / Makers 创建站点。
2. 选择直接上传静态文件。
3. 上传 `deploy/zbxlab-site.zip`。
4. 等待生成临时访问链接。
5. 添加自定义域名 `zbxlab.cn`。
6. 按腾讯云提示配置 DNS 解析。
7. 等待 HTTPS 证书签发并生效。
8. 检查首页和海信页面是否可以正常访问。

## GitHub 仓库

仓库名：

```text
zbxlab
```

GitHub 用作长期代码源。第一版可以先腾讯云直接上传，后续再接入 GitHub 自动部署。
