define('module/DoubanBooks', function(require, exports, module) {

    var _ = {};
    _.APIkey = '07d1768ce7b723b6177463a6b7256b22';
    
    function DoubanBooks() {}

    module.exports = DoubanBooks;

    // 豆瓣 jsonp 只能回调到全局变量下面的函数，
    // 这里把 GetDoubanData挂到全局变量上面,
    // 获取数据后再把数据添加到 '_' 对象里。 
    // 这样处理不太好，希望可以找到 SeaJs 内部提供的方法解决。

    DoubanBooks.ReqBooksInfo = function(bookID, callback) {

        var url = 'https://api.douban.com/v2/book/' + 
                  bookID +
                  '?&apikey=' + 
                  _.APIkey + 
                  '&alt=xd&callback=' +
                  callback;
        var script =  document.createElement("script");
        script.src = url;
        script.setAttribute("class", "script_for_douban_books");
        document.body.appendChild(script);

    };

    DoubanBooks.SetBooksData = function(data) {

        _[data.id] = data;

    } 
   
    DoubanBooks.ShowBooksInfo = function(bookID) {

        return _[bookID];

    };

});
