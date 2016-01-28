// App component - represents the whole app
App = React.createClass({
 
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
 
  // Loads items from the FoodItems collection and puts them on this.data.foodItems
  getMeteorData() {
    return {
      foodItems: FoodItemsC.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },
 
  renderFoodItems() {
    // Get foodItems from this.data.foodItems
    return this.data.foodItems.map((foodItem) => {
      return <FoodItems key={foodItem._id} foodItem={foodItem} />;   
    });
  },

    handleSubmit(event) {
    event.preventDefault(); //does not seem to work
 
    // Find the text field via the React ref
    var foodName = React.findDOMNode(this.refs.FNR).value.trim();
    var	foodDesc = React.findDOMNode(this.refs.FDR).value.trim();
 
    FoodItemsC.insert({
      foodName: foodName,
      foodDesc: foodDesc,
      createdAt: new Date() // current time
    });
 
    // Clear form
    React.findDOMNode(this.refs.FNR).value = "";
    React.findDOMNode(this.refs.FDR).value = "";
  },
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Food Sharing</h1>
          	<form className="new-foodItem" onSubmit={this.handleSubmit}>
	            <input type="text" name="foodName" ref="FNR" placeholder="Please enter the name of the food" /><br />
	            <input type="text" name="foodDesc" ref="FDR" placeholder="Please enter a description of the food" /><br />
	            <input type="submit" id="submit" />
        	</form>
        </header>
	<table > 
		<tr>
			<td>Food Name</td>
			<td>Food Description</td>
			
			<td>ID</td>
		</tr>

		        	{this.renderFoodItems()} 
	</table>
      </div>
    );
  }
});

