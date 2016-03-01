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

const styles = {
	exampleImageInput: {
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		width: '100%',
		opacity: 0,
	},
};

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
			<div>
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

				    {this.props.children} 

		    <div className="tabsContain">
				<FlatButton label="List"
					labelPosition="before"
					primary={true}
					style={styles.button}
				/>

				<FlatButton label="Map"
					labelPosition="before"
					primary={true}
					style={styles.button}
				/>

				<FlatButton label="Messages"
					labelPosition="before"
					primary={true}
					style={styles.button}
				/>
			</div>

		</div>    
	    );

    }

})	 
