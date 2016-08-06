import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
  Styles,
  GridList,
  GridTile,
  IconButton
    } from 'material-ui';

import ActionShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
   
import { ThemeManager, LightRawTheme } from 'material-ui';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 300,
    height: 200,
    marginBottom: 12,
  },
};

GridView = React.createClass({

	propTypes: {
		foodItems: React.PropTypes.array.isRequired
	},

	getOpenPop: function(item) {
    	var that = this;
  		openPop = function(event) {
  			that.props.handlePop(item)
			}
	  return openPop
	},

	render: function () {
		var foodS = this.props.foodItems;
		return(
			<div style={styles.root}>
				<GridList
				cellHeight={200}
				style={styles.gridList}
				>
					{foodS.map(tile => (
					  <GridTile
					  key={tile._id}
					  title={tile.foodName}
					  subtitle={<span>by <b>{tile.username}</b></span>}
					  actionIcon={
					    <div>
					      <IconButton onTouchTap={this.getOpenPop(tile)}>
					        <ActionShoppingCart color='White' />
					      </IconButton>                        
					      <IconButton containerElement={ <Link to={'/ItemView/'+tile._id}/> }>
					        <CommunicationChatBubble color='White' />
					      </IconButton>
					    </div>
					  }
					  >
					    <img src={tile.imgURL} />
					  </GridTile>
					))}
				</GridList>
			</div>
		);
	}
});
