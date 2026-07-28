/**
 * 演示公用配置模块
 * 在各示例 HTML 中，于 Cesium.js 之后、业务脚本之前引入：
 * <script src="shared-config.js"></script>
 */
(function () {
    'use strict';

    // ═══════════════════════════════════════════════
    //  Cesium Ion Access Token
    //  在此处统一配置，所有示例共享，无需逐文件修改。
    //  获取地址：https://ion.cesium.com/tokens
    // ═══════════════════════════════════════════════
    var CESIUM_ION_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxZDhlZWQ2MC0wM2Q3LTQ2ZTMtOTE0OC0yMTQ3ZDJhZDI3MzAiLCJpZCI6MzMzNjQ0LCJpYXQiOjE3NTU2NzU3Mzl9.Hm7yypyrQIHLy4Y55rdY_UiYXJMQr7hv-AjLRvoNg3U';

    if (typeof Cesium !== 'undefined') {
        Cesium.Ion.defaultAccessToken = CESIUM_ION_TOKEN;
    } else {
        console.error('[shared-config] Cesium 未加载，请确保在 Cesium.js 之后引入 shared-config.js');
    }

    // ═══════════════════════════════════════════════
    //  版本检测
    // ═══════════════════════════════════════════════
    var cesiumVersion = (typeof Cesium !== 'undefined' && Cesium.VERSION) ? Cesium.VERSION : 'unknown';
    var isSuperMap = typeof Cesium !== 'undefined' &&
        (typeof Cesium.S3MTilesLayer !== 'undefined' || typeof SuperMap !== 'undefined');
    var isModernCesium = typeof Cesium !== 'undefined' &&
        typeof Cesium.Cesium3DTileset === 'function' &&
        typeof Cesium.Cesium3DTileset.fromIonAssetId === 'function';

    window.__CESIUM_ENV__ = {
        token: CESIUM_ION_TOKEN,
        version: cesiumVersion,
        isSuperMap: isSuperMap,
        isModernCesium: isModernCesium,
        label: isSuperMap ? '超图 Cesium (v' + cesiumVersion + ')' : 'Cesium (v' + cesiumVersion + ')'
    };

    console.log('[shared-config] ' + window.__CESIUM_ENV__.label +
        ' | Ion Token: …' + CESIUM_ION_TOKEN.slice(-8) +
        ' | Modern API: ' + isModernCesium);
})();
