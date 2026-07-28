补充Cesium ION Assets：
```
Select "Google Maps 2D Contour"	3830186	Google Maps 2D Contour	Imagery	Sep 30 2025 3:54 AM	
-
-	Delete "Google Maps 2D Contour"
Select "Google Maps 2D Labels Only"	3830185	Google Maps 2D Labels Only	Imagery	Sep 30 2025 3:54 AM	
-
-	Delete "Google Maps 2D Labels Only"
Select "Google Maps 2D Roadmap"	3830184	Google Maps 2D Roadmap	Imagery	Sep 30 2025 3:54 AM	
-
-	Delete "Google Maps 2D Roadmap"
Select "Google Maps 2D Satellite with Labels"	3830183	Google Maps 2D Satellite with Labels	Imagery	Sep 30 2025 3:54 AM	
-
-	Delete "Google Maps 2D Satellite with Labels"
Select "Google Maps 2D Satellite"	3830182	Google Maps 2D Satellite	Imagery	Sep 30 2025 3:54 AM	
-
-	Delete "Google Maps 2D Satellite"
Select "Google Photorealistic 3D Tiles"	2275207	Google Photorealistic 3D Tiles	3D Tiles	Sep 13 2023 7:15 AM	
-
-	Delete "Google Photorealistic 3D Tiles"
Select "Cesium OSM Buildings"	96188	Cesium OSM Buildings	3D Tiles	May 1 2020 6:55 AM	
-
-	Delete "Cesium OSM Buildings"
Select "Bing Maps Road"	4	Bing Maps Road	Imagery	Oct 27 2016 9:33 PM	
-
-	Delete "Bing Maps Road"
Select "Bing Maps Aerial with Labels"	3	Bing Maps Aerial with Labels	Imagery	Oct 27 2016 9:32 PM	
-
-	Delete "Bing Maps Aerial with Labels"
Select "Bing Maps Aerial"	2	Bing Maps Aerial	Imagery	Oct 27 2016 9:24 PM	
-
-	Delete "Bing Maps Aerial"
Select "Cesium World Terrain"	1	Cesium World Terrain	Terrain	Oct 18 2016 6:04 AM	
-
-
```

以上可以作为数据加载的内容; 补充到loading.html文档中作为更多的图层数据来源并添加到场景中浏览；loading暂时不考虑“开启 Inspector（观察瓦片加载）”这个内容

---
严格区分使用CDN的cesium（开源社区版本）以及本地的超图Cesium版本, 二者使用的底层Cesium版本是有差异的，这个需要注意，避免使用错误的API

```
VM217:2 Uncaught TypeError: Cesium.Cesium3DTileset.fromIonAssetId is not a function
    at <anonymous>:2:32
```

在讲解文档中的“数据类型全景图”表格内容需要增加一个对于超图版本的加载内容的额外补充来区分

---

属性查询模块中增加一个使用模型加载后查询的案例，以及一个使用地理信息来查询倾斜影像的示例；

--
性能优化模块我想替换为这个内容，可以关联地理信息查询交互：
```
坐标系统与空间计算（GIS 基础向）
核心内容：搞懂 Cesium 里的几种坐标，避免“东西放歪了”。

具体要点：

经纬度坐标（WGS84）与笛卡尔坐标（Cartesian3）的互转。

屏幕坐标 ↔ 地理坐标（点击位置转经纬度）。
```

---
1. 新增公用的modulees来加载公用的依赖和配置token，并引入到各示例中，避免出现报错：
"{\"code\":\"INVALID_TOKEN\",\"message\":\"Invalid access token\"}"
2. 坐标系统中，需要说明IDesktop ISERVER 和 实际超图加载的整个常用坐标系；好像还用到过3857坐标系，解释不同的坐标系有什么区别，为什么有这么多坐标系

---

1. loading文档纠错：
- API比对中，fromAssetId是加载Cesium ION平台的数据时使用的API，而不是核心加载业务相关的数据服务时的Cesium API，正确纠错；
- 补充理解地形+全球影像的实际含义说明: 椭球体的几何形状 + 纹理（贴地）

2. 新增加载示例，倾斜摄影/点云/obj/gltf，尝试找到公开的服务来作为加载的示例；正确使用Cesium API来加载；加载图层后需要正确locate，飞向加载的图层
3. 添加更多Entity在实际业务上使用的情况说明，补充更多case
4. 增加Primitive VS Entity的对比说明，需要说明二者的区别和使用场景，以及为什么要使用这两个API 

---

补充倾斜摄影添加的ION（参考链接https://sandcastle.cesium.com/资源）code
```
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
});

try {
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(40866);
  viewer.scene.primitives.add(tileset);
  viewer.zoomTo(tileset);
} catch (error) {
  console.log(`Error loading tileset: ${error}`);
}

```

点云
```
import * as Cesium from "cesium";

//Point Cloud by Prof. Peter Allen, Columbia University Robotics Lab. Scanning by Alejandro Troccoli and Matei Ciocarlie.
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
});

viewer.scene.camera.setView({
  destination: new Cesium.Cartesian3(
    4401744.644145314,
    225051.41078911052,
    4595420.374784433,
  ),
  orientation: new Cesium.HeadingPitchRoll(
    5.646733805039757,
    -0.276607153839886,
    6.281110875400085,
  ),
});

try {
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(16421);
  viewer.scene.primitives.add(tileset);
} catch (error) {
  console.log(`Error loading tileset: ${error}`);
}
```


