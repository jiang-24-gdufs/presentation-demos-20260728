# Code Review — Cesium 新人技术分享全模块审查

> **审查时间**: 2026-07-28 17:25  
> **审查范围**: `index.html`, `demo-01-loading.html`, `demo-02-entity.html`, `demo-03-pick.html`, `demo-04-coordinates.html`, `shared-config.js`, `shared-style.css`  
> **审查规则**: Correctness / Security / Performance / Maintainability

---

## 审查统计

| 严重度 | 数量 |
|--------|------|
| Critical | 0 |
| High | 0 |
| Medium | 2 |
| Low | 3 |

---

## Medium

### 1. `demo-02-entity.html` — Primitive 批量点使用固定高度 100m，地形启用后可能被遮挡

| 字段 | 值 |
|------|-----|
| **path** | `demo-02-entity.html` |
| **start_line** | 349 |
| **category** | bug |
| **severity** | medium |

**问题**: `addPrimitiveBatch()` 中 `Cesium.Cartesian3.fromDegrees(lng, lat, 100)` 将 500 个点放在海拔 100m，但该 demo 启用了 `CesiumTerrainProvider`，部分地区地形高于 100m 会导致点被地形遮挡不可见。

**建议**: 将高度改为 `500` 或更高值，或使用 `heightReference` 思路——但 `PointPrimitiveCollection` 不支持 `heightReference`，所以抬高绝对高度是最简单方案。

---

### 2. `demo-02-entity.html` — `depthTestAgainstTerrain` 设为 false 掩盖了贴地问题

| 字段 | 值 |
|------|-----|
| **path** | `demo-02-entity.html` |
| **start_line** | 92 |
| **category** | maintainability |
| **severity** | medium |

**问题**: `viewer.scene.globe.depthTestAgainstTerrain = false` 全局关闭了深度测试，导致所有高度为 0 的 Entity 即使"沉入"地形仍然可见。这在 demo 演示中是可以的，但对新人来说容易产生误导——他们可能不知道为什么生产环境中同样的代码表现不同。

**建议**: 在代码旁或面板中添加一行注释/说明，解释这个设置的作用和生产环境的注意事项。

---

## Low

### 3. `index.html` — Q&A section 内容过于简短

| 字段 | 值 |
|------|-----|
| **path** | `index.html` |
| **start_line** | 626 ~ 630 |
| **category** | maintainability |
| **severity** | low |

**问题**: Q&A section 当前只有一行 "技术细节、项目实践、踩坑经验，都可以聊。"。作为分享页面的倒数第二屏，内容可能略显空洞。

**建议**: 当前简洁风格是用户明确要求的，保持即可。如果后续需要可以加 2-3 个预设问答。

---

### 4. `shared-config.js` — Ion Token 硬编码

| 字段 | 值 |
|------|-----|
| **path** | `shared-config.js` |
| **start_line** | 14 |
| **category** | security |
| **severity** | low |

**问题**: Cesium Ion Token 硬编码在文件中。这在内部分享场景可以接受，但如果代码提交到公开仓库，Token 会泄露。

**建议**: 在 `README.md` 中说明使用前需替换 Token，或通过 `.gitignore` 排除此文件。

---

### 5. 全模块 — 相机坐标监听代码重复

| 字段 | 值 |
|------|-----|
| **path** | `demo-01-loading.html`, `demo-02-entity.html`, `demo-03-pick.html` |
| **category** | maintainability |
| **severity** | low |

**问题**: 三个 demo 中 `viewer.camera.changed` 监听及 `camLng/camLat/camAlt` 更新逻辑完全相同（约 10 行），属于重复代码。

**建议**: 提取为公共函数放入 `shared-config.js`，各 demo 一行调用即可。优先级低，当前不影响功能。

---

## 通过项

| 检查点 | 状态 |
|--------|------|
| Ion Token 统一管理 (`shared-config.js`) | ✅ |
| 公共样式提取 (`shared-style.css`) | ✅ |
| 所有异步加载均有 try/catch + 用户反馈 | ✅ |
| 调试工具双 Inspector 集成 (CesiumInspector + 3DTilesInspector) | ✅ |
| Tab 复用 `target="cesium-demo"` | ✅ |
| 坐标系 demo 默认高度 43.5m | ✅ |
| 下拉框 option 配色修复 | ✅ |
| 非 DEBUG 模式调试函数 noop 兜底 | ✅ |
| `demo-02` 地形加载改为 `fromIonAssetId(1)` | ✅ |
| `demo-02` badge 已改为 "CDN Cesium" | ✅ |
| `demo-03` osmTileset 双重校验 | ✅ |
| XSS 防护（无用户输入直接拼接 HTML） | ✅ |
| Q&A 简化为占位页面 | ✅ |
| 结束页面已添加 | ✅ |
| Primitive API 示例已集成到 demo-02 | ✅ |
| Primitive 集合类说明表格已补充到 index.html | ✅ |
| 模块四/模块五卡片布局改为一行 2 个 | ✅ |
| alert 内容已精简 | ✅ |
| 总结部分已改为表格式模块回顾 | ✅ |
| 表格无内联颜色样式，统一风格 | ✅ |

---

## 总结

本轮审查无 Critical / High 级别问题。2 个 Medium 问题均为 demo 演示体验层面的细节，不影响核心功能和教学效果。整体代码质量良好，结构清晰，模块化合理。
