$( "#pepperBox" ).mousemove(function(){
	console.log('works')
	var clientCoords = event.clientX-500;
	$('#pepperHeat').css("left", clientCoords+"px");

	var pepperized = Math.floor(clientCoords / 100 + 6);

	$('#rated').text(pepperized);
});

$("#pepperBox").click(function(){
	var currentValue = $('#rated').html();
	$('#rated').text(currentValue);
	$("#pepperBox").unbind('mousemove');
	$('#pepperHeat').css("left", ((currentValue)*100 - 500)+"px");

	var imgID = $('#stage img').attr("id");
	saveRate(currentValue, imgID);
})	


function saveRate(rateValue, imgID){
	var user = Parse.User.current();

	// Make a new post
	var Rating = Parse.Object.extend("Rating");
	var rate = new Rating();
	rate.set("Rate", rateValue);
	rate.set("DribbleID", imgID);
	rate.set("User", user);
	rate.save(null, {
	  	success: function(post) {
	  		console.log(rate.get("DribbleID"));
		    // // Find all posts by the current user
		    // var query = new Parse.Query(Post);
		    // query.equalTo("user", user);
		    // query.find({
	     // 		success: function(usersPosts) {
	     //    // userPosts contains all of the posts by the current user.
	     // 		}
	   		//  });
	  }
	});
}


