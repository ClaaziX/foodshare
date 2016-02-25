FoodView = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
 
  getInitialState() {
    return {
      filter : '',
    }
  },

  // Loads items from the FoodItems collection and puts them on this.data.foodItems
  getMeteorData() {
    queryS = '.*'+this.state.filter+'.*';

    let query = {foodName : {'$regex' : queryS}};
    return {
      foodItems: FoodItemsC.find(query, {sort: {createdAt: -1}}).fetch(),
      currentUser: Meteor.user()
    };
  },

  filterList(event) {
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



  render: function() {
    return (
	<div>
          { this.data.currentUser ?
         <ItemCreation />: ''
          }

	<input type="text" placeholder="Search" onChange={this.filterList}/>
	<table className="itemListView">
		{this.renderFoodItems()} 
  </table>
	</div>


    );
  }
});
