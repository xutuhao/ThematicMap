require.config({
	urlArgs: 'v=3.0',
    paths: {
        jquery: '../../lib/jquery/jquery-1.12.0.min',
        leaflet: '../../lib/leaflet/leaflet-0.7',
//        leaflet: '../../lib/leaflet/leaflet',
        template:'../../template/template',
        tree:'../../modules/tree/tree',
        mustache:'../../lib/mustache/mustache',
        map:'../../modules/map/map',
        mousewheel:'../../plugins/scrollbar/mousewheel',
        scrollbar:'../../plugins/scrollbar/scrollbar',
        statics:'../../modules/static/statics',
        lefttool:'../../modules/lefttool/lefttool',
        d3:'../../lib/d3/d3.min',
        d3pie:'../../plugins/d3Pie/d3pie.min',
        graphic:'../../modules/graphic/graphic',
        lineGraphic:'../../modules/graphic/line-graphic',
        columnGraphic:'../../modules/graphic/column-graphic',
        pieGraphic:'../../modules/graphic/pie-graphic',
        resize:'../../modules/resize/resize',
        drag:'../../plugins/draggabilly/draggabilly.pkgd',
        sumoselect:'../../plugins/multiselect/jquery.sumoselect',
        floattool:'../../modules/floattool/floattool',
        staticmap:'../../modules/static/staticmap',
        staticdata:'../../modules/static/staticdata',
        legend:'../../modules/legend/legend',
        popup:'../../modules/popup/popup',
        slider:'../../modules/slider/slider',
        styleedit:'../../modules/styleedit/styleedit',
        cover:'../../modules/cover/cover',
        district:'../../modules/district/district',
        weather:'../../modules/weather/weather',
        
		points: '../../modules/points/points',
        iconAndPopup: '../../modules/points/setIconAndPopup',
        timeAxis: '../../modules/time-axis/time-axis',
        templateWxp:'../../template/template_wxp',
        bridget: '../../plugins/jquery-bridget/jquery-bridget',
        search: '../../modules/search/search',
        pager: '../../plugins/pager/jquery.pager',
		cityList: '../../modules/cityList/cityList',
		cluster: '../../plugins/leaflet.markercluster/dist/leaflet.markercluster-1',
		geoJsonEncoded: '../../plugins/tianditu_feature/tianditu_feature',
        localStorage: '../../modules/localStorage/localStorage',
        userservice: '../../modules/userservice/userservice',
        prompt: '../../modules/prompt/prompt',
        
        
        // 环境保护模块
        envConfig:'../../modules/environment/config',
        envLegend:'../../modules/environment/envLegend',
        environment:'../../modules/environment/environment',
        imageNames:'../../modules/environment/imageNames',
        
		// 共通的JS类	
		util:'../../modules/util/util'	
    },
    shim:{
    	sumoselect:['jquery']
    },
    waitSeconds: 0 // 防止加载js文件时发生超时
});

require(['map','lefttool', 'floattool'], function(M, LT, FT) {
    // 加载底图
    M.loadMap();
    // 初始化左侧面板
    LT.initEvent();
    // 初始化导航
    FT.loadFloatTool();
});
