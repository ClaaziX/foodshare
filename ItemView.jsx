import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
    TextField,
    RaisedButton
} from 'material-ui';

import TimeSince from './TimeSince.jsx';

var prvUsr;

ItemView = React.createClass({
    
    mixins: [ReactMeteorData],

    getMeteorData() {

	return {
	    foodItem: (FoodItemsC.find({_id: this.props.params.itemID}).fetch()[0])
	};
	
    },

    getInitialState(){
		return{
		    commentText:"",
		}
    },


    renderComments(){

		if (this.data.foodItem.comments){
		    return this.data.foodItem.comments.map((message) => {
    			var currUsr = message.username;
    			var same = false;
				if(currUsr == prvUsr){
					same = true;
				}else{prvUsr = currUsr;}
				prvUsr = currUsr;
				return(

				       	<Comment
				       	    comment={message.comment}
				       	    date={this.calcTime(message.createdAt)}
				       	    username={currUsr}
				       	    same={same}
				       	/>
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
	    if (event){
			event.preventDefault();
		}
		FoodItemsC.update({_id: this.data.foodItem._id},{$push : {
		    comments:{
			username: Meteor.user().username,
			comment: this.state.commentText,
			createdAt: new Date()
		    }
		}});
		this.setState({commentText:null});
    },

    keyDown (value) {
    	if (value.keyCode == 13){
    		this.addComment()
    	}
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
	    	<div className="itemVimg">
	    		<img className="fillDiv" src={this.data.foodItem.imgURL} />
	    	</div>
	    	<div className="bottomPad">
		 		<FoodItems key={this.data.foodItem._id} foodItem={this.data.foodItem} calculatePortionsLeft={this.calculatePortionsLeft} />
		 	</div>
		 	<div>
				{this.renderComments()}
			</div>
		 	<div style={{padding: "20px"}}>
				<div>
					<TextField hintText="You can leave a comment here" onKeyDown={this.keyDown} onChange={this.handleComment} value={this.state.commentText}/>
				</div>
				<div>
					<RaisedButton label="Submit" primary={true} onTouchTap={this.addComment} />
				</div>
			</div>
	    </div>
	);
    }
});
