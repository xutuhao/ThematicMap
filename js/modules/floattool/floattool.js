define('floattool', ['jquery'], function($){
	var complete = true;
	/**
	 * 初始化加载浮动工具栏
	 */
	function loadFloatTool(){
		
        //时间轴点击事件
        $('.floattool .layer_nav').on('click', function() {
        	$('.layer_nav .layer-pop').toggle();
        }).on('mouseover', function(){
        	var left = $('.floattool').offset().left-57;
    		var top = $('.floattool').offset().top;
        	$('.float-tool-title').css({left:left, top:top+6}).find('.title').html('底图');
        	$('.float-tool-title div').last().removeClass('up-arrow').addClass('right-arrow');
        	$('.float-tool-title').show();
        });
        
		// 统计表点击事件
		$('.floattool .table_nav').on('click', function(){
			if($('.main_table').css('display') == 'block'){
				animate('.floattool .table_nav', '.main_table', -$(this).height()/2, $(this).width()/2);
			} else {
				nodataTips('当前专题没有查到统计数据');
			}
		}).on('mouseover', function(){
			var left = $('.floattool').offset().left-57;
			var top = $('.floattool').offset().top;
        	$('.float-tool-title').css({left:left, top:top+45}).find('.title').html('统计表');
        	$('.float-tool-title div').last().removeClass('up-arrow').addClass('right-arrow');
        	$('.float-tool-title').show();
		});
		
		// 统计图点击事件
		$('.floattool .graphic_nav').on('click', function(){
			if($('.main_graphic').css('display') == 'block'){
				animate('.floattool .graphic_nav', '.main_graphic', $(this).height()/2, $(this).width()/2);
			} else {
            	nodataTips('当前专题没有查到统计图数据');
            }
		}).on('mouseover', function(){
			var left = $('.floattool').offset().left-57;
			var top = $('.floattool').offset().top;
        	$('.float-tool-title').css({left:left, top:top+85}).find('.title').html('统计图');
        	$('.float-tool-title div').last().removeClass('up-arrow').addClass('right-arrow');
        	$('.float-tool-title').show();
		});

        //时间轴点击事件
        $('.floattool .time_nav').on('click', function() {
            if($('.time-axis').css('display') == 'block'){
                animate('.floattool .time_nav', '.time-axis', 3*$(this).height()/2, $(this).width()/2);
            } else {
            	nodataTips('当前专题没有查到时间数据');
            }
        }).on('mouseover', function(){
        	var left = $('.floattool').offset().left-57;
    		var top = $('.floattool').offset().top;
        	$('.float-tool-title').css({left:left, top:top+126}).find('.title').html('时间轴');
        	$('.float-tool-title div').last().removeClass('up-arrow').addClass('right-arrow');
        	$('.float-tool-title').show();
        });
        
        $('.floattool>div').on('mouseout', function(){
        	$('.float-tool-title').hide();
        });
	}
	
	/**
	 * 没有统计数据，统计图，时间轴的提示
	 */
	function nodataTips(content){
		$('.noDataTips').remove();
		$('.dlbtips').remove();
		if($('li.ischecked').length == 0){
			content = '请选择专题数据';
		}
		var tpl = '<div class="noDataTips"><div class="tabtop_left">'+content+'</div><div class="tabtop_rt"></div></div>';
		$('#app').append(tpl);
		$('.noDataTips .tabtop_rt').on('click', function(){
			$('.noDataTips').remove();
		});
	}
	
	/**
	 * 统计表统计图的缩放动画
	 */
	function animate(targetSelector, sourceSelector, offsetHeight, offsetWidth){
		if(!complete){
			return;
		} else {
			complete = false;
		}
		var srcSelector = $(sourceSelector);
		var w = srcSelector.width();
		var h = srcSelector.height();
		var left = srcSelector.css('left');
		var top = srcSelector.css('top');
		var cssStyle;
		var cssLeft = (document.body.clientWidth||document.body.clientWidth)-parseInt($('.floattool').css('right'))-offsetWidth;
		var cssTop = parseInt($('.floattool').css('top'))+offsetHeight;
		if(w==0){
			cssStyle = $(targetSelector)[0].state; //保留收缩之前的状态
			if($(window).height() > 900){
				cssStyle.height=380;
			} else {
				cssStyle.height=250;
			}
            //时间轴高度
            if(sourceSelector == '.time-axis') {
                cssStyle.height='67';
            }

		} else {
			$(targetSelector)[0].state={width:w, height:h, left:left, top:top};
			cssStyle = {width: 0, height: 0, overflow: 'hidden'};
			cssStyle.left = cssLeft;
			cssStyle.top = cssTop;
		}
		srcSelector.animate(cssStyle, 500, function(){
			// 统计图表放大后，需要重新绘制统计图
			if(sourceSelector=='.main_graphic' && $('.main_graphic').width() != 0){
				$('.main_graphic .active').trigger('click');
				$('span[id*=_graphic').show();
                $(this).css({overflow:''})
			}
			if(sourceSelector=='.main_graphic' && $('.main_graphic').width() == 0){
				$('#static_chart').html('');
				$('span[id*=_graphic').hide();
                $(this).css({overflow:'hidden'})
			}
			complete = true;
		});
	}
	
	return {
		loadFloatTool:loadFloatTool
	}
});