/**
 * 图层切换功能， 两个大卡片及抽屉三个图层
 */
    // 简洁图层及全部图层开关
var simpleStyleChecked = false;
var allStyleChecked = true;
//简洁卡片点击
$("#map-simple").click(function () {
    console.log("clicked! simple");
    if (simpleStyleChecked === false) {

        baseLayer = imageryLayers.get(1);
        imageryLayers.addImageryProvider(mapboxSatelliteProvider);
        imageryLayers.remove(baseLayer);

        $(this).children(".card-img-top").attr('src', 'images/map-styles/map_simple.svg');
        simpleStyleChecked = true;
        $("#map-all").children(".card-img-top").attr('src', 'images/map-styles/map_all_.svg');
        allStyleChecked = false;
        // 移除折叠栏背景
        $(".list-unstyled").children(".media").removeClass("bg-light");
    }

});

//全部卡片点击
$("#map-all").click(function () {
    console.log("clicked! all");
    if (allStyleChecked === false) {
        baseLayer = imageryLayers.get(1);
        imageryLayers.addImageryProvider(mapboxStreetsSatelliteProvider);
        imageryLayers.remove(baseLayer);

        $(this).children(".card-img-top").attr('src', 'images/map-styles/map_all.svg');
        allStyleChecked = true;
        $("#map-simple").children(".card-img-top").attr('src', 'images/map-styles/map_simple_.svg');
        simpleStyleChecked = false;

        // 移除折叠栏背景
        $(".list-unstyled").children(".media").removeClass("bg-light");
    }
});

$(".media").click(function (e) {
    // 简洁、全部卡片变为灰度
    if (allStyleChecked) {
        $("#map-all").children(".card-img-top").attr('src', 'images/map-styles/map_all_.svg');
        allStyleChecked = false;
    }
    if (simpleStyleChecked) {
        $("#map-simple").children(".card-img-top").attr('src', 'images/map-styles/map_simple_.svg');
        simpleStyleChecked = false;
    }
    // 移除其他项目背景
    $(".list-unstyled").children(".media").removeClass("bg-light");
    var type = e.currentTarget.innerText;
    type = (type.substr(0, 4)).trim();
    switch (type) {
        case "街道":
            $(this).addClass('bg-light');
            baseLayer = imageryLayers.get(1);
            imageryLayers.addImageryProvider(mapboxStreetsProvider);
            imageryLayers.remove(baseLayer);
            break;
        case "黑暗":
            $(this).addClass('bg-light');
            baseLayer = imageryLayers.get(1);
            imageryLayers.addImageryProvider(mapboxDarkProvider);
            imageryLayers.remove(baseLayer);
            break;
        case "海盗":
            $(this).addClass('bg-light');
            baseLayer = imageryLayers.get(1);
            imageryLayers.addImageryProvider(mapboxPiratesProvider);
            imageryLayers.remove(baseLayer);
            break;
        default:
            break;
    }

});