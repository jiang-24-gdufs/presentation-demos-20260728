# Code Review — Cesium 新人技术分享全模块审查

> **审查时间**: 2026-07-28  
> **审查范围**: `index.html`, `demo-01-loading.html`, `demo-02-entity.html`, `demo-03-pick.html`, `demo-04-coordinates.html`, `shared-config.js`, `shared-style.css`  
> **审查规则**: Correctness / Security / Performance / Maintainability

---

## 审查统计

| 严重度 | 数量 |
|--------|------|
| Critical | 0 |
| High | 1 |
| Medium | 4 |
| Low | 4 |

---

## High

### 1. `demo-02-entity.html` — 使用已废弃的 `createWorldTerrain()` API

| 字段 | 值 |
|------|-----|
| **path** | `demo-02-entity.html` |
| **start_line** | 80 |
| **end_line** | 80 |
| **category** | bug |
| **severity** | high |

**问题**: `demo-02-entity.html` 使用本地超图 Cesium（`../Build/Cesium/Cesium.js`），但 Viewer 初始化中使用了 `terrainProvider: Cesium.createWorldTerrain()`。这个函数在较新版本 Cesium 中已被废弃，且超图 Cesium 的 `createWorldTerrain()` 实际行为是创建一个连接 Cesium Ion 的地形，而本地超图版本可能没有配置 Ion Token 支持此方式。

```js
// 当前代码
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(),
    ...
});
```

**建议**: 其他三个 demo（01/03/05）使用 CDN Cesium + `CesiumTerrainProvider.fromIonAssetId(1)` 异步加载。`demo-02` 是唯一使用本地超图 Cesium 的 demo，应在注释中明确说明这是有意为之，或者改用与其他 demo 一致的 CDN 版本和异步地形加载方式。

---

## Medium

### 2. `demo-01-loading.html` — 调试按钮在非 DEBUG 模式下点击会抛 ReferenceError

| 字段 | 值 |
|------|-----|
| **path** | `demo-01-loading.html` |
| **start_line** | 98 ~ 108 |
| **category** | bug |
| **severity** | medium |

**问题**: 调试面板的 HTML 按钮始终存在于 DOM 中（`onclick="toggleInspector()"` 等），但对应的 `window.toggleInspector` / `window.toggle3DTilesInspector` 等函数只在 `if (DEBUG_MODE)` 分支内定义。虽然按钮通过 CSS `display:none` 隐藏了，但如果用户通过 DevTools 手动显示了这些按钮或通过控制台调用这些函数，会抛出 `ReferenceError`。

**建议**: 在 `if (DEBUG_MODE)` 外添加空函数兜底，或将 `onclick` 改为事件监听器在 DEBUG 分支内绑定。

---

### 3. `demo-02-entity.html` — 缺少 `<span class="badge">` 版本标记

| 字段 | 值 |
|------|-----|
| **path** | `demo-02-entity.html` |
| **start_line** | 48 |
| **category** | maintainability |
| **severity** | medium |

**问题**: 其他所有 demo 的 header `<h1>` 中都包含 `<span class="badge">CDN Cesium</span>` 标记来表明使用的 Cesium 版本。`demo-02` 使用的是本地超图版本，但缺少类似的 badge 标识（如"超图 Cesium"），用户无法直观区分。

```html
<!-- demo-02 当前 -->
<h1>模块二：<span>Entity API</span></h1>

<!-- 其他 demo -->
<h1>模块一：<span>数据类型与加载</span><span class="badge">CDN Cesium</span></h1>
```

**建议**: 添加 `<span class="badge">超图 Cesium</span>` 以保持一致性和可辨识度。

---

### 4. `demo-03-pick.html` — `osmTileset` 卸载后未设为 null 可导致 `geoQueryTiles` 误判

| 字段 | 值 |
|------|-----|
| **path** | `demo-03-pick.html` |
| **start_line** | 212 ~ 216 |
| **category** | bug |
| **severity** | medium |

**问题**: `osmTileset` 在取消勾选时正确地设为了 `null`（第 214 行）。但 `geoQueryTiles` 仅检查 `!osmTileset` 来判断 OSM 是否已加载（第 338 行）。如果 OSM 加载后被 Cesium 内部清理（如 Ion 鉴权失败后自动移除），`osmTileset` 变量仍持有引用但 tileset 已不在场景中，会导致拾取失败但不给用户正确提示。

**建议**: 在 `geoQueryTiles` 中增加检查：`if (!osmTileset || !viewer.scene.primitives.contains(osmTileset))`。

---

### 5. `demo-04-coordinates.html` — `<option>` 元素在某些浏览器中仍有配色问题

| 字段 | 值 |
|------|-----|
| **path** | `demo-04-coordinates.html` |
| **start_line** | 85 ~ 99 |
| **category** | maintainability |
| **severity** | medium |

