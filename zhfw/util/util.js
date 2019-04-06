define('util',['jquery'], function($){
	
	
	/**
	 * 计算元素到页面左侧和上侧的距离
	 * @param e 		目标DOM对象
	 * @param offset    偏移目标DOM对象的位置
	 */
	function getElementDistance(e, offset){
		 var x = e.offsetLeft;
		 var y = e.offsetTop;
		 var scrollTop = e.scrollTop;
		 while(e = e.offsetParent){
			x += e.offsetLeft;
			y += e.offsetTop;
			scrollTop += e.scrollTop;
		 }
		 return {"left": x+(offset?(offset.x?offset.x:0):0), "top": y-scrollTop+(offset?(offset.y?offset.y:0):0)};
	}
	
	/**
	 * 浏览器检测事件
	 */
	function fBrowser(){
		var ua = window.navigator.userAgent.toLowerCase();
		var b = {
			msie: /msie/.test(ua) && !/opera/.test(ua),
			opera: /opera/.test(ua),
			safari: /webkit/.test(ua) && !/chrome/.test(ua),
			firefox: /firefox/.test(ua),
			chrome: /chrome/.test(ua)
		};
		var vMark = "";
		for (var i in b) {
			if (b[i]) { vMark = "safari" == i ? "version" : i; break; }
		}
		b.version = vMark && RegExp("(?:" + vMark + ")[\\/: ]([\\d.]+)").test(ua) ? RegExp.$1 : "0";
		
		b.ie = b.msie;
		b.ie6 = b.msie && parseInt(b.version, 10) == 6;
		b.ie7 = b.msie && parseInt(b.version, 10) == 7;
		b.ie8 = b.msie && parseInt(b.version, 10) == 8;
		var iev = document.documentMode ; 
		if(iev){
			b.ie9  = (iev == 9);
			b.ie10 = (iev >= 10);	
		} 
		
		return b;
	}
	
	return {
		getElementDistance:getElementDistance,
		fBrowser:fBrowser
	}
});