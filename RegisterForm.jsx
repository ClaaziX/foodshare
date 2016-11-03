import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import { Meteor } from 'meteor/meteor'

import {
    TextField,
    RaisedButton,
    FlatButton,
    Snackbar
} from 'material-ui';

const RegisterForm = React.createClass({

    getInitialState(){
        return{
			username: '',
			email: '',
			password: '',
			fName: '',
			lName: '',
			open: false,
		}
    },

    handlefName: function(event){
		this.setState({fName: event.target.value});
	},

	handlelName: function(event){
		this.setState({lName: event.target.value});
	},

	handleUserName: function(event){
		this.setState({username: event.target.value});
	},

	handleEmail: function(event){
		this.setState({email: event.target.value});
	},

	handlePassword: function(event){
		this.setState({password: event.target.value});
	},
	
	handleRequestClose(){
		this.setState({open:false});
    },
    
	handleSubmit(){
		var username = this.state.username;
		var email = this.state.email;
		var password = this.state.password;
		var fName = this.state.fName;
		var lName = this.state.lName;

		var fields = [username, email, password, fName, lName];

		for (i = 0; i < fields.length; i++) { 
			if(fields[i] == '' || fields[i].length < 3){
				this.setState({open:true});
				break;
			}
			if(i == fields.length - 1){
				this.props.handleSubmit({
					username: username,
					email: email,
					password: password,
					fName: fName,
					lName: lName
				});
			}
		}
	},

    render() {
        return (
        	<div>
		        <div className="loginContain">
					<div className="registerField">
						<TextField
							hintText="Enter Your First Name..."
							floatingLabelText="First Name"
							value={this.state.fName}
							onChange={this.handlefName}
							fullWidth={true}
						/>
					</div>

					<div className="registerField">
						<TextField
							hintText="Enter Your Last Name..."
							floatingLabelText="Last Name"
							value={this.state.lName}
							onChange={this.handlelName}
							fullWidth={true}
						/>
					</div>

					<div className="registerField">
						<TextField
							hintText="Enter Your Username..."
							floatingLabelText="Username"
							value={this.state.username}
							onChange={this.handleUserName}
							fullWidth={true}
						/>
					</div>

					<div className="registerField">
						<TextField
							hintText="Enter Your Email..."
							floatingLabelText="Email"
							value={this.state.email}
							onChange={this.handleEmail}
							fullWidth={true}
						/>
					</div>

					<div className="registerField">
						<TextField
							type="password"
							hintText="Enter Your Password..."
							floatingLabelText="Password"
							value={this.state.password}
							onChange={this.handlePassword}
							fullWidth={true}
						/>
					</div>

					<div className='registerField'>
						<RaisedButton
							label={'Register'}
							disableTouchRipple={true}
							disableFocusRipple={true}
							primary={true}
							onTouchTap={this.handleSubmit}
							style={{marginRight: 12}}
						/>
						<FlatButton
							label="Back"
							disableTouchRipple={true}
							disableFocusRipple={true}
							onTouchTap={this.props.handlePrev}
						/>
					</div>

				</div>

				<Snackbar
					open={this.state.open}
					message="Please fill out all fields!"
					autoHideDuration={4000}
					onRequestClose={this.handleRequestClose}
				/>

            </div>
		);
    }
});

export default RegisterForm;
