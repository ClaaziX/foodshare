var {
  TextField,
  RaisedButton,
  FlatButton,
  Dialog,
  Paper
    } = MUI;

const { Link } = ReactRouter;

const errContentStyle = {
	width: '100%',
	maxWidth: 'none',
};

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};



ItemCreation = React.createClass({
  
  mixins: [ReactRouter.History],

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
			openErrMess: false
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

						<br/>
						<br/>
						<br/>

						{ nameLengths < 3 && this.state.attempt ?
							<TextField
							hintText="Please enter a name..."
							errorText="Meed more characters!"
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
						<br/>
						{ this.state.formComplete ?
							<RaisedButton label="Submit" secondary={true} fullWidth={true} onTouchTap={this.handleSubmit} />
						:	
							<RaisedButton label="Submit" primary={true} fullWidth={true} onTouchTap={this.handleSubmit} />
						}
						</div>
						:
						<div>
						You must login in, in order to post food!
						<RaisedButton label="Login" secondary={true} fullWidth={true} linkButton={true} containerElement={<Link to={'/login'} />}  />
						<RaisedButton label="Home" primary={true} fullWidth={true} linkButton={true} containerElement={<Link to={'/'} />}  />
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
