import React from 'react';
import ReactDOM from 'react-dom';

import GoogleMap from './GoogleMap.jsx';


const AddLocation = React.createClass({
  render() {
    return (
		 	<div>
  			<ALMapView />
			</div>
		);
  }     
});
 export default AddLocation;


//Map component - bit of boiler plate here but don't think there's a better way at the mo

const ALMapView = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState(){
    return({
      latlng: {
        lat: "",
        lng: ""
      }
    })
  },

  listeners() { 
    var that = this;
  	return [{l:'click', f: function(e){
      that.setState({latlng: {lat: parseFloat(e.latLng.lat()), lng: parseFloat(e.latLng.lng())}})
    },}]
  },

  componentDidMount() {
  	GoogleMaps.load();
  },
  getMeteorData() {
    return {
      loaded: GoogleMaps.loaded(),
      mapOptions: GoogleMaps.loaded() && this._mapOptions()
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
      return <GoogleMap name="mymap" options={this.data.mapOptions} listeners={this.listeners()} latlng={this.state.latlng} />;

    return <div>Loading map...</div>;
  }

});