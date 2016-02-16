// Task component - represents a single todo item
FoodItems = React.createClass({
  propTypes: {
    foodItem: React.PropTypes.object.isRequired
  },
 
  deleteThisItem() {
    FoodItemsC.remove(this.props.foodItem._id);
  },

  // genPrtnImg: function () {
  // var pNum = FoodItemsC.find(this.props.foodItem.portionNo);
  // for (i = 0; i < pNum; i++)
  //   var img = document.createElement('img');
  //   img.src = "http://downloadicons.net/sites/default/files/carrot-icon-14142.png";
  //   return img;
  // },
  
  render() {
    return (
      <tbody>
        <tr>
          <td rowSpan="3"><img className="itemSmlPic" src="http://bed56888308e93972c04-0dfc23b7b97881dee012a129d9518bae.r34.cf1.rackcdn.com/sites/default/files/veggie-heart.jpg"></img></td>
          <td><h1>{this.props.foodItem.foodName}</h1></td>
          <td rowSpan="3"><img className="itemSmlPic" src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png"></img></td>
        </tr>
        <tr>
          <td>{this.props.foodItem.foodDesc}</td>
        </tr>
        <tr>
          <td>Number Of Portions: {this.props.foodItem.portionNo}
          </td>
        </tr>
      </tbody>
    );
  }
});
