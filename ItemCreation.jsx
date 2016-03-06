ItemCreation = React.createClass({
  
  getInitialState(){
    return{
      files: [],
      arrayOfImageIds: [],
    }
  },

  onDrop(files) {
    console.log(files)
      FS.Utility.eachFile(e, function(file) {
        var newFile = new FS.File(file);
        
        Images.insert(newFile, function (error, fileObj) {
        if (err) {
          console.log(err);
        } else {
          console.log(fileObj);
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


    handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    var foodName = ReactDOM.findDOMNode(this.refs.FNR).value.trim();
    var	foodDesc = ReactDOM.findDOMNode(this.refs.FDR).value.trim();
    var portionSelect = ReactDOM.findDOMNode(this.refs.PSR).value.trim();
    // var imgURL = arrayOfImageIds[0];

    FoodItemsC.insert({
      foodName: foodName,
      foodDesc: foodDesc,
      portionNo: portionSelect,
      portionsClaimed: 0,
      // imgURL: imgURL,
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
      createdAt: new Date() // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.FNR).value = "";
    ReactDOM.findDOMNode(this.refs.FDR).value = "";
    ReactDOM.findDOMNode(this.refs.PSR).value = "";

  },


	render() {
		 return (
		 	    <form className="new-foodItem" onSubmit={this.handleSubmit}>
	            
              <input type="text" name="foodName" ref="FNR" placeholder="Please enter the name of the food" /><br />
	            
              <div>
                
                {this.state.files.length > 0 ? <div>
                  <p>Uploading {this.state.files.length} picture...</p>
                  <div>{this.state.files.map((file) => <img className="imgPreview" src={file.preview} /> )}</div>
                  </div> : <Dropzone ref="dropzone" onDrop={this.onDrop}>
                  <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>}
              </div>
              
              <input type="text" name="foodDesc" ref="FDR" placeholder="Please enter a description of the food" /><br />
              
              <div>Please Select The Number of Portions:</div>
			    <PortionControl portions="20" />
              <input type="submit" id="submit" />
            </form>
		 );
	}
});
