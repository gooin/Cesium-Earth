var canvas1, canvas2;
var viewer2;
var eventHelper;

function doubleViewer(Cesium, viewer) {
    viewer2 = new Cesium.Viewer('viewer2');
    canvas1 = viewer.canvas;
    canvas2 = viewer2.canvas;
    // var sceneURL2 = 'http://localhost:8090/iserver/services/3D-CBD/rest/realspace';
    // var promise2 = viewer2.scene.open(sceneURL2, {
    //     // var promise = scene.addS3MTilesLayerByScp(sceneURL, {
    //     name: 'Building'
    // });
    // Cesium.when(promise2, function (layer) {
    //     viewer2.scene.camera.setView({
    //         destination: new Cesium.Cartesian3.fromDegrees(116.45894245726124, 39.906490104986695, 94.97355781375819),
    //         orientation: {
    //             heading: 6.1915581,
    //             pitch: -0.010097325490224116,
    //             roll: 6.283185306920306
    //         }
    //     });
    // });
    syncCamera(viewer, viewer2);
}

// camera 跟随方法
var _followMethod;
function followCamera(targetViewer, followerViewer) {
    _followMethod = function () {
        Cesium.Cartesian3.clone(targetViewer.camera.position, followerViewer.scene.camera.position);
        Cesium.Cartesian3.clone(targetViewer.camera.direction, followerViewer.scene.camera.direction);
        Cesium.Cartesian3.clone(targetViewer.camera.up, followerViewer.scene.camera.up);
        followerViewer.scene.camera.lookAtTransform(targetViewer.camera.transform);
    };
    followerViewer.scene.preRender.addEventListener(_followMethod)
}

// 移除跟随方法
function stopFollow(followerViewer) {
    if (followerViewer.scene.preRender._listeners.length > 1) {
        // console.log(followerViewer.scene.preRender);
        followerViewer.scene.preRender.removeEventListener(_followMethod);
        // console.log(followerViewer.scene.preRender);
    }
}

// 同步相机
var _followCam1;
var _followCam2;
function syncCamera(viewer1, viewer2) {
    // 监听鼠标移动到canvas上的事件
    _followCam1 = function () {
        canvas2.focus();
        stopFollow(viewer2);
        stopFollow(viewer1);
        // 执行相机跟随
        followCamera(viewer2, viewer1);
    };
    canvas2.addEventListener("mouseenter", _followCam1);

    _followCam2 = function () {
        canvas1.focus();
        stopFollow(viewer2);
        stopFollow(viewer1);
        followCamera(viewer1, viewer2);
    };
    canvas1.addEventListener("mouseenter", _followCam2);
}

function stopSyncCamera(viewer1, viewer2) {
    canvas1.removeEventListener("mouseenter", _followCam2);
    canvas2.removeEventListener("mouseenter", _followCam1);
    viewer1.scene.preRender.removeEventListener(_followMethod);
    viewer2.scene.preRender.removeEventListener(_followMethod);
}

// 停止同步相机
function stopClick() {
    stopSyncCamera(viewer, viewer2);
}

// 开始同步相机
function startClick() {
    stopSyncCamera(viewer, viewer2);
    syncCamera(viewer, viewer2);
}


