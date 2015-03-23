var app=null,
	 appleData=[
		{
			name:'fuji',
			url:'img/fuji.jpg'
		},
		{
			name:'gala',
			url:'img/gala.jpg'
		}
	];

var router=Backbone.Router.extend({
	routes:{
		'':'home',
		'apples/:appleName':'loadApple'
	},
	initialize:function(){
		var apples=new Apples();
		apples.reset(appleData);
		this.homeView=new homeView({collection:apples});
		this.appleView=new appleView({collection:apples});
	},
	home:function(){
		this.homeView.render();
	},
	loadApple:function(appleName){
		this.appleView.loadApple(appleName);
	}
});

var homeView=Backbone.View.extend({
	el:'body',
	template:_.template('Apple data:<%=data%>.'),
	render:function(){
		this.$el.html(this.template({
			data:JSON.stringify(this.collection.models)
		}));
	}
});

var Apples=Backbone.Collection.extend({
	
});

var appleView=Backbone.View.extend({
	initialize:function(){
		
	},
	template:_.template(
		'<figure>'+
		'	<img src="<%=attributes.url%>"/>'+
		'	<figcaption><%=attributes.name%><figcaption>'+
		'</figure>'
	),
	render:function(appleName){
		var appleModel=this.collection.where({name:appleName})[0],
			 appleHtml=this.template(appleModel);
		$('body').html(appleHtml);
	}
});


$(function(){
	app=new router;
	Backbone.history.start();
});


