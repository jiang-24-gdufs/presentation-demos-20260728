# Cesium 新人技术分享 · 演示文件

## 文件清单

| 文件 | 说明 |
|------|------|
| `index.html` | 核心讲解文档（单页幻灯片，滚动/点击切换章节） |
| `demo-01-loading.html` | 模块一：数据类型与加载（影像 + 地形 + 3D Tiles） |
| `demo-02-entity.html` | 模块二：Entity API（增删改查 + 属性绑定） |
| `demo-03-pick.html` | 模块三：属性查询（Entity / 3D Tiles 拾取） |
| `demo-04-debug.html` | 模块四：调试与体检（Inspector + 自查表） |
| `demo-05-performance.html` | 模块五：性能优化（SSE 调参 + 帧率监控） |

## 运行方式

### 方式一：本地 Build 目录（推荐，适用于超图 Cesium）

所有示例默认引用项目根目录下的 `../Build/Cesium/` 路径，因此需要通过本地 HTTP 服务器运行。

```bash
# 在项目根目录启动任意静态服务器
# 方式 A：Node.js
npx serve .

# 方式 B：Python
python -m http.server 8080

# 方式 C：VS Code Live Server 插件
# 右键 index.html → Open with Live Server
```

然后访问 `http://localhost:<port>/presentation-demos-20260728/index.html`。

### 方式二：CDN 加载标准 Cesium

如需使用标准 Cesium（非超图版本），将每个 HTML 文件头部的引用替换为：

```html
<!-- 替换前（本地 Build） -->
<link href="../Build/Cesium/Widgets/widgets.css" rel="stylesheet">
<script src="../Build/Cesium/Cesium.js"></script>

<!-- 替换后（CDN） -->
<link href="https://cesium.com/downloads/cesiumjs/releases/1.119/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
<script src="https://cesium.com/downloads/cesiumjs/releases/1.119/Build/Cesium/Cesium.js"></script>
```

## Cesium Ion 令牌配置

所有示例中使用了 `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZDhlZWQ2MC0wM2Q3LTQ2ZTMtOTE0OC0yMTQ3ZDJhZDI3MzAiLCJpZCI6MzMzNjQ0LCJpYXQiOjE3NTU2NzU3Mzl9.Hm7yypyrQIHLy4Y55rdY_UiYXJMQr7hv-AjLRvoNg3U` 作为令牌占位符。运行前需替换为你自己的令牌：

1. 前往 [Cesium Ion](https://ion.cesium.com/tokens) 获取或创建令牌
2. 全局替换所有文件中的 `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZDhlZWQ2MC0wM2Q3LTQ2ZTMtOTE0OC0yMTQ3ZDJhZDI3MzAiLCJpZCI6MzMzNjQ0LCJpYXQiOjE3NTU2NzU3Mzl9.Hm7yypyrQIHLy4Y55rdY_UiYXJMQr7hv-AjLRvoNg3U` 为你的实际令牌

```bash
# 批量替换（PowerShell）
Get-ChildItem *.html | ForEach-Object {
    (Get-Content $_.FullName) -replace 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZDhlZWQ2MC0wM2Q3LTQ2ZTMtOTE0OC0yMTQ3ZDJhZDI3MzAiLCJpZCI6MzMzNjQ0LCJpYXQiOjE3NTU2NzU3Mzl9.Hm7yypyrQIHLy4Y55rdY_UiYXJMQr7hv-AjLRvoNg3U', '你的实际令牌' |
    Set-Content $_.FullName
}
```

## 注意事项

- 所有 HTML 文件必须通过 HTTP 服务器访问，直接双击打开（file:// 协议）会导致跨域错误
- 3D Tiles 示例使用 Cesium Ion Asset ID 40866（纽约建筑），需要有效的 Ion 令牌
- 讲解文档 `index.html` 为纯展示页面，不包含可执行的 Cesium 代码
