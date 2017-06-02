$(document).ready(function(){
	var open = 'rocktaves';
	$('.register').click(function(){
		$('.backdrop').fadeIn();

		$('#'+$(this).attr('data')).fadeIn();
		open = $(this).attr('data');
	});

	$('.close').click(function(){
		$('#'+open).fadeOut();
		$('.backdrop').fadeOut();
	});
});