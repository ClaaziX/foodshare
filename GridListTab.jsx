import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import FoodView from './FoodView.jsx';
import GridPicView from './GridPicView.jsx';

import ActionViewModule from 'material-ui/svg-icons/action/view-module.js';
import ActionList from 'material-ui/svg-icons/action/list.js';

import {
    Tab,
    Tabs,
    IconButton
} from 'material-ui';

import { lightGreen300, lightGreen600, green900, brown300, brown600, brown900 } from 'material-ui/styles/colors';

const GridListTab = React.createClass({

    getInitialState(){
	return{value:'grid',imageURL:''}
    },

    handleTileChange(valu){
	var val = valu
	return (function(){
	    this.setState({imageURL:val,value:'list'});
	}).bind(this)
    },
    
    handleChange(value){
	this.setState({
	    value: value,
	    imageURL:''
	});
    },

    render: function() {
	return (
	    <div>
		<Tabs value={this.state.value} onChange={this.handleChange}>
		    <Tab 
			label={ 
			    <IconButton>
				<ActionViewModule color='green900' />
			    </IconButton>}
			
			value="grid"
                    >
			    
			    <GridPicView foodItems={this.props.foodItems} handleChange={this.handleTileChange}/>
		    </Tab>

		    <Tab label={<ActionList color='green900' />} value="list">
			<FoodView renderer="list" foodItems={this.props.foodItems} imageURL={this.state.imageURL}/>
		    </Tab>
		</Tabs>
	    </div>
	);
    }
});
export default GridListTab;
