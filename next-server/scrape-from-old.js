var fs = require('fs');
var Crawler = require("crawler");

var c = new Crawler({
    encoding: null,
    jQuery: false,// set false to suppress warning message.
    callback: function (err, res, done) {
        if (err) {
            console.error(err.stack);
        } else {
            if (res.options.level === "old") {
                fs.createWriteStream(res.options.filename).write(res.body);
                JSON.parse(res.body).forEach(uni => {
                    c.queue({
                        uri: "http://mygrades.dev/api/v1/universities/" + uni.university_id + "?detailed=true",
                        filename: uni.university_id + ".json",
                        level: "old/universities"
                    })
                })
            } else {
                fs.createWriteStream("./" + res.options.level + "/" + res.options.filename).write(res.body);

            }
        }

        done();
    },
    userAgent: "test"
});

c.queue({
    uri: "http://mygrades.dev/api/v1/universities?published=true",
    filename: "universities.json",
    level: "old"
});