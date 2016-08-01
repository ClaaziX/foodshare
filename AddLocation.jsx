import React from 'react';
import ReactDOM from 'react-dom';

import GoogleMapAdd from './GoogleMapAdd.jsx';
import { Meteor } from 'meteor/meteor'

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

    /* getInitialState(){
       return({location:'hello'})
       }, */

    listeners(map) {
	var getCoords = (function(marker){
	    this.setState({location:marker.position});
	    console.log('wut',marker.position);
	    console.log(this.state.location);
	}).bind(this);

	var Marker;

	map.instance.addListener('click', function(e){
	    if(Marker != undefined){
		Marker = Marker.setMap(null);
		}
	    Marker = new google.maps.Marker({
		position:e.latLng,
		map:map.instance
	    });

	    getCoords(Marker);
		
	})
    },

    componentDidMount() {
  	GoogleMaps.load({key:Meteor.settings.public.GMAPSKey});
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
	    return <GoogleMapAdd name="mymap" options={this.data.mapOptions} listeners={this.listeners}/>;

	return <div>Loading map...</div>;
    }

});
