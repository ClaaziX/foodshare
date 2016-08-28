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


    checkCalled(){
        check = function(){
            distinct=[];
            return(
                function(item){
                    if(distinct.filter((url)=>(url == item.imageURL).length<1)){
                        distinct.push(item);
                        return true 
                    }
                    return false
                }
            )
        }()
        
        return check
    },

    getMeteorData() {

        currentUser = Meteor.user() ? Meteor.user() : '';
        return {
            currentUser: currentUser
        };
    },      

    generatorFunction(){

        var callback = this.checkCalled


        return(
            function(foodItem){
                {console.log(callback(foodItem))}
                
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
	</GridTile>}
        )

        
    },


    renderItems(){
        var callBack = this.generatorFunction()
        return this.props.foodItems.map(callBack)
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