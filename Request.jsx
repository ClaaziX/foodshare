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
    Avatar,
    FlatButton,
    Dialog
    } = MUI;

let {
    Colors
    } = Styles;


const { 
      SvgIcons,
      } = MUI.Libs;

const claimContentStyle = {
                width: '100%',
                maxWidth: 'none',
              };

Request = React.createClass({

	mixins: [ReactRouter.History],

	getInitialState(){
		return{
			openAccept: false,
			openReject: false,
			prtNo: 0,
			userName: "",
			claimID: "",
		}
	},

	generateRequests(){

		if(this.props.claims){
			return this.props.claims.map((claim) => {
				return (
					<div>
						{ claim.rejected ?
							""
						:
							<div>
								{ claim.accepted == 0 ?
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
								:
									<div>
									<ListItem
										primaryText={claim.username}
										secondaryText={"You have accepted " + claim.accepted + " out of " + claim.portions + "requested portions"}
										leftAvatar={<Avatar src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />}
										rightIcon={<SvgIcons.CommunicationChatBubble color='Grey' />}
										onTouchTap={this.getChatHandler(claim)}
									/>
									<Divider />
									</div>
								}
							</div>
						}
				    </div>
				);
			});
		}
	},

	getChatHandler: function(claim) {
  		handleChat = function(event) {
  			console.log("Open chat with " + claim.username)
			}
	  return handleChat
	},

	getAcceptHandler: function(claim) {
		var that = this;
  		handleAccept = function(event) {
			that.setState({
				prtNo: claim.portions,
				userName: claim.username,
				claimId: claim.parentId,
				openAccept: true,
			});
		}
		return handleAccept
	},

	getRejectHandler: function(claim) {
		var that = this;
  		handleReject = function(event) {
			that.setState({
				prtNo: claim.portions,
				userName: claim.username,
				claimId: claim.parentId,
				openReject: true,
			});
		}
		return handleReject
	},

	getCloseHandler: function(popType, reject) {
		var that = this;
		handleClose = function(event) {
		    if (popType == "accept"){
		        	that.setState({openAccept: false});
		        }else{
		        	if (popType == "reject"){
		        		that.setState({openReject: false});
		        		if(reject){
			        		FoodItemsC.update(
							{_id : that.props.id},
								{$set : { claims : {username: that.state.userName}, claims : {
									rejected : true,
									}
								}
							}
						);
		        	}
				}
			}
	    }
	    return handleClose

	},

	render(){

		const acceptActions = [     
			<ClaimControl 
				id={this.state.claimId}
				accept={true}
				username={this.state.userName}
				portionsLeft={this.state.prtNo}
				finishIt={this.getCloseHandler("accept", false)}
			/>,
			<FlatButton
				label="Cancel"
				secondary={true}
				onTouchTap={this.getCloseHandler("accept", false)}
			/>,
			];

		const rejectActions = [     
			<FlatButton
				label="Reject Claims!"
				primary={true}
				onTouchTap={this.getCloseHandler("reject", true)}
			/>,
			<FlatButton
				label="Cancel"
				secondary={true}
				onTouchTap={this.getCloseHandler("reject", false)}
			/>,
			];


		return(
			<div>
				<List subheader="Item Requests">
					<Divider />
					{this.generateRequests()}
				</List>
				<Dialog
					title="Accept"
					actions={acceptActions}
					modal={true}
					contentStyle={claimContentStyle}
					open={this.state.openAccept}
				>
					How many portions do you wish to accept?
				</Dialog>
				<Dialog
					title="Reject"
					actions={rejectActions}
					modal={true}
					contentStyle={claimContentStyle}
					open={this.state.openReject}
				>
					Do you really want to reject this claim?
				</Dialog>
			</div>
			);
		}

	});