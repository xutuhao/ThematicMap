define('popup', ['map','leaflet', 'templateWxp','mustache'], function(M,L,T,Mustache) {
    /* json样式  模板在
        var json = {
            title: '天津市规划局蓟县规划局',
            properties: [
                {
                    title: '地址',
                    info: '蓟县渔阳镇迎宾路18号'
                },
                {
                    title: '电话',
                    info: '88888888'
                }
            ]
        };
    */

    // options {
    //  json: json数据
    //  marker: 点或经纬度
    // : 类型
    // }
    function getPopup(options, type) {
        var template = T.template_popup;//选择模板
        var offsetX = 0; //x方向的偏移量
        if(type=='weather') {
            template = T.template_popup_weather;
            offsetX = 6;
            
        }else if(type == 'envMarker'){
            template = T.template_envMarkerPopup  // 环境点模板
            offsetX = 0;
        }else if(type == 'envPoly'){
            template = T.template_envPolyPopup  // 环境面模板
            offsetX = 0;
        }else if(type == 'zoologyPoly'){
            template = T.template_zoologyPopup  // 生态面模板
            offsetX = 0;
        }else if(type == 'zoologyPoly2'){
            template = T.template_zoologyPopup2  // 生态面模板
            offsetX = 0;
        }else{
            template = T.template_popup;
            offsetX = 0;
        }
        //设置宽度
        var map = M.getMap();
        var json = options.json; //数据

        if(!options.width) {
            json.width='auto'
        }else{
            json.width=options.width+'px';
        }

        var htmlPopup = Mustache.render(template, json);
        //属性面板
        var popup = L.popup({
            className: 'common-popup popup_subject_'+options.type,
            bottom: '16px',
            minWidth: '30px'
        }).setContent(htmlPopup);
        // if(options.marker.lat&&options.marker.lng) {
        //     popup.setLatLng(options.marker).addTo(map);
        // }else{
            // options.marker.bindPopup(popup, {offset: new L.Point(offsetX, -8)});
        // }
        if(type == "envPoly" || type == "zoologyPoly" || type == "zoologyPoly2"){
            options.polygons.bindPopup(popup, {offset: new L.Point(offsetX, -8)});
        }else{
            options.marker.bindPopup(popup, {offset: new L.Point(offsetX, -8)});
        }
        return popup;
    }
    return {
        getPopup: getPopup
    }

});