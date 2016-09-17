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
    AutoComplete,
} from 'material-ui'

import SvgIcons from 'material-ui/svg-icons';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import MapsMap from 'material-ui/svg-icons/maps/map';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';

import login from './login.jsx';

const logoutContentStyle = {
    width: '100%',
    maxWidth: 'none',
};

import { 
	lightGreenA200,
	lightGreen600,
	green900,
	blueGrey300,
	blueGrey900,
	blueGrey600,
	grey50
} from 'material-ui/styles/colors';

import { Scrollbars } from 'react-custom-scrollbars';

const muiTheme = getMuiTheme({
	palette: {
		primary1Color: lightGreenA200,
		primary2Color: lightGreen600,
		primary3Color: green900,
		accent1Color: blueGrey300,
		accent2Color: blueGrey600,
		accent3Color: blueGrey900,
		alternateTextColor: green900,
	},
	textField: {
		textColor: green900,
	},
	card: {
		titleColor: green900,
	},
	snackbar: {
		textColor: grey50,
	},
});

const tabStyle = {
    color: green900,
};

const AppHeader = React.createClass({

    mixins: [ReactMeteorData],

    contextTypes : {
   	router: React.PropTypes.object
    },

	getInitialState(){
		return{
			messageUser:'',
			openLogout: false,
			openLogMess: false,
			openNav: false,
			filter : '',
		}
	},

    getMeteorData: function(){
	
	currentUser = Meteor.user() ? Meteor.user() : '';

	queryS = '.*'+this.state.filter+'.*';

    	if (this.props.location.pathname=='/YourItems'){
	    listMessageQuery = {username : currentUser.username};
	} else {
	    listMessageQuery = {username : {'$ne' : currentUser.username}};
	}


	filterQuery = {foodName : {'$regex' : queryS}};

	return {
	    foodItems: FoodItemsC.find({'$and' : [filterQuery, listMessageQuery]}, {sort: {createdAt: -1}}).fetch(),
	    currentUser: currentUser,
	    privateMessages: clientSidebar.find().fetch()
	};

    },

    filterList(event) {
	this.setState({
	    filter: event
	});
    },

    componentDidMount() {
	var el = ReactDOM.findDOMNode(this);
	var childs = el.getElementsByTagName("h1");
	    var h1 = childs[0];
	h1.style["background-image"] = 'url("/imgs/LogoNameMedium.png")';
	h1.style["background-size"] = "auto 85%";
	h1.style["background-repeat"] = "no-repeat";
	h1.style["background-position"] = "center";

	var h2 = childs[1];
	h2.style["color"] = "#1b5e20";
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
    resetState: function(){
        this.setState({messageUser:''});
    },

    handleOpenMessage: function(user){

        this.setState({openNav:true,messageUser:user});
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

	var searchNames = FoodItemsC.find().map(function(foodItem) {
  	    return foodItem.foodName;
	});
	return(
	    <div className="bigBoy">
		<MuiThemeProvider muiTheme={muiTheme}>
		    <div className="phone">
			<div className="container">

			    <div className="headContain">
				<AppBar
				    title=""
				    iconElementLeft={
				    	<IconButton onTouchTap={this.handleBackClick}>
					    <SvgIcons.ContentReply color={green900} />
					</IconButton>}
				    iconElementRight={
					<IconButton containerElement={<Link to={'/ItemCreation'} />}>
					    <SvgIcons.ContentAddCircle color={green900} />
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
						  <SvgIcons.ActionAccountCircle color='White'/>
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
						  <SvgIcons.ActionAccountCircle color='White'/>
					      </IconButton>
					  </div>
					}
		  		    </ToolbarGroup>
		  		    <ToolbarGroup style={{bottom:'35%'}}>
					<AutoComplete
					    floatingLabelText="Search..."
					    filter={AutoComplete.caseInsensitiveFilter}
					    dataSource={searchNames}
					    onUpdateInput={this.filterList}
					    style={{color: 'white'}}
					/>
		  		    </ToolbarGroup>
		  		    <ToolbarGroup lastChild={true}>
  					<IconButton onTouchTap={this.handleOpenNav} tooltip="Messages" tooltipPosition="bottom-left" disabled={this.data.currentUser ? false : true  }> 
					    <SvgIcons.CommunicationForum color='White'/>
					</IconButton>
		  		    </ToolbarGroup>
		  		</Toolbar>


		  	</div>
		  	<div className="contentContain">
				<Scrollbars style={{ height: 350, position: 'relative' }}>
			  		{React.cloneElement(this.props.children, { foodItems: this.data.foodItems, openMessages: this.handleOpenMessage })}
			  	</Scrollbars>
		  	</div>
		  	{ Meteor.user() ?
		    <div className="tabsContain">

				<Tabs>
				    <Tab
					icon={<ActionDashboard color={green900} />} 
					label="ITEM VIEW"
					onActive={this.handleActiveTab("/")}
					style={tabStyle}
				    />
				    <Tab
					icon={<MapsMap color={green900} />}
					label="MAP VIEW"
					onActive={this.handleActiveTab("/MapView")}
					style={tabStyle}
				    />
				    <Tab
					icon={<MapsPersonPin color={green900} />}
					label="YOUR ITEMS"
					onActive={this.handleActiveTab("/YourItems")}
					style={tabStyle}
				    />
				</Tabs>

			</div>

			:
			<div className="tabsContain">
				<Tabs>
					<Tab
						icon={<ActionDashboard color={green900} />} 
						label="ITEM VIEW"
						onActive={this.handleActiveTab("/login")}
						style={tabStyle}
					/>
					<Tab
						icon={<MapsMap color={green900} />}
						label="MAP VIEW"
						onActive={this.handleActiveTab("/login")}
						style={tabStyle}
					/>
					<Tab
						icon={<MapsPersonPin color={green900} />}
						label="YOUR ITEMS"
						onActive={this.handleActiveTab("/login")}
						style={tabStyle}
					/>
				</Tabs>
			</div>
			}
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
						    <SvgIcons.ContentBackspace color={green900} />
						</IconButton>}
					    iconElementRight={
						<IconButton onTouchTap={this.handleOpen}>
						    <SvgIcons.ActionSettings color={green900}/>
						</IconButton>}
					    targetOrigin={{horizontal: 'right', vertical: 'top'}}
				  	/>
		  		    </div>
				    {this.data.currentUser == '' ? 
				     <div className="vertAlign">
					 <br />
					 You have no messages, go share some food! :)
	    			     </div>
				     : 

				     <MessageBar user={this.state.messageUser} reset={this.resetState}/>}
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
		    </div>
		</MuiThemeProvider>
	    </div>
);

    }
});


export default AppHeader;
