Accounts.registerLoginHandler(function(loginRequest) {
  //there are multiple login handlers in meteor. 
  //a login request go through all these handlers to find it's login hander
  //so in our login handler, we only consider login requests which has admin field
  if(!loginRequest.userLoginz) {
    return undefined;
  }

  var userName = loginRequest.username;
  var user = Meteor.users.findOne({username: userName});
  var pass = user.password

  //our authentication logic :)
  if(loginRequest.password != pass) {
    return null;
  }
  
  //we create a admin user if not exists, and get the userId
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

  //sending token along with the userId
  return {
    id: userId,
    token: stampedToken.token
  }
});