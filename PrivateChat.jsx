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
    IconButton,
    Paper
} from 'material-ui';

import SvgIcons from 'material-ui/svg-icons';

import { Scrollbars } from 'react-custom-scrollbars';
import ContentSend from 'material-ui/svg-icons/content/send';

import TimeSince from './TimeSince.jsx';

import { 
	lightGreenA200,
	lightGreen600,
	green900,
	blueGrey300,
	blueGrey900,
	blueGrey600,
	grey50
} from 'material-ui/styles/colors';



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
				<div style={{ position: 'fixed', bottom: '0px', width: '100%' }}>
				 	<Paper style={styles.paper} zDepth={5}>
						<div className="leftcolumn">
							<TextField
								style={{color: 'white'}}
								hintText=""
								onKeyDown={this.keyDown}
								onChange={this.handleComment}
								value={this.state.commentText}
							/>
						</div>
						<div className="rightcolumn">
						    <IconButton
						      iconStyle={styles.smallIcon}
						      style={styles.small}
						      onTouchTap={this.addMessage}
						    >
						      <ContentSend color={lightGreenA200} />
						    </IconButton>
						</div>
					</Paper>
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