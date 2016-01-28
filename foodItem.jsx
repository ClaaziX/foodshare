// Task component - represents a single todo item
FoodItems = React.createClass({
  propTypes: {
    foodItem: React.PropTypes.object.isRequired
  },
 
  deleteThisItem() {
    FoodItems.remove(this.props.foodItem._id);
  },
  
  render() {
    return (
      <div>	
        <h1>{this.props.foodItem.foodName}</h1>
        <br/>
      </div>	 
    );
  }
});
