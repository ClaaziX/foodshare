import React from 'react';
import ReactDOM from 'react-dom';

import GoogleMapAdd from './GoogleMapAdd.jsx';
import { Meteor } from 'meteor/meteor';

//Map component - bit of boiler plate here but don't think there's a better way at the mo

const AddLocation = React.createClass({

    mixins: [ReactMeteorData],
    
    listeners(map) {

	//Function to set the coords 
	var getCoords = (function(location){
	    this.props.onCoordSelection(location)
	}).bind(this);

	//Display Elements
	var marker = new google.maps.Marker({
            map: map.instance,
            anchorPoint: new google.maps.Point(0, -29)
        });
	var infowindow = new google.maps.InfoWindow();
	
	//Anchor the search box to the pacinput node and instantiate
	var input =  ReactDOM.findDOMNode(this.refs.pacinput);
	var searchBox = new google.maps.places.Autocomplete(input);
	searchBox.bindTo('bounds', map.instance);
	map.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	
	//get a geocoder instance
        var geocoder = new google.maps.Geocoder;

	//Add the listener for the click
	map.instance.addListener('click', function(e){

	    var geocoderCallBack = function(results, status) {
		var address = results[0].formatted_address;
		if (status === 'OK') {
			if (results[0]) {
			    marker.setPosition(e.latLng);
			    var name = '';
			    if (results[0].address_components){
				name = [
				    (results[0].address_components[0] && results[0].address_components[0].long_name || ''),
				    (results[1].address_components[0] && results[1].address_components[1].long_name || ''),
				].join(' ');
			    }
			    infowindow.setContent('<div><strong>'+ name +'</strong><br>' + address);
			    infowindow.open(map.instance, marker);
			} else {
			    window.alert('No results found');
			}
		} else {
		    window.alert('Geocoder failed due to: ' + status);
		}
		getCoords({latLng:e.latLng,address:address});
            };
	    
	    geocoder.geocode({'location': e.latLng}, geocoderCallBack);

	    });
	//Listener end

	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	searchBox.addListener('place_changed', function() {

            infowindow.close();
            marker.setVisible(false);
            var place = searchBox.getPlace();
            if (!place.geometry) {
		window.alert("Autocomplete's returned place contains no geometry");
		return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
		map.instance.fitBounds(place.geometry.viewport);
            } else {
		map.instance.setCenter(place.geometry.location);
		map.instance.setZoom(5);
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);

            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address);
            infowindow.open(map.instance, marker);
	    getCoords({latLng:place.geometry.location,address:place.formatted_address});
	});


	//End attempt at adding the map search bar and autocomplete
	
    },

    componentDidMount() {
  	GoogleMaps.load({key:'AIzaSyC_muGOORl5WqYTyBMJtEw05AESKYBm3nY',libraries:'places'});

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
		<div className="smallMap">
		    <input id="pacinput" ref="pacinput" className="smallControls" type="text"
			   placeholder="Enter a location"/>
		    <GoogleMapAdd name="mymap" options={this.data.mapOptions} listeners={this.listeners}/>
		</div>
	    )

	    return <div>Loading map...</div>;
    }

});
export default AddLocation;
