injectTapEventPlugin();

//db.privateChat.aggregate([{$sort:{createdAt:-1}}, {$group:{originalId:{$first:'$_id'},_id:'$between', message:{$first:'$message'}, createdAt:{$first:'$createdAt'}, seen:{$first:'$seen'}, username:{$first:'$username'}}},{$project:{_id:'$originalId',between:'$_id',message:'$message',createdAt:'$createdAt',seen:'$seen',username:'$username'}}])


PrivateChatC = new Mongo.Collection("privateChat");
FoodItemsC = new Mongo.Collection("foodItems");
MyImages = new FS.Collection("myImages", {
  stores: [new FS.Store.FileSystem("myImages", {path: "~/uploads"})]
});

Meteor.methods({

	getMessageBarMessages(currentUser){
		return PrivateChatC.aggregate([{$match:{between:{$in:[currentUser]}}},{$sort:{createdAt:-1}}, {$group:{originalId:{$first:'$_id'},_id:'$between', message:{$first:'$message'}, createdAt:{$first:'$createdAt'}, seen:{$first:'$seen'}, username:{$first:'$username'}}},{$project:{_id:'$originalId',between:'$_id',message:'$message',createdAt:'$createdAt',seen:'$seen',username:'$username'}}]);
	},
	    

	addPrivateMessage(users, username, message){
	    PrivateChatC.insert({between: users.sort(),
	 			 username: username,
	 			 message: message,
	 			 createdAt: new Date(),
			         seen: false
	    }
	    );
	},


	createClaims(username, prts, ID){
		FoodItemsC.update(
			{_id : ID},
				{$push : {
					claims : {
						username : username,
						createdAt : new Date(),
						portions : prts,
						accepted : 0,
						rejected : false,
						parentId: ID,
						}
					}	
				} 
		); 
	},


	updateClaims(ID, value, userName){
		var itemOwner = FoodItemsC.find( {_id : ID } );
		FoodItemsC.update(
				{_id : ID, "claims.username" : userName},
					{$inc : { "claims.$.accepted" : value } }
		);
		FoodItemsC.update(
			{_id: ID},
				{$push : {
				 	privateChat:{
						claimer: userName,
						chat: {
							username: "",
							chat: "",
						},
						createdAt: new Date(),
						owner: itemOwner.username,
						parentId: ID,
					}
		 }});
	},

	rejectClaim(ID, userName, date){
		FoodItemsC.update(
				{_id : ID, "claims.username" : userName},
					{$set : { "claims.$.rejected" : true } }
		);
	}

});


//PrivateChatC.remove({})
//FoodItemsC.remove({})

if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
      
	  requestPermissions: {
	    facebook: ['user_likes'],
	    github: ['user', 'repo']
	  },
	  requestOfflineToken: {
	    google: true
	  },
	  passwordSignupFields: 'USERNAME_AND_EMAIL'

      });


  //Add some fake data 

  Accounts.createUser({username:'tom0',email:'tom0@mail.com',password:'blahblah'});
  Accounts.createUser({username:'tom1',email:'tom1@mail.com',password:'blahblah'});
  Accounts.createUser({username:'tom2',email:'tom2@mail.com',password:'blahblah'});
  Accounts.createUser({username:'tom3',email:'tom3@mail.com',password:'blahblah'});

  

  const {Router, Route, IndexRoute, Link, history} = ReactRouter;

  const browserHistory = history.createHistory();  

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    AppRoutes = (

	<Router history={browserHistory}>
		<Route path='/' component={AppHeader}>
		       <Route path='/ItemView/:itemID' component={ItemView} />
		       <IndexRoute component={FoodView} />
		       <Route path='/Messages' component={FoodView}/>
		       <Route path='/UserSettings' component={UserSettings} />
		       <Route path='/ItemCreation' component={ItemCreation} />
		       <Route path='/MapView' component={MapView} />
		       <Route path='/PrivateChat/:messagedUsername' component={PrivateChat} />
		       <Route path='/login' component={login} />
		</Route>
		
	</Router>
	);

	ReactRouterSSR.Run(AppRoutes);
  });
}

