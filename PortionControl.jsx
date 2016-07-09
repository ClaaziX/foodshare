import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

PortionControl = React.createClass({
    
    render(){
	return(
	      <NumberOptions ref="PSR" options={this.props.portions} />
	);
    }



});
