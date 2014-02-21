define('module/Drawer', function(require, exports, module) {

    var $ = require('$');
    var Backbone = require('backbone');

    var Drawer = Backbone.View.extend({
        el: 'body',
        events: {
            'click .site-nav-logo': 'open',
            'click .site-nav-overlay': 'close',
            'click #home': 'close',
            'click #collection': 'close'
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
            me.$el.removeClass('site-nav-transition');
            setTimeout(function() {
                me.$el.removeClass('site-nav-drawer-open');
            }, 200);
        },
        scrolling: function() {
            var iH = $('.images-src').height(),
                iT = $('.srolling-region').scrollTop(),
                a = iT*3 / iH;
            $('.images-src-blur').css({'opacity': a < 1 ? a: 1});
        }
    });

    return  Drawer;

});