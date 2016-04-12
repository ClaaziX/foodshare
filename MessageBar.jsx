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
	   		       return(
	   		       <ListItem	
			      		leftAvatar={<Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png"/>}
					rightIconButton={<SvgIcons.CommunicationChatBubble />}
					primaryText="Steven Username"
					secondaryText={
						<p>
							<span style={{color: Styles.Colors.darkBlack}}>The Date</span><br/>
							Little bit of the text from the messages
						</p>
						}
					secondaryTextLines={2}

			      />
	   		      );		       

	   		       },

	   getMeteorData: function(){
	   		  //[0].messages needs to be added to messages if it exists
	   		  currentUser = Meteor.user() ? Meteor.user().username : '';
			  return {
			  	    currentUser: currentUser,
				    messages: PrivateChatC.find({between: {$exists: true, $all: [currentUser]}}
				    	      	               ).fetch()[0]
		          };


		},


	   render : function(){
	   	  console.log(this.data.messages?'true':'false');
	   	  return(
			<List subheader="Messages">
			      {this.renderMessagesList()}
			</List>
		  );

	   }

})