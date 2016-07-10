import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Accounts from 'meteor/std:accounts-ui';

const login = React.createClass({ 

	handleLogin : function () {
		this.router.push('/');
	},

	render : function () {
	  	return(
		    <div>
		    	<Accounts.ui.LoginFormSet redirect={this.handleLogin} />
		    </div>
	  	);
	  }
	});
export default login;