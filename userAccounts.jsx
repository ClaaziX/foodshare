import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Accounts from 'meteor/std:accounts-basic';

import {
	TextField,
	RaisedButton

} from 'material-ui'

import { 
	lightGreenA200,
	lightGreen600,
	green900,
	blueGrey300,
	blueGrey900,
	blueGrey600,
	grey50
} from 'material-ui/styles/colors';

const userAccounts = React.createClass({ 

	shouldComponentUpdate(nextProps, nextState){
		return false;
	},

	shouldComponentUpdate(nextProps, nextState){
		return false;
	},

	getInitialState(){
		return{
			haveAcc: true,
			username: '',
			password: '',
			openErrPop: false,
			errPopMess: ''
		}
	},

	handleUserName(event){
		this.setState({username:event.target.value});
		console.log(this.state.username)
	},

	handlePassword(event){
		this.setState({password:event.target.value});
		console.log(this.state.password)
	},

	loginFail(err){
		if(err == "close"){
			this.setState({openErrPop: false})
		}else{
		this.setState({errPopMess: err, openErrPop: true, username: '', password: ''})
		}
	},

	handleLogin(){
		console.log("Attempting to logIn....")
		var pass = this.state.password;
		var username = this.state.username
		console.log(pass)
		if(pass !== '' && username !== ''){
			Meteor.loginWithPassword(email, password, function(err) {
  				if (err) {
			    	this.loginFail(err.message);
				}else{
			  	console.log("Successful Login!")
			  	browserHistory.push('/');
			  }
			});
		}else{
			console.log("put a password & username in mate!")
		}
	},

	register(){
		return(
			<div>
				<div>Already have an account? <RaisedButton onTouchTap={this.haveAccSwitch} label="Login" /></div>
				<TextField hintText="Enter Your Username..." />
			</div>
		);
	},

	haveAccSwitch(){
		console.log("haveAccSwitch called...")
		var hAcc = this.state.haveAcc;
		if(hAcc){
			this.setState({haveAcc: false})
		}else{
			this.setState({haveAcc: true})
		}
	},

	rootHome : function () {
		this.router.push('/');
	},

	render : function () {
		var haveAcc = this.state.haveAcc;
		const errActions = [
	    <FlatButton
		label="ok"
		secondary={true}
		onTouchTap={this.failedLogin("close")}
	    />,
	];
	  	return(	
			<div style={{height: '100%', width: '100%'}}>
				{haveAcc ?
					<div>
						<div className="loginContain">
							<div className="loginField">
								<p>Need an account? <RaisedButton onTouchTap={this.haveAccSwitch} label="Register" /></p>
							</div>

							<div className="loginField">
								<TextField
									hintText="Enter Your Username..."
									floatingLabelText="Username"
									value={this.state.username}
									onChange={this.handleUserName}
									fullWidth={true}
								/>
							</div>

							<div className="loginField">
								<TextField
									type="password"
									hintText="Enter Your Password..."
									floatingLabelText="Password"
									value={this.state.password}
									onChange={this.handlePassword}
									fullWidth={true}
								/>
							</div>

							<div className="loginField"> </div>

							<div className="loginField">
								<RaisedButton
									label="Login"
									onTouchTap={this.handleLogin}
									fullWidth={true}
									style={{width: '100%', backgroundColor: lightGreenA200 }}
									backgroundColor={lightGreenA200}
								/>
							</div>
						</div>
					</div>
				:
					<div>
						{this.register()}
					</div>
				}
			</div>
	  	);
	  }
	});
export default userAccounts;