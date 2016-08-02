import { default as _ } from "lodash";
import { triggerEvent } from "react-google-maps/lib/utils";
import { default as update } from "react-addons-update";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import AddLocation from './AddLocation.jsx';

const GoogleMap = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired,
    map: "",
  },

  genMarkers(maps) {
    console.log("genMarkers called")
    if(typeof this.props.markers !== "undefined"){
      return this.props.markers.map((foodItem) => {

        var obj = foodItem.location;
        var keys = Object.keys(obj);
        var coords = [];

        for (var i = 0; i < keys.length; i++) {

          coords.push(obj[keys[i]])

        }
        console.log(coords)

        var image = {
          url: "http://www.airsoftmap.net/images/pin_map.png",
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(32, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };

        return (
          new google.maps.Marker({
            position: new google.maps.LatLng(coords[0], coords[1]),
            map: maps,
            icon: image,
          })
        );   
      });
    }else{console.log("props.markers == " + this.props.markers)}
  },

  geocodeLatLng() {
    console.log("gecode function called")

    var geocoder = new google.maps.Geocoder;
    var infoWindow = new google.maps.InfoWindow;
    var map = "mymap";
    var latlng = this.props.latlng;

    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    },

  componentDidMount() {
    GoogleMaps.create({
      name: this.props.name,
      element: ReactDOM.findDOMNode(this),
      options: this.props.options
    });

    var listeners = this.props.listeners;
    var that = this;
    var mapz;

    GoogleMaps.ready(this.props.name, function(map) {

      mapz = map.instance;

      if (listeners){
        listeners.forEach(function(listener,index){
          google.maps.event.addListener(map.instance,listener.l,listener.f);
        })  
      }else{var dummyVar}

      that.genMarkers(map.instance);

      console.log(mapz)
      var input =  ReactDOM.findDOMNode(that.refs.pacinput);
      var searchBox = new google.maps.places.Autocomplete(input);
      searchBox.bindTo('bounds', mapz);
      mapz.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      
      // Bias the SearchBox results towards current map's viewport.
      mapz.addListener('bounds_changed', function() {
        searchBox.setBounds(mapz.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });

    });
  },

  componentWillUnmount() {
    if (GoogleMaps.maps[this.props.name]) {
      google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
      delete GoogleMaps.maps[this.props.name];
    }
  },

  render() {
    return (
        <div className="map-container"><input id="pacinput" ref="pacinput" className="controls" type="text" placeholder="Search Box" /></div>
    );
  }
});
export default GoogleMap;