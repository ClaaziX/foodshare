import { default as _ } from "lodash";
import { triggerEvent } from "react-google-maps/lib/utils";
import { default as update } from "react-addons-update";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import GoogleMap from './GoogleMap.jsx'

const MapView = React.createClass({

  mixins: [ReactMeteorData],

  listeners() { 
    return [{l:'click', f: function(e){console.log(e.latLng.lat(),e.latLng.lng())},}]
  },

  componentDidMount() {
    GoogleMaps.load();
  },

  getMeteorData() {
    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && this._mapOptions(),
      foodItems: FoodItemsC.find({}).fetch()
    };
  },

  _mapOptions() {
    return {
      center: new google.maps.LatLng(55.9532, -3.1882),
      zoom: 8
    };
  },

  render() {
    if (this.data.loaded)
      return <GoogleMap name="mymap" options={this.data.mapOptions} markers={this.data.foodItems} listeners={this.listeners()} />;

    return <div>Loading map...</div>;
  }
});

export default MapView;

