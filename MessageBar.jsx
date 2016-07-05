var {
    List,
    ListItem,
    Avatar,
    Styles,
    LeftNav
} = MUI;

var {SvgIcons}=MUI.Libs;

const { Link } = ReactRouter;

MessageBar = React.createClass({

    mixins: [ReactMeteorData],

    getInitialState(){
	    return{
			openNav: false,
			userCurr: "noone",
	    }
	},

    renderMessagesList: function(){

	if(this.data.privateMessages){
	    return this.data.privateMessages.map((message) => {
			item = 
				<ListItem	
			        leftAvatar={<Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png"/>}
					
					rightIconButton={
						!message.seen && message.username != this.data.currentUser ? <SvgIcons.CommunicationChatBubble /> : ''
					}
					onTouchTap={
						this.openPmess(message.username)
					}
					primaryText={message.username}
					secondaryText={
					    <p>
						<span style={{color: Styles.Colors.darkBlack}}>{message.createdAt.toDateString()}</span><br/>
						{message.message}
					    </p>
					}
					secondaryTextLines={2}

				/>
			
			return(item)
	    });
	}
	},

	openPmess: function(currUs) {
		var that = this;
  		handleOpen = function(event) {
  			that.setState({openNav: true, userCurr: currUs});
			}
	  return handleOpen
	},

    getMeteorData: function(){
        Meteor.subscribe("sidebar")
		currentUser = Meteor.user() ? Meteor.user().username : '';
		return {
		    currentUser: currentUser,
		    privateMessages: clientSidebar.find().fetch()
		};
    },

    handleCloseNav: function () {
    	this.setState({openNav: false});
    },


    render : function(){
    	var winWidth = window.innerWidth - (window.innerWidth*0.80);
	return(
		<div>
		    <List subheader="Messages">
			{this.renderMessagesList()}
		    </List>
		    <div>
				<LeftNav
					width={winWidth}
					openRight={true}
					open={this.state.openNav}
					docked={false}
					onRequestChange={this.handleCloseNav}
				>
					<PrivateChat messagedUsername={this.state.userCurr} />
				</LeftNav>
			</div>
		</div>
	);

    }

})
