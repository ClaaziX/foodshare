var {
    List,
    ListItem,
    Avatar,
    Styles
} = MUI;

var {SvgIcons}=MUI.Libs;
MessageBar = React.createClass({

	   render : function(){

	   	  return(

			<List subheader="Messages">
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
			</List>

		  );

	   }

})