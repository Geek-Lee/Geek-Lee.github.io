define('module/Router', function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');
    var DoubanBooks = require('module/DoubanBooks');
    var Books = ['4736167', '6038371', '3794471', '10546125',
        '5362856', '11506062', '25767596', '25768396'];
    var len = Books.length;
    var BooksData = {};

    var Model = Backbone.Model.extend({
        defualts: {}
    });

    var View = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.model,'change',this.show);
        },
        show: function() {
            $('.book-list').append(this.template(this.model.toJSON()));
        },
        template: _.template($('#books-template').html())
    });

    var Workspace = Backbone.Router.extend({
        routes: {
            'home': 'home',
            'collection': 'coll',
            'blogs': 'blogs',
            'books': 'books',
            'about': 'about'
        },
        home: function() {
            console.log("home");
        },
        coll: function() {
            console.log("collection");
        },
        blogs: function() {
            this.navHover();
            $('#blogsID').addClass('hover');
            $('.article-container, .book-container, .aboutme-container').css('display','none');
            $('.article-container').css('display','block');
        },
        books: function() {
            this.navHover();
            $('#booksID').addClass('hover');
            $('.article-container, .book-container, .aboutme-container').css('display','none');
            $('.book-container').css('display','block');
        },
        about: function() {
            this.navHover();
            $('#aboutID').addClass('hover');
            $('.article-container, .book-container, .aboutme-container').css('display','none');
            $('.aboutme-container').css('display','block');
        },
        navHover: function() {
            $('.page-nav a').removeClass('hover');
        }
    });

    exports.run = function() {
        window.GetDoubanData = function (data) {
            BooksData[data.id] = data;
            m.set(BooksData[data.id]);
        };
        inner(Books);
        function inner(arry) {
            DoubanBooks.ReqBooksInfo(arry.shift(), 'GetDoubanData');
            arry.length && inner(arry);
        };
        var m = new Model;
        var v = new View({model: m});
        var w = new Workspace;
        Backbone.history.start();
    };
});