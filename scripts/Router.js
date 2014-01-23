define(function(require, exports, module) {
    var jq = require('jquery');
    var underscore = require('underscore');
    var backbone = require('backbone');

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

    return  Workspace;
});