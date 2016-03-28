FoodItemsC = new Mongo.Collection("foodItems");
MyImages = new FS.Collection("myImages", {
  stores: [new FS.Store.FileSystem("myImages", {path: "~/uploads"})]
});

Meteor.methods({
	updateClaims(ID, value, userName){
		FoodItemsC.update(
				{_id : ID, "claims.username" : userName},
					{$inc : { "claims.$.accepted" : value } }
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
	injectTapEventPlugin();
	ReactRouterSSR.Run(AppRoutes);
  });
}

if (Meteor.isServer) {

}

