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
		    	{ between: { $all: [currentUser,this.props.params.messagedUsername] } }
		    ).fetch()
		};
	
	},
	
    getInitialState(){
	return{
	    commentText:"You can leave a comment here"
	}
    },


	generateChat : function (){
		if(this.data.privateMessages.messages){
		    return this.data.privateMessages.messages.map((chat) => {
				if(chat.owner == this.data.currentUser){
					return
						<div>
							<ListItem
								leftAvatar={<Avatar src="/imgs/bob.jpg" />}
								primaryText={chat.claimer}
								secondaryText={
						            <p>
						              <span style={{color: Styles.Colors.darkBlack}}>Name of food item</span>
						            </p>
									}
								secondaryTextLines={1}
								onTouchTap={this.handleOpenChat(chat.owner, chat.claimer, claim.parentId)}
							/>
							<Divider inset={true} />
						</div>
				}
			});
		}
	},
        

    handleComment(event){
	this.setState({
	    commentText : event.target.value,
	});
    },

	handleOpenChat : function (owner, claimer, ID) {
		console.log(owner, claimer, ID)
		console.log("open chat in new left nav bar")
	},

	render : function () {
		 return (
		     <div>
			 <TextField hintText={this.state.commentText} onChange={this.handleComment}/><br />
			 <RaisedButton label="Submit" primary={true} onTouchTap={this.addComment} /><br /><br />
			 {this.generateChat()}
		     </div>
		 );
	}
});