**问题**: `<select>` 的 `background` 改为 `#1a2d4a` 修复了展开后的下拉框整体背景，但 `<option>` 元素在 Chrome/Edge 中的配色受操作系统主题影响，`background` 和 `color` 可能不被继承。在 Windows 亮色主题下，下拉选项仍可能出现深色文字+深色背景。

**建议**: 为 `<option>` 显式设置 `style="background:#1a2d4a;color:#fff;"` 或在 `<style>` 中添加 `#convertPanel select option { background:#1a2d4a; color:#fff; }`。

---

## Low

### 6. `index.html` — `target="cesium-demo"` 对 `?debug` 参数链接的副作用

| 字段 | 值 |
|------|-----|
| **path** | `index.html` |
| **start_line** | 583 |
| **category** | maintainability |
| **severity** | low |

**问题**: 所有 demo 链接共用 `target="cesium-demo"`，意味着用户先打开 `demo-01-loading.html` 后再点击 `demo-01-loading.html?debug`，浏览器会在同一个 tab 中导航（替换 URL）。这是预期行为。但如果用户想**同时**对比普通模式和调试模式，无法做到——两个链接共用同一个 tab。

**建议**: 考虑为 debug 链接使用独立的 target name，如 `target="cesium-debug"`，允许调试模式独立窗口。或保持现状并在文档中说明。

---

### 7. `shared-config.js` — Token 硬编码在文件中

| 字段 | 值 |
|------|-----|
| **path** | `shared-config.js` |
| **start_line** | 14 |
| **category** | security |
| **severity** | low |

**问题**: Cesium Ion Token 硬编码在 `shared-config.js` 中。对于演示/培训场景这是可以接受的，但如果此代码被 commit 到公共仓库，Token 会泄露。

**建议**: 在 `.gitignore` 中排除 `shared-config.js`，并提供一个 `shared-config.example.js` 模板文件让用户填入自己的 Token。或在 `README.md` 中强调这一点。

---

### 8. `demo-02-entity.html` — 轨迹回放中 `HeadingPitchRange` pitch 参数值不合理

| 字段 | 值 |
|------|-----|
| **path** | `demo-02-entity.html` |
| **start_line** | 326 |
| **category** | bug |
| **severity** | low |

**问题**: `viewer.zoomTo(entities, new Cesium.HeadingPitchRange(0, -5, 10000))` 中 pitch 值为 `-5`。`HeadingPitchRange` 的 pitch 参数单位是**弧度**，`-5` 弧度约等于 `-286°`，会导致视角翻转。应使用 `Cesium.Math.toRadians(-30)` 之类的转换。

```js
// 当前（pitch = -5 弧度 ≈ -286°）
viewer.zoomTo(entities, new Cesium.HeadingPitchRange(0, -5, 10000));

// 建议
viewer.zoomTo(entities, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-45), 10000));
```

---

### 9. 全模块 — 相机坐标更新代码重复

| 字段 | 值 |
|------|-----|
| **path** | `demo-01-loading.html`, `demo-02-entity.html`, `demo-03-pick.html` |
| **category** | maintainability |
| **severity** | low |

**问题**: 三个 demo 文件中 `viewer.camera.changed` 监听器和 `camLng/camLat/camAlt` 更新逻辑完全相同（约 10 行），属于重复代码。`shared-config.js` 或一个新的 `shared-utils.js` 可以封装此逻辑。

**建议**: 将相机坐标监听封装为公共函数（如 `initCameraCoordBar(viewer)`），放入 `shared-config.js` 或独立工具文件。Demo 中只需一行调用。

---

## 通过项 ✅

| 检查点 | 状态 |
|--------|------|
| Ion Token 统一管理（shared-config.js） | ✅ 所有 demo 共享 |
| 公共样式提取（shared-style.css） | ✅ 所有 demo 引用 |
| 错误处理（try/catch + 用户反馈） | ✅ 所有异步加载均有 |
| 调试工具双 Inspector 集成 | ✅ CesiumInspector + 3DTilesInspector |
| Tab 复用 | ✅ `target="cesium-demo"` |
| 坐标系 demo 默认高度 | ✅ 43.5m |
| 下拉框 select 背景色 | ✅ 已从 rgba 改为实色 |
| XSS 防护 | ✅ 无用户输入直接拼接 HTML（showPopup 使用 textContent 或硬编码标签） |
| 超图版本差异说明 | ✅ index.html 中 Inspector 对比 + S3M 差异提示 |
| coordBar 样式统一 | ✅ 所有 demo 一致 |

---

## 建议优先级

1. **[High #1]** 统一 `demo-02` 的地形加载方式，或添加明确的版本差异注释
2. **[Medium #5]** 修复 `<option>` 配色在亮色系统主题下的兼容性
3. **[Medium #2]** 为调试函数添加非 DEBUG 模式的空函数兜底
4. **[Low #8]** 修复轨迹回放的 `HeadingPitchRange` pitch 参数
