
exports.onInitialClientRender = () => {
	var lastHeaderHeight = 160;
	function updateScroll(e) {
		var logosvg = document.getElementById('logosvg');
		var title = document.getElementById('title');
	  var big; var tt;
	  if (window.innerWidth <= 600) {
	    big = 80; tt = 20;
	    title.style.left = '120px';
	  } else {
	    big = 160; tt = 26.666;
	    title.style.left = '200px';
	  }
	  var h = (big-document.body.scrollTop);
	  h = h<0 ? 0 : h;
	  if (h !== lastHeaderHeight) {
	    var scroll = (h/big);
	    topbar.style.height = (40+h) + 'px';
	    //var c = 64 + (128 * scroll);
	    //topbar.style.background = 'rgb('+c+','+c+','+c+')';
	    //twofront.setAttribute('transform', 'scale('+(0.3+(h/228))+')');
	    logosvg.style.width = 60 + (big-30) * scroll + 'px';
	    logosvg.style.height = 60 + (big-30) * scroll + 'px';
	    lastHeaderHeight = h;
	    title.style.top = (1.5*(-big+tt+h))+'px';
	    menu.style.left = 80 + ((big-40) * scroll) + 'px';
	  }
	}
	window.onscroll = window.onresize = updateScroll;

	var lastAutoScroll = 0;
	function ToTop() {
	  var s = document.body.scrollTop;
	  if (s !== lastAutoScroll) return;
	  s = Math.floor(s/1.1);
	  lastAutoScroll = s;
	  document.body.scrollTop = s;
	  if (s > 0) window.requestAnimationFrame(ToTop);
	}
	logosvg.onclick = function() {
		var logosvg = document.getElementById('logosvg');
	  lastAutoScroll = document.body.scrollTop;
	  window.requestAnimationFrame(ToTop);
	};

	updateScroll();
}
