import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import { Meteor } from 'meteor/meteor'

import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
} from 'material-ui/Stepper';


import {
    Snackbar,
    TextField,
    RaisedButton,
    FlatButton,
    Dialog,
    Paper,
    Styles,
    Swipe,
    Tab,
    Tabs,
    IconButton,
} from 'material-ui';



import {ImagePhotoCamera } from 'material-ui/svg-icons/image/photo-camera';
import {EditorModeEdit } from 'material-ui/svg-icons/editor/mode-edit';
import {MapsPlace } from 'material-ui/svg-icons/maps/place';

import PhotoUpload from './PhotoUpload.jsx';
import AddLocation from './AddLocation.jsx';
import AddItem from './AddItem.jsx';
import AddItemView from './AddItemView.jsx';
import FoodView from './FoodView.jsx';

const errContentStyle = {
    width: '100%',
    maxWidth: 'none',
};

const paperStyle = {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

import {
	lightGreenA200,
	lightGreen600,
	green900,
	blueGrey300,
	blueGrey900,
	blueGrey600,
	grey50
} from 'material-ui/styles/colors';

const userAccountRegister = React.createClass({

    getInitialState(){
        return{
            //State for the stepper
			finished: false,
			stepIndex: 0,
			completedIndex: 0,

			//Once the image is uploaded this gets set with the query for the items
			imageURL:'{not:/*/}',
			//For the snackbar
			open:false,

			username: '',
			email: '',
			password: '',
			fName: '',
			lName: '',

			openErrPop: false,
			errPopMess: ''
		}
    },

    handleError() {
        this.setState({
            open: true,
		});
    },

    handleRequestClose() {
        this.setState({
            open: false,
		});
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

    //Stepper Code
    handleNext() {
        stepIndex = this.state.stepIndex;
        if((stepIndex+1) == this.state.completedIndex){
            this.setState({
				stepIndex: stepIndex + 1,
				finished: stepIndex >= 2,
			});
		} else {
	    	this.handleError()
		}
    },

    handlePrev(){
        stepIndex = this.state.stepIndex;
        if (stepIndex > 0){
            this.setState({stepIndex: stepIndex - 1});
	}
    },

    onUpload(url, tinyURL){
        this.setState({
        	imageURL:url,
	        completedIndex:1
	    })

    },

    onCoordSelection(location){
        this.setState({latLng:{lat:location.latLng.lat(),lng:location.latLng.lng()},
	               address:location.address,
		       completedIndex:2
	})

    },

    handleSubmit(){
		console.log("Attempting to register....")
		var pass = this.state.password;
		var username = this.state.username
		console.log(pass)
		if(pass !== '' && username !== ''){

			Accounts.createUser({
				username: username,
				emails: this.state.email,
				password: pass,
				profile: {
					avatar: this.state.imageURL,
					location: this.state.latLng,
					address: this.state.address,
					fName: this.state.fName,
					lName: this.state.lName
					}},
				function(err) {
					if (err){
						console.log(err);
					}
					else{
						console.log('User Registered!');
						//this.setState({completedIndex:3})
					}
			});
		}else{
			console.log("put a password & username in mate!")
		}

    },

    genStepButtons(step) {

        const {stepIndex} = this.state;

        return (
			<div style={{margin: '12px 0'}}>
				<RaisedButton
					label={stepIndex === 2 ? 'Register!' : 'Next'}
					disableTouchRipple={true}
					disableFocusRipple={true}
					primary={true}
					onTouchTap={stepIndex === 2 ? this.handleSubmit : this.handleNext}
					style={{marginRight: 12}}
				/>
				{step > 0 && (
					<FlatButton
						label="Back"
						disabled={stepIndex === 0}
						disableTouchRipple={true}
						disableFocusRipple={true}
						onTouchTap={this.handlePrev}
					/>
				)}
			</div>
			);
    },

    haveAccSwitch(){
		switchA = function(event) {
			browserHistory.push('/login');
		}
		return switchA
	},

    render() {
        const {finished, stepIndex} = this.state;
        const contentStyle = {margin: '0 16px'};

        return (
            <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
	        <div className="loginField">
							Have an account? <RaisedButton backgroundColor={lightGreenA200} onTouchTap={this.haveAccSwitch()} label="Login" />
			</div>
	        <Stepper activeStep={stepIndex} orientation="vertical">
	     	    <Step>
			<StepLabel>Upload A Profile Picture!</StepLabel>
			<StepContent>
			    <PhotoUpload onUpload={this.onUpload}/>
			    {this.genStepButtons(0)}
			</StepContent>
		    </Step>
		    <Step>
			<StepLabel>Set Your Default Location</StepLabel>
			<StepContent>
			    <AddLocation onCoordSelection={this.onCoordSelection}/>
			    {this.genStepButtons(1)}
			</StepContent>
		    </Step>
		    <Step>
			<StepLabel>Fill In Your Details</StepLabel>
			<StepContent>
			    <div className="loginContain">
						<div className="loginField">
							<TextField
								hintText="Enter Your First Name..."
								floatingLabelText="First Name"
								value={this.state.fName}
								onChange={this.handlefName}
								fullWidth={true}
							/>
						</div>

						<div className="loginField">
							<TextField
								hintText="Enter Your Last Name..."
								floatingLabelText="Last Name"
								value={this.state.lName}
								onChange={this.handlelName}
								fullWidth={true}
							/>
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
								hintText="Enter Your Email..."
								floatingLabelText="Email"
								value={this.state.email}
								onChange={this.handleEmail}
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
					</div>
			    {this.genStepButtons(2)}
			</StepContent>
		    </Step>
		</Stepper>

		<Snackbar
		    open={this.state.open}
		    message="Please complete this section before moving on."
		    autoHideDuration={4000}
		    onRequestClose={this.handleRequestClose}
		/>
	    </div>
	);

    }
});

export default userAccountRegister;
