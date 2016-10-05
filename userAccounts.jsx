import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Accounts from 'meteor/std:accounts-basic';

var bcrypt = require('bcryptjs');

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

var bcryptHash = Meteor.wrapAsync(bcrypt.hash);
var bcryptCompare = Meteor.wrapAsync(bcrypt.compare);

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

	encryptPass(password){
		Accounts._bcryptRounds = 10;

		// Given a 'password' from the client, extract the string that we should
		// bcrypt. 'password' can be one of:
		//  - String (the plaintext password)
		//  - Object with 'digest' and 'algorithm' keys. 'algorithm' must be "sha-256".
		//
		var getPasswordString = function (password) {
			console.log("getPasswordString fired...")
		  if (typeof password === "string") {
		    password = CryptoJS.SHA256(password);
		  } else { // 'password' is an object
		    if (password.algorithm !== "sha-256") {
		      throw new Error("Invalid password hash algorithm. " +
		                      "Only 'sha-256' is allowed.");
		    }
		    password = password.digest;
		  }
		  return password;
		};

		// Use bcrypt to hash the password for storage in the database.
		// `password` can be a string (in which case it will be run through
		// SHA256 before bcrypt) or an object with properties `digest` and
		// `algorithm` (in which case we bcrypt `password.digest`).
		//
		var hashPassword = function (password) {
			Accounts._bcryptRounds = 10;
			console.log("hashPassword fired...")
			password = getPasswordString(password);
			console.log(password)
			console.log(bcryptHash(password, Accounts._bcryptRounds))
			return bcryptHash(password, Accounts._bcryptRounds);
		};
		console.log(password)
		console.log(hashPassword(password))

		return (hashPassword(password));
	},

	handleLogin(){
		console.log("Attempting to logIn....")
		var pass = this.encryptPass(this.state.password);
		var username = this.state.username
		console.log(pass)
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