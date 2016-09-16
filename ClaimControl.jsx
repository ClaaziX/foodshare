import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
	FlatButton,
	Snackbar
    } from 'material-ui';

ClaimControl = React.createClass({
    
    getDefaultProps(){
	return {
	       claims: false,
	       value: 1,
	       };
    },

    makeClaim(inputVal){
    	this.setState({value: inputVal});
    },

	submitIt : function () {
		if(this.props.accept){
			FoodItemsC.update(
				{_id : this.props.id},
					{$inc : {portionsClaimed: this.state.value}},
			);
			Meteor.call('updateClaims', this.props.id, this.state.value, this.props.username, this.props.date)
		}else{

			var dbQuery = FoodItemsC.findOne({ _id : this.props.id});
			var alreadyClaimed = false;
			console.log("Attempting Claim...")
			if (!dbQuery.claims){
				Meteor.call('createClaims', this.props.username, this.state.value, this.props.id)
				console.log("No Claims on item detected... Creating Claim!")
			}else{
				for(names in dbQuery.claims){
					if(dbQuery.claims[names].username == this.props.username){
						alreadyClaimed = true;
						console.log("Already claimed...exiting")
						{ break; }
					}	
				}

				if(!alreadyClaimed){
					Meteor.call('createClaims', this.props.username, this.state.value, this.props.id)
					console.log("username on current claims not detected... Creating Claim!")
				}
			}		
		}
		this.props.finishIt(alreadyClaimed);
    },

	render(){
		var claimTxt = "Claim"
		if (window.location.pathname == '/YourItems/'){
			claimTxt = "Accept";
    	}
		return(
			<div>
				<NumberOptions options={this.props.portionsLeft} optionChange={this.makeClaim} />
				<FlatButton
				    label={claimTxt}
				    primary={true}
				    onTouchTap={this.submitIt}
				/>

			</div>
		);
	}

});
