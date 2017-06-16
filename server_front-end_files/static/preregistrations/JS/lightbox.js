$(document).ready(function(){
	var open = 'rocktaves';
	$('.register-button').click(function(){
		
		$('#'+open).fadeOut();

		var event = $(this).attr('data')
		var k = setTimeout(function(){
			// console.log($('#'+event+'_register'));
			$('.backdrop').fadeIn();
			$('#'+event+'_register').fadeIn();},500);

		open = $(this).attr('data')+'_register';
	});

	$('.info').click(function(){
		$('#'+open).fadeOut();
		$('.backdrop').fadeIn();

		$('#'+$(this).parent().attr('data')+'_info').fadeIn();
		open = $(this).parent().attr('data')+'_info';

	});

	$('.close').click(function(){
		$('#'+open).fadeOut();
		$('.backdrop').fadeOut();
	});

	// $('.backdrop').click(function(){
	// 		$('.backdrop').fadeOut();
	// 		$('#'+open).fadeOut();
	// })

	$(document).on('click', function(event) {
    	if ($(event.target).has('#'+open).length) {
        	$('.backdrop').fadeOut();
        	$('#'+open).fadeOut();
    	}
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
      			message = 'Hi '+json['name'] +'!.' + ' You have entered email: '+ json['email'];
   			}
     		else if(json.status == 2){
     		   message = 'Enter a valid phone number.'
    		}
		    else if(json.status == 3){
		        message = 'Enter a valid email address.'
		    }
		    else if(json.status == 5){
		    	location.href = json.url;
		    	message = "Succesfully submitted"
		    }
		    else if(json.status == 	0){
		      message = 'Email already registered'
		    }
		    // console.log(json.status)
		    // console.log(message)
			$('.msg').text(message);
			$('.msg').fadeIn();
			var k = setTimeout(function(){
				$('.msg').fadeOut()
			},1500)

		}
	
		function info_console(xhr, error_message , error_code){
			console.log(xhr.status + ' ' + xhr.response);
		};
	});

	$(".youtube").click(function(){
			$(".backdrop").fadeIn(1000);
			$('.youtube-video-container').css({'display':'flex'});
			var width = 560;
			var height = 315;
			if($(window).width() < 768 ){
				width = 300;
				height = 200;
			}
			$(".player").html('<iframe width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/rh7WkyNXNRE" frameborder="0" allowfullscreen></iframe>');
			open="youtube"
	});

	$('.youtube-video-container').click(()=>{
		$(".player iframe").remove();
		$('.backdrop').fadeOut();
	})
	

	// console.log($('#main-container').height())
	// console.log($('body').height())

	window.onscroll= function(){
		// console.log(window.pageYOffset);
		var top = window.pageYOffset;
		$('.background-overlay').css({'top':top})
	};
});