Meteor.loginAsUser = function(password, username) {
 
   console.log("client login fired")

  //create a login request with login: true, so our loginHandler can handle this request
  var loginRequest = {login: true, password: password, username: username};

  //send the login request
  Accounts.callLoginMethod({
    methodArguments: [{loginRequest}],
    userCallback: function(error) {
   		if (error) {
     	console.log(error);
		}else{console.log("user logged in!")}
	}
  });
};