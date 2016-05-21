var {
    List,
    ListItem,
    Avatar,
    Styles
} = MUI;

var {SvgIcons}=MUI.Libs;

MessageBar = React.createClass({

    mixins: [ReactMeteorData],

    renderMessagesList: function(){
	if(this.data.privateMessages){
	    return this.data.privateMessages.map((message) => {

		return(
		    <ListItem	
                        leftAvatar={<Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png"/>}
			rightIconButton={<SvgIcons.CommunicationChatBubble color={Styles.Colors.red500}/>}
			primaryText={message.username}
			secondaryText={
			    <p>
				<span style={{color: Styles.Colors.darkBlack}}>{message.createdAt.toDateString()}</span><br/>
					    {message.message}
			    </p>
				      }
			secondaryTextLines={2}

		    />
		)
	    });
	}

    },

    getMeteorData: function(){
        Meteor.subscribe("sidebar")
	currentUser = Meteor.user() ? Meteor.user().username : '';
	return {
	    currentUser: currentUser,
	    privateMessages: clientSidebar.find().fetch()
	};


    },


    render : function(){
	return(
	    <List subheader="Messages">
		{this.renderMessagesList()}
	    </List>
	);

    }

})
