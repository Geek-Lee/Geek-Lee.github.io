define('module/DoubanBooks', function(require, exports, module) {

    var _ = {};
    _.APIkey = '0d266b1becf08c9527734153c6d1a5bf';
    
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

    DoubanBooks.removeScript = function(classes) {

        var doc = document,
            tags = [],
            scripts = [],
            core_getTags = doc.getElementsByTagName;
        if (document.getElementsByClassName) {

            scripts = document.getElementsByClassName(classes);

        } else {
            tags = core_getTags('script');
            while (tags) {
                var htmlEl = tags.shift();
                if (eval("/" + classes + "/").test(tags.shift().classList)) {
                    scripts.push(htmlEl);
                }
            }
        }

        for (var i=0, len=scripts.length; i<len; i++) {

            // if (scripts[i].remove) {
            //     scripts[i].remove();
            // }

            document.body.removeChild(scripts[i]);

        }

    };

    DoubanBooks.SetBooksData = function(data) {

        _[data.id] = data;

    } 
   
    DoubanBooks.ShowBooksInfo = function(bookID) {

        return _[bookID];

    };

});
