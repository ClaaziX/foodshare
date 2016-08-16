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

import { Scrollbars } from 'react-custom-scrollbars';

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

		if (message == ""){
			return;
		}

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
		var node = ReactDOM.findDOMNode(this.refs.divPM);
		var container = document.getElementsByClassName('containerRoot')[0]
  		container.scrollTop = node.scrollHeight;
	},

	componentDidMount () {
		this.refs.scrollbars.scrollToBottom();
	},

    render : function () {
    	var winHeight = window.innerHeight - 64;
		return (
			<div id='containerDiv'>
			<div className="headContain">
				<AppBar
				    title={this.props.messagedUsername}
			  	/>
			</div>
			<Scrollbars
				style={{ position: 'relative' }}
				ref="scrollbars"
				autoHeight={true}
				autoHeightMax={winHeight}
				hideTracksWhenNotNeeded={true}
			>
		    <div className="divPM" id="divPM" ref="divPM">
		    	<br/>
				<br/>
				{this.generateChat()}
				{this.messagesSeen()}
				<div className="textSubmit-container">
					<div className="textSubmit-item">
						<RaisedButton
							label="Submit"
							primary={true}
							onTouchTap={this.addMessage}
						/>
					</div>
					<div className="textSubmit-item">
						<TextField
							fullWidth={true}
							hintText="You can leave a comment here"
							onChange={this.handleComment}
							value={this.state.messageText}
							multiLine={true}
							rows={2}
							rowsMax={4}
						/>
					</div>

				</div>
		    </div>
		    </Scrollbars>
		    </div>

		);
    }
});

export default PrivateChat;