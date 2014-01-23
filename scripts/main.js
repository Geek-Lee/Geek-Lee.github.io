seajs.use("{{ site.baseurl }}/scripts/Drawer.js", function(Drawer) {
    $(function() {   

        var d = new Drawer;

    });
});

seajs.use("{{ site.baseurl }}/scripts/Router.js", function(Workspace) {
    $(function() {   

        var w = new Workspace;

        Backbone.history.start();

    });
});