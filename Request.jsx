let {
    ActionInfo,
    List,
    ListItem,
    Divider,
    IconButton,
    Styles,
    MoreVertIcon,
    IconMenu,
    MenuItem,
    Avatar
    } = MUI;

let {
    Colors
    } = Styles;


const { 
      SvgIcons,
      } = MUI.Libs;

Request = React.createClass({

generateRequests(){

		if(this.props.claims){
			return this.props.claims.map((claim) => {
				var userName = claim.username;
				var prtNo = claim.portions;
				return (
				       <div>
					<ListItem
						primaryText={userName}
						secondaryText={"Has requested " + prtNo + " portions"}
						leftAvatar={<Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />}
						primaryTogglesNestedList={true}
						nestedItems={[
             				 <ListItem
             				 	key={1}
             				 	primaryText="Accept"
             				 	leftIcon={<SvgIcons.ActionCheckCircle color='Green'/>}
             				 	onTouchTap={this.handleAccept(userName, prtNo)}
             				 />,
             				 <ListItem
             				 	key={2}
             				 	primaryText="Reject"
             				 	leftIcon={<SvgIcons.ContentBlock color='Red'/>} 
             				 	onTouchTap={this.handleReject(userName)}
             				 />,
            			]}

					/>
					<Divider />
				       </div>
				);
			});
		}
	},

	handleAccept : function (user, prtn) {
		console.log("Accept!")
		console.log(user, prtn)
	},

	handleReject : function (user) {
		console.log("Reject!")
		console.log(user)
	},


	render(){
		return(
			<List subheader="Item Requests">
				<Divider />
				{this.generateRequests()}
			</List>
			);
		}

	});