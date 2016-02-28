ItemView = React.createClass({
        mixin: [ReactMeteorData],

	getMeteorData() {

	return {
	       foodItem: FoodItemsC.find({_id: this.props.params.itemID}).fetch()
	};
	
	},
	 
	render() {
		 return (<FoodItems key={this.data.foodItem._id} foodItem={this.data.foodItem}/>);
	}
});