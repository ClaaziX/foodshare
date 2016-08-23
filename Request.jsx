import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
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
    } from 'material-ui';

import {
    Colors
    } from 'material-ui';


import { 
      SvgIcons
      } from 'material-ui/svg-icons';

const claimContentStyle = {
                width: '100%',
                maxWidth: 'none',
              };

Request = React.createClass({

	getInitialState(){
		return{
			openAccept: false,
			openReject: false,
			prtNo: 0,
			userName: "",
			claimId: "",
			date: "",
		}
	},

	generateRequests(){

		if(this.props.claim){
			return this.props.claim.map((item) => {
				return (
					<div>

						{ item.claim.rejected ?
							""
						:
							<div>
								{ item.claim.accepted == 0 ?
									<div>
									<ListItem
										primaryText={item.foodName}
										secondaryText={item.claim.username + "has requested " + item.claim.portions + " portions"}
										leftAvatar={<Avatar src={item.imgURL} />}
										primaryTogglesNestedList={true}
										nestedItems={[
				             				 <ListItem
				             				 	key={1}
				             				 	primaryText="Accept"
				             				 	leftIcon={<SvgIcons.ActionCheckCircle color='Green'/>}
				             				 	onTouchTap={this.getAcceptHandler(item.claim)}
				             				 />,
				             				 <ListItem
				             				 	key={2}
				             				 	primaryText="Reject"
				             				 	leftIcon={<SvgIcons.ContentBlock color='Red'/>}
				             				 	onTouchTap={this.getRejectHandler(item.claim)}
				             				 />,
				            			]}

									/>
									<Divider />
									</div>
								:
									<div>
									<ListItem
										primaryText={item.foodName}
										secondaryText={"You have accepted " + item.claim.accepted + " out of " + item.claim.portions + " requested portions"}
										leftAvatar={<Avatar src={item.imgURL} />}
										rightIcon={<SvgIcons.CommunicationChatBubble color='Grey' />}
										onTouchTap={this.getChatHandler(item.claim)}
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
				date: claim.createdAt,
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
				date: claim.createdAt,
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
			}
			if (popType == "reject"){
				if(reject){
					Meteor.call('rejectClaim', that.state.claimId, that.state.userName, that.state.date)
				}
				that.setState({openReject: false});
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
				label="Reject Claim!"
				primary={true}
				onTouchTap={this.getCloseHandler("reject", true)}
			/>,
			<FlatButton
				label="Cancel"
				secondary={true}
				onTouchTap={this.getCloseHandler("reject", false)}
			/>,
			];
console.log("Request called...")

		return(
			<div>
				<List>
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