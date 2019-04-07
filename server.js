
var express = require('express');
var app = express();
//app.use(express.json());

 	let {PythonShell} = require('python-shell');
app.use(express.json());
var request = require("request");



   var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = require('request');
console.log("hi");
request.get('https://reginawang99.github.io/Oasis/resources.txt', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var txt = body;
        console.log("here is txt"+txt);

        // Continue with your processing here.
    }
});

//Getting information from file
/*  var allText  = "";
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", "model.py", true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
    	console.log("exists");
      allText = rawFile.responseText;
    }
  }
  allText.substring(1, allText.length-1);
  var data = allText.split("\"\n\"");*/
	





// Example of method in js (used in method below which is calculatePath)
/*function calculateValue(sLat, sLong, dLat, dLong){
	var numTimes = Math.sqrt((sLat-dLat)*(sLat-dLat) + (sLong-dLong)*(sLong-dLong))/.001; //every .07 miles
	var total = 0;
	for(var i = 0; i < numTimes; i++){
		total += crimeModel[round( abs(sLat+i*(dLat-sLat)/numTimes-33.5)*100.0 )][round( abs(sLong+i*(dLong-sLong)/numTimes+118)*100.0 )];// MAPPPPPP TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
	}
	return total;
}*/

// app.post('/addData/') // calls a post method from google
/*function calculatePath(path){
	console.log(path);
	request({
  uri: path,
  method: "POST"
}, function(error, response, body){
      if (!error && response.statusCode == 200){
          console.log('message sent successfully');

          var ans = JSON.parse(body);
          var steps = ans.routes[0]['legs'][1]['steps'];
          var total = 0;
          for(var i = 0; i < steps.length; i++){
          		total += calculateValue(steps[i].start_location.lat, steps[i].start_location.long, steps[i].end_location.lat, steps[i].end_location.long);
          }

          return total;
      } else {
          console.log('error == ' + error);
          return -1;
      }
  });
	return 0;
}*/

// Full commented out
/*app.post('/getSafeRoute', (req, res) =>{
	if(req.body.key == "apples"){
		console.log('req.body.startingLat;             ' + req.body.startingLat);
		var sLat = req.body.startingLat;
		var sLong = req.body.startingLong;
		var dLat = req.body.destinationLat;
		var dLong = req.body.destinationLong;

		var pathNameMin;
		var pathMin;
		var pathName;
		var pathValue;
		for(var i = 0; i < 4; i++){
			pathName = "https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyDHlFu8C9EcD_R88OuCkKdDKiKMWhbkwYI&mode=walking&origin="+sLat+
			","+sLong+"&destination="+dLat+","+dLong+"&waypoints="+(sLat+0.01*(i%2)*(i-2))+","+(sLong+0.01*((1+i)%2)*(i-1));
			pathValue = calculatePath(pathName);
			if(pathValue != -1 && (i == 0 || pathMin > pathValue)){
				pathNameMin = pathName;
				pathMin = pathValue;
			}
		}
		console.log("pathNameMinpathNameMinpathNameMinpathNameMinpathNameMinpathNameMin                  " + pathNameMin);
		res.send(pathNameMin);

	}
		res.send("bad request");
});*/

app.get('/hi', function(req, res){
	res.send("hi! i work still :)");
});

app.listen(process.env.PORT || 5000, function (){
	console.log('Listening on port: ' + process.env.PORT);
});