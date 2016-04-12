var {
    AppCanvas,
    AppBar,
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
    IconButton,
    NavigationClose,
    IconMenu,
    MoreVertIcon,
    MenuItem,
    Snackbar,
    SwipeableViews,
    Toolbar,
    ToolbarGroup,
	ToolbarSeparator,
	ToolbarTitle,
	Badge,
	LeftNav
    } = MUI;

var { FontIcon, SvgIcons } = MUI.Libs;
   
var { ThemeManager, LightRawTheme } = Styles;

const { Link } = ReactRouter;

const logoutContentStyle = {
								width: '100%',
								maxWidth: 'none',
							};

AppHeader = React.createClass({

	mixins: [ReactRouter.History, ReactMeteorData],

	getInitialState(){
	    return{
			openLogout: false,
			openLogMess: false,
			openNav: false,
	    }
	},

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
 
	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
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
		this.history.push('/login');
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
		this.history.push('/login');
		this.setState({openLogout: false});
    },

    handleActiveTab : function (tab) {
    	var path = tab.props.route;
    	this.history.push(path);
    },

    handleOpenNav: function () {
    	this.setState({openNav: true});
    },

    handleCloseNav: function () {
    	this.setState({openNav: false});
    },

	handleBackClick : function () {
		this.history.goBack();
	},

    render : function(){

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

		<div className="container">

			<div className="contentContain">
				{this.props.children}
			</div>

			<div className="headContain">
				<AppBar
				    title="Food Sharing"
				    iconElementLeft={
				    	<IconButton onTouchTap={this.handleBackClick}>
							<SvgIcons.ContentUndo color='White'/>
						</IconButton>}
				    iconElementRight={
						<IconButton containerElement={<Link to={'/ItemCreation'} />} linkButton={true}>
							<SvgIcons.ContentAddCircle color='White'/>
						</IconButton>}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
		  		/>
		  	</div>
		  	<div className="toolContain">
		  		<Toolbar>
		  			<ToolbarGroup float="left">
		  				{ Meteor.userId() ?
							<div>
								<IconButton onTouchTap={this.handleOpen}> 
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
								<IconButton linkButton={true} containerElement={<Link to={'/login'} />}> 
									<SvgIcons.ActionAccountCircle color='Black'/>
								</IconButton>
							</div>
					    }
		  			</ToolbarGroup>
		  			<ToolbarGroup float="right">
  						<IconButton onTouchTap={this.handleOpenNav}> 
							<SvgIcons.CommunicationForum color='Black'/>
						</IconButton>
		  			</ToolbarGroup>
		  		</Toolbar>
		  	</div>
		    <div className="tabsContain">

				<Tabs>
					<Tab
						label="LIST"
						route="/"
						onActive={this.handleActiveTab}
					/>
					<Tab
						label="MAP"
						route="/MapView"
						onActive={this.handleActiveTab}
					/>
					<Tab
						label="NOTICES"
						route="/Messages"
						onActive={this.handleActiveTab}
					/>
				</Tabs>

			</div>
			<div>
			
				<LeftNav
					width={400}
					openRight={true}
					open={this.state.openNav}
					docked={false}
					onRequestChange={this.handleCloseNav}
				>
					
					{this.data.currentUser == ''?'':<MessageBar/>}
				</LeftNav>
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
			
			<Accounts.ui.Dialogs />

		</div>    

		
	    );

    }

})	 
