var CesiumHandyFuns = {
    // 屏幕点转为经纬度
    screenPnt2Degree: function (Cesium, scene, screenPosition) {
        var cartPos = scene.pickPosition(screenPosition);
        var radians = Cesium.Cartographic.fromCartesian(cartPos);
        var longitude = Cesium.Math.toDegrees(radians.longitude);
        var latitude = Cesium.Math.toDegrees(radians.latitude);
        var height = radians.height;
        if (longitude && latitude) {
            return {
                longitude: longitude,
                latitude: latitude,
                height: height
            }
        }
        return undefined;
    },
    // 获取屏幕中心点经纬度
    screenCenterDegree: function (Cesium, viewer) {
        var h = viewer.canvas.height/2;
        var w = viewer.canvas.width/2;
        var cartPos = scene.pickPosition({x:w,y:h});
        var radians = Cesium.Cartographic.fromCartesian(cartPos);
        var longitude = Cesium.Math.toDegrees(radians.longitude);
        var latitude = Cesium.Math.toDegrees(radians.latitude);
        return {
            longitude: longitude,
            latitude: latitude
        }
    }
};