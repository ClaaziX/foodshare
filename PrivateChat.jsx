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
    Divider,
    AppBar
} from 'material-ui';

import TimeSince from './TimeSince.jsx';

const PrivateChat = React.createClass({

    mixins: [ReactMeteorData],

 getMeteorData: function() {
	currentUser = Meteor.user() ? Meteor.user().username : '';
	return {
	    currentUser: currentUser,
	    privateMessages: PrivateChatC.find(
			{ between:
				{ $all: [currentUser, this.props.messagedUsername] } 
			}
	    ).fetch().sort(function(a, b){
	    	return a.createdAt - b.createdAt
	    })
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

    messagesSeen : function (){
	Meteor.call('markPMSeen', this.data.currentUser, this.props.messagedUsername);
	},
    
    addMessage(event){
		event.preventDefault();
		
		var message = this.state.messageText;

		Meteor.call('addPrivateMessage', [this.data.currentUser, this.props.messagedUsername], this.data.currentUser, message);

		this.setState({messageText: ""});
    },

    handleComment(event){
		this.setState({
		    messageText : event.target.value,
		});
    },

	componentWillUpdate: function() {
  		var node = ReactDOM.findDOMNode(this);
  		node.scrollTop = node.scrollHeight;
  	},

	componentDidUpdate: function() {
		var node = ReactDOM.findDOMNode(this);
  		node.scrollTop = node.scrollHeight;
	},

    render : function () {
		return (
			<div>
			<div className="headContain">
				<AppBar
				    title={this.props.messagedUsername}
			  	/>
			</div>
		    <div className="divPM" id="divPM" ref="divPM">
		    	<br/>
				<br/>
				{this.generateChat()}
				{this.messagesSeen()}
				<TextField hintText="You can leave a comment here" onChange={this.handleComment} value={this.state.messageText}/><br />
				<RaisedButton label="Submit" primary={true} onTouchTap={this.addMessage} /><br /><br />
		    </div>
		    </div>

		);
    }
});

export default PrivateChat;