import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
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
  Step,
  Stepper,
  StepLabel
  } from 'material-ui';

import {ImagePhotoCamera } from 'material-ui/svg-icons/image/photo-camera';
import {EditorModeEdit } from 'material-ui/svg-icons/editor/mode-edit';
import {MapsPlace } from 'material-ui/svg-icons/maps/place';

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

const ItemCreation = React.createClass({

	getInitialState(){
		return{
			portionSelect: 0,
			foodName: "",
			foodDesc: "",
			imgURL: "",
			formComplete: false,
			attempt: false,
			butCol: true,
			imgDl: false,
			openErrMess: false,
			slideIndex: 0
		}
	},

	imgChange: function () {

		var input = document.getElementById('imgInp').files;

		if (input && input[0]) {
			var reader = new FileReader();

			reader.onload = function (e) {
				$('#blah').attr('src', e.target.result);
			}

			reader.readAsDataURL(input[0]);
			this.setState({imgDl: true});
		}else{
			alert ("Can't find your file...")
		}
	},

	handleSubmit() {
		this.setState({attempt: true});
		this.formCompleteCheck();
		var uploader = new Slingshot.Upload("garangleslarp");
		var foodName = this.state.foodName;
		var foodDesc = this.state.foodDesc;
		var portionSelect = this.state.portionSelect;

			if (this.state.formComplete) {	
				uploader.send(document.getElementById('imgInp').files[0], function (error, downloadUrl) {
					if (error) {
						// Log service detailed response
						console.error('Error uploading image', error);
						alert (error);
					}else{
						Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
						FoodItemsC.insert({
							foodName: foodName,
							foodDesc: foodDesc,
							portionNo: portionSelect,
							portionsClaimed: 0,
							imgURL: downloadUrl,
							owner: Meteor.userId(),           // _id of logged in user
							username: Meteor.user().username,  // username of logged in user
							createdAt: new Date() // current time
						});
						console.log("databse updated")
					}
				});
			}else{
				this.setState({
					openErrMess: true
				});
		}

		this.history.push('/');
	},

	setPrtNo(prtNo) {
	this.setState({portionSelect: prtNo})
	},

	handleName(event) {
		this.setState({
			foodName: event.target.value,
		});
		this.formCompleteCheck();
	},

	handleDesc(event) {
		this.setState({
			foodDesc: event.target.value,
		});
		this.formCompleteCheck();
	},

	formCompleteCheck() {
		var nameLength = this.state.foodName.length;
		var descLength = this.state.foodDesc.length;
		var imgDl = this.state.imgDl;
		if (nameLength > 3 && descLength > 3 && imgDl ){
			this.setState({formComplete: true})
		}else{
			this.setState({formComplete: false})
		}
	},

	handleClose(event) {
		this.setState({
			openErrMess: false
		});
	},

	handleSlideChange : function (value) {
		this.setState({
			slideIndex: value
		});
	},

	fileInput: function () {
		var fileUploadDom = ReactDOM.findDOMNode(this.refs.imgInp);
		fileUploadDom.click();
	},

	render() {
		const actions = [
			<FlatButton
			label="Ok!"
			secondary={true}
			onTouchTap={this.handleClose}
			/>,
		];
		var nameLengths = this.state.foodName.length;
		var descLengths = this.state.foodDesc.length;
		return (
			<div>
				{ Meteor.userId() ?
					<div>
						      						<div>
							<Tabs
								onChange={this.handleSlideChange}
								value={this.state.slideIndex}
							>
								<Tab
									label={
										<IconButton>
											<ImagePhotoCamera color='White'/>} value={0} />
										</IconButton>
									}
									value={0}
								/>
								<Tab label={
										<IconButton>
											<EditorModeEdit color='White'/>} value={1} />
										</IconButton>
								} value={1} />
								<Tab 
									label={
										<IconButton>
											<MapsPlace color='White'/>} value={2} />
										</IconButton>
									}
									value={2} />
							</Tabs>
							<SwipeableViews
								index={this.state.slideIndex}
								onChangeIndex={this.handleSlideChange}
							>
								<div style={styles.slide}>
									<Paper
										style={paperStyle}
										zDepth={4}
										onClick={this.fileInput}
									>
										{ this.state.imgDl ?
				    						<img id="blah" width="auto" height="300px" src="#" />					
										:
											<img  width="auto" height="300px" src="/imgs/camera.png" />
										}
									</Paper>
									<input type='file' id="imgInp" ref="imgInp" className="inputStyle" onChange={this.imgChange} />
								</div>

								<div style={styles.slide}>
									{ nameLengths < 3 && this.state.attempt ?
										<TextField
										hintText="Please enter the name of the food item"
										errorText="Need more characters!"
										value={this.state.foodName}
										onChange={this.handleName}
										/>
									:
										<TextField
										hintText="Please enter a name..."
										value={this.state.foodName}
										onChange={this.handleName}
										/>
									}
									<br/>
									{ descLengths < 3 && this.state.attempt ?
										<TextField
										hintText="Please enter a description..."
										floatingLabelText="Describe your items..."
										errorText="Need more characters!"
										multiLine={true}
										rows={2}
										value={this.state.foodDesc}
										onChange={this.handleDesc}
									/>
									:
										<TextField
										hintText="Please enter a description..."
										floatingLabelText="Describe your items..."
										multiLine={true}
										rows={2}
										value={this.state.foodDesc}
										onChange={this.handleDesc}
										/>
									}
									<br/>
									Number of Portions: <NumberOptions options="20" optionChange={this.setPrtNo} />
									<br/>
								</div>

								<div style={styles.slide}>
									ADD LOCATION
								</div>

							</SwipeableViews>
						</div>
					
						<div>
							{ this.state.formComplete ?
								<RaisedButton label="Submit" secondary={true} fullWidth={true} onTouchTap={this.handleSubmit} />
							:	
								<RaisedButton label="Submit" primary={true} fullWidth={true} onTouchTap={this.openErrMess} />
							}
						</div>

					</div>
				:
					<div>
					You must login in, in order to post food!
					<RaisedButton label="Login" secondary={true} fullWidth={true} containerElement={<Link to={'/login'} />}  />
					<RaisedButton label="Home" primary={true} fullWidth={true} containerElement={<Link to={'/'} />}  />
					</div>

				}
					<Dialog
					title="Please Complete Fields"
					actions={actions}
					contentStyle={errContentStyle}
					open={this.state.openErrMess}
					>
					Please complete all necessary fields!
					</Dialog>
			</div>
		);
	}
});
export default ItemCreation;