---
Select "Google Photorealistic 3D Tiles"	2275207	Google Photorealistic 3D Tiles	3D Tiles	Sep 13 2023 7:15 AM	
-
-	Delete "Google Photorealistic 3D Tiles"
Select "Aerometrex San Francisco High Resolution 3D Model with Street Level Enhanced 3D (Non-Commercial Trial)"	1415196	Aerometrex San Francisco High Resolution 3D Model with Street Level Enhanced 3D (Non-Commercial Trial)	3D Tiles	Nov 23 2022 10:44 PM	
-
-	Delete "Aerometrex San Francisco High Resolution 3D Model with Street Level Enhanced 3D (Non-Commercial Trial)"
Select "Aerometrex Denver High Resolution 3D Model with Street Level Enhanced 3D (Non-Commercial Trial)"	354307	Aerometrex Denver High Resolution 3D Model with Street Level Enhanced 3D (Non-Commercial Trial)	3D Tiles	Mar 11 2021 5:54 AM	
-
-	Delete "Aerometrex Denver High Resolution 3D Model with Street Level Enhanced 3D (Non-Commercial Trial)"
Select "Cesium OSM Buildings"	96188	Cesium OSM Buildings	3D Tiles	May 1 2020 6:55 AM	
-
-	Delete "Cesium OSM Buildings"
Select "Melbourne Point Cloud"	43978	Melbourne Point Cloud	3D Tiles	Sep 18 2019 9:37 PM	
-
-	Delete "Melbourne Point Cloud"
Select "Montreal Point Cloud"	28945	Montreal Point Cloud	3D Tiles	May 25 2019 12:04 AM
---
更新3DTiles的数据列表，基于正确的Assetid来加载
给loading场景添加实时的相机位置（经纬度）在右下角展示

---
1. 第四点和第五点内容考虑换一个顺序
2. debug中使用`viewer.extend(Cesium.viewerCesiumInspectorMixin); ` 来作为调试入口
3. 统一camera位置在底部bar中的样式
4. 拒接重复，尤其是把讲解内容照搬到demo中， 这是多此一举的。
5. 调试模式直接复用示例1，因为示例1已经有足够多的数据了；在右下角使用一个小弹窗（点击显示）
6. “地理坐标查询 3D Tiles” 这个功能不生效

---
1. 提取公共样式到share-style.css
2. 我的意思是示例1和debug 示例，直接公用一个html demo，而不是copy一份副本；正确暴露viewer变量到全局；通过链接正确关联即可
3. 坐标系统与空间计算这个demo，考虑增加proj4来对不同的坐标系如WGS84 和 EPSG：3857 的坐标数据做转换
4. 现在讲解内容总结很不到位，需要重新润色打磨

---
两个调试器都集成到文档中，超图的SuperMap3D.Cesium3DTilesInspector也集成比对，但不加载到场景示例中。
DEBUG demo集成两个调试器:
```
// 接入通用场景调试器 (Cesium Inspector)
viewer.extend(Cesium.viewerCesiumInspectorMixin);

// 接入3D Tiles专用调试器 (Cesium3DTilesInspector)
viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
```

这个demo html集成时是否可以打开已经打开的tab，而不是再打开一个新的页面。好像可以使用window.open来控制吧

---
坐标系统与空间计算，要精简布局；默认高度设置43.5米，而不是0；坐标系下拉框option背景色为白色，字体也为白色，调整以增加对比度；

---

1. 基于review文档优化，修复所有的问题
2. 讲解文档简化样式，避免出现过多的颜色要素；统一表格样式
3. alert-warn我感觉不是很有必要讲的太复杂，要言简意赅
4. 总结部分再打磨一下：
```
Summary
五句话带走
1. 数据决定 API
看到 WMS/WMTS → ImageryProvider
看到 GeoJSON/KML → DataSource.load()
看到 3D Tiles → Cesium3DTileset
看到 glTF → Entity.model 或 Model.fromGltfAsync
看到 S3M → 只能用超图版 addS3MTilesLayerByScp

2. Entity 是画笔，Primitive 是性能
标注 ≤100 个 → entities.add() 够用
标注 >100 个 → 切 PointPrimitiveCollection
业务属性挂 properties，拾取时直接读

3. 拾取三分支
picked.id instanceof Entity → 标注点
picked instanceof Cesium3DTileFeature → 建筑/BIM
都不是 → pickPosition() 取地理坐标

4. 经纬度一定是 (经度, 纬度)
fromDegrees(lng, lat, alt) — 不是 (lat, lng)
WGS84 ⇄ Cartesian3 ⇄ 屏幕坐标
全链路都走这三步

5. 出问题先查这三处
① Inspector → 看瓦片/地形加载状态
② Network 面板 → 过滤 b3dm / terrain
③ Console → viewer.camera 确认位置
```
- “五句话带走”标题很奇怪，不知所云
- 经纬度没必要强调
- “出问题先查这三处” 这个也不能总结讲解内容中的debug模块
- 其实最终的总结要对之前表述的内容进行总结，而不是随便补充

---
Q&A的地方要重新打磨