if (Meteor.isServer) {
   
   FoodItemsC.remove({});

    FoodItemsC.insert({
	_id: '2CobTjTNP7m7RBaRD',
	foodName: 'this0',
	foodDesc: 'is flipping poop',
	portionNo: 10,
	portionsClaimed: 0,
	imgURL: "https://garangleslarp.s3-eu-west-1.amazonaws.com/tom0/herbertFlag.png",
	owner: "mS8nxEFL4EaXuroAE",
	username: 'tom0',
	createdAt: new Date()

   });

   FoodItemsC.insert({
	foodName: 'this1',
	foodDesc: 'is flipping poop',
	portionNo: 10,
	portionsClaimed: 0,
	imgURL: "https://garangleslarp.s3-eu-west-1.amazonaws.com/tom0/herbertFlag.png",
	owner: "mS8nxEFL4EaXuroAE",
	username: 'tom0',
	createdAt: new Date()

   });

   FoodItemsC.insert({
	foodName: 'this2',
	foodDesc: 'is flipping poop',
	portionNo: 10,
	portionsClaimed: 0,
	imgURL: "https://garangleslarp.s3-eu-west-1.amazonaws.com/tom0/herbertFlag.png",
	owner: "mS8nxEFL4EaXuroAE",
	username: 'tom0',
	createdAt: new Date()

   });

   FoodItemsC.insert({
	foodName: 'this3',
	foodDesc: 'is flipping poop',
	portionNo: 10,
	portionsClaimed: 0,
	imgURL: "https://garangleslarp.s3-eu-west-1.amazonaws.com/tom0/herbertFlag.png",
	owner: "mS8nxEFL4EaXuroAE",
	username: 'tom0',
	createdAt: new Date()

   });

   FoodItemsC.insert({
	foodName: 'this4',
	foodDesc: 'is flipping poop',
	portionNo: 10,
	portionsClaimed: 0,
	imgURL: "https://garangleslarp.s3-eu-west-1.amazonaws.com/tom0/herbertFlag.png",
	owner: "mS8nxEFL4EaXuroAE",
	username: 'tom0',
	createdAt: new Date()

   });

    FoodItemsC.update({_id: '2CobTjTNP7m7RBaRD'},{$push : {
	comments:{
	    username: 'tom0',
	    comment: 'this is the comment i wanted to make how are you',
	    createdAt: new Date()
	}}});


    FoodItemsC.update({_id: '2CobTjTNP7m7RBaRD'},{$push : {
	comments:{
	    username: 'tom1',
	    comment: 'this is the comment i wanted to make how are you',
	    createdAt: new Date()
	}}});

    FoodItemsC.update({_id: '2CobTjTNP7m7RBaRD'},{$push : {
	comments:{
	    username: 'tom1',
	    comment: 'this is the comment i wanted to make how are you',
	    createdAt: new Date()
	}}});

    FoodItemsC.update({_id: '2CobTjTNP7m7RBaRD'},{$push : {
	comments:{
	    username: 'tom2',
	    comment: 'this is the comment i wanted to make how are you',
	    createdAt: new Date()
	}}});

    FoodItemsC.update({_id: '2CobTjTNP7m7RBaRD'},{$push : {
	comments:{
	    username: 'tom3',
	    comment: 'this is the comment i wanted to make how are you',
	    createdAt: new Date()
	}}});

    FoodItemsC.update({_id: '2CobTjTNP7m7RBaRD'},{$push : {
	comments:{
	    username: 'tom2',
	    comment: 'this is the comment i wanted to make how are you',
	    createdAt: new Date()
	}}});

    FoodItemsC.update({_id: '2CobTjTNP7m7RBaRD'},{$push : {
	comments:{
	    username: 'tom2',
	    comment: 'this is the comment i wanted to make how are you',
	    createdAt: new Date()
	}}});

    FoodItemsC.update({_id: '2CobTjTNP7m7RBaRD'},{$push : {
	comments:{
	    username: 'tom1',
	    comment: 'this is the comment i wanted to make how are you',
	    createdAt: new Date()
	}}});

    FoodItemsC.update({_id: '2CobTjTNP7m7RBaRD'},{$push : {
	comments:{
	    username: 'tom0',
	    comment: 'this is the comment i wanted to make how are you',
	    createdAt: new Date()
	}}});

    PrivateChatC.remove({});

    Meteor.call('addPrivateMessage',['tom0','tom3'],'tom0','0:Just something to add in the place of nothingness');
    Meteor.call('addPrivateMessage',['tom3','tom0'],'tom3','1:Just something to add in the place of nothingness');
    Meteor.call('addPrivateMessage',['tom0','tom3'],'tom3','2:Just something to add in the place of nothingness');
    Meteor.call('addPrivateMessage',['tom0','tom3'],'tom0','3:Just something to add in the place of nothingness');
    Meteor.call('addPrivateMessage',['tom3','tom1'],'tom1','4:Just something to add in the place of nothingness');
    Meteor.call('addPrivateMessage',['tom1','tom3'],'tom3','5:Just something to add in the place of nothingness');
    Meteor.call('addPrivateMessage',['tom3','tom2'],'tom2','6:Just something to add in the place of nothingness');
    Meteor.call('addPrivateMessage',['tom0','tom2'],'tom2','7:Just something to add in the place of nothingness');
    Meteor.call('addPrivateMessage',['tom1','tom2'],'tom2','8:Just something to add in the place of nothingness');
	
	



}


