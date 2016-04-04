let {
    TextField,
    RaisedButton,
    Styles,
    List,
    ListItem,
    Avatar,
    Divider
} = MUI;

PrivateChat = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
	currentUser = Meteor.user() ? Meteor.user() : '';
	return {
	    currentUser: currentUser,
	    privateMessages: PrivateChatC.find(
		{ between: { $all: [currentUser, this.props.params.messagedUsername] } }
	    ).fetch()
	};
	
    },
    
    getInitialState(){
	return{
	    messageText:""
	}
    },


    generateChat : function (){
	if(this.data.privateMessages.messages){
	    return this.data.privateMessages.messages.map((message) => {
		return(

		    <div>
		       	<Comment
		       	    comment={message.message}
		       	    date={message.createdAt.toString()}
		       	    username={message.username}
		       	/>
		       	<br />
		    </div>

		)
	    });
	}

    },
    
    addMessage(event){
	event.preventDefault();
	
	var message = this.state.messageText;
	
	PrivateChatC.update({between: { $all: [currentUser, this.props.params.messagedUsername]}},
			    {$push:{
				comments:{
				    username: currentUsername,
				    message: message,
				    createAt: new Date()
				},
				
			    }
			    },
			    {upsert: true}
	);
	
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

    render : function () {
	console.log(this.props);
	
	return (
	    <div>
		<br/>
		<TextField hintText="You can leave a comment here" onChange={this.handleComment} value={this.state.messageText}/><br />
		<RaisedButton label="Submit" primary={true} onTouchTap={this.addMessage} /><br /><br />
		{this.generateChat()}
	    </div>
	);
    }
});
