# Cesium 新人技术分享 · 演示文件

## 文件清单

| 文件 | Cesium 版本 | 说明 |
|------|------------|------|
| `index.html` | — | 核心讲解文档（单页幻灯片，滚动/点击切换章节） |
| `demo-01-loading.html` | CDN 社区版 | 模块一：数据类型与加载（Bing / Google 影像 + 地形 + 3D Tiles） |
| `demo-02-entity.html` | 本地超图版 | 模块二：Entity API（增删改查 + 属性绑定） |
| `demo-03-pick.html` | CDN 社区版 | 模块三：属性查询（Entity / 模型 / 3D Tiles 拾取 + 地理坐标查询） |
| `demo-04-debug.html` | 本地超图版 | 模块四：调试与体检（Inspector + 自查表） |
| `demo-05-coordinates.html` | CDN 社区版 | 模块五：坐标系统与空间计算（WGS84 ⇄ Cartesian3 + 实时坐标跟踪） |

## ⚠ CDN 版与超图版的区别

| | CDN 社区版 (≥ 1.104) | 本地超图 Cesium |
|---|---|---|
| **3D Tiles 加载** | `Cesium3DTileset.fromIonAssetId()` | `new Cesium3DTileset({url})` |
| **影像加载** | `IonImageryProvider.fromAssetId()` | `new IonImageryProvider({assetId})` |
| **地形加载** | `CesiumTerrainProvider.fromIonAssetId()` | `createWorldTerrain()` |
| **S3M 数据** | 不支持 | `scene.addS3MTilesLayerByScp()` |

超图版本基于较早的 Cesium 内核，**不支持** `fromIonAssetId` / `fromAssetId` 等静态工厂方法。混用会报 `TypeError: ... is not a function`。

## 运行方式

### 方式一：本地 HTTP 服务器（推荐）

所有示例均需通过 HTTP 服务器访问，直接双击打开（file:// 协议）会导致跨域错误。

```bash
# 在项目根目录启动
npx serve .
# 或
python -m http.server 8080
# 或使用 VS Code Live Server 插件
```

然后访问 `http://localhost:<port>/presentation-demos-20260728/index.html`。

### 方式二：切换 Cesium 引用

使用 CDN 的示例（demo-01 / demo-03 / demo-05）引用的是：

```html
<link href="https://cesium.com/downloads/cesiumjs/releases/1.119/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
<script src="https://cesium.com/downloads/cesiumjs/releases/1.119/Build/Cesium/Cesium.js"></script>
```

使用本地超图版本的示例（demo-02 / demo-04）引用的是：

```html
<link href="../Build/Cesium/Widgets/widgets.css" rel="stylesheet">
<script src="../Build/Cesium/Cesium.js"></script>
```

如需切换版本，修改对应 HTML 文件头部的引用即可。注意 API 差异。

## Cesium Ion 令牌配置

所有示例中使用 `YOUR_CESIUM_ION_TOKEN` 作为令牌占位符。运行前需替换为你自己的令牌：

1. 前往 [Cesium Ion](https://ion.cesium.com/tokens) 获取或创建令牌
2. 全局替换所有文件中的 `YOUR_CESIUM_ION_TOKEN`

```powershell
# 批量替换（PowerShell）
Get-ChildItem *.html | ForEach-Object {
    (Get-Content $_.FullName) -replace 'YOUR_CESIUM_ION_TOKEN', '你的实际令牌' |
    Set-Content $_.FullName
}
```

## 可用的 Ion Asset ID

| Asset ID | 名称 | 类型 |
|----------|------|------|
| 1 | Cesium World Terrain | Terrain |
| 2 | Bing Maps Aerial | Imagery |
| 3 | Bing Maps Aerial with Labels | Imagery |
| 4 | Bing Maps Road | Imagery |
| 96188 | Cesium OSM Buildings | 3D Tiles |
| 2275207 | Google Photorealistic 3D Tiles | 3D Tiles |
| 3830182 | Google Maps 2D Satellite | Imagery |
| 3830183 | Google Maps 2D Satellite with Labels | Imagery |
| 3830184 | Google Maps 2D Roadmap | Imagery |
| 3830185 | Google Maps 2D Labels Only | Imagery |
| 3830186 | Google Maps 2D Contour | Imagery |
