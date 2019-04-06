window.TDT_ENV = {
    // 用户管理系统
    T_URL_SERVICE_URL:'https://sso.tianditu.gov.cn',
    // 用户系统
    T_UC_URL:'http://uums.tianditu.gov.cn',
    // 首页地址
    HOME_URL: 'http://www.tianditu.gov.cn/',
    // 省市互通服务接口
    PROVINCE_URL: 'http://www.tianditu.gov.cn/city/tdthome/province',
    // 天地图key列表
    TOKENS:{
        'www.tianditu.gov.cn':{
            key:'d4cd1c8235f344b0a6c0561591aa0eb8',
            api:false,
            protocol:'http'
        },
		'http://localhost:8080/tianditu':{
            key:'d4cd1c8235f344b0a6c0561591aa0eb8',
            api:false,
            protocol:'http'
        },
        'map.tianditu.gov.cn':{
            key:'2ce94f67e58faa24beb7cb8a09780552',
            api:true,
            protocol:'http'
        },
        'zhfw.tianditu.gov.cn':{
            key:'1072d95046f18e67463ce40d645a9b8d',
            api:false,
            protocol:'http'
        },
        'vgimap.tianditu.gov.cn':{
            key:'7fd71209a9276f2024e234771d29e592',
            api:false,
            protocol:'http'
        },
        'ggkf.tianditu.gov.cn':{
            key:'60d61f6e44d5a3966efa34c02f3fa959',
            api:true,
            protocol:'http'
        },
        'weather.tianditu.gov.cn':{
            key:'73f84912bf73c9eb2ef4174a30c660e0',
            api:true,
            protocol:'http'
        },
        'ydyl.tianditu.gov.cn':{
            key:'b7887b66e7f6098ea8d427df6c67ee53',
            api:false,
            protocol:'http'
        },
        'xaxq.tianditu.gov.cn':{
            key:'3cb82e33350772fec27f2c981e239f8f',
            api:true,
            protocol:'https'
        },
        'en.tianditu.gov.cn':{
            key:'265e28ef9f9c23ba7eba604c89992656',
            api:true,
            protocol:'http'
        }
    },
    // 当前项目所具有的key
    TDT_TOKEN:'',
    // 天地图API加载完毕的回调函数
    TDT_API_LOADED:function (callback) {
        var tdtApi = document.getElementById('tdt_api');
        if (typeof T != 'undefined' && T.Version){
            callback();
        } else {
            tdtApi.addEventListener('load', function () {
                callback();
            });
        }
    }
}

// 解析域名，找到对应的key
var url = window.location.href;
var domain = url.match(/[a-zA-Z0-9]+[\.]tianditu[\.]gov[\.]cn/g);
if (domain){
    domain = domain[0];
    var token = window.TDT_ENV.TOKENS[domain];
    if (token){
        var key = token.key;
        var api = token.api;
        var protocol = token.protocol;
        if (api){
            var script = document.createElement('script');
            script.setAttribute('id', 'tdt_api');
            script.setAttribute('src', protocol + '://api.tianditu.gov.cn/api?v=4.0&tk='+ key);
            script.setAttribute('type', 'text/javascript');
            document.querySelector('head').appendChild(script);
        }
        window.TDT_ENV.TDT_TOKEN = key;
    }
}else{
	window.TDT_ENV.TDT_TOKEN = 'd4cd1c8235f344b0a6c0561591aa0eb8';
}