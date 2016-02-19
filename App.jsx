
foodView = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
 
  getInitialState() {
    return {
      filter : '',
      files: [],
      arrayOfImageIds: [],
    }
  },

  // Loads items from the FoodItems collection and puts them on this.data.foodItems
  getMeteorData() {
    console.log('.*'+this.state.filter+'.*')    
    queryS = '.*'+this.state.filter+'.*';

    let query = {foodName : {'$regex' : queryS}};
    return {
      foodItems: FoodItemsC.find(query, {sort: {createdAt: -1}}).fetch(),
      currentUser: Meteor.user()
    };
  },
  

  onDrop: function (files) {
    if (Meteor.isServer) {
    MyImages.insert(files, function(err, fileObj){
        if(err){
          alert("Error");
        } else {
          // gets the ID of the image that was uploaded
          var imageId = fileObj._id;
          // do something with this image ID, like save it somewhere
          arrayOfImageIds.push(imageId);
        }
       }); 
    }  
  

    this.setState({
      files: files
    });
  },

  onOpenClick: function () {
    this.refs.dropzone.open();
  },


  filterList(event) {
    console.log(this.state.filter)
    //Change the state of the filtering in play
    this.setState({
      filter: event.target.value
    });
  },

  renderFoodItems() {
    // Get foodItems from this.data.foodItems
    return this.data.foodItems.map((foodItem) => {
      return <FoodItems key={foodItem._id} foodItem={foodItem} />;   
    });
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


  render: function() {
    return (
      <div className="container">
        <header>
          <h1>Food Sharing</h1>

          <AccountsUIWrapper />
          { this.data.currentUser ?
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
              <select name="portionSelect" ref="PSR">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <input type="submit" id="submit" />
            </form> : ''
          }
        </header>
	<input type="text" placeholder="Search" onChange={this.filterList}/>
	<table className="itemListView">
		{this.renderFoodItems()} 
  </table>
      </div>


    );
  }
});
