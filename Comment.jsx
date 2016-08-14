import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import { 
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    FlatButton,
    CardText
    } from 'material-ui' ;

Comment = React.createClass({

render(){
	var container = "commentFlexOther-container";
	var item = "commentFlex-item";
	if (this.props.username == Meteor.user().username){
		container = "commentFlexUser-container";
		item = "commentFlexUser-item";
	}
	return(
		<div className={container}>
			<div className={item}>
				<img className="avatar" src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />
				<br/>
				{this.props.date}
			</div>
			<div className={item}>
				{this.props.comment}
			</div>
		</div>
	);
}

});
