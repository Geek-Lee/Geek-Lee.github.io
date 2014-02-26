---
layout: post
title: Backbone.Js 入门篇
category: javascript
excerpt: '这是 Backbone.Js 入门的学习笔记，大概看了一下觉得这个库挺好用的。'
---

【Backbone.Js 入门篇】

##摘要

>这是 Backbone.Js 入门的学习笔记，大概看了一下觉得这个库挺好用的。

##目录

- 前言
- 直接创建对象(new)
- 给构造函数添加实例方法和静态方法(extend)
- 继承操作(extend)
- 自定义事件(.on/.listenTo)
- 数据域服务器(sync,url,save(),fetch())
- 路由与历史管理
- 事件委托
- 前端模板
- 其他
- ToDo例子

##前言

>BackBone 类库是用于实现前端 MVC（Model 模型、View 视图、Controller 控制器）的一个库，我们常说的 MVC 大多是整个 Web 开发过程的 MVC，而前端实现 MVC 还是比较困难的，所以他的出现很多程度就解决了这个问题。先看张图感受下BackBone是如何实现前端 MVC 的


![MCV]("data:image/png;base64,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")

上图是BackBone各模块之间的协作图，前端 MVC 也是这样实现的

- Model 数据模型；
- Collection 模型集合器，是 Model 模块的集合；
- View 是视图可以看成是 HTML 模板，前端实现 MVC 分离比较困难，所以视图包含了控制器；
- Event 事件驱动方法，javascript 出色的事件机制，属于控制器；
- Router 对页面跳转进行管理，主要负责数据与视图，Hash值得管理吧弥补了JQ的不足
- History 是页面跳转历史的管理，取决于Router；
- Sync 默认 ajax 实现与服务器同步，从服务器获取数据
- C 模块前端分离比较困难所以其中各模块都包含部分控制器 Controller;

##直接创建对象

>BackBone 用到的是OOP思想，他的运用依赖于实例化对象和类的继承。

	//通过 new 来实例化构造函数，之后可以使用他的方法
    var model = new Backbone.Model();       // 创建数据对象
	var models = new Backbone.Collection(); // 创建集合对象
	var view = new Backbone.View();         // 创建视图对象

	model.set('name','Hello');              // 调用 set 方法
	alert( model.get('name') );             // 调用 get 方法

	// collection 集合的使用
	var model_1 = new Backbone.Model({'name':'model_1'});
	var model_2 = new Backbone.Model({'name':'model_2'});
	// 调用 add 方法向 models 添加内容
	models.add(model_1);
	models.add(model_2);
	alert( JSON.stringify(models) );


##给构造函数添加实例方法和静态方法

>实例方法：需要实例化构造函数才可以使用的方法，this指向构造函数；

>静态方法：不用实例化构造函数，加上构造函数命名空间便可以使用；

	// 通过 extend 扩展方法
	var M = Backbone.Model.extend({
		md_1: function() {
			alert('Prototype');   // 实例方法
		}
	},{
		md_2: function() {
			alert('Static');   // 静态方法
		}
	});

	var md = new M;
	md.md_1();  //  需要实例化才可以调用 md_1 方法
	M.md_2();  // 可以直接调用的静态方法

##继承操作

>继承大家都不陌生吧，这里就直接看下如何实现的就好吧

	// extend 方法不止可以用来扩展方法
	// 还可以用来实现继承操作
	// extend 接收对象下若有 defaults 属性则为扩展类添加默认数据模型
	// 有 initialize 则初始化构造函数
	var M = Backbone.Model.extend({ // 实例方法有效
		defaults: {  // 默认值设置
			'name':'hello'
		},
		initialize: function() { // 初始化构造函数
			this.on('change', function() {
				alert('Text change!');
			});
		}
	});
	var mod = new M;
	alert( mod.get('name') );  // 测试默认值
	mod.set({'name':'hi'});  // 测试 initialize
	

	// 继承操作,继承操作主要用于实例方法，同时也继承了Model本身的方法
	var FatherM = Backbone.Model.extend({
		defaults:{
			'name':'hello'
		},
		md: function() {
			alert( "Father Class's "+this.get('name') );
		}
	}，{
		md_static:function() {
			alert('Static Method');
		}
	});

	var ChildM = FatherM.extend();  // 继承操作
	ChildM.md_static();  // 静态方法可以继承
	model = new ChildM;  // 实例化子类
	model.md();  // 子类继承的方法

