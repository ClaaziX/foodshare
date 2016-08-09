import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import {
    FlatButton,
    IconButton,
    Dialog,
    Snackbar
} from 'material-ui';


import ActionViewModule from 'material-ui/svg-icons/action/view-module.js';
import ActionList from 'material-ui/svg-icons/action/list.js';
const styles = {
    claim: {
	width: '100%',
	maxWidth: 'none',
    },
};

import { lightGreen300, lightGreen600, green900, brown300, brown600, brown900 } from 'material-ui/styles/colors';

var actions = [];

const FoodView = React.createClass({

    getInitialState() {
	return {
	    openClaim: false,
	    alreadyClaimed: false,
	    claimPop: false,
	    actions: [],
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

    calculatePortionsLeft(item){
	var x = 0;
	var claims = item.claims;
	if (claims){
	    for(claim in claims){
		x = x + claims[claim].accepted;
	    }
	} return x
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
					 <IconButton onTouchTap={this.handleOpen(foodItem)}>
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

	return this.props.foodItems.map((foodItem) => {
	    return (
		<FoodItems 
		foodItem={foodItem}
		pathName='blahblah'
		calculatePortionsLeft={this.calculatePortionsLeft}
		handlePop={this.handleOpen}
		/>
	    );   
	});

    },
    
    render(){
	return(
	    {renderItems();}
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


	)
    }

});
export default FoodView;
