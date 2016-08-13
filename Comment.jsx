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
	if (this.props.username == Meteor.user().username){
		container = "commentFlexUser-container"
	}
	return(
		<div className={container}>
			<div className="commentFlex-item">
				<div>
					<img className="avatar" src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />
				</div>
				<div>
					{this.props.comment}
				</div>
			</div>
		</div>
		//this.props.date
	);
}

});
