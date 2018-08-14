/**
 * 测量功能
 */
var isMeasuring = false;
$("#menuMeasure").click(function () {

    var measureHTML = `<div id="measure-menu">
            <div class="jumbotron">
        <button type="button" id="measure-btn-restart" class="btn btn-outline-info"><i class="material-icons">
            settings_backup_restore
            </i>
        开始新的测量
        </button>
        <i class="material-icons float-right"
        id="earth-measure-close">
            clear
            </i>

            <hr class="my-2">
            <p>距离</p>
            <p class="lead" id="earth-measure-result">0 米</p>
        </div>
        </div>`;

    $("#earth-measure").html(measureHTML);

    startMeasure();

    $("#earth-measure-close").click(function () {
        measureHandler.clear();
        measureHandler.deactivate();
        $("#earth-measure").empty();
        // $("#earth-measure").remove();
    });


    $("#measure-btn-restart").click(function () {
        measureHandler.clear();
        $("#earth-measure-result").html("0 米");
        startMeasure();
    })
});

// TODO:第一次测量时，看不到路径。
// TODO:测量模式为贴地时，相机较远处看不到测量路径
// TODO:测量模式为直线时，直线依据地球曲率没有覆盖

function startMeasure() {
    // 测量事件
    measureHandler.activate();
    measureHandler.measureEvt.addEventListener(function (result) {
        var distance = result.distance;
        // 大于1000时显示为千米
        distance = distance > 1000 ?
            parseFloat(distance / 1000).toFixed(2) + ' 公里' :
            parseFloat(distance).toFixed(2) + " 米";

        $("#earth-measure-result").html(distance);

        // 测量时标签样式
        measureHandler.disLabel.show = true;
        measureHandler.disLabel.font = "500 10px sans-serif";
        measureHandler.disLabel.style = 0; // 仅文字，无轮廓
        measureHandler.disLabel.backgroundPadding = measureBackgroundPadding;
        measureHandler.disLabel.backgroundColor = measureBackgroundColor;
        measureHandler.disLabel.fillColor = measureFillColor;
        // 测量时polyline样式
        measureHandler.polyline.material.uniforms.color = measurePolylineColor;
        measureHandler.disLabel.text = distance;

    });

    // 监听是否在测量
    measureHandler.activeEvt.addEventListener(function (result) {
        isMeasuring = result;
        if (isMeasuring === false) {
            // 测量完毕关闭标签
            measureHandler.disLabel.show = false;
        }
    });
}