seajs.use(["module/Drawer.js", "./scripts/module/Router.js", "./scripts/module/DoubanBooks.js"], function(Drawer, Router, DoubanBooks) {
    var d = new Drawer;
    Router.run();
    DoubanBooks.ReqBooksInfo('1873926');
});