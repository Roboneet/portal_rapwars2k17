$(document).ready(function(){
	var images = $('.image')
	var n = images.length;
	var i = 0;
	var k = setInterval(function(){
		$(images[i]).removeClass('animated fadeInLeft');
		var j = i;
		var l = setTimeout(function(){ $(images[j]).addClass('animated fadeOutRight');},1000)
		if(i==(n-1)){
			i = 0;
		}else{
			i++;
		}
		$(images[i]).removeClass('animated fadeOutRight');
		$(images[i]).addClass('animated fadeInLeft');
	},5000)
}); 