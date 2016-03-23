var {
  TextField,
  RaisedButton,
  FlatButton,
  Dialog
    } = MUI;

const { Link } = ReactRouter;

const errContentStyle = {
								width: '100%',
								maxWidth: 'none',
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
      formComplete: false,
      attempt: false,
      butCol:true,
      openErrMess: false
    }
  },

  onDrop(files) {
    console.log(files)
      FS.Utility.eachFile(e, function(file) {
        var newFile = new FS.File(file);
        
        Images.insert(newFile, function (error, fileObj) {
        if (err) {
        } else {
        }
      });
    });

        this.setState({
      files: files
    });
  },

  onOpenClick: function () {
    this.refs.dropzone.open();
  },

  handleSubmit() {
  	this.setState({attempt: true})
  	this.formCompleteCheck();
  	if (this.state.formComplete) {
    FoodItemsC.insert({
      foodName: this.state.foodName,
      foodDesc: this.state.foodDesc,
      portionNo: this.state.portionSelect,
      portionsClaimed: 0,
      // imgURL: imgURL,
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
		if (nameLength > 3 && descLength > 3 ){
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
						{this.state.files.length > 0 ? <div >
							<p>Uploading {this.state.files.length} picture...</p>
							<div>{this.state.files.map((file) => <img className="imgPreview" src={file.preview} /> )}</div>
							</div>
						: 
							<Dropzone ref="dropzone" onDrop={this.onDrop}>
							<div>Try dropping some files here, or click to select files to upload.</div>
							</Dropzone>
						}
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
