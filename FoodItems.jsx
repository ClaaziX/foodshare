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

import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ImagePhoto from 'material-ui/svg-icons/image/photo';



import { ThemeManager, LightRawTheme } from 'material-ui';

import TimeSince from './TimeSince.jsx';

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

	getInitialState(){
		return{
			imgPop: false,
		}
	},
    calcTime: function(date){
    	return(
      		<TimeSince time={date} />
    	);
  	},

    deleteThisItem() {
	FoodItemsC.remove(this.props.foodItem._id);
    },

    genPrtnImg: function () {
	var pCla = this.props.calculatePortionsLeft(this.props.foodItem);
	var pNum = this.props.foodItem.portionNo - pCla;
	var p = "portions";
	var x = [];
	for (i = 0; i < pNum; i++){
	    x.push(<img className="carrotImg" src="/imgs/carrot.png" />);
	}

	var z = [];
	for (n = 0; n < pCla; n++){
	    z.push(<img className="carrotImg" src="/imgs/noCarrot.png" />);
	}
	return <div>{x}{z}({pNum} {p})</div>;
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

	openImg(){
		this.setState({imgPop: true})
	},

	closeImg(){
		this.setState({imgPop: false})
	},

    render : function (){
    	const imgAction = [
    		<FlatButton
    		onTouchTap={this.closeImg}
    		label="CLOSE"
    		/>
    	];
    	var foodTit = this.props.foodItem.foodName.toString()
    	var expander = true;
    	var pathIV = window.location.pathname.includes("ItemView");
    	if (pathIV){expander = false;}
	return(
	    <div>
	    	{ window.location.pathname == '/Messages' ?
			   <Request claims={this.props.foodItem} />  
			:

	        <div>
		    <Card>
			<CardHeader
			    title={this.props.foodItem.foodName}
			    subtitle={this.genPrtnImg()}
			    avatar={this.props.foodItem.imgURL}
			    actAsExpander={true}
			    showExpandableButton={expander}
			/>

			  { this.data.currentUser == this.props.foodItem.username ?

			    <CardActions expandable={true}>
			    <div className="buttons-container">
			    	<div className="buttons-item">
			    		<ActionSchedule /> {this.calcTime(this.props.foodItem.createdAt)}
			    	</div>
			    	<div className="buttons-item">
						<Link to={'/ItemView/'+this.props.foodItem._id}>
						     <CommunicationChat />
						</Link>
					</div>
					<div className="buttons-item">
						<ActionDelete onTouchTap={this.deleteThisItem} />
					</div>
				</div>
			    </CardActions>

			    :

			    <CardActions expandable={expander}>
			    	<div className="buttons-container">
			    		<div className="buttons-item">
			    			<ActionSchedule className="smallButton" /> {this.calcTime(this.props.foodItem.createdAt)}
			    		</div>
			    		<div className="buttons-item">
							<ActionShoppingCart onTouchTap={this.getOpenPop(this.props.foodItem)}/>
						</div>
						<div className="buttons-item">
							<ImagePhoto onTouchTap={this.openImg} />
						</div>
					{ window.location.pathname == '/ItemView/'+this.props.foodItem._id ?
						""
					:
			    		<div className="buttons-item">
							<Link to={'/ItemView/'+this.props.foodItem._id}>
								<CommunicationChat />
							</Link>
						</div>
					}
					</div>
			    </CardActions>

			  }
		    </Card>
		</div>
		}
		<Dialog
			title={foodTit}
			modal={false}
			actions={imgAction}
			className="imgDia"
			open={this.state.imgPop}
		>
			<img className="fillDiv" src={this.props.foodItem.imgURL} />
		</Dialog>
		
	    </div>
	);
    }
});
export default FoodItems;