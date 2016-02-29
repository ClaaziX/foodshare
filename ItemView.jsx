ItemView = React.createClass({
        mixins: [ReactMeteorData],

	getMeteorData() {

	return {
	       foodItem: FoodItemsC.find({_id: this.props.params.itemID}).fetch()
	};
	
	},
	 
	render() {
		 return (
		 <div>
			<table className="itemListView">
		 	 	<FoodItems key={this.data.foodItem._id} foodItem={this.data.foodItem}/>
			</table>
		</div>
			);
	}
});