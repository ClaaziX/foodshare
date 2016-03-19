// Task component - represents a single todo item
const {Link} = ReactRouter;

FoodItems = React.createClass({

  mixins: [ReactMeteorData],
  propTypes: {
    foodItem: React.PropTypes.object.isRequired
  },

    calculatePortionsLeft(){
	var x = 0;
	var claims = this.props.foodItem.claims;
	if (claims){
           for(claim in claims){
                if(claim.accepted){
        		x = x + claims.portions;
	        }
            }
    	 return (this.props.foodItem.portionNo - x);
	 }
	 return this.props.foodItem.portionNo;

    },


 
  getMeteorData(){
	return{
		currentUser: Meteor.user() ? Meteor.user().username : ''
		};
  },

  deleteThisItem() {
    FoodItemsC.remove(this.props.foodItem._id);
  },

genPrtnImg: function () {
  var pCla = this.props.foodItem.portionNo - this.calculatePortionsLeft();
  var pNum = this.props.foodItem.portionNo - pCla;

  var x = [];
  for (i = 0; i < pNum; i++){
    x.push(<img src='http://enviroauditcouk.fatcow.com/foodshare/carrot-icon.png' />);
  }

  var z = [];
  for (n = 0; n < pCla; n++){
    z.push(<img src='http://enviroauditcouk.fatcow.com/foodshare/carrot-icon-claimed.png' />);
  }

  return <div>{z}{x}</div>;

},

  render() {
    return (
      <table className="itemListView"> 
      <tbody>
        <tr>
          <td rowSpan="3"><img className="itemSmlPic" src="http://bed56888308e93972c04-0dfc23b7b97881dee012a129d9518bae.r34.cf1.rackcdn.com/sites/default/files/veggie-heart.jpg"></img></td>
          <td><h1>{this.props.foodItem.foodName}</h1>
          { this.data.currentUser  == this.props.foodItem.username 
	    ?
            <button className="delete" onClick={this.deleteThisItem}>x</button> 
	    : 
   	    <ClaimControl id={this.props.foodItem._id}  claims={this.props.foodItem.claims} portions={this.props.foodItem.portionNo} username={this.data.currentUser} portionsLeft={this.calculatePortionsLeft()}/>
          }
	  <Link to={'/ItemView/'+this.props.foodItem._id}>Discuss</Link>
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
      </table>
    );
  }
});
