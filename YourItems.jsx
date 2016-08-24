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


const YourItems = React.createClass({

	deleteThisItem(item) {
		handleDelete = function(event) {
			FoodItemsC.remove(item._id);
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

    genPrtnImg: function (item) {
		var pCla = this.calculatePortionsLeft(item);
		var pNum = item.portionNo - pCla;
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

    generateItems: function () {
    	console.log("generateItems called...")
		if(this.props.foodItems){
			return this.props.foodItems.map((item) => {
				console.log(item)
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
							<CardMedia 
							    expandable={true}
							    overlay={
									<CardTitle
									    title={item.foodDesc}
									    subtitle={"Offered By: " + item.username}
									/>
								}
							>
								<img src={item.imgURL} />
							</CardMedia>

							{ item.claims ?
								<CardText>
									<Request claims={item.claims} />
								</CardText>
							:			
								<CardText>
									<p>No one has claimed this item yet</p>
								</CardText>
							}

							<CardActions expandable={true}>
								<Link to={'/ItemView/'+item._id}>
								    <FlatButton label="Discuss" />
								</Link>
								<FlatButton
								    label="Delete"
								    primary={true}
								    onTouchTap={this.deleteThisItem(item)}
								/>
							</CardActions>
						</Card>
						<div style={{height: "16px"}}></div>
					</div>
				);
			});
		}else{console.log("no items!")}
	},

    render(){
		return(
			<div>
		       {this.generateItems()}
		    </div>
		)
    }
});
export default YourItems;