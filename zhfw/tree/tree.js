define('tree', ['jquery', 'template', 'mustache', 'scrollbar', 'mousewheel'], function($, T, M){
	var Tree = {
			/** 
			 * 专题树数据 
			 */
			data:[],
			
			/**
			 * 加载专题树的模块
			 */
			loadTreeModule: function(){
				// 获取数据，渲染并注册相关事件
				Tree.getTreeModel(Tree.templateRender, Tree.exceptionFunc);
			},
			
			/**
			 * 获取树所需要的数据模型，也就是模型
			 * @param successFunc 获取树数据成功的方法
			 * @param failureFunc 获取树数据失败的方法
			 */
			getTreeModel: function(successFunc, failureFunc){
				// 获取专题树信息并进行展示
				$.ajax({ 
					url: "./zhfw/tree",
			        type: "post", 
			        dataType: "json",
			        beforeSend:function(){
			        	// 动态添加加载图片
						$('#subjectTree .loading').show();
			        },
			        success: successFunc, 
			        error: failureFunc 
				});
			},
			
			/**
			 * 获取专题树成功之后开始进行模板渲染
			 * @param data  专题树信息
			 */
			templateRender:function(data){
				// 数据缓存下来
				Tree.data = data;
				var subjectTree = $('#subjectTree');
				// 获取数据成功，则移除加载动画
				subjectTree.find('.loading').hide();
				// 模板渲染并且追加到DOM中
	        	Tree.render('tree_level_root', 0, $('.classify-children'));
	        	// 为渲染后的专题树添加美化的滚动条
	        	subjectTree.perfectScrollbar();
	        	
	        	//模板渲染完开始事件注册
	        	//事件注册：点击树事件的委托代理
	        	subjectTree.delegate('.children-lv1','click', Tree.treeLevel1Click);
	        	//事件注册： 注册【清除所有】事件
				$('.clear-all').off('click').on('click',function(){
					$('.layer-custom').remove(); 
					$('.ischecked').find('.checkbox').trigger('click');
					require(['map'], function(M){
						var map = M.getMap();
						map.setView([36.00, 105.00], 4);
					});
				});
			},
			
			/**
			 * 点击树的第一级别
			 */
			treeLevel1Click:function(){
				// 用户添加节点
				if($(this).attr('id') == 'userlayer_000000'){
					// 适应高度，防止底部出现大量空白
	    			Tree.ajustToHeight(); 
					return;
				}
				// 1、上下的箭头来回切换旋转效果
				var down = $(this).find('.triangle-down');
                var $this = $(this);
				if(down.css('transform')=='none'){
					down.css('transform', 'rotate(180deg)');
                    $this.addClass('active');  //wxp
				}else{
					down.css('transform', '');
                    if($this.find('.ischecked').length==0) {  //wxp
                        $this.removeClass('active');
                    }
				}
	    		// 2、判断是否叶子节点已经加载过，避免重复加载
	    		var leafs = $(this).find('ul');
	    		if(leafs.length > 0){
	    			leafs.toggle();
	    			// 适应高度，防止底部出现大量空白
	    			Tree.ajustToHeight(); 
	    			return;
	    		}
	    		// 3、模板渲染并且追加到DOM中
	    		Tree.render('tree_level_leaf', this.id.substr(8), $(this));
	    		// 适应高度，防止底部出现大量空白
	    		Tree.ajustToHeight();
	    		$(this).find('.children-lv2').each(function(i, item){
	    			var text = $(item).find('.lv2-text').text();
	    			if(text.length>9){
	    				$(item).attr('title', text);
	    				text = text.substr(0, 9)+"...";
	    				$(item).find('.lv2-text').text(text);
	    			}
	    		});
	    		//模板渲染完开始事件注册
	        	//事件注册：点击树事件的委托代理，//事件注册：悬浮树事件
	        	$(this).find('.children-lv2').on('click', Tree.treeLevel2Click)
	        								 .on('mouseover', Tree.treeLevel2Over)
	        								 .on('mouseout', Tree.treeLevel2Out);
			},
			
			/**
			 * 点击树的第二级别
			 */
			treeLevel2Click:function(event){
	    		var $target = $(event.target);
	    		// 如果点击的是CHECKBOX框
	    		if($target.is(".checkbox")){
	    			Tree.checkBoxHander($(this));
	    		} else if ($target.is(".lv2-text")){
	    			// 点击的是专题编辑按钮
	    			Tree.nameHander($(this));
	    		} else if ($target.is(".help")) {
	    			// 点击的是专题编辑按钮
	    			Tree.helpHander($(this));
	    		}
	    		
	    		// 一级标题添加选中效果和取消选中效果
	    		var checked = $(this).parent().find('.ischecked');
	    		var level1=$(this).parents('.children-lv1');
	    		event.stopPropagation();
	    		// 阻止冒泡事件发生
	    		return false;
			},
			/**
			 * 悬浮树的第二级节点上,显示专题简介信息
			 */
			treeLevel2Over:function(){
                $('#app').attr('class','hover_'+$(this).parents('.children').attr('id'));
				Tree.mout = false;
				// 当前点击专题的code
    			var code=$(this).attr('id').split('_')[1];
    			// 当前点击专题的code所对应的数据
    			var currentData = Tree.getCurrentNode(code);
    			var targetDom = $(this).get(0);
    			require(['util'], function(Util){
    				$('.subject-brief').remove();
    				var position = Util.getElementDistance(targetDom, {x:241});
    				var datafrom = '';
    				if(currentData.dataFrom){
    					var datafroms = currentData.dataFrom.split('|');
        				for(var i in datafroms){
        					datafrom = datafrom + '<p>'+datafroms[i]+'</p>';
        				}
    				}else{
    					datafrom = '暂无';
    				}
    				if(!currentData.dataTime){
    					currentData.dataTime = '暂无';
    				}
    				if(!currentData.introduce){
    					currentData.introduce = '暂无';
    				}
    				// 气象云图
    				if(code == '116'){
    					currentData.dataTime = window.cloudsTime?window.cloudsTime:'暂无';
    				}
    				var tpl = T['brief'];
    				var html = M.render(tpl, {cur:currentData, datafrom:datafrom});	// 数据渲染到模板上
                    $('#app').append(html);				// 模板追加到DOM树中
    				// 防止简介对话框被下方遮盖住
    				if($('.subject-brief').height()+position.top > $(window).height()-30){
    					position.top = position.top - $('.subject-brief').height();
    				}
    				$('.subject-brief').css({left:position.left, top:position.top})
    								   .on('mouseover', function(){
    									   Tree.mout = false;
    								   }).on('mouseout', function(evt){
    									   Tree.mout = true;
    									   setTimeout(function(){
    											if(!$.contains(this, evt.toElement) && Tree.mout){
    												$('.subject-brief').remove();
    											} 
    									   }, 300);
    								   });
    			});
			},
			/**
			 * 离开树的第二级节点上
			 */
			treeLevel2Out:function(evt){
				Tree.mout = true;
				setTimeout(function(){
					if(!$.contains(this, evt.toElement) && Tree.mout){
						$('.subject-brief').remove();
					} 
				}, 500);
			},
			
			/**
			 * 点击checkBox事件处理
			 * @param current 当前点击的checkBox对象
			 */
			checkBoxHander: function(current){
				current.toggleClass("ischecked"); // class类名进行切换
    			Tree.ajustToHeight(); 			  // 适应高度，防止底部出现大量空白
    			// 当前点击专题的code
    			var code=current.attr('id').split('_')[1];
    			Tree.checkReorder(code, current);
			},
			/**
			 * 点击专题名称
			 * @param current 当前点击的DOM对象
			 */
			nameHander:function(current){
				// 当前点击专题的code
    			var code=current.attr('id').split('_')[1];
    			var selectBox = $('.select_subject select.SlectBox')
    			if(selectBox.length>0){
    				var index = selectBox.find('option[value="'+code+'"]').index();
        			if(index > -1){
        				selectBox[0].sumo.selectItem(index);
        			}
    			}
			},
			/**
			 * 专题节点的编辑按钮点击事件
			 * @param current 当前点击的DOM对象
			 */
			helpHander:function(current){
				// 当前点击专题的code
    			var code=current.attr('id').split('_')[1];
    			// 当前点击专题的code所对应的数据
    			var curData = this.getCurrentNode(code);
    			require(['styleedit'], function(SE){
    				// 如果当前样式导航已打开，需要关闭；如果关闭，需要打开
    				SE.loadNavigator(curData, current, Tree.checkReorder);
				});
			},
			
			/**
			 * 左侧树的节点顺序发生变化时需要调用该方法
			 */
			checkReorder:function(code, current){
				// 当前点击专题的code所对应的数据
				var curData = Tree.getCurrentNode(code);
    			var layerType = curData.layerType;
    			// 根据layerType类型，加载相应的模块，['1','2','3','4']：统计数据，8：POI点，9：绘制线]
    			var staticTypes = ['1','2','3','4'];
    			var poiTypes = ['8', '9'];
    			var tileTypes = ['6'];
    			var districtTypes = ['10'];
				var weatherTypes = ['5'];
				var envTypes = ['11'];
    			if(current.hasClass("ischecked")){
    				$('.noDataTips').remove();
    			}
                // 是统计数据
    			if(staticTypes.indexOf(layerType) > -1){
    				var checkedNodes = Tree.getCheckedNodes(Tree.data, staticTypes);
    				var districtCheckedNodes = Tree.getCheckedNodes(Tree.data, districtTypes);
    				require(['staticdata'], function(SD){
    					// 判断是选中还是取消
    	    			if(current.hasClass("ischecked")){
    	    				curData.year = null;
    	    				// 统计数据可视化
    	    				SD.loadStaticLayers(curData, checkedNodes);
    	    			} else {
    	    				//清空与该专题有关的任何效果,可以调用模块各自的clear方法
    	    				SD.clearAll(curData, checkedNodes, districtCheckedNodes);
    	    			}
    				});
    			// 是POI数据
    			} else if (poiTypes.indexOf(layerType) > -1) {
    				require(['points'], function(P) {
    					if(current.hasClass("ischecked")){
                            P.getPoints(curData.code, curData.subjectType);
    	    			} else {
    	    				//清空与该专题有关的任何效果,可以调用模块的clearPoints方法
                            P.clearPointsGroup(curData.code, curData.subjectType);
    	    			}
    				})
    			// 全球地表覆盖数据
    			} else if(tileTypes.indexOf(layerType) > -1){
    				var checkedNodes = Tree.getCheckedNodes(Tree.data, tileTypes);
    				require(['cover'], function(C) {
    					if(current.hasClass("ischecked")){
                            C.loadEarthCover(curData, checkedNodes);
    	    			} else {
    	    				//清空与该专题有关的任何效果
    	    				C.clearEarthCover(curData, checkedNodes);
    	    			}
    				})
    			// 行政区划数据
    			} else if (districtTypes.indexOf(layerType) > -1) {
    				var checkedNodes = Tree.getCheckedNodes(Tree.data, districtTypes);
    				var staticCheckedNodes = Tree.getCheckedNodes(Tree.data, staticTypes);
    				require(['district'], function(D) {
    					if(current.hasClass("ischecked")){
    						// 加载行政区划信息
                            D.loadDistrictInfo(curData, checkedNodes);
    	    			} else {
    	    				// 清空与该专题有关的任何效果
    	    				D.clearDistrictInfo(curData, checkedNodes, staticCheckedNodes);
    	    			}
    				})
    			} else if(weatherTypes.indexOf(layerType) > -1) {
    				require(['weather'], function(W) {
    					if(current.hasClass("ischecked")){
    						// 加载天气信息
							W.loadWeatherInfo(curData);
    	    			} else {
    	    				// 清空与该专题有关的任何效果
    	    				W.clearWeatherInfo(curData);
    	    			}
					})
				// 环境数据
    			} else if(envTypes.indexOf(layerType) > -1) {
					require(['environment'], function(E) {
						if(current.hasClass("ischecked")){
							// 加载环境信息
							E.getPoints(curData.code, curData.name,"once");
						} else {
							// 清除与该专题有关的任何效果
							E.clearPointsGroup(curData.code, curData.name);
						}
					})
				}
			},
			
			/**
			 * 获取选中的树节点
			 * @param treeData 树的所有数据
			 * @param types    专题数据类型集
			 */
			getCheckedNodes:function(treeData, types){
				var checkedDatas = [];
				// 所有选中的节点
				var nodeChecks = $('.ul-leaf .ischecked');
				// 遍历寻找选中的统计数据的节点
				$.each(nodeChecks, function(j, nc){
					var ncCode = $(nc).attr('id').split('_')[1];
					// 遍历寻找与该专题相关的专题数据
					$.each(treeData, function(i, item){
						// 是统计数据
						if(types.indexOf(item.layerType) > -1){
							if(item.code == ncCode){
								checkedDatas.push(item);
								return false;
							}
						}
					});
				});
				return checkedDatas;
			},
			
			/**
			 * 根据当前code获取当前所选择的节点
			 */
			getCurrentNode:function(code){
				var curData;
				$.each(Tree.data, function(i, item){
    				// 当前选的点
    				if(item.code == code){
    					// 深拷贝
    					curData =  $.extend(true, {}, item);
    					return false;
    				}
    			});
				return curData;
			},
			/**
			 * 将模板在DOM上进行渲染
			 * @param key 	模板的key值
			 * @param code  模板的所需的数据
			 * @param jq	JQUERY对象，模板需要追加到其最后面
			 * @date  2016-03-01 
			 * @author 王龙飞
			 * @return 
			 */
			render:function(key, code, jq){
				// 筛选出code下面的所有子code的数据
				var data = [];
				$.each(Tree.data, function(i, item){
					if(item.parentCode==code){
						data.push(item);
	        		}
				});
				if(data.length == 0){
					return;
				}
				// 所有子code数据进行排序
				data.sort(function(a, b){
					if(parseInt(a.orders) > parseInt(b.orders)){
						return 1;
					} else {
						return -1;
					}
				});
				// 数据渲染
				var tpl = T[key];							// 加载一级树模板
				M.parse(tpl);    							// 预编译进行缓存，提高将来的渲染速度
				var rendered = M.render(tpl, {subjects:data});	// 数据渲染到模板上
                jq.append(rendered);						// 模板追加到DOM树中
			},
			
			/**
			 * 树要适应高度，防止底部出现大量空白
			 */
			ajustToHeight:function(){
				var subjectTree = $('#subjectTree');
				var outerHeight=subjectTree.find('.classify-children').outerHeight();
    			var scrollTop=subjectTree.prop('scrollTop');
    			var os = outerHeight-scrollTop;
    			var blank = subjectTree.innerHeight()-os;
    			if(blank>0){
    				subjectTree.scrollTop(scrollTop - blank);
    			}
    			subjectTree.perfectScrollbar('update'); // 更新滚动条
			},
			
			/**
			 * TODO：模块发生异常的处理函数，太low了，需要进一步改造
			 */
			exceptionFunc: function(){
				throw "专题模块发生异常";
			}
	}
	return {
		// 加载树模块
		loadTreeModule:Tree.loadTreeModule
	};
});