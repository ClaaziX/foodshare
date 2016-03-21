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
    AppBar,
    IconButton,
    NavigationClose,
    IconMenu,
    MoreVertIcon,
    MenuItem,
    Snackbar,
    SwipeableViews
    } = MUI;

var { FontIcon, SvgIcons } = MUI.Libs;
   
var { ThemeManager, LightRawTheme } = Styles;

const { Link } = ReactRouter;

const logoutContentStyle = {
								width: '100%',
								maxWidth: 'none',
							};

AppHeader = React.createClass({

	mixins: [ReactRouter.History],

	getInitialState(){
	    return{
			openLogout: false,
			openLogMess: false,
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

    handleLogout : function () {
    	Meteor.logout();
		this.setState({openLogout: false});
		this.history.push('/');
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
					    	Meteor.userId() ?
					    		<div>
									<IconButton onClick={this.handleOpen}> 
						    			<SvgIcons.ActionAccountCircle color='White'/>
						    		</IconButton>
										<Dialog
										  title="Logout"
										  actions={actions}
										  modal={true}
										  contentStyle={logoutContentStyle}
										  open={this.state.openLogout}
										>
										Do you really want to logout?
										</Dialog>
									</div>
					    		
					    		:

					    		<IconButton linkButton={true} containerElement={<Link to={'/login'} />}> 
					    			<SvgIcons.ActionAccountCircle color='White'/>
					    		</IconButton>
					    	}
				    iconElementRight={

							<IconButton containerElement={<Link to={'/ItemCreation'} />} linkButton={true}>
		          					<SvgIcons.ContentAddCircle color='White'/>
		          				</IconButton>
		        			}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
		  		/>
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
		        <Snackbar
		          open={this.state.openLogMess}
		          message="You've been logged out!"
		          autoHideDuration={3600}
		          onRequestClose={this.handleRequestClose}
		        />
			</div>
			
			<Accounts.ui.Dialogs />

		</div>    

		
	    );

    }

})	 
