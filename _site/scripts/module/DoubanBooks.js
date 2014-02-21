define('module/DoubanBooks', function(require, exports, module) {

    var _ = {};
    _.APIkey = '069c2c1c916caa0713d48455b445fe15';

    function DoubanBooks() {}

    module.exports = DoubanBooks;

    DoubanBooks.ReqBooksInfo = function(bookID) {
        var url = 'https:\/\/api.douban.com\/v2\/book\/' +
                   bookID + 
                  '?apikey=' +
                  _.APIkey +
                  '&callback=DoubanBooks.ShowBooksInfo';
        var script =  document.createElement("script");
        script.src = url;
        script.setAttribute("class","script_for_douban_books");
        document.body.appendChild(script);
    };
    DoubanBooks.ShowBooksInfo = function(data) {
        // _[data.id] = data;
        console.log(typeof data);
    };
});
