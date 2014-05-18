var fs = require('fs'),
    core_Unshift = [].shift;

fs.readdir(__dirname + '/_posts', function(err, files) {

    if (err) {

        console.log(err);

    } else {

        function inner(ary) {

            GetFileInfo(ary.shift());
            ary.length && inner(ary);
            return ;

        }

        inner(files);

    }
});

function GetFileInfo(file) {

    fs.readFile(__dirname+'/_posts/'+file, 'utf8', function(err, data) {

        var str  = data.split('\n'),
            obj = {};
        for(var i = 1,len = data.length; i < len; i++) {
            var ss = str[i].trim(),
                sLen = ss.length;
            if (ss.match(/^-{3,}$/)) {
                break;
            }
            obj[str[i].match(/^(.{0,}):/)[1]] = str[i].match(/:(.{0,})/)[1].trim();
        }

        obj['data'] = str.slice(i);

        console.log(obj);

    });

}