##自定义事件

>自定义事件可以理解为事件绑定

	// 使用 .on() 绑定 change 事件
	var M = Backbone.Model.extend({
		defaults: {
			'name': 'Hello'
		},
		initialize: function() {  // 初始化构造函数
			this.on('change', function(){ // change 事件是当数据内容改变就会触发的事件
				alert('Text Changed'); 
			});
		}
	});
	var model = new M;
	model.set({'name':'Hi'});

	// change 事件可以指定修改特定属性发生事件
	var M = Backbone.Model.extend({
		defaults: {
			'name':'Hello',
			'age': 23
		},
		initialize: function() {
			this.listenTo('change:name',function(){
				alert('Text Changed');
			});
		}
	});
	var model = new M;
	model.set({'name':'hi'});  // 触发 change 事件
	model.set({'age': 24});	 // 不触发 change 事件

	// 使用 .listenTo() 绑定事件
	// 数据模型 与 视图绑定
	$(function() {
		var M = Backbone.Model.extend({
			defaults: {
				'name':'Hello'
			}
		});
		var V = Backbone.View.extend({
			initialize: function() {
				// listenTo 可以指定监听对象，这里将监听对象改为了 model
				this.listenTo(this.model,'change',this.show);
			},
			show: function(model) {
				$('body').append('<div>'+model.get('name')+'</div>');
			}
		});
		var m = new M;
		var v = new V({model:m});
		m.set({'name':'hi'});
	});

##数据与服务器

>数据模型和后台服务器的交互，主要方法有 sync，fetch

sync 对应的 method 有 `create、read、update、delete` 有如下一个对应关系：

- create -- post `/collection`
- read   -- get `/collection[/id]`
- update -- put `/collection/id`
- delete -- delete `/collection/id`

代码示例：

	// sync 是一个方法，指定同步结束后执行的回调
	// model 的属性 url 指定后台链接，进行通信
	// 当模型的数据发生改变便会同步到后台
	Backbone.sync = function(method,model) {
		alert( method+': '+JSON.stringify(model) );
		model.id = 1;
	};
	var M = Backbone.Model.extend({
		defaults: {
			'name':'hello'
		},
		url: '/users'  // 数据模型M作用于 /users
	});
	var m = new M;
	m.save();  // 保存数据
	m.save({'name':'hi'});  // 保存数据
	
	// 集合的同步
	Backbone.sync = function(method,model) {
		alert( method+': '+JSON.stringify(model) );
	};
	var C = new Backbone.Collection.extend({
		defaults: {
			'name':'hello
		},
		initialize: function() {
			this.on('reset', function() {
				alert('Collection Reset');
			});
		},
		url: '/users'
	});
	var coll = new C;
	coll.fetch();  // 调用 fetch 方法，对集合中的数据进行保存

##路由与历史管理

>路由、历史管理处理，异步页面没有跳转页需要用到链接的 hash 来管理，这一模块就是对 hash 值的管理

	// 实例化一个 Router 对象
	// routes 属性是一个 JSON，hash 值对应回调
	// 回调有两个参数
	// 需要调用 Backbone.history.start() 才会生效
	// 可以用于移动端
	var workspace = Backbone.Router.extend({
		routes: {
			'help': help,  // #help
			'search/:query': search,  // #search/query
			'search/:query/p:page': search  // #search/query/page
		},	
		help: function() {
			alert('#help');
		},
		search: function(query,page) {
			alert('#search/:'+query+'/p:'+page);
		}
	});
	var w = new workspace;
	Backbone.history.start();

