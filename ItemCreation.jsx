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
      files: [],
      arrayOfImageIds: [],
      portionSelect: 1,
      foodName: "",
      foodDesc: "",
      imgURL: "",
      formComplete: false,
      attempt: false,
      butCol:true,
      openErrMess: false
    }
  },

	onDrop() {
		console.log("File deceted")
		var uploader = new Slingshot.Upload("garangleslarp");
		var theURL = "";
		uploader.send(document.getElementById('uploadFile').files[0], function (error, downloadUrl) {
			if (error) {
			// Log service detailed response
				console.error('Error uploading', error);
				alert (error);
			}
			else {
				Meteor.users.update(Meteor.userId(), {$push: {"profile.files": downloadUrl}});
				this.setState({imgURL: downloadURL});
			}
		});
	},

  onOpenClick: function () {
    this.refs.dropzone.open();
  },

  handleSubmit() {
  	this.setState({attempt: true});
  	this.formCompleteCheck();
  	if (this.state.formComplete) {
    FoodItemsC.insert({
      foodName: this.state.foodName,
      foodDesc: this.state.foodDesc,
      portionNo: this.state.portionSelect,
      portionsClaimed: 0,
      imgURL: this.state.imgURL,
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
      createdAt: new Date() // current time
    });
    this.history.push('/');
	}else{
		this.setState({
			openErrMess: true
		});

	}
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
		var imgURL = this.state.imgURL;
		if (nameLength > 3 && descLength > 3 && imgURL !== ""){
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
		var fileUploadDom = ReactDOM.findDOMNode(this.refs.uploadFile);
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
						>
						{ this.state.imgURL == "" ?
							<img onClick={this.fileInput} width="60%" height="auto" src="/imgs/camera.png" />
						:
							<img width="50%" height="auto" src={this.state.imgURL} />
						}
						</Paper>
						<input 
							type="file"
							className="inputStyle"
							ref="uploadFile"
							id="uploadFile"
							onChange={this.onDrop} 
						/>

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
