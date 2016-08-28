import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import ActionList from 'material-ui/svg-icons/action/list';

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
const GridPicView = React.createClass({



    getMeteorData() {

	currentUser = Meteor.user() ? Meteor.user() : '';
	return {
	    currentUser: currentUser
	};
    },      

    generatorFunction(foodItem){

	return(
	    <GridTile
		key={foodItem._id}
		
		title={<span>Offered by: <b>{foodItem.username}</b></span>}
		actionIcon={
		    <div>
			<IconButton containerElement={ <Link to={'/ItemView/'+foodItem._id}/> }>
			    <ActionList color='White' />
			</IconButton>
		    </div>
			   }   
	    >
		    <img src={foodItem.imgURL} />
	    </GridTile>
	)


    },


    renderItems(){
	distinct= []
	//Filter the items for duplicates
	var filter = (function(){
	    return (function(item){
		if(distinct.filter((url)=>(url == item.imageURL)).length<1){
		    distinct.push(item.imageURL);
		    return true
		    
		}
		return false
	    }
	    )
	})();

	return this.props.foodItems.filter(filter).map(this.generatorFunction)
    },

    render(){

	return(
	    <div style={styles.root}>
		<GridList
		    cellHeight={200}
		    style={styles.gridList}
		>
		    
		    {this.renderItems()}
		    
		</GridList>
	    </div>

	    
	);
    }
});
export default GridPicView;
