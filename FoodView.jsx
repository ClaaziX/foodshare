var {
  AutoComplete
    } = MUI;

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

    currentUser = Meteor.user() ? Meteor.user() : '';
  
    queryS = '.*'+this.state.filter+'.*';

    if (this.props.location.pathname=='/Messages'){
       listMessageQuery = {username : currentUser.username};
    } else {
       listMessageQuery = {username : {'$ne' : currentUser.username}};
    }

    filterQuery = {foodName : {'$regex' : queryS}};

    return {
      foodItems: FoodItemsC.find({'$and' : [filterQuery, listMessageQuery]}, {sort: {createdAt: -1}}).fetch(),
      currentUser: currentUser
    };
  },

  filterList(event) {
    this.setState({
      filter: event.target.value
    });
  },


  renderFoodItems() {
    // Get foodItems from this.data.foodItems
    return this.data.foodItems.map((foodItem) => {
      return (
        <div> 	     
      		<FoodItems key={foodItem._id} foodItem={foodItem} />
      		{(this.props.location.pathname=='/Messages') && foodItem.claims
      		?
      		<Request claims={foodItem.claims}/>
      		:
      		''}
        </div>  
      );   
    });
  },



	render: function() {
		var searchNames = FoodItemsC.find().map(function(foodItem) {
  			return foodItem.foodName;
		});
		return (
			<div>
				<div className="searchContain">
					<AutoComplete
					floatingLabelText="Search..."
					filter={AutoComplete.caseInsensitiveFilter}
					dataSource={searchNames}
					onUpdateInput={this.filterList}
					/>
				</div>
				{this.renderFoodItems()}
			</div>
		);
	}
});
