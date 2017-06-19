$(document).ready(function(){
	$('img').on('mouseover',function(){
		
		$('.overlay').fadeOut()

		$('.shade').next().addClass('hidden');
		$('.shade').next().removeClass('overlay');
		$('.shade').removeClass('shade');
		$(this).addClass('shade');
		$(this).next().removeClass('hidden');
		$(this).next().addClass('overlay');
		$('.overlay').fadeIn()
				
		
	});




})