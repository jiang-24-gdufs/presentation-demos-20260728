# Code Review — presentation-demos-20260728

> 审查范围：`presentation-demos-20260728/` 全部文件（8 个）
> 审查规则：OCR Delegation Mode（Correctness / Security / Performance / Maintainability）
> 审查时间：2026-07-28

---

## 摘要

| 严重度 | 数量 | 状态 |
|--------|------|------|
| Critical | 0 | — |
| High | 3 | 已修复 |
| Medium | 4 | 已修复 2 / 待观察 2 |
| Low | 5 | 建议性 |

---

## High 级别

### H-1 | demo-03-pick.html | Bug：地理查询拾取时机错误

| 字段 | 值 |
|------|-----|
| path | `demo-03-pick.html` |
| start_line | 361 |
| end_line | 396 |
| category | bug |
| severity | high |

**问题**：`geoQueryTiles()` 使用 `await viewer.camera.flyTo(...)` 后 `setTimeout(500)` 执行拾取。但 `camera.flyTo()` 不返回 Promise（返回 `void`），`await` 立即完成；而飞行 `duration=2` 秒。结果是拾取在飞行进行到 500ms 时执行，相机尚未到达目标位置，导致拾取位置错误。

**修复**：改用 `camera.flyTo()` 的 `complete` 回调，在飞行完成后执行拾取逻辑。已修复。

---

### H-2 | demo-03-pick.html | Bug：模型路径使用 CDN 不可达的本地路径

| 字段 | 值 |
|------|-----|
| path | `demo-03-pick.html` |
| start_line | 200 |
| end_line | 200 |
| category | bug |
| severity | high |

**问题**：该 demo 使用 CDN Cesium，但模型 URI 引用了本地路径 `../Build/Cesium/Apps/SampleData/models/CesiumAir/Cesium_Air.glb`。CDN 模式下本地 Build 目录不可达，模型加载静默失败。

**修复**：改为公开可访问的 Khronos glTF-Sample-Assets URL。已修复。

---

### H-3 | demo-02-entity.html | Bug：轨迹回放不动画

| 字段 | 值 |
|------|-----|
| path | `demo-02-entity.html` |
| start_line | 99 |
| end_line | 104 |
| category | bug |
| severity | high |

**问题**：`addTrajectoryDemo()` 设置了 `SampledPositionProperty` 和 clock 参数，但 Viewer 初始化时 `animation: false`（无动画控件），而 `Clock.shouldAnimate` 默认为 `false`。时钟不会前进，轨迹永远停留在起点。

**修复**：在 `addTrajectoryDemo()` 中添加 `viewer.clock.shouldAnimate = true`。已修复。

---

## Medium 级别

### M-1 | demo-04-debug.html | Bug：`fromIonAssetId(40866)` Asset 可能不存在

| 字段 | 值 |
|------|-----|
| path | `demo-04-debug.html` |
| start_line | 255 |
| end_line | 259 |
| category | bug |
| severity | medium |

**问题**：`loadSampleData()` 中加载 Ion Asset 40866，该 ID 并非文档中列出的已知可用 Asset。如果此 Asset 不在用户的 Ion 账户中或已被删除，加载会静默失败（`.then()` 无 `.catch()`）。

**建议**：替换为已知可用的 Asset（如 96188 OSM Buildings），并添加 `.catch()` 错误处理。

---

### M-2 | demo-04-debug.html | 问题：`toggleWireframe()` 实现与名称不匹配

| 字段 | 值 |
|------|-----|
| path | `demo-04-debug.html` |
| start_line | 187 |
| end_line | 193 |
| category | maintainability |
| severity | medium |

**问题**：函数名为 `toggleWireframe()`，但除了设置 `debugWireframe` 外，还切换了 `globe.enableLighting`（光照效果），这与线框模式无关，属于意外副作用。

**建议**：移除 `globe.enableLighting` 操作，或将其拆分为独立的切换按钮。

---

### M-3 | README.md | 文档：API 对比表与 index.html 不一致

| 字段 | 值 |
|------|-----|
| path | `README.md` |
| start_line | 16 |
| end_line | 24 |
| category | documentation |
| severity | medium |

