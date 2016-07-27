import { default as _ } from "lodash";
import { triggerEvent } from "react-google-maps/lib/utils";
import { default as update } from "react-addons-update";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

const GoogleMap = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired
  },

componentDidMount() {
  GoogleMaps.create({
    name: this.props.name,
    element: ReactDOM.findDOMNode(this),
    options: this.props.options
  });

  var listeners = this.props.listeners;

  GoogleMaps.ready(this.props.name, function(map) {
    if (listeners){
      listeners.forEach(function(listener,index){
        google.maps.event.addListener(map.instance,listener.l,listener.f);
      })  
    }else{var dummyVar}
  });	
},

componentWillUnmount() {
  if (GoogleMaps.maps[this.props.name]) {
    google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
    delete GoogleMaps.maps[this.props.name];
  } 
},

render() {
    return <div className="map-container"></div>;
  }
});
export default GoogleMap;