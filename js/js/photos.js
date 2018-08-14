/**
 * 展示 Flickr 图片功能
 *  拼接 URL
 * https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
 *
 */


// 帮助文档
// https://www.flickr.com/services/api/flickr.photos.search.htm
// https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=cecb6169f1a36c661089206db5999df4&tags=nature%2Ccity&accuracy=1&content_type=1&has_geo=1&per_page=200&format=json&auth_token=72157669831022897-5e0d37d79f80a4e8&api_sig=554b72158edd639c3fd4f79ccb2586b8


function showPhotos(Cesium, viewer, screenCenter) {

    var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=西安";
    // 获取照片列表 URL
    // var flickrSearch = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=388ddf77385fe21f59b62b5133f96d8a&tags=nature,city&accuracy=1&content_type=1&has_geo=1&per_page=100&format=json";
    var flickrSearch = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=388ddf77385fe21f59b62b5133f96d8a&accuracy=1&content_type=1&has_geo=1&per_page=100&format=json&radius=32";
    // 获取照片经纬度 URL
    var flickrGetLocationURL = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=388ddf77385fe21f59b62b5133f96d8a&format=json&photo_id=";

    var lat = "&lat=" + screenCenter.latitude;
    var lon = "&lon=" + screenCenter.longitude;

    $.ajax({
        url: flickrSearch + lat + lon,
        dataType: "jsonp", // jsonp
        jsonpCallback: 'jsonFlickrApi', // add this property
        success: function (result, status, xhr) {
            // console.log(result);
            // console.log(result);
            // 拼接 URL
            //     https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
            $.each(result.photos.photo, function (i, photo) {
                var info = {};
                var photoURL = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                info.id = photo.id;
                info.url = photoURL;
                getPhotoLocation(info, photo.id);
            });
        }
    });


    function getPhotoLocation(info, id) {
        // console.log(id);
        $.ajax({
            async: false,
            url: flickrGetLocationURL + id,
            dataType: "jsonp",
            jsonpCallback: 'jsonFlickrApi', // add this property
            success: function (result, status) {
                // console.log(result);
                // console.log(status);
                if (result.photo.location.country) {
                    info.country = result.photo.location.country._content;
                    // info.locality = result.photo.location.locality._content;
                    info.region = result.photo.location.region._content;
                    info.longitude = result.photo.location.longitude * 1;
                    info.latitude = result.photo.location.latitude * 1;

                    if (info.country) {
                        billboard = viewer.entities.add(new Cesium.Entity({
                            name: info.country + " " + info.region,
                            position: Cesium.Cartesian3.fromDegrees(info.longitude, info.latitude),
                            billboard: {
                                image: info.url,
                                width: 40,
                                height: 40,
                                // alignedAxis:Cesium.Cartesian3.UNIT_Z,
                                // eyeOffset: new Cesium.Cartesian3(0.0, 20, 0.0),
                                // pixelOffset: new Cesium.Cartesian2(0, -10),
                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                // 布告板贴地不被地形淹没
                                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
                                // verticalOrigin: Cesium.VerticalOrigin.TOP,
                                // horizontalOrigin:Cesium.HorizontalOrigin.CENTER
                                // rotation : Cesium.Math.PI_OVER_FOUR
                            }
                        }));

                        billboardArr.push(billboard);
                        console.log(billboardArr);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // console.log("Status: " + textStatus);
                // console.log("Error: " + errorThrown);
            }
        });
    }


}
