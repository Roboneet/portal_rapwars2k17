$(document).ready(function(){
	$('img').on('mouseover',function(){
		

		$('.shade').next().addClass('hidden');
		$('.shade').next().removeClass('overlay');
		$('.shade').removeClass('shade');
		$(this).addClass('shade');
		$(this).next().removeClass('hidden');
		$(this).next().addClass('overlay');
		
		
	});
	// $('img').on('mouseout',function(){
	// 	$(this).stop(true).removeClass('shade');
	// 	$(this).next().stop(true).addClass('hidden');
	// 	$(this).next().stop(true).removeClass('overlay');
		
	// });
})