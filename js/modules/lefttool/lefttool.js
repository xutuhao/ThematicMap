define('lefttool', ['jquery'], function($){

	/**
	 * 首屏页面的事件注册
	 */
	function initEvent(){
		// 点击左侧面板
		$('.left-tool').on('click', clickPlatform);
		$('.classify-list').on('click', classifyList);
		// 菜单按钮悬浮效果
		$('#menu_display').on('mouseover', function(){
			$('.float-tool-title').css({left:225, top:65}).find('.title').html('菜单');
			$('.float-tool-title div').last().removeClass('right-arrow').addClass('up-arrow');
			$('.float-tool-title').show();
		}).on('mouseout', function(){
			$('.float-tool-title').hide();
		});
        // 点击添加服务按钮
    	$('.add_service').click(function(evt){
    		require(['userservice'], function(US){
    			US.serviceDialog();
    		});
    	});
    	// 鼠标经过和滑出效果
    	$('.add_service').mouseover(function(){
    		$('.add_service .add_icon').css('background-position','-82px -5px');
    	}).mouseout(function(){
    		$('.add_service .add_icon').css('background-position','-100px -5px');
    	});
	}
	
	/**
	 * 点击事件的派发平台，依靠该方法对点击事件进行派发
	 */ 
	function clickPlatform(evt){
		var $target = evt.target;
		var menu = document.getElementById('menu_display');
		var classifies = $('.classify-list');
		var downUpBtn = $('.down-up').get(0);
		if($target == menu){
			// 点击的是菜单按钮,展开树形菜单
			expandTree();
		}else if (downUpBtn == $target || $.contains(downUpBtn, $target)) {
			// 点击的是向上收缩按钮，收缩左侧面板树
			slideUp();
		}
	}
	
	/**
	 * 展开树形菜单
	 */
	function expandTree(){
		// 判断专题树是否存在，不存在则创建专题树
		if($('li[id^=subject_]').length==0){
			require(['tree', 'userservice'],function(T, U){
				$('.classify-content').show();
				// 加载专题树模块
				T.loadTreeModule();
				// 加载用户添加图层
				U.loadUserLayers();
			});
		}
		slideUp();
	}
	
	/**
	 * 显示相应的导航内容
	 */
	function classifyList(){
		var $target=$(this);
		$target.siblings().removeClass('active').children('div[class*="Nav"]').removeClass('active');// 同辈元素取消选中效果,同辈元素的孩子也要取消选中效果
		$target.addClass('active').children('div[class*="Nav"]').addClass('active');// 当前元素添加选中效果,当前元素的孩子也要添加选中效果
		if($target.hasClass('special')){
			$('.classify-content').show();		 // 显示专题树面板
            $('.search-content').hide();
		} else if($target.hasClass('place')){
			$('.classify-content').hide();       // 隐藏专题树面板
            $('.search-content').show();
            //判断是否已经加载search模块
            if(!$('.search-content').hasClass('searched')) {
                require(['search'], function() {
                    $('.search-content').addClass('searched');
                });
            }
		}
	}
	
	/**
	 * 收缩左侧面板
	 */
	function slideUp(){
		$('#app .layer-custom').remove();
		$('.left-down').slideToggle();
	}
	
	return {
		initEvent:initEvent
	};
});