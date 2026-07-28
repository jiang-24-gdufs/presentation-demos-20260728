# Code Review — presentation-demos-20260728

> 审查范围：`presentation-demos-20260728/` 全部文件（9 个）
> 审查规则：OCR Delegation Mode（Correctness / Security / Performance / Maintainability）
> 审查时间：2026-07-28（第二轮）

---

## 摘要

| 严重度 | 数量 | 状态 |
|--------|------|------|
| Critical | 0 | — |
| High | 0 | 全部已修复（第一轮 3 个） |
| Medium | 0 | 全部已修复（第一轮 4 个） |
| Low | 3 | 建议性 |

**与第一轮对比**：第一轮发现的 3 High + 4 Medium 问题已全部修复。demo-01 经历重构后代码质量显著提升。本轮无新增 High/Medium 问题。

---

## 第一轮已修复汇总

| ID | 文件 | 修复内容 |
|----|------|----------|
| H-1 | demo-03-pick.html | `camera.flyTo` 改用 `complete` 回调替代 setTimeout |
| H-2 | demo-03-pick.html | 模型 URI 从本地路径改为公开 GitHub URL |
| H-3 | demo-02-entity.html | 添加 `viewer.clock.shouldAnimate = true` |
| M-1 | demo-04-debug.html | Asset 40866 → 96188，添加 `.catch()` 错误处理 |
| M-2 | demo-04-debug.html | `toggleWireframe()` 移除 `enableLighting` 副作用 |
| M-3 | README.md | API 对比表重写为三列格式（通用/Ion/超图） |
| M-4 | demo-04-debug.html | `printTilesetStats()` 条件检测属性，增加 root 信息 |
| L-1 | shared-config.js | `__CESIUM_ENV__` 移除完整 token 属性 |

---

## 第二轮 — demo-01 重构 Review

### 正确性 ✅

- **3D Tiles 加载器** (`registerTileset`)：统一模式正确，checkbox/locate 按钮/tileset 实例生命周期管理完整。加载失败时 checkbox 自动回弹，locate 按钮在加载/移除时正确切换 disabled 状态。
- **Asset ID 列表**：6 个 3D Tiles（96188 / 2275207 / 1415196 / 354307 / 43978 / 28945）均为用户 Ion 账户中的已知资产，与 todo.md 一致。
- **相机坐标**：使用 `camera.changed` 事件 + `percentageChanged = 0.01` 节流，高度自动切换 m/km 单位，逻辑正确。
- **glTF 加载**：Entity API (CesiumMilkTruck) 和 Primitive API (Duck) 两种方式均正确实现了 加载/移除/定位 完整生命周期。

### 性能 ✅

- `camera.changed` 使用 `percentageChanged` 阈值控制触发频率，避免每帧更新 DOM。
- 3D Tiles 统一使用 `fromIonAssetId` 惰性加载，初始不加载任何 tileset，无性能浪费。

### 可维护性 ✅

- `registerTileset()` 将 4 组重复的 3D Tiles 加载代码抽象为通用函数，新增图层只需一行注册。
- 面板 HTML 使用统一的 `.layer-item` + `.btn-locate` + `.desc` 结构，布局一致。

---

## 第二轮 — demo-04 修复 Review

### 正确性 ✅

- `loadSampleData()` 中的 Asset ID 已从 40866 改为 96188（OSM Buildings，已知可用），并添加了 `.catch()` 错误处理。
- `toggleWireframe()` 不再有 `enableLighting` 副作用。
- `printTilesetStats()` 对 `statistics`、`totalMemoryUsageInBytes`、`root` 均做条件检测，兼容不同 Cesium 版本。

---

## 第二轮 — shared-config.js Review

### 安全 ✅

- `window.__CESIUM_ENV__` 不再暴露完整 token。Token 仍在文件中硬编码（前端不可避免），但至少全局对象不再提供便利的读取入口。

---

## Low 级别（建议性，非阻塞）

### L-1 | demo-01-loading.html | GitHub raw URL 在中国大陆可能受限

| path | `demo-01-loading.html` |
|------|------------------------|
| category | performance |
| severity | low |

glTF 模型从 `raw.githubusercontent.com` 加载。中国大陆网络环境下可能限速或不可达。如面向国内用户，建议将 glb 文件放入项目本地 `assets/` 目录。

---

### L-2 | demo-05-coordinates.html | 点击标注无单个删除机制

| path | `demo-05-coordinates.html` |
|------|----------------------------|
| category | maintainability |
| severity | low |

每次左键点击地球添加标注 Entity，只能通过"清除所有"批量删除。对教学 demo 可接受。

---

### L-3 | 全局 | CSS 重复定义

| path | `demo-01 ~ demo-05` |
|------|----------------------|
| category | maintainability |
| severity | low |

5 个 demo 文件中 header/panel/button 等 CSS 高度重复。如后续维护需求增加，可抽取为 `shared-style.css`。对一次性演示项目可接受。

---

## 文件清单与状态

| 文件 | 状态 | 备注 |
|------|------|------|
| shared-config.js | ✅ | token 暴露已修复 |
| index.html | ✅ | 表格纠错 + Entity/Primitive 对比 |
| demo-01-loading.html | ✅ 重构 | 3D Tiles 列表更新 + 定位交互 + 相机坐标 |
| demo-02-entity.html | ✅ | 业务场景 + shouldAnimate 修复 |
| demo-03-pick.html | ✅ | flyTo complete 回调 + 模型路径修复 |
| demo-04-debug.html | ✅ | Asset/wireframe/stats 三项修复 |
| demo-05-coordinates.html | ✅ | 无新增问题 |
| README.md | ✅ | API 对比表重写 |
| REVIEW.md | — | 本文件 |
