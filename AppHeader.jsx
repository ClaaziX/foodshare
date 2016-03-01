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
    FontIcon
    } = MUI;
   
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

		    <header>
			<h1>Food Sharing</h1>
			<AccountsUIWrapper />
		    </header>

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
