---
layout: post
title: Backbone.Js 入门篇
category: javascript
excerpt: 这是 Backbone.Js 入门的学习笔记，大概看了一下觉得这个库挺好用的。
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


![MCV]({{ site.baseurl }}/images/BackBone-MVC.PNG)

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