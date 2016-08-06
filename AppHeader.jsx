import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory, withRouter } from 'react-router';

import ItemCreation from './ItemCreation.jsx'
import AppBar from 'material-ui/AppBar';
import MessageBar from './MessageBar.jsx';
import {
    AppCanvas,
    Dialog,
    Styles,
    RaisedButton,
    IconMenu,
    IconButton,
    MenuItem,
    MoreVertIcon,
    TextField,
    NavigationClose,
    Avatar,
    DatePicker,
    Tabs,
    Tab,
    Slider,
    FlatButton,
    Snackbar,
    SwipeableViews,
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    ToolbarTitle,
    Badge,
    Drawer,
    FontIcon, 

    } from 'material-ui'

import SvgIcons from 'material-ui/svg-icons';

import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import MapsMap from 'material-ui/svg-icons/maps/map';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const logoutContentStyle = {
								width: '100%',
								maxWidth: 'none',
							};

const AppHeader = React.createClass({

	mixins: [ReactMeteorData],

	contextTypes : {
   		     router: React.PropTypes.object
  		     },

	getInitialState(){
	    return{
			openLogout: false,
			openLogMess: false,
			openNav: false,
	    }
	},

	getMeteorData(){
		return{
			currentUser: Meteor.user() ? Meteor.user().username : ''
			};
	},

    handleLogout : function () {
    	Meteor.logout();
		this.setState({openLogout: false});
		browserHistory.push('/login');
		this.logOutPop();
    },

    logOutPop : function () {
    	this.setState({openLogMess: true});
    },

    handleOpen : function () {
    	this.setState({openLogout: true});
    },

    handleClose : function () {
    	this.setState({openLogout: false});
    },

	handleRequestClose : function () {
    	this.setState({openLogMess: false});
    },

    handlePassChange : function () {
		browserHistory.push('/login');
		this.setState({openLogout: false});
    },

	
	handleActiveTab : function(path) {
	    activeTab = function (event) {
    		browserHistory.push(path);
    	}
    	return activeTab
    },

    handleOpenNav: function () {
    	this.setState({openNav: true});
    },

    handleCloseNav: function () {
    	this.setState({openNav: false});
    },

	handleBackClick : function () {
		this.context.router.goBack();
	},

    render : function(){

    	var winWidth = window.innerWidth;
		const actions = [
			<FlatButton
			label="Logout"
			primary={true}
			onTouchTap={this.handleLogout}
			/>,
			<FlatButton
			label="Change Password"
			primary={true}
			onTouchTap={this.handlePassChange}
			/>,
			<FlatButton
			label="Cancel"
			secondary={true}
			onTouchTap={this.handleClose}
			/>,
		];

	    return(
		<div className="bigBoy">
		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
	
		<div className="container">

			<div className="headContain">
				<AppBar
				    title="Food Sharing"
				    iconElementLeft={
				    	<IconButton onTouchTap={this.handleBackClick}>
							<SvgIcons.ContentReply color='White'/>
						</IconButton>}
				    iconElementRight={
						<IconButton containerElement={<Link to={'/ItemCreation'} />}>
							<SvgIcons.ContentAddCircle color='White'/>
						</IconButton>}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
		  		/>
		  	</div>

		  	<div className="toolContain">
		  		<Toolbar>
		  			<ToolbarGroup firstChild={true}>
		  				{ Meteor.userId() ?
							<div>
								<IconButton onTouchTap={this.handleOpen} tooltip="Account" tooltipPosition="bottom-right"> 
									<SvgIcons.ActionAccountCircle color='Black'/>
								</IconButton>
								<Dialog
									title="Logout"
									actions={actions}
									modal={true}
									contentStyle={logoutContentStyle}
									open={this.state.openLogout}
								>
								Do you wish to logout?
								</Dialog>
							</div>
					    :
					    	<div>
								<IconButton containerElement={<Link to={'/login'} />} tooltip="Account" tooltipPosition="bottom-right"> 
									<SvgIcons.ActionAccountCircle color='Black'/>
								</IconButton>
							</div>
					    }
		  			</ToolbarGroup>
		  			<ToolbarGroup lastChild={true}>
  						<IconButton onTouchTap={this.handleOpenNav} tooltip="Messages" tooltipPosition="bottom-left"> 
							<SvgIcons.CommunicationForum color='Black'/>
						</IconButton>
		  			</ToolbarGroup>
		  		</Toolbar>
		  	</div>

			<div className="contentContain">
				{this.props.children}
			</div>

		    <div className="tabsContain">

				<Tabs>
					<Tab
						icon={<ActionDashboard />} 
						label="ITEM VIEW"
						onActive={this.handleActiveTab("/")}
					/>
					<Tab
						icon={<MapsMap />}
						label="MAP VIEW"
						onActive={this.handleActiveTab("/MapView")}
					/>
					<Tab
						icon={<MapsPersonPin />}
						label="YOUR ITEMS"
						onActive={this.handleActiveTab("/Messages")}
					/>
				</Tabs>

			</div>
			<div>
				<Drawer
					width={winWidth}
					openSecondary={true}
					open={this.state.openNav}
					docked={false}
					onRequestChange={this.handleCloseNav}
				>
					<div className="headContain">
						<AppBar
						    title="Messages"
						    iconElementLeft={
						    	<IconButton onTouchTap={this.handleCloseNav}>
									<SvgIcons.ContentBackspace color='White'/>
								</IconButton>}
						    iconElementRight={
								<IconButton onTouchTap={this.handleOpen}>
									<SvgIcons.ActionSettings color='White'/>
								</IconButton>}
							targetOrigin={{horizontal: 'right', vertical: 'top'}}
				  		/>
		  			</div>
					{this.data.currentUser == '' ? 
						<div className="vertAlign">
						You have no messages, go share some food! :)
	    				</div>
					: 
						<MessageBar/>}
				</Drawer>
        	</div>
			<div>
				<Snackbar
					open={this.state.openLogMess}
					message="You've been logged out!"
					autoHideDuration={3600}
					onRequestClose={this.handleRequestClose}
					action="Close"
					onTouchTap={this.handleRequestClose}
				/>
			</div>

		</div>
		</MuiThemeProvider>
		</div>
	    );

    }
});


export default AppHeader;