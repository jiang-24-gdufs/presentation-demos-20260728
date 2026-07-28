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