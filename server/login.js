Accounts.registerLoginHandler(function(loginRequest) {
  //there are multiple login handlers in meteor. 
  //a login request go through all these handlers to find it's login hander
  //so in our login handler, we only consider login requests which has admin field
  console.log("server login fired")

  var loginRequest = loginRequest.loginRequest

  console.log(loginRequest.login)
  console.log(loginRequest.password)
  console.log(loginRequest.username)
  
  if(!loginRequest.login) {
    console.log("not recognised handler, exiting...")
    return undefined;
  }

  var userName = loginRequest.username;
  var user = Meteor.users.findOne({username: userName});
  var pass = user.services.password

  console.log(user)
  //our authentication logic :)
  if(loginRequest.password != pass) {
    console.log(loginRequest.password)
    console.log(pass)
    console.log("password does not match, exiting...")
    return null;
  }

  console.log("checks passed, creating token..")
  
  var userId = null;

  userId = user._id;

  //creating the token and adding to the user
  var stampedToken = Accounts._generateStampedLoginToken();
  //hashing is something added with Meteor 0.7.x, 
  //you don't need to do hashing in previous versions
  var hashStampedToken = Accounts._hashStampedToken(stampedToken);
  
  Meteor.users.update(userId, 
    {$push: {'services.resume.loginTokens': hashStampedToken}}
  );
  console.log("token created and pushed...")
  //sending token along with the userId
  return {
    id: userId,
    token: stampedToken.token
  }
});