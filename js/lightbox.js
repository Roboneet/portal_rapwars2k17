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

	$('.submit').click(function(event){
		event.preventDefault();	
		var form_number = $(this).attr('index');
		data_string = $('#form'+form_number).serialize();
		// console.log(data)
		// console.log(JSON.parse(data));

		data_JSON = {};
		data_string.split('&').forEach(function(pair){
			var [key,value] = pair.split('=');
			
			// console.log(key);
			// console.log(value);
			data_JSON[key] = value;
		});
		
		console.log(data_JSON);

		$.ajax({
			url:'/',
			type: 'POST',
			data: data_JSON,
			success: info_dom,
			error: info_console,
		});

		function info_dom(json){
			$('.msg').text('form submitted');
			$('.msg').fadeIn();

		}
	
		function info_console(xhr, error_message , error_code){
			console.log(error_code + ' ' + error_message);
		};
	});
});