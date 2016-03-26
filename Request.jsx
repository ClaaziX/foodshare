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
				return (
				       <div>
					<ListItem
						primaryText={claim.username}
						secondaryText={"Has requested " + claim.portions + " portions"}
						leftAvatar={<Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />}
						primaryTogglesNestedList={true}
						nestedItems={[
             				 <ListItem
             				 	key={1}
             				 	primaryText="Accept"
             				 	leftIcon={<SvgIcons.ActionCheckCircle color='Green'/>}
             				 	onTouchTap={this.getAcceptHandler(claim)}
             				 />,
             				 <ListItem
             				 	key={2}
             				 	primaryText="Reject"
             				 	leftIcon={<SvgIcons.ContentBlock color='Red'/>}
             				 	onTouchTap={this.getRejectHandler(claim)}
             				 />,
            			]}

					/>
					<Divider />
				       </div>
				);
			});
		}
	},

	getAcceptHandler: function(claim) {
  		handleAccept = function(event) {
  			console.log("Accept")
  			console.log(claim)
			console.log(claim.username)
			console.log(claim.portions)
		}
	  return handleAccept
	},

	getRejectHandler: function(claim) {
  		handleReject = function(event) {
  			console.log("Reject")
			console.log(claim)
		}
	  return handleReject
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