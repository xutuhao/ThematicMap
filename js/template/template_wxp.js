define('templateWxp',function(){
	var template_wxp = {
        //弹出
		template_popup: '<div class="common-panel clearfix" style="width: {{width}}">' +
					        '<h3 class="common-panel-title">{{&title}}</h3> ' +
					        '<div class="panel-1 {{addclass}}"> ' +
						        '<ul>{{#properties}}<li class="panel-list"> ' +
						            '<span class="list-title">{{title}}：</span>' +
						            '<span class="list-intro" title="{{alt}}">{{&info}}</span>' +
						        ' </li>{{/properties}}</ul>' +
                            '</div>' +
                         '</div>',
        
        // 生态敏感与脆弱区
        template_zoologyPopup: '<div class="common-panel clearfix" style="width: {{width}}">' +
                                '<h3 class="common-panel-title">{{&title}}</h3> ' +
                                '<div class="panel-1 {{addclass}}"><dl class="dl-horizontal"> ' +
                                '<dt>类别</dt><dd>{{Ntype}}</dd>' +
                                '<dt>名称</dt><dd>{{Nname_Normal}}</dd>' +
                                '<dt>县级行政区</dt><dd>{{Ncounty}}</dd>' +
                                '<dt>市级行政区</dt><dd>{{Nprefecture}}</dd>' +
                                '<dt>省级行政区</dt><dd>{{Nprovince}}</dd>' +
                                '<dt>简介</dt><dd>{{Nbrief}}</dd>' +
                                '<dt>一级分类编码</dt><dd>{{LS1}}</dd>' +
                                '<dt>二级分类编码</dt><dd>{{LS2}}</dd>' +
                                '<dt>三级分类编码</dt><dd>{{LS3}}</dd>' +
                                '<dt>四级分类编码</dt><dd>{{LS4}}</dd>' +
                                '<dt>LS123组合编码</dt><dd>{{LS123}}</dd>' +
                                '<dt>LS1234组合编码</dt><dd>{{LS1234}}</dd>' +
                                '<dt>周长</dt><dd>{{Perimeter}}</dd>' +
                                '<dt>描述</dt><dd>{{Description}}</dd>' +
                                '<dt>USER_EIA_GIS···</dt><dd>{{user}}</dd>' +
                                '<dt>自定义名称</dt><dd>{{user_name}}</dd>' +
                                '</dl></div>' +
                            '</div>',
                            
        template_zoologyPopup2: '<div class="common-panel clearfix" style="width: {{width}}">' +
                                '<h3 class="common-panel-title">{{&title}}</h3> ' +
                                '<div class="panel-1 {{addclass}}"><dl class="dl-horizontal"> ' +
                                '<dt>类别</dt><dd>{{Ntype}}</dd>' +
                                '<dt>名称</dt><dd>{{Nname_Normal}}</dd>' +
                                '<dt>县级行政区</dt><dd>{{Ncounty}}</dd>' +
                                '<dt>市级行政区</dt><dd>{{Nprefecture}}</dd>' +
                                '<dt>省级行政区</dt><dd>{{Nprovince}}</dd>' +
                                '<dt>简介</dt><dd>{{Nbrief}}</dd>' +
                                '<dt>类型名称</dt><dd>{{typeName}}</dd>' +
                                '<dt>亚类类型名称</dt><dd>{{Subtpname}}</dd>' +
                                '<dt>类型编码</dt><dd>{{code}}</dd>' +
                                '<dt>周长</dt><dd>{{perimeter}}</dd>' +
                                '<dt>调查年份</dt><dd>{{surveyyear}}</dd>' +
                                '<dt>纬度</dt><dd>{{lat}}</dd>' +
                                '<dt>经度</dt><dd>{{long}}</dd>' +
                                '<dt>USER_EIA_GIS···</dt><dd>{{user}}</dd>' +
                                '<dt>自定义名称</dt><dd>{{user_name}}</dd>' +
                                '</dl></div>' +
                            '</div>',
        // 环境信息弹出
        template_envMarkerPopup: '<div class="common-panel clearfix" style="width: {{width}}">' +
                                '<h3 class="common-panel-title">{{&title}}</h3> ' +
                                '<div class="panel-1 {{addclass}}"><dl class="dl-horizontal"> ' +
                                '<dt>类别</dt><dd>{{Ntype}}</dd>' +
                                '<dt>名称</dt><dd>{{Nname_Normal}}</dd>' +
                                '<dt>县级行政区</dt><dd>{{Ncounty}}</dd>' +
                                '<dt>地级行政区</dt><dd>{{Nprefecture}}</dd>' +
                                '<dt>省级行政区</dt><dd>{{Nprovince}}</dd>' +
                                '<dt>简介</dt><dd>{{Nbrief}}</dd>' +
                                '<dt>编码</dt><dd>{{code}}</dd>' +
                                '<dt>名称</dt><dd>{{name}}</dd>' +
                                '<dt>保护区级别</dt><dd>{{protectedLevel}}</dd>' +
                                '<dt>保护区类型</dt><dd>{{protectedType}}</dd>' +
                                '<dt>保护区对象</dt><dd>{{protectedObject}}</dd>' +
                                '<dt>行政区编码</dt><dd>{{administrativecode}}</dd>' +
                                '<dt>行政区名称</dt><dd>{{administrativename}}</dd>' +
                                '<dt>行政区编码年份</dt><dd>{{administrativeyear}}</dd>' +
                                '<dt>地理位置描述</dt><dd>{{location}}</dd>' +
                                '<dt>最小经度</dt><dd>{{longmin}}</dd>' +
                                '<dt>最大经度</dt><dd>{{longmax}}</dd>' +
                                '<dt>最小纬度</dt><dd>{{latmin}}</dd>' +
                                '<dt>最大维度</dt><dd>{{latmax}}</dd>' +
                                '<dt>中心经度</dt><dd>{{centerlong}}</dd>' +
                                '<dt>中心纬度</dt><dd>{{centerlat}}</dd>' +
                                '<dt>核心区面积</dt><dd>{{corearea}}</dd>' +
                                '<dt>缓冲区面积</dt><dd>{{bufferarea}}</dd>' +
                                '<dt>始建时间</dt><dd>{{permissiontime}}</dd>' +
                                '<dt>主管部门</dt><dd>{{supervisordepartmet}}</dd>' +
                                '<dt>管理单位</dt><dd>{{manageunit}}</dd>' +
                                '<dt>说明</dt><dd>{{introduction}}</dd>' +
                                '<dt>USER_EIA_GIS···</dt><dd>{{user}}</dd>' +
                                '<dt>自定义名称</dt><dd>{{user_name}}</dd>' +
                                '</dl></div>' +
                            '</div>',                       
           template_envPolyPopup: '<div class="common-panel clearfix" style="width: {{width}}">' +
                            '<h3 class="common-panel-title">{{&title}}</h3> ' +
                            '<div class="panel-1 {{addclass}}"><dl class="dl-horizontal"> ' +
                            '<dt>类别</dt><dd>{{Ntype}}</dd>' +
                            '<dt>名称</dt><dd>{{Nname_Normal}}</dd>' +
                            '<dt>县级行政区</dt><dd>{{Ncounty}}</dd>' +
                            '<dt>地级行政区</dt><dd>{{Nprefecture}}</dd>' +
                            '<dt>省级行政区</dt><dd>{{Nprovince}}</dd>' +
                            '<dt>简介</dt><dd>{{Nbrief}}</dd>' +
                            '<dt>编码</dt><dd>{{code}}</dd>' +
                            '<dt>名称</dt><dd>{{name}}</dd>' +
                            '<dt>保护区级别</dt><dd>{{protectedLevel}}</dd>' +
                            '<dt>保护区类型</dt><dd>{{protectedType}}</dd>' +
                            '<dt>保护区对象</dt><dd>{{protectedObject}}</dd>' +
                            '<dt>行政区编码</dt><dd>{{administrativecode}}</dd>' +
                            '<dt>行政区名称</dt><dd>{{administrativename}}</dd>' +
                            '<dt>行政区编码年份</dt><dd>{{administrativeyear}}</dd>' +
                            '<dt>始建时间</dt><dd>{{permissiontime}}</dd>' +
                            '<dt>主管部门</dt><dd>{{supervisordepartmet}}</dd>' +
                            '<dt>管理单位</dt><dd>{{manageunit}}</dd>' +
                            '<dt>功能分区</dt><dd>{{funcDivison}}</dd>' +
                            '<dt>USER_EIA_GIS···</dt><dd>{{user}}</dd>' +
                            '<dt>自定义名称</dt><dd>{{user_name}}</dd>' +
                            '</dl></div>' +
                        '</div>',

        template_popup_weather: '<div class="common-panel-w clearfix" style="width: {{width}}">'+
        '<h3 class="common-panel-title clearfix">{{&title2}}</h3>'+
        '{{#td}}<div class="today-w clearfix">'+
        '<div class="weather-intro">'+
        '<p class="weather-temp">{{tmp}}</p>'+
        '<p class="weather-weath">{{fa}}</p>'+
        '<p class="weather-wind">{{fg}}</p>'+
        '<p class="weather-wind-dire">{{fe}}</p>'+
        '</div>'+
        '<div class="weather-icon-w">' +
        '<img src="./images/{{bUrl}}" width="96"/>' +
        '</div>'+
        '</div>{{/td}}'+
        '<div class="weather-other-day clearfix">'+
        '{{#dw}}<div class="other-day-list">'+
        '<p class="other-day-week">{{wk}}</p>'+
        '<p class="other-day-day">{{md}}</p>'+
        '<div class="other-day-icon-box">'+
        '<div class="weather-icon {{ic}}"></div>'+
        '</div>'+
        '<p class="weather-temp weather-other-p2">{{tmp}}</p>'+
        '<p class="weather-weath weather-other-p2">{{fa}}</p>'+
        '<p class="weather-wind weather-other-p2">{{fg}}</p>'+
        '<p class="weather-wind-dire weather-other-p2">{{fe}}</p>'+
        '</div>{{/dw}}'+
        '</div>'+
        '<div class="weather-index clearfix">'+
        '{{#properties}}<div class="panel-w-list">'+
        '<span class="list-title">{{title}}：</span>'+
        '<span class="list-intro">{{info}}</span>'+
        '</div>{{/properties}}' +
        ' <div class="panel-w-list-more">'+
        '<a href="http://www.weather.com.cn/weather1d/{{wc}}.shtml" target="_blank">查看更多</a>'+
        '</div>'+
        '</div>'+
        '</div>',

        template_axis: '<div class="common-display time-axis-box time-axis time-axis-{{code}}" data-target-id="icon_timeAxis">' +
//                        '<div class="time-drag"></div>' +
                        '<div class="time-axis-padding"><div class="time-axis-inner clearfix">' +
                        	'<a href="javascript:;" class="close"></a>' +
	                        '<div class="play-box fl">' +
	                        	'<button class="play"></button>' +
	                        '</div>' +
	                        '<div class="t-a-box fl">' +
	                        	'<button class="pre-btn fl"></button>' +
	                        	'<div class="skate fl">' +
			                        '<div class="skate-wheel" style="left: 0px;"></div>' +
			                        '<div class="tick-box clearfix">' +
				                        '{{#years}}<div class="ticks {{^isLast}}tick{{/isLast}}{{#isLast}}tick-last{{/isLast}}"  data-value="{{year}}">' +
				                        	'<span class="tick-text" data-count="{{index}}" data-value="{{year}}">{{year}}</span>' +
				                        	'</div>{{/years}}'+
				                        	'<div class="progress"></div>'+
				                    '</div>' +
		                        '</div>' +
		                        '<button class="next-btn fl"></button>' +
		                        '<label class="current-tick"></label>' +
	                        '</div>' +
                        '</div></div></div>',


        //城市选择模板
        template_city_select: '<div class="city-select s-common">' +
                                    '{{#hasPrompt}}<div class="city-result-title">'+
                                    '有以下相关结果，您是否要找：' +
                                    '</div>'+
                                    '<div class="city-possible">' +
                                        '<div class="city-possible-list">{{&hasResulte}}</div>'+
                                    '</div>{{/hasPrompt}}'+
                                    '{{#statistics}}<div class="city-result-title">'+
                                        '在<span class="important">{{country}}</span>以下城市有结果，请您选择'+
                                    '</div>'+
                                    '<div class="city-box clearfix">'+
                                        '{{#priorityCitys}}<a href="javascript:;" data-name="{{name}}" data-admincode="{{adminCode}}" data-lonlat="{{lat}},{{lon}}" data-count="{{count}}" class="place-shi-a select-btn">{{name}}({{count}})</a>{{/priorityCitys}}'+
                                    '</div>'+
                                    '{{#hasAllAdmins}}<div class="city-other">'+
                                        '<div class="city-other-title">'+
                                            '<a href="javascript:;" class="more-btn">'+
                                                '<b class="rotate"></b>'+
                                                '查看更多'+
                                            '</a>'+
                                        '</div>'+
                                        '<div class="re-scroll" id="place_scroll"><ul class="place-box-other">'+
                                            '{{#allAdmins}}<li class="place-list-other">'+
                                                '<div class="place-province">'+
                                                    '<a class="place-province-a {{#noneCount}}noneNext{{/noneCount}}" href="javascript:void(0);" data-admincode="{{adminCode}}" data-count="{{count}}">'+
                                                        '{{^noneCount}}<b class="b-icon b-icon-open"></b>{{/noneCount}}'+
                                                        '{{name}}'+
                                                    '</a>'+
                                                    '<span class="place-province-count">({{count}})</span>'+
                                                '</div>'+
                                                '<ul class="place-shi">'+
                                                    '{{#childAdmins}}<li>' +
                                                        '<div class="place-shi-list">'+
                                                            '<a class="place-shi-a" href="javascript:void(0);" data-name="{{name}}" data-admincode="{{adminCode}}" data-lonlat="{{lat}},{{lon}}" data-count="{{count}}" >'+
                                                                '<b class="b-icon"></b>'+
                                                                '{{name}}'+
                                                            '</a>'+
                                                            '<span class="place-shi-count">({{count}})</span>' +
                                                        '</div>' +
                                                        
                                                    '</li>{{/childAdmins}}'+
                                                '</ul>'+
                                            '</li>{{/allAdmins}}'+
                                        '</ul></div>'+
                                    '</div>{{/hasAllAdmins}}{{/statistics}}'+
                                '</div>',


        template_result_box: '<div class="s-common" id="result_scroll">' +
                                    '<div class="city-result-title">{{{title}}}</div>'+
                                    '<div class="re-scroll"><div class="s-result-box">' +
                                        '<ul class="list-box">'+
                                            '{{#pois}}<li class="s-list"><a href="javascript:;" data-lonlat="{{lonlat}}" class="s-list-a">'+
                                            '<i class="list-icon {{imgPos}}" style=""></i>'+
                                            '<i class="help" style="display: none"></i>'+
                                            '<div class="list-content">'+
                                                '<span class="place-name">{{name}}</span>'+
                                                '<span class="place-address">{{address}}</span>'+
                                            '</div>'+
                                            '</a></li>{{/pois}}'+
                                        '</ul>'+
                                    '<div id="pager"></div>'+

                            '</div></div></div>',


        template_city_detail: '<div class="s-result-detail s-common">'+
                                ' <!--搜索结果具体信息-->'+
                                    '<div class="detail-head clearfix">'+
                                        '<h4>{{place}}</h4>'+
                                        '<a class="btn-color click-detail" href="javascript:;"></a>'+
                                    '</div>'+
                                    '<div class="re-scroll"><ul class="detail" id="city_detail">'+

                                    '</ul></div>'+
                                '</div>',

        template_city_simple:  '<li class="detail-list">'+
                                    '<div class="detail-list-head">{{title}}</div>'+
                                    '<div class="head-intro">'+
                                        '<p class="intro-p" data-title="{{info}}"></p>'+
                                        '<a class="btn-color openAll" href="javascript:;">+展开</a>'+
                                    '</div>'+
                                    '<ul class="panel-1">'+
                                        '{{#properties}}<li class="panel-list">'+
                                            '<span class="list-title">{{title}}：</span>'+
                                            '<span class="list-intro">{{info}}</span>'+
                                        '</li>{{/properties}}'+
                                    '</ul>'+
                                '</li>',

        template_city_cCH: '<li class="detail-list change-history">'+
                                '<div class="detail-list-head">变更历史</div>'+
                                '{{#citysInfo}}<div class="head-intro">'+
                                    '<div class="change-time">'+
                                        '<span class="c-time">{{changeTime}}</span>'+
                                    '</div>'+
                                    '<p class="intro-p" data-title="{{changeInfo}}"></p>'+
                                    '<a class="openAll btn-color" href="javascript:;" style="display:none">+展开</a>'+
                                '</div>' +
                                '<ul class="panel-1">'+
                                    '<li class="panel-list">'+
                                    '<span class="list-title">批复：</span>'+
                                    '<span class="list-intro">{{changeNumber}}</span>'+
                                    '</li>'+
                                '</ul>{{/citysInfo}}'+
                            '</li>',

        template_city_change: '{{#statics}}<li class="place-list clearfix">' +
                                '<div class="place-province"><a href="javascript:void(0);" data-name="{{name}}" data-admincode="{{gbcode}}" data-lonlat="{{location}}" data-zoom="{{zoomLevel}}">{{name}}</a></div>' +
                                '<div class="place-shi">' +
                                    '{{#citys}}<a href="javascript:void(0);" data-name="{{name}}" data-admincode="{{gbcode}}" data-lonlat="{{location}}" data-zoom="{{zoomLevel}}">{{name}}</a>{{/citys}}' +
                                '</div>' +
                            '</li>{{/statics}}',

                         // 加载动画
                			loading_gif:'<div class="loading"><img src="data:image/gif;base64,R0lGODlhKAApAPeLAJq/67vU8Yi056rJ7laU3Xip5Gee4Mzf9a/M7/L3/PT4/ery+4y26L/X8tHi9s/g9c/h9d3p+MXa85i+6qTF7ff6/brT8Z/C7O30+5C56fD1/KDD7G+k4mGb3+Xv+q/N7+jw+nCk4oCv5r/W8n6u5fD2/Ovy++70/O/1/I+46NDh9uTu+l+a33+u5efw+vj6/pK66b3V8qLE7Ozz+4646K3L7unx+/X5/ebv+qHD7IKw5mOc4LHN7+jx+nKm48HY8o636J3B63ys5Z7C7LDN787g9a7M763L7/b5/W6j4r7W8rHO71+Z316Z39vo+JG56d7q+LnT8dPj9tzp+Pb6/fj7/sPZ87fR8KvK7tLi9muh4Yq155O76ZW86t3q+Iez54236PP3/cfb9M3g9VuX3sTa84Gv5p7B68DX8myi4XGl4lyY3m2i4l2Y3n2t5cfc9HSn46bH7cjc9JzA66XG7cHY8+Pt+YSx5mWd4JvA65a86qbG7eHs+eLt+e71/KjI7bzV8mKc38bb9KfH7bLO8Iq16KTG7ZS76oaz55m+6rjS8f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMmUwZWU5NS1iY2M0LTE1NDEtOGQ1ZS1hMTVlYzM2MjJjZWUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTNDRTA2ODhCMDE1MTFFM0E2QTBCQjA4MzFGNzU1MTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTNDRTA2ODdCMDE1MTFFM0E2QTBCQjA4MzFGNzU1MTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUxYmQ0YWZjLTA4YTYtYTE0MS04ZTI4LWIwYjdlM2I5OGYyYyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMmUwZWU5NS1iY2M0LTE1NDEtOGQ1ZS1hMTVlYzM2MjJjZWUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOC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"/></div>',
	    search_auto: '<ul class="proposal-list">'+
                       '{{#suggests}}<li class="proposal" data-name="{{name}}" data-gbcode="{{gbCode}}" title="{{name}}（{{address}}）">{{name}}<span class="address">（{{address}}）</span></li>{{/suggests}}'+
                    '</ul>'
    };
	return template_wxp;
});
