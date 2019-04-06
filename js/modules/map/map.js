define("map", ["leaflet", "jquery"],
    function(i, e) {
        i.TileLayer.TiandituLayer = i.TileLayer.extend({
            getTileUrl: function(p) {
                var o = parseInt(Math.random() * 7);
                var n = this.options.layerType;
                var m = "https://t" + o + ".tianditu.gov.cn/" + n + "_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=" + n + "&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL=" + p.x + "&TILEROW=" + p.y + "&TILEMATRIX=" + p.z + "&tk=" + window.TDT_ENV.TDT_TOKEN;
                return m
            }
        });
        i.tileLayer.tiandituLayer = function(m) {
            return new i.TileLayer.TiandituLayer("", m)
        };
        e.AjaxGet = e.ajax;
        e.ajax = function(n) {
            var q = "";
            var o = n.data;
            if (o) {
                if (typeof o == "string") {
                    o = JSON.parse(o)
                }
                for (var p in o) {
                    if (p == "introduce") {
                        continue
                    }
                    if (q != "") {
                        q = q + "&"
                    }
                    if (typeof o[p] == "string") {
                        o[p] = o[p].replace(/&/g, "|")
                    }
                    q = q + p + "=" + o[p]
                }
            }
            var m = new Date();
            if (n.url.indexOf("weathers") > -1) {
                n.url = encodeURI(n.url + (q == "" ? ("?version=" + m.getTime()) : ("?" + q + "&version=" + m.getTime())))
            } else {
                n.url = encodeURI(n.url + (q == "" ? "": ("?" + q)))
            }
            n.type = "get";
            n.data = "";
            return e.AjaxGet(n)
        };
        var j = "GS(2018)1432号 - 甲测资字1100471";
        var b = ["cn_name", "en_name", "meng_name", "wei_name"];
        var d, l;
        var a = i.map("map", {
            center: [36, 105],
            worldCopyJump: true,
            minZoom: 2,
            maxZoom: 18,
            zoom: 4,
            maxBounds: i.latLngBounds(i.latLng( - 90, -360), i.latLng(90, 360)),
            attributionControl: false
        });
        function c() {
            a.zoomControl.setPosition("bottomright");
            h()
        }
        function h() {
            e(".layer_nav .layer-pop").on("click",
                function() {
                    return false
                }).on("mouseover",
                function() {
                    return false
                });
            e(".layer_nav .layer-pop .close").on("click",
                function() {
                    e(".layer_nav .layer-pop").hide()
                });
            e(".layer_nav .layer-items a").on("click",
                function() {
                    var m = e(this);
                    m.siblings().removeClass("active");
                    m.addClass("active");
                    f()
                });
            e(".layer-arguments span:last-child").on("click",
                function() {
                    var o = e(this);
                    var m = o.attr("id");
                    for (var n in b) {
                        var p = b[n];
                        if (p == m) {
                            if (o.hasClass("uncheck")) {
                                o.removeClass("uncheck").addClass("check")
                            } else {
                                o.removeClass("check").addClass("uncheck")
                            }
                        } else {
                            e("#" + p).removeClass("check").addClass("uncheck")
                        }
                    }
                    f()
                });
            e(".layer_nav .layer-items a").eq(0).trigger("click");
            e("#cn_name").trigger("click");
            a.on("click",
                function() {
                    e("#app .layer-custom").remove()
                });
            a.on("zoom", g);
            a.on("moveend", g)
        }
        function f() {
            var q = [];
            if (d) {
                a.removeLayer(d)
            }
            if (l) {
                a.removeControl(l)
            }
            var p = e(".layer-items a.active").attr("id").split("_")[0];
            var m = i.tileLayer.tiandituLayer({
                layerType: p
            });
            q.push(m);
            function o(s) {
                var t = s + p.substr(0, 1) + "a";
                var r = i.tileLayer.tiandituLayer({
                    layerType: t
                });
                q.push(r);
                if (p == "img") {
                    var r = i.tileLayer.tiandituLayer({
                        layerType: "ibo"
                    });
                    q.push(r)
                }
                if (p == "ter") {
                    var r = i.tileLayer.tiandituLayer({
                        layerType: "tbo"
                    });
                    q.push(r)
                }
            }
            for (var n in b) {
                if (e("#" + b[n]).hasClass("check")) {
                    o(b[n].substr(0, 1))
                }
            }
            d = i.layerGroup(q);
            a.addLayer(d);
            l = new k({
                position: "bottomleft",
                maptype: p
            });
            a.addControl(l);
            g()
        }
        function g() {
            var r = a.getCenter().lng + "," + a.getCenter().lat;
            var x = a.getZoom();
            var n = -1;
            if (x < 2) {
                return
            } else {
                if (x < 6) {
                    n = 2
                } else {
                    if (x < 11) {
                        n = 3
                    } else {
                        if (x < 18) {
                            n = 4
                        } else {
                            if (x <= 20) {
                                n = 5
                            }
                        }
                    }
                }
            }
            var m = a.getBounds();
            var t = m.getSouthWest().lng;
            var s = m.getSouthWest().lat;
            var w = m.getNorthEast().lng;
            var v = m.getNorthEast().lat;
            var u = t + "," + s + "," + w + "," + v;
            var p = e(".layer-items a.active").attr("id").split("_")[0];
            p = p == "ter" ? "trn": p;
            var q = "w";
            var o = "type=changeCity&postStr={'lonlat' : '" + r + "', 'level' : '" + n + "','bound':'" + u + "','zoom':'" + x + "','layers':'" + p + "','projection':'" + q + "'}";
            // e.ajax({
            //     url: "https://zhfw.tianditu.gov.cn/zhfw/dataSourceQuery",
            //     type: "POST",
            //     dataType: "json",
            //     contentType: "application/json",
            //     data: JSON.stringify({
            //         params: o
            //     }),
            //     success: function(A) {
            //         var B = A.ds;
            //         var z = "数据来源：国家地理信息公共服务平台";
            //         if (B && B.length > 0) {
            //             var D = B.split(",");
            //             for (var y in D) {
            //                 var C = D[y];
            //                 if (C && (C.length > 0) && C != "null") {
            //                     z += " & " + C
            //                 }
            //             }
            //         }
            //         e(".sheet-control .datasource").remove();
            //         e(".sheet-control").append('<div class="datasource">' + z + "</div>");
            //         e(".sheet-control .datasource").attr("style",
            //             function() {
            //                 return e(".sheet-control .sheetNumber").attr("style")
            //             }).css("left", "260px")
            //     },
            //     error: funct`ion() {}
            // })
        }
        var k = i.Control.extend({
            initialize: function(m) {
                this._options = m;
                i.Util.setOptions(this, m)
            },
            onAdd: function(o) {
                var m = i.DomUtil.create("div", "sheet-control", e("#app").get(0));
                var n;
                if (this._options.maptype == "vec" || this._options.maptype == "ter") {
                    n = "#000"
                } else {
                    if (this._options.maptype == "img") {
                        n = "#fff"
                    }
                }
                m.innerHTML = '<img src="./images/logo.png" width="53px" height="22px" opacity="0"><div class="sheetNumber" style="position:absolute;bottom:0px;left:58px;white-space:nowrap;color:' + n + ';">' + j + "</div>";
                return m
            }
        });
        return {
            loadMap: c,
            getMap: function() {
                return a
            }
        }
    });