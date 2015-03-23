$(function(){
	var parseAppID='aB7GWfo8zqNeE4PIQKAD5vSwo7Z8KjGtX1YQbest',
		 parseJSKey='iJAwC5DN6qFfGzH1KKIhe7axQq6DhlHZnzmvT41N',
		 parseRestAPIKey='tTVOv4tukhPdI6wVQfNp0F0emjwb2k3LGomGYt6a';

	
	function getMessages(){
		$.ajax({
			url:'https://api.parse.com/1/classes/MessageBoard',
			headers:{
				'X-Parse-Application-Id':parseAppID,
				'X-Parse-REST-API-Key':parseRestAPIKey
			},
			contentType:'application/json',
			dataType:'json',
			type:'GET',
			success:function(data){
				console.log('get');
				updateView(data);
			},
			error:function(){
				console.log('error');
			}
		});
	}
	
	function pushMessages(data){
		$.ajax({
			url:'https://api.parse.com/1/classes/MessageBoard',
			headers:{
				'X-Parse-Application-Id':parseAppID,
				'X-Parse-REST-API-Key':parseRestAPIKey
			},
			contentType:'application/json',
			dataType:'json',
			processData:false,
			data:JSON.stringify({
				'username':data.username,
				'message':data.message
			}),
			type:'POST',
			success:function(){
				console.log('sent');
				getMessages();
			},
			error:function(){
				console.log('error');
			}
		});
		
	}
	
	function updateView(data){
		var table=$('.table tbody');
		table.html('');
		
		$.each(data.results,function(index,value){
			var tr=$('<tr><td>'+value.username+'</td><td>'+value.message+'</td></tr>');
			table.append(tr);
		});
		console.log(data);
	}

	
	getMessages();
	

	$('#send').click(function(){
		var data={
			username:$('input[name=username]').attr('value'),
			message:$('input[name=message]').attr('value')
		};
		
		console.log(data.username);
		console.log('!');
		
		pushMessages(data);
	});
	
	
});