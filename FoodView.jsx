import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import FoodItems from './FoodItems.jsx'

import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';


import {
    FlatButton,
    IconButton,
    Dialog,
    Snackbar,
    GridList,
    GridTile,
    Styles
} from 'material-ui';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '100%',
    height: 200,
    marginBottom: 12,
  },
    claim: {
	width: '100%',
	maxWidth: 'none',
    },

};


var actions = [];

const FoodView = React.createClass({
      
        mixins: [ReactMeteorData],

getMeteorData() {

    currentUser = Meteor.user() ? Meteor.user() : '';
    return {
      currentUser: currentUser
    };
  },      

    getInitialState() {
	return {
	    openClaim: false,
	    alreadyClaimed: false,
	    claimPop: false,
	}
    },


    genClaimMess : function () {
	if (this.state.alreadyClaimed){
	    return "You've already claimed that item!"
	}else{
	    return "Item claimed! Please wait for a response."
	}
    },

    handleRequestClose : function () {
	this.setState({claimPop: false});
    },

    handleOpen : function (item) {
	this.genActions(item);
	this.setState({openClaim: true});
    },

    handleClose : function (alreadyClaimed) {
	this.setState({openClaim: false});
	this.setState({alreadyClaimed: alreadyClaimed});
	this.setState({claimPop: true});
    },

    genActions : function (item) {
		actions = [     
		    <ClaimControl 
			id={item._id}
			claims={item.claims}
			portions={item.portionNo}
			username={this.data.currentUser.username}
			portionsLeft={item.portionNo - this.calculatePortionsLeft(item)}
			accept={false}
			finishIt={this.handleClose}
		    />,
		    <FlatButton
			label="Cancel"
			secondary={true}
			onTouchTap={this.handleClose}
		    />
		];
    },

    calculatePortionsLeft(item){
	var x = 0;
	var claims = item.claims;
	if (claims){
	    for(claim in claims){
		x = x + claims[claim].accepted;
	    }
	} return x
    },

    renderItems(){

	  if(this.props.renderer=='grid'){
	      return(
	  	<div style={styles.root}>
	  	    <GridList
	  		cellHeight={200}
	  		style={styles.gridList}
	  	    >
	  	{this.props.foodItems.map((foodItem) => (
	  		     <GridTile
	  			 key={foodItem._id}
	  			 title={foodItem.foodName}
	  			 subtitle={<span>by <b>{foodItem.username}</b></span>}
	  			 actionIcon={
	  			     <div>
	  				 <IconButton onTouchTap={ (function(event){this.handleOpen(foodItem)}).bind(this) }>
	  				     <ActionShoppingCart color='White' />
	  				 </IconButton>                        
	  				 <IconButton containerElement={ <Link to={'/ItemView/'+foodItem._id}/> }>
	  				     <CommunicationChatBubble color='White' />
	  				 </IconButton>
	  			     </div>
	  				    }
	  		     >
	  			     <img src={foodItem.imgURL} />
	  		     </GridTile>
	  		 ))}
	  	    </GridList>
	  	</div>
	      );
	  }

	if(this.props.imageURL===''){
	    var foodItemsFiltered=this.props.foodItems;
	}else{
	    filter = (function(x){return x.imgURL==this.props.imageURL}).bind(this);
	    var foodItemsFiltered=this.props.foodItems.filter(filter)
	}

	return foodItemsFiltered.map((foodItem) => {
	    return (
	    <div>
		<FoodItems 
		foodItem={foodItem}
		pathName={foodItem}
		calculatePortionsLeft={this.calculatePortionsLeft}
		handlePop={this.handleOpen}
		/>
		</div>
	    );   
	});

    },
    
    render(){
	return(<div>
			     {this.renderItems()}
	     <Snackbar
	     	open={this.state.claimPop}
	     	message={this.genClaimMess()}
	     	autoHideDuration={3600}
	     	action="Close"
	     	onTouchTap={this.handleRequestClose}
	     	onRequestClose={this.handleRequestClose}
	     />
	     <Dialog
	      	title="Claim!"
	      	actions={actions}
	      	modal={true}
	      	contentStyle={styles.claim}
	      	open={this.state.openClaim}
	      >
	      	How many portions do you wish to claim?
	     </Dialog>

	    </div>)
    }

});
export default FoodView;
