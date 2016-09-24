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
    IconButton,
    RaisedButton
} from 'material-ui';

import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import CommunicationChat from 'material-ui/svg-icons/communication/chat';
import ImagePhoto from 'material-ui/svg-icons/image/photo';

import TimeSince from './TimeSince.jsx';

const YourItems = React.createClass({

    deleteThisItem() {
    	var that = this;
		handleDelete = function(event) {
			FoodItemsC.remove(that.state.itemId);
		}
		return handleDelete
    },

    calculatePortionsLeft: function (item) {
		var x = 0;
		var claims = item.claims;
		if (claims){
		    for(claim in claims){
			x = x + claims[claim].accepted;
		    }
		} return x
    },

    getInitialState(){
		return{
			imgPop: false,
			foodTit: "",
			imgURL: "",
			deletePop: false,
			itemId: ""
		}
	},

    genPrtnImg: function (item) {
		var pCla = this.calculatePortionsLeft(item);
		var pNum = item.portionNo - pCla;
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

    calcTime: function(date){
    	return(
      		<TimeSince time={date} />
    	);
  	},


    generateItems: function () {
    	const noItemTxt = "You haven't posted any items yet... Get sharing!";
    	const imgAction = [
    		<FlatButton
    		onTouchTap={this.closeImg}
    		label="CLOSE"
    		/>
    	];
		if(this.props.foodItems){
			return this.props.foodItems.map((item) => {
				var foodTit = item.foodName.toString()
				return (
			 		<div>
						<Card>
							<CardHeader
							    title={item.foodName}
							    subtitle={this.genPrtnImg(item)}
							    avatar={item.imgURL}
							    actAsExpander={true}
							    showExpandableButton={true}
							/>
							{ item.claims ?
								<CardText>
									<Request openMessages={this.props.openMessages} claims={item.claims} />
								</CardText>
							:			
								<CardText>
									<p>No one has claimed this item yet</p>
								</CardText>
							}
							<CardActions expandable={false}>
								<div className="buttons-container">
									<div className="buttons-item">
										<ActionSchedule style="smallButton" /> {this.calcTime(item.createdAt)}
									</div>
									<div className="buttons-item">
										<ImagePhoto onTouchTap={this.openImg(item)} />
									</div>
									<div className="buttons-item">
										<ActionDelete onTouchTap={this.openDelete(item)} />
									</div>
									<div className="buttons-item">
										<Link to={'/ItemView/'+item._id}>
											<CommunicationChat />
										</Link>
									</div>
								</div>
							</CardActions>
						</Card>
						<div style={{height: "16px"}}></div>

					</div>
				);
			});
		}else{
				<div>
				<h3>{noItemTxt}</h3>
				<Link to={'/ItemCreation'}>
					<FlatButton fullWidth={true} label="Share Food!" />
				</Link>
				</div>
		}
	},

	openDelete(item){
		var that = this;
		handleOpenImg = function(event){
			that.setState({
				deletePop: true,
				itemId: item._id
			})
		}
		return handleOpenImg
	},

	openImg(item){
		var that = this;
		handleOpenImg = function(event){
			that.setState({
				imgPop: true,
				foodTit: item.foodName.toString(),
				imgURL: item.imgURL,
			})
		}
		return handleOpenImg
	},

	closeImg(){
		this.setState({imgPop: false})
	},

	closeDelete(){
		this.setState({deletePop: false})
	},

    render(){
    	const imgAction = [
    		<FlatButton
    		onTouchTap={this.closeImg}
    		label="CLOSE"
    		/>
    	];
    	const deleteAction = [
    	   	<RaisedButton
	    		onTouchTap={this.deleteThisItem}
	    		label="DELETE"
	    		style={{'margin-right': '8px'}}
    		/>,
    		<FlatButton
	    		onTouchTap={this.closeDelete}
	    		label="CLOSE"
    		/>
    	];
		return(
			<div>
				<div style={{width: "100%"}}>
					{this.generateItems()}
				</div>
				<div>
				<Dialog
					title={this.state.foodTit}
					modal={false}
					actions={imgAction}
					className="imgDia"
					open={this.state.imgPop}
					>
						<img className="fillDiv" src={this.state.imgURL} />
					</Dialog>
									<Dialog
					title={this.state.foodTit}
					modal={true}
					actions={deleteAction}
					open={this.state.deletePop}
					>
						Are you sure you want to delete this item?
					</Dialog>
				</div>
			</div>
		)
    }
});
export default YourItems;