import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
    Tab,
    Tabs,
} from 'material-ui';


const GridListTab = React.createClass({


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
			    <FoodView renderer="grid" foodItems={this.props.foodItems}/>
		    </Tab>

		    <Tab label={<ActionList color='green900' />}>
			<FoodView renderer="list"/>
		    </Tab>
		</Tabs>
	    </div>
	);
    }
});
export default GridListTab;
