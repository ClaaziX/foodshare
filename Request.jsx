var {
    List,
    ListItem,
    Divider,
    Styles,
    IconButton,
    IconMenu,
    MenuItem,
    MoreVertIcon
    } = MUI;

const { NavigationMoreVert } = MUI.Libs;



Request = React.createClass({

	generateRequests(){

		const iconButtonElement = [
			<IconButton
			touch={true}
			tooltip="more"
			tooltipPosition="bottom-left"
			>
			<MoreVertIcon color={Styles.Colors.grey400} />
			</IconButton>
		];

		const rightIconMenu = [
			<IconMenu iconButtonElement={iconButtonElement}>
			<MenuItem>Reply</MenuItem>
			<MenuItem>Forward</MenuItem>
			<MenuItem>Delete</MenuItem>
			</IconMenu>
		];

		if(this.props.claims){
			return this.props.claims.map((claim) => {
				return (
					<ListItem
						primaryText={claim.username + " requested " + claim.portions + " portions"}
						key={this.props.key}
					/>

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