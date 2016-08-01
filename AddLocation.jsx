import React from 'react';
import ReactDOM from 'react-dom';

import GoogleMapAdd from './GoogleMapAdd.jsx';
import GeoComplete from './GeoComplete.jsx'
import { Meteor } from 'meteor/meteor'

const AddLocation = React.createClass({
    getInitialState(){
	return({loaded:false})
	},
    loaded(loaded){
	this.setState({loaded:loaded});
	console.log(this.state.loaded)
	},
    render() {
	return (
	    <div>
		{this.state.loaded ?
		<GeoComplete/> : ''}
  		<ALMapView loaded={this.loaded}/>
	    </div>
	);
    }     
});
export default AddLocation;


//Map component - bit of boiler plate here but don't think there's a better way at the mo

const ALMapView = React.createClass({

    mixins: [ReactMeteorData],

    listeners(map) {
	var getCoords = (function(marker){
	    this.setState({location:marker.position});
	}).bind(this);

	this.props.loaded(true);
	console.log(this.props);
	this.setState({map:map.instance});
	

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
	    return(
		<div>
		    <GoogleMapAdd name="mymap" options={this.data.mapOptions} listeners={this.listeners}/>
		</div>
	    )

	return <div>Loading map...</div>;
    }

});
