import React from 'react';
import ReactDOM from 'react-dom';

import GoogleMapAdd from './GoogleMapAdd.jsx';
import { Meteor } from 'meteor/meteor';

//Map component - bit of boiler plate here but don't think there's a better way at the mo

const AddLocation = React.createClass({

    mixins: [ReactMeteorData],
    
    listeners(map) {

	//Function to set the coords 
	var getCoords = (function(marker){
	    this.setState({location:marker.position});
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

	    geocoder.geocode({'location': e.latLng}, function(results, status) {
		if (status === 'OK') {
		    console.log(results)
		    if (results[0]) {
			marker.setPosition(e.latLng);
			var name = '';
			if (results[0].address_components){
			    name = [
				(results[0].address_components[0] && results[0].address_components[0].long_name || ''),
				(results[1].address_components[0] && results[1].address_components[1].long_name || ''),
				    ].join(' ');
			}
			infowindow.setContent('<div><strong>'+ name +'</strong><br>' + results[0].formatted_address);
			infowindow.open(map.instance, marker);
		    } else {
			window.alert('No results found');
		    }
		} else {
		    window.alert('Geocoder failed due to: ' + status);
		}
            });

	    //Set coords in state
	    getCoords(marker);
	    
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

            /* var address = '';
               if (place.address_components) {
	       address = [
	       (place.address_components[0] && place.address_components[0].short_name || ''),
	       (place.address_components[1] && place.address_components[1].short_name || ''),
	       (place.address_components[2] && place.address_components[2].short_name || ''),
	       (place.address_components[7] && place.address_components[7].short_name || '')
	       ].join(' ');
               } */
	    console.log('place',place);
            infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + place.formatted_address);
            infowindow.open(map.instance, marker);
	    getCoords(marker);
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
		<div>
		    <input id="pacinput" ref="pacinput" className="controls" type="text"
			   placeholder="Enter a location"/>
		    <GoogleMapAdd name="mymap" options={this.data.mapOptions} listeners={this.listeners}/>
		</div>
	    )

	    return <div>Loading map...</div>;
    }

});
export default AddLocation;
