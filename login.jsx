
login = React.createClass({ 

	mixins: [ReactRouter.History],

	handleLogin : function () {
		this.history.push('/');
	},

	render : function () {
	  	return(
		    <div>
		    	<Accounts.ui.LoginFormSet redirect={this.handleLogin} />
		    </div>
	  	);
	  }
	});
