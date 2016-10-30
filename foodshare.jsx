import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import {Accounts, STATES} from 'meteor/std:accounts-ui';

clientSidebar = new Meteor.Collection('clientSidebar');
PrivateChatC = new Mongo.Collection("privateChat");
FoodItemsC = new Mongo.Collection("foodItems");

imageStore = new FS.Store.GridFS("images");
images = new FS.Collection("images", {
       stores: [imageStore]
});

Meteor.methods({

    addPrivateMessage(users, username, message){
		PrivateChatC.insert({between: users.sort(),
			username: username,
			message: message,
			createdAt: new Date(),
			seen: false
		});
    },

    deletePrivateMessage(users){
    	PrivateChatC.remove({between: users.sort()})
    },

    markPMSeen(user, messaged){
	PrivateChatC.update({between:{$all : [user, messaged]}, username:messaged, seen:false}, {$set:{seen:true}}, {multi:true} );
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


if (Meteor.isClient) {
    // This code is executed on the client only
    
    import AppHeader from './AppHeader.jsx';
    import FoodView from './FoodView.jsx';
    import UserSettings from './UserSettings.jsx';
    import ItemCreation from './ItemCreation.jsx';
    import MapView from './MapView.jsx';
    import PrivateChat from './PrivateChat.jsx';
    import userAccounts from './userAccounts.jsx';
    import userAccountsRegister from './userAccountsRegister.jsx';
    import GridListTab from './GridListTab.jsx';
    import YourItems from './YourItems.jsx';

    Meteor.startup(function () {

        //Config the accounts
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_EMAIL',
		onSignedInHook : () => browserHistory.push('/')
	});

	const requireAuth = function(nextState, replace){
	      if(Meteor.userId() == null){
				 replace('/login');
				 }
	      }

	// Use Meteor.startup to render the component after the page is ready
	ReactDOM.render(

	    <Router history={browserHistory}>
		<Route path='/' component={AppHeader}>
		    <Route path='/ItemView/:itemID' component={ItemView} onEnter={requireAuth} />
		    <IndexRoute component={GridListTab} />
		    <Route path='/YourItems' component={YourItems} onEnter={requireAuth} />
		    <Route path='/UserSettings' component={UserSettings} onEnter={requireAuth} />
		    <Route path='/ItemCreation' component={ItemCreation} onEnter={requireAuth} />
		    <Route path='/MapView' component={MapView} onEnter={requireAuth} />
		    <Route path='/PrivateChat/:messagedUsername' component={PrivateChat} onEnter={requireAuth} />
		    <Route path='/login' component={userAccounts} formState={STATES.SIGN_IN} />
            <Route path='/register' component={userAccountsRegister} formState={STATES.SIGN_IN} />
		</Route>
	    </Router>
	, document.getElementById('render-target'));

    });
}

if (Meteor.isServer) {

    //Permission for file upload 
    images.allow({
	'insert': function(){
	    return true;
	},
	'download' : function(){
 	    return true;
	}
	
    });
    
    //Reset all the databases before we add the test data in.
    
    //Remove Users
    Meteor.users.remove({});
    
    // //Remove Fooditems
    FoodItemsC.remove({});
    
    // //Remove privateChat
    PrivateChatC.remove({});
    
    //Create user accounts
    var numUsers = 5;
    for(i = 0; i < numUsers; i++){
        var fN = faker.name.firstName();
        var lN = faker.name.lastName();
        
     	Accounts.createUser({username:fN+lN, email: fN + '.' + lN + '@mail.com', password:'password'});
    }

    Accounts.createUser({username: "overLord", emails: "over@it.com", password:'password', profile: {fName: "Steve", lName: "Smith"}});
    
    //Create food items by random users
    var items = [
        {image:'http://asset1.cxnmarksandspencer.com/is/image/mands/bbaeea693f4c2c6b9eaa0d7099c91b46dee181b5?$editorial_430x320$',imageContains:[{foodName:'Sushi',foodDesc:'',},{foodName:'Pizza Rolls',foodDesc:'',},{foodName:'',foodDesc:'Mini Pork Pies',},{foodName:'Pastry Parcels',foodDesc:'',},{foodName:'Kebab',foodDesc:'',}]},
        {image:'http://images.mentalfloss.com/sites/default/files/styles/article_640x430/public/istock_000050960496_medium.jpg',imageContains:[{foodName:'Carrots',foodDesc:'',},{foodName:'Peppers',foodDesc:'',},{foodName:'Apples',foodDesc:'',},{foodName:'Broccoli',foodDesc:'',},{foodName:'Aubergine',foodDesc:'',},{foodName:'Lemons',foodDesc:'',},{foodName:'Beans',foodDesc:'',},{foodName:'Strawberries',foodDesc:'',}],location:{lat:55.948189, lng:-3.188353}},
        {image:'http://www3.imperial.ac.uk/newseventsimages?p_image_type=mainnews2012&p_image_id=33911',imageContains:[{foodName:'Doughnuts',foodDesc:'',}]},{image:'http://blog.oxforddictionaries.com/wp-content/uploads/food-quiz.jpg',imageContains:[{foodName:'Cakes',foodDesc:'',}],location:{lat:55.951361, lng:-3.203630}},
        {image:'http://barefootrunninguniversity.com/wp-content/uploads/2013/05/groceries.jpg',imageContains:[{foodName:'Milk',foodDesc:'',},{foodName:'Bread',foodDesc:'',},{foodName:'Apples',foodDesc:'',},{foodName:'Oranges',foodDesc:'',},{foodName:'Celery',foodDesc:'',}],location:{lat:55.942037, lng:-3.196249}},
        {image:'http://www.tesco.com/groceries/MarketingContent/Sites/Retail/superstore/mercury/P/i/home/freshness/2016/wk29/stamp2ab-1.jpg',imageContains:[{foodName:'Bolognese Sauce',foodDesc:'',},{foodName:'Beef Mince',foodDesc:'',},{foodName:'Onions',foodDesc:'',},{foodName:'Grated Cheese',foodDesc:'',},{foodName:'Spaghetti',foodDesc:'',}]},
        {image:'https://secure.img2.wfrcdn.com/lf/maxsquare/hash/621/13143451/1/Melissa-and-Doug-Lets-Play-House%252521-Fridge-Groceries-4316.jpg',imageContains:[{foodName:'Butter',foodDesc:'',},{foodName:'Cheese',foodDesc:'',},{foodName:'Milk',foodDesc:'',},{foodName:'Orange Juice',foodDesc:'',},{foodName:'Meat Slices',foodDesc:'',},{foodName:'Yoghurt',foodDesc:'',},{foodName:'Parmesan Cheese',foodDesc:'',}],location:{lat:55.967120, lng:-3.188009}}
    ];
    
    var numPortions = 10;
    var numFoodItems = 10;
    for(var item = 0; item<items.length; item++ ){

    	var latMax = 55.962236732939304;
    	var latMin = 55.903796284148955;
    	var rLat = Math.random() * (latMax - latMin) + latMin;

    	var langMax = 3.3002685546875;
    	var langMin = 3.2006787109375;
    	var rLang = Math.random() * (langMax - langMin) + -langMin;

    	var locationz = {lat: rLat, lang: rLang};

        currUser = Meteor.users.find().fetch()[Math.floor(Math.random()*numUsers)]
        for(var food=0; food < items[item].imageContains.length; food++){
     	    FoodItemsC.insert({
      	        foodName: items[item].imageContains[food].foodName,
       	        foodDesc: items[item].imageContains[food].foodDesc,
       	        portionNo: Math.floor(Math.random()*numPortions)+1,
       	        portionsClaimed: 0,
       	        imgURL: items[item].image,
                imgThumbnail:'',
       	        owner: currUser._id,
       	        username: currUser.username,
       	        createdAt: new Date(),
 	        location: locationz
       	    });
        }
    }

    /* 
     * //Create some claims
     * var numClaims = 30;
     * 
     * 
     * //Create comments by random users
     * var numComments = 35;
     * for(i = 0; i < numComments; i++){
     *     currUser = Meteor.users.find().fetch()[Math.floor(Math.random()*numUsers)];
     *  	currItem = FoodItemsC.find().fetch()[Math.floor(Math.random()*numFoodItems)];
     *     Meteor.call('createClaims', currUser.username,Math.floor(Math.random()*currItem.portionNo),currItem._id )
       FoodItemsC.update({_id: currItem._id},{$push : {
       comments:{
       username: currUser.username,
       comment: faker.lorem.sentences(),
       createdAt: new Date()
       }}});
     *     
     * }    
     * 
     * //Create private messages between people
     * var numMessages = 100;
     * for(i = 0; i < numComments; i++){
     *  	randNumFirst = Math.floor(Math.random()*numUsers);
       randNumSecond = (randNumFirst + ((Math.floor(Math.random()*(numUsers-1)))+1) ) % numUsers;
     *     allUsers = Meteor.users.find().fetch();
       firstUser = allUsers[randNumFirst].username;
       secondUser = allUsers[randNumSecond].username;
     *     Meteor.call('addPrivateMessage',[firstUser,secondUser],firstUser,faker.lorem.sentences());
     * }   */
    //Publish the aggregate sidebar here
	Meteor.publish("sidebar", function(username){
		ReactiveAggregate(this, PrivateChatC,
			[
				{$match:
					{between:
						{$in:[username]}}},
				{$sort:{createdAt:-1}},
				{$group:
					{originalId:
						{$first:'$_id'},
						_id:'$between',
						message:{$first:'$message'},
						createdAt:{$first:'$createdAt'},
						seen:{$first:'$seen'},
						username:{$first:'$username'}}},
				{$project:
					{_id:'$originalId',
					between:'$_id',
					message:'$message',
					createdAt:'$createdAt',
					seen:'$seen',
					username:'$username'}},
				{$sort:{createdAt:-1}}
			],
			{clientCollection: "clientSidebar"}
		);
	});


}


