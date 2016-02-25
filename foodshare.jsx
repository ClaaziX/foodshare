FoodItemsC = new Mongo.Collection("foodItems");
MyImages = new FS.Collection("myImages", {
  stores: [new FS.Store.GridFS("myImages", {path: "~/uploads"})]
});


if (Meteor.isClient) {
  // This code is executed on the client only
  Accounts.ui.config({
      
      passwordSignupFields: "USERNAME_ONLY"

      });

  const {Router, Route, IndexRoute} = ReactRouter;

  const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)()

  Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    ReactDOM.render(

	<Router history={history}>
		<Route path='/' component={AppHeader}>
		       <IndexRoute component={FoodView} />
		</Route>
	</Router>
	,document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  // This code is executed on the server only

	MyImages.allow({
		insert: function() { return true; },
		// update: function(userId,doc) { return true; },
		// remove: function(userId,doc) { return false; },
		// download: function(userId, doc) {return true;},
	});
}

