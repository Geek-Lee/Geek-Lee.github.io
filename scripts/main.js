seajs.use("./scripts/Drawer.js", function(Drawer) {
    $(function() {   

        var d = new Drawer;

    });
});

seajs.use("./scripts/Router.js", function(Workspace) {
    $(function() {   

        var w = new Workspace;

        Backbone.history.start();

    });
});