##事件委托

	// HTML:
	<body>
		<button>Click Me!</button>
		<a>Mouseover Me!</a>
	</body>

	// javascript:
	$(function() {
		var V = Backbone.View.extend({
			el: $('body'),  // 事件委托给 body
			events: {
				'click button': 'ck',
				'mouseover a': 'mv'
			},
			ck: function() {
				alert('Click Button!');
			},
			mv: function() {
				alert('Mouseover a');
			}
		});
		var v = new V;
	});

	// javascript：
	// 这部分是官网的源码
	// 这部分不属于委托
	var DocumentRow = Backbone.View.extend({
		tagName: "li",  // tagName 接收一个 events 操作的标签
		className: "document-row",  // className 接收一个类名
		events: {
    		"click .icon":          "open",
    		"click .button.edit":   "openEditDialog",
    		"click .button.delete": "destroy"
		},
		initialize: function() {
    		this.listenTo(this.model, "change", this.render);
		},
		render: function() {
    		...
		}
	});

##前端模板

>Backbone 支持前端模板，实现 HTML 和 javascript 的分离

	// 模板
	<body>
		// type 应为 text/template
		// 需要 id 标识
		<script type="text/template" id="template">
		<%= value %> // 直接替换 value
		<% javascript %>  // 嵌入待执行的 javascript 代码
		<%- value %> // 对 value 中的特殊字符进行转义
		</script>
	</body>

	// 可以通过 _.templateSettings 修改替换格式
	// 例：
	// _.templateSettings = {
	//		interpolate: /\{\{(.+?)\}\}/g
	// };
	// var template = _.template("Hello {{ name }}!");
	// template({name: "Mustache"});
	// => "Hello Mustache!"

	// 示例： template 1
	<script type="text/template" id="template">
		<div><%= name %></div>
	</script>

	// 示例： template 2
	<script type="text/template" id="template">
		<% for(var i=0;i<5;i++) { %>
			<div><%= name %></div>
		<% } %>
	</script>

	$(function() {
		var M = Backbone.Model.extend({
			defaults: {
				"name": "Hello"
			}
		});
		var V = Backbone.View.extend({
			initialize: function() {
				this.listenTo(this.model,'change',this.show);
			},
			show: function(model) {
				// 模板调用，插入数据
				$('body').append(this.template(this.model.toJSON()));
			},
			// 获取模板
			template: _.template($('#template').html())
		});
		var m = new M;
		var v = new V({model:m});
		m.set({"name":"hi"});
	});

##其他

>Backbone 依赖于  Underscore.js，与 jQuery 可以协作使用，部分浏览器不兼容 JSON 需要用到 json2.js。

##ToDo 例子

>现在就用 ToDo 这个例子来看下如何使用 backbone

ToDo 需要实现的功能有

- 添加 ToDo 内容；
- 显示未完成 ToDo 项个数；
- 标记已完成的 ToDo 项；
- 删除未做 ToDo 项；
- 全选标记为已完成 ToDo 项；
- 删除已经完成的 ToDo 项；
- 双击修改；

下面是 ToDo 定义的 HTML 模板
	
	// 添加 ToDo 项的模板
	<script type="text/template" id="item-template">
    	<div class="view">
			<input class="toggle" type="checkbox" <%= done ? 'checked="checked"' : '' %> />
			<label><%- title %></label>
			<a class="destroy"></a>
    	</div>
    	<input class="edit" type="text" value="<%- title %>" />
	</script>

	// 显示未完成项部分的 HTML 模板
	<script type="text/template" id="stats-template">
    	<% if (done) { %>
      		<a id="clear-completed">Clear <%= done %> completed <%= done == 1 ? 'item' : 'items' %></a>
    	<% } %>
    	<div class="todo-count"><b><%= remaining %></b> <%= remaining == 1 ? 'item' : 'items' %> left</div>
	</script>