import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    FlatButton,
    CardText,
    Paper,
    Styles,
    Dialog,
    Snackbar,
    DropDownMenu,
    MenuItem,
    Tabs,
    Tab,
    GridList,
    GridTile,
    IconButton
} from 'material-ui';



import { ThemeManager, LightRawTheme } from 'material-ui';


FoodItems = React.createClass({

    mixins: [ReactMeteorData],

    propTypes: {
	foodItem: React.PropTypes.object.isRequired
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
	var pCla = this.props.calculatePortionsLeft(this.props.foodItem);
	var pNum = this.props.foodItem.portionNo - pCla;
	var x = [];
	for (i = 0; i < pNum; i++){
	    x.push(<img className="carrotImg" src="/imgs/carrot.png" />);
	}

	var z = [];
	for (n = 0; n < pCla; n++){
	    z.push(<img className="carrotImg" src="/imgs/noCarrot.png" />);
	}
	return <div>{x}{z}({pNum})</div>;
    },

    genProfImg() {
   	return(<img className="profilePic" src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />);
    },

    getOpenPop: function(item) {
    	var that = this;
  	openPop = function(event) {
  	    that.props.handlePop(item)
	}
	return openPop
    },

    render : function (){
	return(
	    <div>
	        <div>
		    <Card>
			<CardHeader
			    title={this.props.foodItem.foodName}
			    subtitle={this.genPrtnImg()}
			    avatar={this.props.foodItem.imgURL}
			    actAsExpander={true}
			    showExpandableButton={true}
			/>
			<CardMedia 
			    expandable={true}
			    overlay={
				<CardTitle
				    title={this.props.foodItem.foodDesc}
				    subtitle={"Offered By: " + this.props.foodItem.username}
				/>
				    }
			>
				<img src={this.props.foodItem.imgURL} />
			</CardMedia>

			{ this.props.pathName == '/Messages' && this.props.foodItem.claims ?

			  <CardText expandable={true}>
			      <Request claims={this.props.foodItem.claims} />
			  </CardText>
			  :			
			  ""
			}

			  { this.data.currentUser == this.props.foodItem.username ?

			    <CardActions expandable={true}>
				<Link to={'/ItemView/'+this.props.foodItem._id}>
				    <FlatButton label="Discuss" />
				</Link>

				<FlatButton
				    label="Delete"
				    primary={true}
				    onTouchTap={this.deleteThisItem}
				/>
			    </CardActions>

			    :

			    <CardActions expandable={true}>
				<FlatButton
				    label="Claim"
				    primary={true}
				    onTouchTap={this.getOpenPop(this.props.foodItem)}
				/>

				<Link to={'/ItemView/'+this.props.foodItem._id}>
				    <FlatButton label="Discuss" />
				</Link>
			    </CardActions>

			  }
		    </Card>
		</div>
	    </div>
	);
    }
});
export default FoodItems;