<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>关于我们</title>
	<%@ include file="../common/m-about-common.jspf" %>
</head>
<body>
    <%@ include file="../common/m-about-head.jsp" %>
    <div id="contact">
        <h1 class="title"><p class="tc">联系我们<br/><font>Contact us</font></p></h1>
        <h2><center>云南产业投资管理有限公司</center></h2>
        <div class="list">
            <div class="list_text">
                <span style="text-align:center;">客服电话：400-0000-577</span>
                <!-- <span>官方微博：yueniuts@163.com</span> -->
                <!-- <span>QQ咨询：3004636921</span> -->
            </div>
            <div id="allmap"></div>
        </div>
    </div>
    <%@ include file="../common/m-front-footer.jsp" %>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=ftbueDGppSseOTipbKO1j9Z43DpuvDKY"></script>
    <script type="text/javascript">
        $(function() {

            /////////////////////////////////////////////////////////////////////

            //地图
            var map = function() {
                createMap(); //创建地图
                setMapEvent(); //设置地图事件
                addMapControl(); //向地图添加控件
                addMapOverlay(); //向地图添加覆盖物

                function createMap() {
                    map = new BMap.Map("allmap");
                    map.centerAndZoom(new BMap.Point(116.293086, 35.050484), 4);
                }

                function setMapEvent() {
                    map.enableScrollWheelZoom();
                    map.enableKeyboard();
                    map.enableDragging();
                    map.enableDoubleClickZoom()
                }

                function addClickHandler(target, window) {
                    target.addEventListener("click", function() {
                        target.openInfoWindow(window);
                    });
                }

                function addMarker(point){
                    var marker = new BMap.Marker(point);
                    map.addOverlay(marker);
                }
                // ['北京':'116.427639,39.91212',上海':'121.482537,31.236799','云南':'102.718734,25.052869','河南':'113.651232,34.77748','南昌':'115.861941,28.69097']

                function addMapOverlay() {
                    var markers = [{
                        content: "",
                        title: "北京",
                        imageOffset: {
                            width: -46,
                            height: -21
                        },
                        position: {
                            lat: 39.91212,
                            lng: 116.427639
                        }
                    },
                    // { 
                    //     title: "上海",
                    //     imageOffset: {
                    //         width: -46,
                    //         height: -21
                    //     },
                    //     position: {
                    //         lat: 31.236799,
                    //         lng: 121.482537
                    //     }
                    // },
                    {
                        title: "云南",
                        imageOffset: {
                            width: -46,
                            height: -21
                        },
                        position: {
                            lat: 25.052869,
                            lng: 102.718734
                        }
                    },{
                        title: "河南",
                        imageOffset: {
                            width: -46,
                            height: -21
                        },
                        position: {
                            lat: 34.77748,
                            lng: 113.651232
                        }
                    },{
                        title: "南昌",
                        imageOffset: {
                            width: -46,
                            height: -21
                        },
                        position: {
                            lat: 28.69097,
                            lng: 115.861941
                        }
                    }];
                    for (var index = 0; index < markers.length; index++) {
                        var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
                        var marker = new BMap.Marker(point, {
                            icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20, 25), {
                                imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
                            })
                        });
                        var label = new BMap.Label(markers[index].title, {
                            offset: new BMap.Size(25, 5)
                        });
                        var opts = {
                            width: 200,
                            title: markers[index].title,
                            enableMessage: false
                        };
                        var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
                        marker.setLabel(label);
                        addClickHandler(marker, infoWindow);
                        map.addOverlay(marker);
                    };
                }
                //向地图添加控件
                function addMapControl() {
                    var scaleControl = new BMap.ScaleControl({
                        anchor: BMAP_ANCHOR_BOTTOM_LEFT
                    });
                    scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
                    map.addControl(scaleControl);
                }
            }()
        })

    </script>
</body>
</html>