**问题**：README 中 CDN vs 超图对比表仍将 `fromIonAssetId()` 作为 CDN 版的主要 API 展示，与 index.html 中已纠正的"通用 API vs Ion 平台 API"定位不一致。

**修复**：已重写为三列对比（通用 API / Ion API / 超图），与 index.html 保持一致。已修复。

---

### M-4 | demo-04-debug.html | 兼容：`tilesetInstance.statistics` API 已变更

| 字段 | 值 |
|------|-----|
| path | `demo-04-debug.html` |
| start_line | 231 |
| end_line | 236 |
| category | bug |
| severity | medium |

**问题**：`printTilesetStats()` 引用 `tilesetInstance.statistics` 和 `tilesetInstance.totalMemoryUsageInBytes`，这些属性在较新版本 Cesium 中已重构。虽然该 demo 使用的是超图 Cesium（较旧版本），但升级后会静默返回 `N/A`。

**建议**：添加更健壮的属性检测，或注释标明该代码仅适用于特定 Cesium 版本。

---

## Low 级别

### L-1 | shared-config.js | 安全：Ion Token 硬编码在 JS 中

| 字段 | 值 |
|------|-----|
| path | `shared-config.js` |
| start_line | 14 |
| end_line | 14 |
| category | security |
| severity | low |

**说明**：Ion Token 以明文形式硬编码在 JS 文件中。对于教学演示项目可接受，但如果代码公开发布，Token 会被暴露。`window.__CESIUM_ENV__.token` 也在全局作用域中暴露了完整 Token。

**建议**：如果需要公开分享，在 README 中提醒用户替换 Token，并从 `__CESIUM_ENV__` 中移除完整 Token（仅保留后 8 位掩码即可）。

---

### L-2 | demo-01-loading.html | 可靠性：GitHub raw URL 可能被限流

| 字段 | 值 |
|------|-----|
| path | `demo-01-loading.html` |
| start_line | 229 |
| end_line | 229 |
| category | performance |
| severity | low |

**说明**：glTF 模型从 `raw.githubusercontent.com` 加载，该域名在中国大陆可能被限速或无法访问。

**建议**：对于中国用户，可考虑将样本模型文件放在项目本地 `assets/` 目录中，或使用国内可访问的 CDN。

---

### L-3 | demo-05-coordinates.html | 交互：点击标注无删除机制

| 字段 | 值 |
|------|-----|
| path | `demo-05-coordinates.html` |
| start_line | 257 |
| end_line | 288 |
| category | maintainability |
| severity | low |

**说明**：每次左键点击地球都会添加一个标注 Entity，只能通过"清除所有标注"一次性删除。没有单个删除功能。对于教学 demo 可接受，但如果标注较多会造成视觉混乱。

---

### L-4 | index.html | 可访问性：导航栏在窄屏下溢出

| 字段 | 值 |
|------|-----|
| path | `index.html` |
| start_line | 30 |
| end_line | 36 |
| category | maintainability |
| severity | low |

**说明**：`nav` 使用 `overflow-x: auto`，在窄屏幕上可横向滚动，但没有视觉提示告知用户存在隐藏的导航项。

---

### L-5 | 全局 | 风格一致性：CSS 重复定义

| 字段 | 值 |
|------|-----|
| path | `demo-01-loading.html, demo-02-entity.html, demo-03-pick.html, demo-04-debug.html, demo-05-coordinates.html` |
| category | maintainability |
| severity | low |

**说明**：5 个 demo 文件中都有大量重复的 CSS（header 样式、按钮样式、面板样式等）。如果需要全局修改风格，需逐文件修改。

**建议**：如果后续维护需求增加，可考虑抽取公共 CSS 到 `shared-style.css`，与 `shared-config.js` 对齐。对于一次性演示项目，当前方式可接受。

---

## 已修复汇总

| ID | 文件 | 修复内容 |
|----|------|----------|
| H-1 | demo-03-pick.html | `camera.flyTo` 改用 `complete` 回调替代 setTimeout |
| H-2 | demo-03-pick.html | 模型 URI 从本地路径改为公开 GitHub URL |
| H-3 | demo-02-entity.html | 添加 `viewer.clock.shouldAnimate = true` |
| M-3 | README.md | API 对比表重写为三列格式 |
