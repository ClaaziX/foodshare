import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
  Tab,
  Tabs,
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

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],
 
  getInitialState() {
    return {
      openClaim: false,
      alreadyClaimed: false,
      claimPop: false,
      actions: [],
    }
  },

  // Loads items from the FoodItems collection and puts them on this.props.foodItems
  getMeteorData() {

    currentUser = Meteor.user() ? Meteor.user() : '';
    return {
      currentUser: currentUser
    };
  },

  renderList() {
    // Get foodItems from this.props.foodItems
    return this.props.foodItems.map((foodItem) => {
      return (
        <div> 	     
      		<FoodItems 
            key={foodItem._id}
            foodItem={foodItem}
            pathName={this.props.location.pathname}
            calculatePortionsLeft={this.calculatePortionsLeft}
            handlePop={this.handleOpen}
          />
        </div>  
      );   
    });
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

	render: function() {
		return (
			<div>
            <Tabs>
                <Tab 
                  label={ 
                    <IconButton>
                      <ActionViewModule color='green900' />
                    </IconButton>}
                >
                  <GridView 
                    foodItems={this.props.foodItems}
                    handlePop={this.handleOpen}
                  /> 
                </Tab>

              <Tab label={<ActionList color='green900' />}>
				          {this.renderList()}
              </Tab>
          </Tabs>
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
			</div>
		);
	}
});
export default FoodView;