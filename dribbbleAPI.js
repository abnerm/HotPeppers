var dribbbleAPI = "http://api.dribbble.com/shots/popular?callback=?";
var dribbbleOptions = {
    format : "json",
    page : 1,
};


function getData(json){
	
	var query = new Parse.Query('Rating');
	query.find({
	  success: function(results) {
	  	var rated = [];
	  	for (var i = 0; i < results.length ; i++){
	  		var queryResult = results[i].attributes.DribbleID;
	  		rated.push(queryResult);
	  	}

	  	var data = [];
	  	for (var i = 0; i < json.shots.length ; i++){
	  		var pulledImg = json.shots[i].image_url;
	  		var imgID = json.shots[i].id;
	  		if( rated.indexOf(imgID.toString()) == -1 ){
	  			var key = {"url" : pulledImg, "id" : imgID};
	  			data.push(key);

	  		}else{
	  			//console.log('contains')
	  		}
	  		
	  	}
		console.log(rated);
		console.log(data);

		var x = data.length;

	  	var rand = Math.floor(Math.random() * (x - 0 + 1)) + 0;
	  	process(data[rand].url, data[rand].id);
	  	
	  },

	  error: function(error) {
	    // error is an instance of Parse.Error.
	  }

	});

	function process(pulledImg, imgID){
		
		var Rated = Parse.Object.extend("Rating");
		var query = new Parse.Query(Rated);

		var stageImage = document.createElement("IMG");
			stageImage.src = pulledImg;
			stageImage.id = imgID;

		var stage = document.getElementById('stage');
		stage.appendChild(stageImage);
	}
}
$.getJSON(dribbbleAPI, dribbbleOptions, getData); 

