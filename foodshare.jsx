injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import {Accounts, STATES} from 'meteor/std:accounts-ui';

clientSidebar = new Meteor.Collection('clientSidebar');
PrivateChatC = new Mongo.Collection("privateChat");
FoodItemsC = new Mongo.Collection("foodItems");
MyImages = new FS.Collection("myImages", {
    stores: [new FS.Store.FileSystem("myImages", {path: "~/uploads"})]
});

Meteor.methods({

    addPrivateMessage(users, username, message){
	PrivateChatC.insert({between: users.sort(),
	 		     username: username,
	 		     message: message,
	 		     createdAt: new Date(),
			     seen: false
	}
	);
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
    import login from './login.jsx';

    Meteor.startup(function () {

        //Config the accounts
	Accounts.ui.config({
		passwordSignupFields: 'USERNAME_AND_EMAIL',
		onSignedInHook : () => browserHistory.push('/')
	});


	// Use Meteor.startup to render the component after the page is ready
	ReactDOM.render(

	    <Router history={browserHistory}>
		<Route path='/' component={AppHeader}>
		    <Route path='/ItemView/:itemID' component={ItemView} />
		    <IndexRoute component={FoodView} />
		    <Route path='/Messages' component={FoodView}/>
		    <Route path='/UserSettings' component={UserSettings} />
		    <Route path='/ItemCreation' component={ItemCreation} />
		    <Route path='/MapView' component={MapView} />
		    <Route path='/PrivateChat/:messagedUsername' component={PrivateChat} />
		    <Route path='/login' component={Accounts.ui.LoginForm} formState={STATES.SIGN_IN} />
		</Route>
	    </Router>
	, document.getElementById('render-target'));

    });
}

if (Meteor.isServer) {
    
    //Reset all the databases before we add the test data in.

    //Remove Users
    Meteor.users.remove({});

    //Remove Fooditems
    FoodItemsC.remove({});

    //Remove privateChat
    PrivateChatC.remove({});

    //Create user accounts
    var numUsers = 5;
    for(i = 0; i < numUsers; i++){
    	  Accounts.createUser({username:'tom'+i,email:'tom'+i+'@mail.com', password:'password'});
    }

    //Create food items by random users
    var numFoodItems = 20;
    var numPortions = 10;
    for(i = 0; i < numFoodItems; i++){
        currUser = Meteor.users.find().fetch()[Math.floor(Math.random()*numUsers)]
    	FoodItemsC.insert({
     		foodName: faker.lorem.words(),
      		foodDesc: faker.lorem.sentence(),
      		portionNo: Math.floor(Math.random()*numPortions),
      		portionsClaimed: 0,
      		imgURL: "https://garangleslarp.s3-eu-west-1.amazonaws.com/tom3/beansbeans.jpg",
      		owner: currUser._id,
      		username: currUser.username,
      		createdAt: new Date()
      	});
    	  
    }

    //Create comments by random users
    var numComments = 35;
    for(i = 0; i < numComments; i++){
          currUser = Meteor.users.find().fetch()[Math.floor(Math.random()*numUsers)];
    	  currItem = FoodItemsC.find().fetch()[Math.floor(Math.random()*numFoodItems)];
	      FoodItemsC.update({_id: currItem._id},{$push : {
	      	comments:{
			username: currUser.username,
	    		comment: faker.lorem.sentences(),
	    		createdAt: new Date()
			}}});
  
     }    
    
    //Create private messages between people
    var numMessages = 100;
    for(i = 0; i < numComments; i++){
    	  randNumFirst = Math.floor(Math.random()*numUsers);
	  randNumSecond = (randNumFirst + ((Math.floor(Math.random()*(numUsers-1)))+1) ) % numUsers;
          allUsers = Meteor.users.find().fetch();
	  firstUser = allUsers[randNumFirst].username;
	  secondUser = allUsers[randNumSecond].username;
          Meteor.call('addPrivateMessage',[firstUser,secondUser],firstUser,faker.lorem.sentences());
     }    
    
    Meteor.publish(   "sidebar", 
		      function (username){
		     	  ReactiveAggregate(	this, 
					    PrivateChatC,
					    [{$match:{between:{$in:[username]}}},{$sort:{createdAt:-1}}, {$group:{originalId:{$first:'$_id'},_id:'$between', message:{$first:'$message'}, createdAt:{$first:'$createdAt'}, seen:{$first:'$seen'}, username:{$first:'$username'}}},{$project:{_id:'$originalId',between:'$_id',message:'$message',createdAt:'$createdAt',seen:'$seen',username:'$username'}},{$sort:{createdAt:-1}}],					{clientCollection: "clientSidebar"}
			  );
		      });


}


