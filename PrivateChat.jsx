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
    AppBar,
    Dialog,
    IconButton
} from 'material-ui';

import SvgIcons from 'material-ui/svg-icons';

import { 
	green900
} from 'material-ui/styles/colors';

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
			messageText:"",
			openDia: false
		}
    },


    generateChat : function (){
    	var prvUsr;
		if(this.data.privateMessages){
		    return this.data.privateMessages.map((message) => {
		    	var same = false
		    	var currUsr = message.username;
		    	if (!prvUsr){
		    		same = true;
		    	}
		    	if (prvUsr){
		    		if (prvUsr == currUsr){
		    			same = true;
		    		}
		    	}
		    	prvUsr = currUsr;
				return(
				       	<Comment
				       	    comment={message.message}
				       	    date={this.calcTime(message.createdAt)}
				       	    username={message.username}
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

    deleteMessage(){

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

	openCompDia () {
		this.setState({openDia: true})
	},

	handleCancel () {
		this.setState({openDia: false})
	},

	deleteChat(){
		this.deleteMessage()
		this.setState({openDia: false})
		Meteor.call('deletePrivateMessage', [this.data.currentUser, this.props.messagedUsername]);

	},

    render() {
    	var winHeight = window.innerHeight - 64;
		const actions = [
			<RaisedButton
			label="Completed"
			primary={true}
			onTouchTap={this.deleteChat}
			style={{marginRight: "12px"}}
			/>,
			<RaisedButton
			label="Cancel"
			secondary={true}
			onTouchTap={this.handleCancel}
			/>,
		];
		const diaTxt = "CAUTION: This will delete the chat permanently!";
		return (
			<div id='containerDiv'>

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
				<div style={{height: "135px"}}></div>
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

					<div className="textSubmit-item">

						<RaisedButton
							label="Completed"
							primary={true}
							onTouchTap={this.openCompDia}
							fullWidth={true}
						/>

					</div>

				</div>
		    </div>
		    </Scrollbars>
			<Dialog
				title="Mark Exchange As Completed?"
				actions={actions}
				modal={true}
				open={this.state.openDia}
			>
			<h3>{diaTxt}</h3>
			</Dialog>

		    </div>

		);
    }
});

export default PrivateChat;