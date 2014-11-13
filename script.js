Parse.initialize("wOW5Lwm3dYPdAW7jSDEuNT0atv2NIs3JXMpsCePI", "IMmc2EJXfsMAXIkZvFlDvYV3zNE6bo6nRzwcKzD6");

if(Parse.User.current() !== null) {
	removeMeta();
	
}else if(Parse.User.current() == null){
	document.getElementById('signup').onclick = signUpUser;
}

function signUpUser (){
	var user = new Parse.User();
	user.set("username", document.getElementById('username').value);
	user.set("password", document.getElementById('password').value);

	user.signUp(null, {
		success: function (user){
			console.log("signed up!");
		},

		error: function (user, error){
			console.log("umm, this is bad: ", error);
		}
	});
};

function removeMeta(){
	var currentUser = Parse.User.current().attributes.username;
	var x = document.getElementById('username');
	var y = document.getElementById('password');
	var z = document.getElementById('signup');
	var manageUsrStatus = document.getElementById('manage');
		manageUsrStatus.value = "Log Out";
	
	x.remove();
	y.remove();
	z.remove();

	var username = document.createElement('p');
		username.innerHTML = currentUser;

	var metaParent = document.getElementById('meta');
		metaParent.insertBefore(username, manageUsrStatus);
}

function manageUser(){
		
	if (Parse.User.current() == null){
		var x = document.getElementById('username').value;
		var y = document.getElementById('password').value;
		Parse.User.logIn(x, y,{
			success: function(user){
				console.log('logged in');
				//saveData();
				removeMeta();
			},
			error: function(user,error){
				console.log('login failed');
			}
		})
		
	}else{
		Parse.User.logOut();
		location.reload();
	}
};

document.getElementById('manage').onclick = manageUser;







