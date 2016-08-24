import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
    TextField,
    RaisedButton
} from 'material-ui';

import TimeSince from './TimeSince.jsx';

ItemView = React.createClass({
    
    mixins: [ReactMeteorData],

    getMeteorData() {

	return {
	    foodItem: (FoodItemsC.find({_id: this.props.params.itemID}).fetch()[0])
	};
	
    },

    getInitialState(){
	return{
	    commentText:""
	}
    },

    renderComments(){
	if (this.data.foodItem.comments){
	    return this.data.foodItem.comments.map((message) => {
		return(
				    <div>
				       	<Comment
				       	    comment={message.message}
				       	    date={this.calcTime(message.createdAt)}
				       	    username={message.username}
				       	/>
				       	<br />
				    </div>

			)
		    });
		}
		
    },

	calcTime: function(date){
		return(
			<TimeSince time={date} />
			);
	},

    handleComment(event){
	this.setState({
	    commentText : event.target.value,
	});
    },

    addComment(event) {
	event.preventDefault();
	var comment = this.state.commentText
	console.log(this.state.commentText);
	FoodItemsC.update({_id: this.data.foodItem._id},{$push : {
	    comments:{
		username: Meteor.user().username,
		comment: comment,
		createdAt: new Date()
	    }
	}});

	this.setState({commentText:null});
	console.log(this.state.commentText);


    },

    calculatePortionsLeft(item){
	    var x = 0;
	    var claims = item.claims;
	    if (claims){
	      for(claim in claims){
	              x = x + claims[claim].accepted;
	        }
	    } return x
  },

    render : function () {
	return (
	    <div>

	 	<FoodItems key={this.data.foodItem._id} foodItem={this.data.foodItem} calculatePortionsLeft={this.calculatePortionsLeft} /><br />

		<TextField hintText="You can leave a comment here" onChange={this.handleComment} value={this.state.commentText}/><br />

		<RaisedButton label="Submit" primary={true} onTouchTap={this.addComment} /><br /><br />

		{this.renderComments()}

	    </div>
	);
    }
});
