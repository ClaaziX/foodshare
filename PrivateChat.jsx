import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
    TextField,
    RaisedButton,
    Styles,
    List,
    ListItem,
    Avatar,
    Divider
} from 'material-ui';

const PrivateChat = React.createClass({

    mixins: [ReactMeteorData],

 getMeteorData() {
	currentUser = Meteor.user() ? Meteor.user().username : '';
	return {
	    currentUser: currentUser,
	    privateMessages: PrivateChatC.find(
		{ between: { $all: [currentUser, this.props.messagedUsername] } }
	    ).fetch().sort({ createdAt: -1 })
	};
	
    },
    
    getInitialState(){
	return{
	    messageText:""
	}
    },


    generateChat : function (){
		if(this.data.privateMessages){
		    return this.data.privateMessages.map((message) => {
				return(

				    <div>
				       	<Comment
				       	    comment={message.message}
				       	    date={message.createdAt}
				       	    username={message.username}
				       	/>
				       	<br />
				    </div>

			)
		    });
		}
		
    },

    messagesSeen : function (){
	Meteor.call('markPMSeen', this.data.currentUser, this.props.messagedUsername);
	},
    
    addMessage(event){
		event.preventDefault();
		
		var message = this.state.messageText;

		Meteor.call('addPrivateMessage', [this.data.currentUser, this.props.messagedUsername], this.data.currentUser, message);

		this.setState({messageText:null});
    },

    handleComment(event){
		this.setState({
		    messageText : event.target.value,
		});
    },

    handleOpenChat : function (owner, claimer, ID) {
	console.log(owner, claimer, ID)
	    console.log("open chat in new left nav bar")
    },

	componentDidUpdate() {
  		var objDiv = document.getElementById('divPM');
		objDiv.scrollTop = objDiv.scrollHeight;
	},

    render : function () {

	console.log(this.data.privateMessages);
	return (

	    <div className="divPM" id="divPM" ref="divPM">
			<br/>
			{this.generateChat()}
			{this.messagesSeen()}
			<TextField hintText="You can leave a comment here" onChange={this.handleComment} value={this.state.messageText}/><br />
			<RaisedButton label="Submit" primary={true} onTouchTap={this.addMessage} /><br /><br />
	    </div>

	);
    }
});

export default PrivateChat;