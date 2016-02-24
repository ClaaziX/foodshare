// Task component - represents a single todo item
FoodItems = React.createClass({
  propTypes: {
    foodItem: React.PropTypes.object.isRequired
  },
 
  deleteThisItem() {
    FoodItemsC.remove(this.props.foodItem._id);
  },

  claimThisItem() {
    var pCla = this.props.foodItem.portionsClaimed;
    var pNum = this.props.foodItem.portionNo - pCla;
    var itemId = this.props.foodItem._id;
    if (pNum > 0) {
      pCla++;
      FoodItemsC.update(itemId, {$set: {portionsClaimed: pCla} });
    }else{ alert("Sorry! No more portions left!"); }
  },

genPrtnImg: function () {
  var pCla = this.props.foodItem.portionsClaimed;
  var pNum = this.props.foodItem.portionNo - pCla;
  var x = [];
  for (i = 0; i < pNum; i++){
    x.push(<img src='http://enviroauditcouk.fatcow.com/foodshare/carrot-icon.png' />);
  }
  var z = [];
  for (n = 0; n < pCla; n++){
    z.push(<img src='http://enviroauditcouk.fatcow.com/foodshare/carrot-icon-claimed.png' />);
  }
  return <div>{x}{z}</div>;
},

  render() {
    return (
      <tbody>
        <tr>
          <td rowSpan="3"><img className="itemSmlPic" src="http://bed56888308e93972c04-0dfc23b7b97881dee012a129d9518bae.r34.cf1.rackcdn.com/sites/default/files/veggie-heart.jpg"></img></td>
          <td><h1>{this.props.foodItem.foodName}</h1>
          { Meteor.user().username == this.props.foodItem.username ?
            <button className="delete" onClick={this.deleteThisItem}>x</button> : <button className="claim" onClick={this.claimThisItem}>Claim</button>
          }
          </td>
          <td rowSpan="2"><img className="profilePic" src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png"></img></td>
        </tr>
        <tr>
          <td>{this.props.foodItem.foodDesc}</td>
        </tr>
        <tr>
          <td>Number Of Portions: {this.genPrtnImg()}
          </td>
          <td>{this.props.foodItem.username}</td>
        </tr>
      </tbody>
    );
  }
});
