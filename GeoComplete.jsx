import React from 'react';
import ReactDOM from 'react-dom';

import Geosuggest from 'react-geosuggest';

import {Meteor} from 'meteor/meteor';

const GeoComplete = React.createClass({
      
      render(){
      return(
      <div>	

	<Geosuggest/>
      </div>
      )
      }
});

export default GeoComplete;