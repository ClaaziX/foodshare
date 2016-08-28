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


    render: function() {
    console.log(this.props.foodItems);
	return (
	    <div>
		<Tabs>
            <Tab 
			label={ 
			    <IconButton>
				<ActionViewModule color='green900' />
			    </IconButton>}
                    >
                    
			    <GridPicView foodItems={this.props.foodItems}/>
		    </Tab>

		    <Tab label={<ActionList color='green900' />}>
			<FoodView renderer="list" foodItems={this.props.foodItems}/>
		    </Tab>
		</Tabs>
	    </div>
	);
    }
});
export default GridListTab;
