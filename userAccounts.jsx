import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Accounts from 'meteor/std:accounts-basic';

import {
	TextField,
	RaisedButton

} from 'material-ui'

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

	handleLogin(){
		console.log("Attempting to logIn....")
		var pass = this.state.password;
		var username = this.state.username
		if(pass !== '' && username !== ''){
			Meteor.loginAsUser(pass, username)
		}else{
			console.log("put a password & username in mate!")
		}
	},

	register(){
		return(
			<div>
				<p>Already have an account? Click <a onTouchTap={this.haveAccSwitch}>here</a> to login.</p>
				<TextField hintText="Enter Your Username..." />
			</div>
		);
	},

	haveAccSwitch(){
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
	  	return(	
			<div style={{height: '100%', width: '100%'}}>
				{haveAcc ?
					<div>
						<div className="loginContain">
							<div className="loginField">
								<p>Need an account? Click <a href="#" onTouchTap={this.haveAccSwitch}>here</a> to register.</p>
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

							<div className="loginField">
								<RaisedButton
									label="Login"
									onTouchTap={this.handleLogin}
									fullWidth={true}
									style={{width: '100%'}}
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