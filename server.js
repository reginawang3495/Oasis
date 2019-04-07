
var express = require('express');
var app = express();
app.use(express.json());

let {PythonShell} = require('python-shell');
app.use(express.json());
var request = require("request");

var allText  = "";
request.get('https://reginawang99.github.io/Oasis/alienwareapples.txt', function (error, response, body) {
	if (!error && response.statusCode == 200) {
		var allText = body;
		
  }}); // add offender


allText.substring(1, allText.length-1);
var data = allText.split("\"\n\"");


//initialize 2D array for crime data with zeros
var crimeModel = new Array(100);
for(var i = 0; i < crimeModel.length; i++){
	crimeModel[i] = new Array(100);
	for(var j = 0; j < crimeModel[i].length; j++)
		crimeModel[i][j] = 0;
}

//update crimeModel, 2D array, with number of crime occurrences at each location
for (i = 0; i < data.length; i++) {
	var loc = data[i];
	var div = loc.indexOf(",");

	var lat = parseFloat( loc.slice(1,div) );
	var long = parseFloat( loc.slice(div+1, loc.length-1 ));

		if ((lat >= 33.5 && lat <= 34.5) && (long <= -118 && long >= -119)) { //check in bounds
			crimeModel[round( abs(parseFloat( loc.slice(1,div) )-33.5)*100.0 )][round( abs(parseFloat( loc.slice(div+1, loc.length-1 ))+118)*100.0 )]++; 
		}
	}
	crimeModel.toString();

	console.log("inforrrrrr"+[3][7]);

	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	var request = require('request');
	console.log("hi");

	function addOffender(name, callback){
		try{
			var result = "";
			var jsonObj = {"name":name };
			console.log("https://westcentralus.api.cognitive.microsoft.com/face/v1.0/largepersongroups/sexualoffenders/persons");
			request({

				uri: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/largepersongroups/sexualoffenders/persons",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Ocp-Apim-Subscription-Key":"50e122d0a26e468bb683e81f687a3e0d",
				},
				json: true,
				body : jsonObj


			},  function(error, response, body){
				if (!error && response.statusCode == 200){
					status = "succeeded";
					result = body.personId;
					console.log("THIAWHFSJJFKF");
					callback(result);
				} else {
					console.log("THIAWHFSJJFKF");
					callback(error);

				}
			}
			);
		}
		catch(error){}
	}

	function addFace(id, url){
		try{
			var jsonObj = {"url":url };
			console.log(url);
			request({

				uri: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/largepersongroups/sexualoffenders/persons/"+id+"/persistedfaces",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Ocp-Apim-Subscription-Key":"50e122d0a26e468bb683e81f687a3e0d",
				},
				json: true,
				body :jsonObj
			}, function(error, response, body){
				if (!error && response.statusCode == 200){
					console.log('message sent successfully');

				} else {
					console.log('error ==2 ' + error);
				}
			});
		}catch(error){}
	}

	function train(){
		try{
			request({
				uri: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/largepersongroups/sexualoffenders/train",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Ocp-Apim-Subscription-Key":"50e122d0a26e468bb683e81f687a3e0d",
				},
				json: true
			}, function(error, response, body){
				if (!error && response.statusCode == 200){
					console.log('message sent successfully');

					var ans = JSON.parse(body);
					console.log("yay trained!");				
				} else {
					console.log('error ==3 ' + error);
				}
			});
		}
		catch(error){}
	}


	request.get('https://reginawang99.github.io/Oasis/resources.txt', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var txt = body;
			console.log("here is txt"+txt);
			var offenders = txt.split("\n");
			for(var i = 0; i < offenders.length; i++){
				var id = "hmm";
				id =  addOffender(offenders[i].substring(1,offenders[i].indexOf("\",\"")),function(result){
					if(result){
						id = result;
						console.log('something blew up' );
					} 
  }); // add offender
				console.log("here is id: "+ i);

        	addFace("a1687612-ba3c-4fbb-9501-3d4f6958a38f", offenders[i].substring(offenders[i].indexOf("\",\"")+3, offenders[i].length-1)); // add face
        }
        train();

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

// Full commented out post request
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
	app.post('/Danger', (req, res) =>{
			if(req.body.key == "apples"){
				var phoneNum = req.body.phoneNum;
				var imageUrl = req.body.imageUrl;
				var isBADGUY = false;
				function facial(){
					var jsonObj1 = {"url":imageUrl };
					console.log(imageUrl);
					request({

						uri: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect",
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Ocp-Apim-Subscription-Key":"50e122d0a26e468bb683e81f687a3e0d",
						},
						json: true,
						body :jsonObj1
					}, function(error, response, body){
						if (!error && response.statusCode == 200){
							console.log("askdfjaklsdjf;lakdjf");
							singlefaceid = body[0].faceId;
							console.log(singlefaceid);

							function identify(){
								var jsonObj = {"faceIds":[singlefaceid],"largePersonGroupId":"sexualoffenders" };
								console.log(url);
								request({

									uri: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify",
									method: "POST",
									headers: {
										"Content-Type": "application/json",
										"Ocp-Apim-Subscription-Key":"50e122d0a26e468bb683e81f687a3e0d",
									},
									json: true,
									body :jsonObj
								}, function(error, response, body){
									console.log("hi");
									if (!error && response.statusCode == 200){
										console.log('message sent successfully');
										try{
											response[0]
											isBADGUY =true;
										}catch(error){										
											isBADGUY =false;
										}

									} else {
										console.log('aaaa == ' + response +" dmdmd "+ body + " vdvv "+error);
									}
								});
							}
							identify();
							console.log('message sent successfully');

						} else {
							console.log('aaaeea == '  +" dmdmd "+ body[0] + " vdvv "+error);
						}

				}
			);
		}
				facial();


				function text(){
					try{
						var toSend = "There seems to be no sexual offenders in the picture, but stay safe.";
						if(isBADGUY)
							toSend = "Be careful! We are pretty sure that there is a sexual offender in that picture!";
						var BOdyyyy = "Body=" + toSend + "hiii&From=112133400272&To="+phoneNum+"&undefined=";
				//var jsonObj = {"Body":url };
				request({
					uri: "https://api.twilio.com/2010-04-01/Accounts/AC8d85c1d898fe71ae9a46a016318fbedf/Messages.json",
					method: "POST"	,

					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						"AC8d85c1d898fe71ae9a46a016318fbedf":"9faa03e704e7afdeeb8479dd6d4ad94f",
						"Authorization":"Basic QUM4ZDg1YzFkODk4ZmU3MWFlOWE0NmEwMTYzMThmYmVkZjo5ZmFhMDNlNzA0ZTdhZmRlZWI4NDc5ZGQ2ZDRhZDk0Zg==",
					},
					body : BOdyyyy,
				//	json: true,
				//	body :jsonObj
			}, function(error, response, body){
				if (!error && response.statusCode == 200){
					console.log('message sent successfully');


				} else {
					console.log('erroasdjfhajksdfhr == ' + response +" dmdmd "+ body + " vdvv "+error);
					res.send("could not send text");
				}
			});
			}catch(error){}
		}
		text();

		res.send("worked!");

	}
	res.send("bad request");
});
	app.get('/hi', function(req, res){
		res.send("hi! i work still :)");
	});


	app.listen(process.env.PORT || 5000, function (){
		console.log('Listening on port: ' + process.env.PORT);
	});