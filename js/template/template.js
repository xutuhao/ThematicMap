define('template',function(){
	var template = {
			
			// 专题树的根级模板
			tree_level_root:'{{#subjects}}<li class="children children-lv1" id="subject_{{code}}">'+
						   '<a class="lv1-title" href="javascript:void(0);">{{name}}<span class="triangle-down"></span></a></li>{{/subjects}}',
			
			// 专题树的叶子模板
			tree_level_leaf:'<ul class="ul-leaf">{{#subjects}}<li class="children children-lv2" id="subject_{{code}}">'+
							'<a class="lv2-title" href="javascript:void(0);">'+
	              			'<span class="checkbox"></span>'+
	              			'<span class="lv2-text">{{name}}</span>'+
	              			'<span class="help"></span></a>'+
	              			'<div class="lv2-info"></div></li>{{/subjects}}</ul>',
	              			
	        // 统计图表最外层的轮廓      			
			statics_frame: ''+
			  			   '<div class="condition"><div class="data_main"><div class="data_mainle">专题：</div><div class="data_mainrt select_subject"></div></div>'+
						   '<div class="date_main"><div class="data_mainle">时间：</div><div class="data_mainrt select_datetime"></div></div></div>'+
			  			   '<div class="table-body"></div>',
			  			   
			// 统计数据表模板
			statics_table:'<table>'+
							'<thead>'+
								'<tr>{{#thead}}<th><div>{{.}}</div><div class="titles_rt"><div class="up"></div><div class="down"></div></div><div class="separator-line"></div></th>{{/thead}}</tr>'+
							'</thead>'+
							'<tbody>{{#tbody}}'+
								'<tr>{{#contents}}<td><div>{{.}}</div></td>{{/contents}}</tr>'+
							'{{/tbody}}</tbody>'+
						  '</table><div class="maskTable"></div>',
			
            // 下拉多选模板,需要使用插件MULTISELECT
            select_multiple:'<span class="indicator">指标：</span><select multiple="multiple" class="SlectBox">{{#lists}}<option value="{{.}}">{{.}}</option>{{/lists}}</select><span id="column_graphic"><a href="javascript:void(0)"><img src="../../images/column.png" /></a></span><span id="line_graphic"><a href="javascript:void(0)"><img src="../../images/line.png" /></a></span><span id="pie_graphic"><a href="javascript:void(0)"><img src="../../images/pie.png" /></a></span>',
            
            // 下拉单选模板,需要使用插件MULTISELECT
            select_single:'<select class="SlectBox">{{#body.lists}}<option value="{{code}}">{{name}}</option>{{/body.lists}}</select>',
            
            // 统计图上的提示框
            tooltip:'<div class="tooltip"><span>{{cityname}}</span><table>{{#ids}}<tr><td>{{name}}：</td><td>{{flag}}</td></tr>{{/ids}}</table></div>',
            
            // 图例样式
            legend:'<div class="legend_subject">{{#legends}}<div class="legend_line" style="height:{{lineHeight}};line-height:{{lineHeight}}"><div style="background:{{color}};border-radius:{{radius}};width:{{width}};height:{{height}};margin-top:{{marginTop}};margin-left:{{marginLeft}};"></div><span>{{text}}</span></div>{{/legends}}</div>',
            
            // 弹出框
    		popup: '<div class="property_popup"><div class="common-panel">' +
				        '<h3 class="common-panel-title">{{title}}</h3> ' +
				        '{{#cols}}<ul class="panel-1"> ' +
					        '{{#properties}}<li class="panel-list"> ' +
					            '<span class="list-title">{{title}}：</span> ' +
					            '<span class="list-intro">{{info}}</span>' +
					        ' </li>{{/properties}}' +
					        '{{#tips}}<li class="panel-list"> ' +
				            '<span class="list-intro">{{.}}</span>' +
				            ' </li>{{/tips}}' +
	                     '</ul>{{/cols}}' +
	                     '{{#tips}}<ul class="panel-1"> ' +
					        '<li class="panel-list"> ' +
				            '<span class="list-intro">{{.}}</span>' +
				            ' </li>' +
	                     '</ul>{{/tips}}' +
	                     '<div class="clearfix"></div>'+
                    '</div></div>',
            
            // 图层定制弹出模板
            layer_custom:'<div class="layer-custom">'
            			 +'<ul>'
            			 +	'{{#edit}}<li class="{{code}}">{{name}}</li>{{/edit}}'
            			 +'</ul>'
            			 +'</div>',
            
            // 样式定制
			style_custom:'<div class="style-custom">'
				 			+'<div class="header"><div class="title">样式</div><div class="close"></div></div>'
				 			+'<div class="middle"><div class="polygon"><div class="icon"></div><span>分级设色图</span></div><div class="symbol"><div class="icon"></div><span>符号图</span></div></div>'
				 			+'<div class="bottom"></div>'
				 		+'</div>',
	 		// 分级设色样式定制
			polygon_style:'<div class="title">颜色：</div><div class="single-color"><select>{{#options}}<option value="{{.}}">{{.}}</option>{{/options}}</select><div class="single">单色</div><div class="multi">彩色</div></div><div class="color-panel"></div>',
			
			// 符号图样式定制
			symbol_style:'<div class="title">形状：</div><div class="shape"><div class="circle"></div><div class="rectangle"></div></div><div class="title">颜色：</div><div class="symbol-color-panel">{{#colors}}<div id="{{index}}" class="color" style="background:{{color}}"></div>{{/colors}}</div><div class="title">大小：</div>'
						 +'<div class="scroll-bar" id="scroll-bar"></div><input type="text" class="slide_txt" id="slide_txt" readonly="readonly"/>',
			
			// 颜色色面板
			single_color:'{{#colorRows}}<div class="color" id="{{index}}">{{#colorCols}}<div style="background:{{hsl}};width:21px;height:21px;border:1px solid grey;border-bottom:0px;"></div>{{/colorCols}}</div>{{/colorRows}}',
			
			// 透明度
			opacity_custom:'<div class="opacity-custom">'
							+'<div class="header"><div class="title">透明度</div><div class="close"></div></div>'
							+'<div class="bottom"><div class="opacity-bar" id="opacity-bar"></div><input type="text" class="opacity_txt" id="opacity_txt" readonly="readonly"/><span>%</span></div>'
							+'</div>',
			
			// 简介
		    brief:'	<div class="subject-brief"><div class="brief-header"><span class="brief-title">{{cur.name}}</span><span class="brief-url">{{#cur.dataFromUrl}}<a href="{{cur.dataFromUrl}}" target="_blank">链接</a>{{/cur.dataFromUrl}}</span></div><div class="brief-body"><div class="brief-title">描述:</div><div class="brief-content"><p>{{cur.introduce}}</p></div><div class="brief-title">时间:</div><div class="brief-content"><p>{{cur.dataTime}}</p></div><div class="brief-title">数据来源:</div><div class="brief-content">{{&datafrom}}</div></div></div>',
		    
			// 加载动画
			loading_gif:'<div class="loading"><img src="data:image/gif;base64,R0lGODlhKAApAPeLAJq/67vU8Yi056rJ7laU3Xip5Gee4Mzf9a/M7/L3/PT4/ery+4y26L/X8tHi9s/g9c/h9d3p+MXa85i+6qTF7ff6/brT8Z/C7O30+5C56fD1/KDD7G+k4mGb3+Xv+q/N7+jw+nCk4oCv5r/W8n6u5fD2/Ovy++70/O/1/I+46NDh9uTu+l+a33+u5efw+vj6/pK66b3V8qLE7Ozz+4646K3L7unx+/X5/ebv+qHD7IKw5mOc4LHN7+jx+nKm48HY8o636J3B63ys5Z7C7LDN787g9a7M763L7/b5/W6j4r7W8rHO71+Z316Z39vo+JG56d7q+LnT8dPj9tzp+Pb6/fj7/sPZ87fR8KvK7tLi9muh4Yq155O76ZW86t3q+Iez54236PP3/cfb9M3g9VuX3sTa84Gv5p7B68DX8myi4XGl4lyY3m2i4l2Y3n2t5cfc9HSn46bH7cjc9JzA66XG7cHY8+Pt+YSx5mWd4JvA65a86qbG7eHs+eLt+e71/KjI7bzV8mKc38bb9KfH7bLO8Iq16KTG7ZS76oaz55m+6rjS8f///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMmUwZWU5NS1iY2M0LTE1NDEtOGQ1ZS1hMTVlYzM2MjJjZWUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTNDRTA2ODhCMDE1MTFFM0E2QTBCQjA4MzFGNzU1MTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTNDRTA2ODdCMDE1MTFFM0E2QTBCQjA4MzFGNzU1MTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUxYmQ0YWZjLTA4YTYtYTE0MS04ZTI4LWIwYjdlM2I5OGYyYyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxMmUwZWU5NS1iY2M0LTE1NDEtOGQ1ZS1hMTVlYzM2MjJjZWUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOC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"/></div>',
			
			// 双击提示进入下一级
			dbl_tip:'<div class="dlbtips"><div class="tabtop_left">双击行政区可进入下一级</div><div class="tabtop_rt"></div></div>',
			
			// 添加服务对话框
			service_add:'<div class="service_dialog">'
							+'<div class="service_close"></div>'
							+'<div class="service_header">添加服务</div>'
							+'<div class="content">'
							+'	<div class="service_type">'
							+'		<span class="type_span">服务类别:</span>'
							+'		<div class="service">'
							+'			<span class="service_name" name="wms">WMS OGC Web服务</span><span class="down"></span>'
							+'			<ul id="service_type">'
							+'				<li id="wms">WMS OGC Web服务</li>'
							+'				<li id="wmts">WMTS OGC Web服务</li>'
							+'			</ul>'
							+'      </div>'
							+'      <div class="clearfix"></div>'
							+'	</div>'
							+'	<div class="service_url">'
							+'		<span class="url_span">服务地址(url):</span>'
							+'		<input id="service_url" type="text" placeholder="http://gisserver.tianditu.com/TDTService/region/wms" />'
							+'	</div>'
							+'  <div class="validate_info"><span class="alert_icon"></span><span class="alert_text"></span></div>'
							+'  <div class="service_loading"><img src="images/service/loading.gif"><span>正在加载...</span></div>'
							+'	<div class="service_operator">'
							+'		<span id="service_ok">添加</span>'
							+'		<span id="service_cancel">取消</span>'
							+'	</div>'
							+'</div>'
						+'</div>',
			// 提示框			
			alert_popup:'<div id="popup_container">'
							+'<div class="popup_close"></div>'
							+'<div id="popup_title">提示</div>'
							+'<div id="popup_content">'
								+'<div id="popup_message">{{content}}</div>'
								+'<div id="popup_panel"><input type="button" value="确 定" id="popup_ok"></div>'
							+'</div>'
						+'</div>',
						
			// 用户添加的一级目录模板
			user_layers_root:'{{#subjects}}<li class="children children-lv1" id="userlayer_{{code}}">'+
						   '<a class="lv1-title" href="javascript:void(0);">{{name}}<span class="triangle-down"></span></a><ul class="ul-leaf"></ul></li>{{/subjects}}',
			// 用户添加的叶子模板
			user_layers_leaf:'{{#subjects}}<li class="children children-lv2" id="layer_{{code}}">'+
											'<a class="lv2-title" href="javascript:void(0);">'+
					              			'<span class="checkbox"></span>'+
					              			'<span class="lv2-text" title="{{title}}">{{name}}</span>'+
					              			'<span class="help"></span></a>'+
					              			'<div class="lv2-info"></div></li>{{/subjects}}',
			
	}
	
	return template;
});
