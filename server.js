var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var request = require("request");

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});


app.get("/names",function(req, res){
	getCollection("people",function(body){
		res.json(body);
	});
});

app.post("/addname",function(req, res){
	insertToCollection("people",req.body,function(answer){
		res.send(answer);
	});
});

// heroku_g4h0cfqh

// collection name, callback with json stringified

var mongoapikey = "6rjm6tzaK4-wsDInlxV5Q2Y6aaowbkmq";

function getCollection(collectionName,cb) {
        request('https://api.mlab.com/api/1/databases/heroku_g4h0cfqh/collections/'+collectionName+'?apiKey='+mongoapikey,{json:true}, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                cb(body);
            }
        })
}
// collection name, payload object ,callback with json stringified
function insertToCollection(collectionName,payload,cb) {
    request.post('https://api.mlab.com/api/1/databases/heroku_g4h0cfqh/collections/'+collectionName+'?apiKey='+mongoapikey,{json:true,body:payload}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cb(body);
        }
    })
}

// collection name, itemid, payload object ,callback with json stringified

function updateItem(collectionName,itemid,payload,cb) {
        request.put('https://api.mlab.com/api/1/databases/heroku_g4h0cfqh/collections/'+collectionName+'/'+itemid+'?apiKey='+mongoapikey,{json:true,body:{ "$set" : payload } }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                cb(body);
            }
        })
}

// update only mentioned fields in item {y:5}

/*

*/

// collection name, itemid,callback with json stringified

function deleteItem(collectionName,itemid,cb) {
        request.delete('https://api.mlab.com/api/1/databases/heroku_g4h0cfqh/collections/'+collectionName+'/'+itemid+'?apiKey='+mongoapikey, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                cb(body);
            }
        })
}