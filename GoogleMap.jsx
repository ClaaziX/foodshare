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
      console.log("genMarkers conditional passed")
      return this.props.markers.map((foodItem) => {
        console.log("markers being mapped...")

        var obj = foodItem.location;
        var keys = Object.keys(obj);
        var coords = [];
        console.log("obj == "+obj)
        console.log("keys == "+keys)
        console.log("map == "+maps)

        for (var i = 0; i < keys.length; i++) {

          coords.push(obj[keys[i]])
          console.log(obj[keys[i]])

        }
        console.log("coords == "+coords)

        var image = {
          url: "http://www.airsoftmap.net/images/pin_map.png",
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(32, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(coords[0], coords[1]),
            map: maps,
            icon: image,
          })
        marker.setVisible(false);
        var imgURL = foodItem.imgURL;
        var imgsrc = "<IMG width='80px' BORDER='0' ALIGN='Left' SRC='" + imgURL + "' />";
        return (
          infowindow.setContent(foodItem.foodName.toString() + "<br />" + imgsrc), 
          infowindow.open(maps, marker)
        );   
      });
    }else{console.log("error: props.markers == " + this.props.markers)}
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
      
      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
          map: mapz,
          anchorPoint: new google.maps.Point(0, -29)
        });
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
            mapz.fitBounds(place.geometry.viewport);
          } else {
            mapz.setCenter(place.geometry.location);
            mapz.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
          infowindow.open(mapz, marker);
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