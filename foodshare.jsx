injectTapEventPlugin();

FoodItemsC = new Mongo.Collection("foodItems");
MyImages = new FS.Collection("myImages", {
  stores: [new FS.Store.FileSystem("myImages", {path: "~/uploads"})]
});

Meteor.methods({
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
		       <Route path='/PrivateChat' component={PrivateChat} />
		       <Route path='/login' component={login} />

		</Route>
		
	</Router>
	);

	ReactRouterSSR.Run(AppRoutes);
  });
}

if (Meteor.isServer) {

}

