$(document).ready(function(){
	var open = 'rocktaves_register';
	$('.register').click(function(){
		$('.backdrop').fadeIn();

		$('#'+$(this).parent().attr('data')+'_register').fadeIn();
		open = $(this).parent().attr('data')+'_register';
	});

	$('.info').click(function(){
		$('.backdrop').fadeIn();
		$('#'+$(this).parent().attr('data')+'_info').fadeIn();
		open = $(this).parent().attr('data')+'_info';

	});

	$('.close').click(function(){
		$('#'+open).fadeOut();
		$('.backdrop').fadeOut();
	});



	$('.submit').click(function(event){
		event.preventDefault();	
		var form_number = $(this).attr('index');
		data_string = $('#form'+form_number).serialize();
		// console.log(data_string)
		// console.log(JSON.parse(data));

		data_JSON = {};
		data_string.split('&').forEach(function(pair){
			var [key,value] = pair.split('=');
			
			// console.log(key);
			// console.log(value);
			data_JSON[key] = value;
		});
		
		// console.log(data_JSON);


		function getCookie(name) {
		       var cookieValue = null;
		       if (document.cookie && document.cookie != '') {
		         var cookies = document.cookie.split(';');
		         for (var i = 0; i < cookies.length; i++) {
		         var cookie = jQuery.trim(cookies[i]);
		         // Does this cookie string begin with the name we want?
		         if (cookie.substring(0, name.length + 1) == (name + '=')) {
		             cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		             break;
		          }
		     }
		   }
		 return cookieValue;
		}

		var csrftoken = getCookie('csrftoken');

		data_JSON.csrfmiddlewaretoken = csrftoken;
		data_JSON.form_id = form_number;


		$.ajax({
			url:window.location.href,
			type: 'POST',
			data: data_JSON,
			success: info_dom,
			error: info_console,
		});

		function info_dom(json){
			var message;
			if(json.status == 1){
      			message = 'Hi '+json['email'] +'!.' + ' You have entered name:'+      json['name'];
   			}
     		 else if(json.status == 2){
     		   message = 'Enter a valid phone number.'
    		}
		      else if(json.status == 3){
		        message = 'Enter a valid email address.'
		    }
		    else{
		      message = 'Email already registered'
		    }
			$('.msg').text(message);
			$('.msg').fadeIn();

		}
	
		function info_console(xhr, error_message , error_code){
			console.log(xhr.status + ' ' + xhr.response);
		};
	});
});