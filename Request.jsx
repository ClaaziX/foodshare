let {
    ActionInfo,
    List,
    ListItem,
    Divider,
    IconButton,
    Styles,
    MoreVertIcon,
    IconMenu,
    MenuItem
    } = MUI;

let {
    Colors
    } = Styles;


const { 
      SvgIcons,
      } = MUI.Libs;

Request = React.createClass({

	generateRequests(){

		var iconButtonElement = (
			<IconButton
			touch={true}
			tooltip="more"
			tooltipPosition="bottom-left"
			>
			<SvgIcons.NavigationMoreVert color={Colors.grey400} />
			</IconButton>
		);

		var rightIconMenu = (
		    <IconMenu iconButtonElement={iconButtonElement}>
				<MenuItem>Accept</MenuItem>
				<MenuItem>Reject</MenuItem>
				<MenuItem>Message</MenuItem>
		    </IconMenu>
		    );

		console.log(iconButtonElement)
		if(this.props.claims){
			return this.props.claims.map((claim) => {
				return (
				       <div>
					<ListItem
						primaryText={claim.username + " requested " + claim.portions + " portions"}
						rightIconButton={rightIconMenu}
					/>
					<Divider />
				       </div>
				);
			});
		}
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