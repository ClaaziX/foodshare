var {
	AppBar
} = MUI;

var {} = MUI.Libs;

NavBar = React.createClass({

	render : function () {
		return(
			<div>
				<AppBar title="AppBar"/>
				Notifications <br />
				------------- <br />
				Messages! <br />
				<PrivateChat />
			</div>
		);
	}
})