define('module/Drawer', function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');

    var Drawer = Backbone.View.extend({
        el: 'body',
        events: {
            'click .site-nav-logo': 'open',
            'click .list-item-btn': 'close',
            'click .site-nav-overlay': 'close',
            'click .m-site-nav-logo-btn': 'navShow'
        },
        initialize: function() {
            $('.srolling-region').scroll(this.scrolling);
        },
        open: function() {
            var me = this;
            this.$el.addClass('site-nav-transition');
            setTimeout(function() {
                me.$el.addClass('site-nav-drawer-open');
            }, 200);   
        },
        close: function() {
            var me = this;
            var $elem = $('.site-nav');
            me.$el.removeClass('site-nav-transition');
            if ($elem.hasClass('m-site-nav-show')) {
                $('.site-nav').removeClass('m-site-nav-show');
            }
            setTimeout(function() {
                me.$el.removeClass('site-nav-drawer-open');
            }, 200);
        },
        scrolling: function() {
            var iH = $('.images-src').height(),
                iT = $('.srolling-region').scrollTop(),
                a = iT*3 / iH;
            $('.images-src-blur').css({'opacity': a < 1 ? a: 1});
        },
        navShow: function() {
            var $elem = $('m-site-nav-show');
            if ($elem.hasClass('m-site-nav-show')) {
                $('.site-nav').removeClass('m-site-nav-show');
                navSh = false;
            } else {
                $('.site-nav').addClass('m-site-nav-show');
                navSh = true;
            }
        }
    });

    return  Drawer;

});