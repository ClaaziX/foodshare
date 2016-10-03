Meteor.loginAsUser = function(password, username, callback) {
  //create a login request with login: true, so our loginHandler can handle this request
  var loginRequest = {userLoginz: true, password: password, username: username};

  //send the login request
  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
};