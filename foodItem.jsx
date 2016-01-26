// Task component - represents a single todo item
FoodItems = React.createClass({
  propTypes: {
    foodItem: React.PropTypes.object.isRequired
  },
 
  deleteThisItem() {
    FoodItems.remove(this.props.foodItem._id);
  },
 
  render() {
    // Give foodItems a different className when they are checked off,
    // so that we can style them nicely in CSS
    const foodItemClassName = this.props.foodItem.checked ? "checked" : "";
 
    return (
      <li className={foodItemClassName}>
        <button className="delete" onClick={this.deleteThisItem}>
          &times;
        </button>
      </li>
    );
  }
});