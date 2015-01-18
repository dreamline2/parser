var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var PARSER = require('./parser');


var ACES = new PARSER({
    url: "http://aces.thenewslens.com"
});

request(ACES.url, function(error, response, body) {
    if (!error && response.statusCode == 200) {

        ACES.html = body;
        ACES.json = [];

        var $ = cheerio.load(ACES.html);
        var result = $('#feature .tbBox .recent-work-wrap a');
        
        for( var i = 0 ; i < result.length ; i++ ) {

        	var list = result[i].children;

        	ACES.json[i] = {
				"name": undefined,        		
        		"image": undefined,
        		"title": result[i].attribs.title
        	}

        	for( var j = 0 ; j < list.length ; j++ ) {
	        	if(list[j].name == "img") {
	        		ACES.json[i]["image"] = ACES.url + list[j].attribs.src;
	        		ACES.json[i]["name"] = list[j].attribs.title;
	        	}
	        }

        }
        console.log(ACES.json)
    }
})
