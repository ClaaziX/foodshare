var {
    AppCanvas,
    AppBar,
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
    FontIcon,
    AppBar,
    IconButton,
    NavigationClose,
    IconMenu,
    MoreVertIcon,
    MenuItem
    } = MUI;

    var {SvgIcons} = MUI.Libs;
   
var { ThemeManager, LightRawTheme } = Styles;

const {Link} = ReactRouter;

AppHeader = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
 
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },

    render : function(){
	    return(
		<div className="container">

		  	<div className="contentContain">
				    {this.props.children} 
			</div>

			<div className="headContain">
				<AppBar
				    title="Food Sharing"
				    iconElementLeft={<AccountsUIWrapper />}
				    iconElementRight={
		      			<IconMenu
		       				iconButtonElement={
		          				<IconButton><SvgIcons.ContentAddCircle color='Green'/></IconButton>
		        			}
					        targetOrigin={{horizontal: 'right', vertical: 'top'}}
					        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		      			>
					        <MenuItem primaryText="Refresh" />
					        <MenuItem primaryText="Help" />
					        <MenuItem primaryText="Sign out" />
		      			</IconMenu>
		    		}
		  		/>
		  	</div>

		    <div className="tabsContain">
				<Link to={'/'}><FlatButton label="List"
					labelPosition="before"
					primary={true}
				/></Link>

				<Link to={'/MapView'}><FlatButton label="Map"
					labelPosition="before"
					primary={true}
				/></Link>

				<Link to={'/PrivateChat'}><FlatButton label="Messages"
					labelPosition="before"
					primary={true}
				/></Link>
			</div>

		</div>    
	    );

    }

})	 
