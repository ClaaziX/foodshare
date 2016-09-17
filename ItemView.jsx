import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
    TextField,
    RaisedButton,
    FlatButton,
    Dialog,
    Snackbar,
    IconButton,
    Paper
} from 'material-ui';

import TimeSince from './TimeSince.jsx';
import { Scrollbars } from 'react-custom-scrollbars';
import ContentSend from 'material-ui/svg-icons/content/send';

import { 
	lightGreenA200,
	lightGreen600,
	green900,
	blueGrey300,
	blueGrey900,
	blueGrey600,
	grey50
} from 'material-ui/styles/colors';


var prvUsr;
var actions = [];
const styles = {
  claim: {
	width: '100%',
	maxWidth: 'none',
    },
  smallIcon: {
    width: 25,
    height: 25,
  },
  small: {
    width: 50,
    height: 50,
    padding: 8,
  },
  paper:  {
	  padding: '0px 0px 0px 10px',
	  textAlign: 'center',
	  display: 'inline-block',
	  width: '100%'
	}
};

ItemView = React.createClass({
    
    mixins: [ReactMeteorData],

    getMeteorData() {

	return {
		foodItem: (FoodItemsC.find({_id: this.props.params.itemID}).fetch()[0])};
    },

    getInitialState() {
		return {
		    openClaim: false,
		    alreadyClaimed: false,
		    claimPop: false,
		    actions: [],
		    commentText:"",
		}
    },

    genClaimMess : function () {
	if (this.state.alreadyClaimed){
	    return "You've already claimed that item!"
	}else{
	    return "Item claimed! Please wait for a response."
	}
    },

    handleRequestClose : function () {
	this.setState({claimPop: false});
    },

    handleOpen : function (item) {
    	console.log("handleOpen called..")
		this.genActions(item);
		this.setState({openClaim: true});
    },

    handleClose : function (alreadyClaimed) {
	this.setState({openClaim: false});
	this.setState({alreadyClaimed: alreadyClaimed});
	this.setState({claimPop: true});
    },

    genActions : function (item) {
		actions = [     
		    <ClaimControl 
			id={item._id}
			claims={item.claims}
			portions={item.portionNo}
			username={Meteor.user().username}
			portionsLeft={item.portionNo - this.calculatePortionsLeft(item)}
			accept={false}
			finishIt={this.handleClose}
		    />,
		    <FlatButton
			label="Cancel"
			secondary={true}
			onTouchTap={this.handleClose}
		    />
		];
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
		if (this.state.commentText !== ""){
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
			this.setState({commentText:""});
		}
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
	    <div className="fillDiv">
	    	<div>
		 		<FoodItems
		 			key={this.data.foodItem._id}
		 			foodItem={this.data.foodItem}
		 			calculatePortionsLeft={this.calculatePortionsLeft}
		 			handlePop={this.handleOpen}
		 		/>
		 	</div>
		 	<div>
			 	<Paper style={styles.paper} zDepth={5}>
					<div className="leftcolumn">
						<TextField style={{color: 'white'}} hintText="You can leave a comment here" onKeyDown={this.keyDown} onChange={this.handleComment} value={this.state.commentText}/>
					</div>
					<div className="rightcolumn">
					    <IconButton
					      iconStyle={styles.smallIcon}
					      style={styles.small}
					      onTouchTap={this.addComment}
					    >
					      <ContentSend color={lightGreenA200} />
					    </IconButton>
					</div>
				</Paper>
			</div>
		 	<Scrollbars style={{ height: 285, position: 'relative' }}>
		 	<div>
				{this.renderComments()}
			</div>
			</Scrollbars>

		<Snackbar
	     	open={this.state.claimPop}
	     	message={this.genClaimMess()}
	     	autoHideDuration={3600}
	     	action="Close"
	     	onTouchTap={this.handleRequestClose}
	     	onRequestClose={this.handleRequestClose}
	     />
	     <Dialog
	      	title="Claim!"
	      	actions={actions}
	      	modal={true}
	      	contentStyle={styles.claim}
	      	open={this.state.openClaim}
	      >
	      	How many portions do you wish to claim?
	     </Dialog>

	    </div>
	);
    }
});
