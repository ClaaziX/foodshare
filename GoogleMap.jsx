import { default as _ } from "lodash";
import { triggerEvent } from "react-google-maps/lib/utils";
import { default as update } from "react-addons-update";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import AddLocation from './AddLocation.jsx';
import TimeSince from './TimeSince.jsx';

const GoogleMap = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired,
    map: "",
  },

  getInitialState(){
    return{
    }
  },

  calcTime: function(date){
    return(
      <TimeSince time={date} />
      );
  },

  genMarkers(maps) {

    if(typeof this.props.markers !== "undefined"){

      return this.props.markers.map((foodItem) => {

        var obj = foodItem.location;
        var keys = Object.keys(obj);
        var coords = [];

        for (var i = 0; i < keys.length; i++) {
          coords.push(obj[keys[i]])
        }

        var image = {
          url: foodItem.imgURL,
          // This marker is 20 pixels wide by 32 pixels high.
          scaledSize: new google.maps.Size(60, 60),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32),

          optimized:false
        };
        var infowindow = new google.maps.InfoWindow({maxWidth: 350});

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(coords[0], coords[1]),
            map: maps,
            icon: image,
            title: foodItem.foodName.toString(),
          })
        marker.addListener('click', function() {
          infowindow.open(maps, marker);
        });

        var imgURL = foodItem.imgURL;
        var imgsrc = "<IMG width='100%' BORDER='0' ALIGN='Left' SRC='" + imgURL + "' />";
        var tSince = this.calcTime(foodItem.createdAt);
        var foodDesc = foodItem.foodDesc;
        if (foodDesc == undefined){
          foodDesc = "No food description provided... Ask a question!"
        }
        var content = '<div id="iw-container">' +
                  '<div class="iw-title">' + foodItem.foodName.toString() + '</div>' +
                  '<div class="iw-content">' +
                    '<div class="iw-subTitle">' + tSince + '</div>' +
                    imgsrc +
                    '<p>' + foodDesc + '</p>' +
                  '<div class="iw-bottom-gradient"></div>' +
                '</div>';

        google.maps.event.addListener(marker, 'click', function() {
            if(!marker.open){
                infowindow.open(maps,marker);
                marker.open = true;
            }
            else{
                infowindow.close();
                marker.open = false;
            }
            google.maps.event.addListener(maps, 'click', function() {
                infowindow.close();
                marker.open = false;
            });
        });
        console.log("placing a marker...")
        return (
          infowindow.setContent(content), 
        );   
      });
    }else{console.log("error: props.markers == " + this.props.markers)}
  },

  configureDOM(){
    console.log("configDOM called...")
    var el = ReactDOM.findDOMNode(this);
    var iwBackground = el.getElementsByClassName("gm-style-iw").previousElementSibling;
    var iwCloseBtn = el.getElementsByClassName("gm-style-iw").nextElementSibling;
    console.log(iwBackground)
    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});
    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});
    // Moves the infowindow 115px to the right.
    iwOuter.parent().parent().css({left: '115px'});
    // Moves the shadow of the arrow 76px to the left margin.
    iwBackground.children(':nth-child(1)').attr('style', function(i,s){
      return s + 'left: 76px !important;'
    });
    // Moves the arrow 76px to the left margin.
    iwBackground.children(':nth-child(3)').attr('style', function(i,s){
      return s + 'left: 76px !important;'
    });
    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({
      'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
      'z-index' : '1'
      });
    // Apply the desired effect to the close button
    iwCloseBtn.css({
      opacity: '1',
      right: '38px',
      top: '3px',
      border: '7px solid #99ff66',
      'border-radius': '13px',
      'box-shadow': '0 0 5px #99ff66'
    });
    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      this.css({opacity: '1'});
    });
  },

  geocodeLatLng() {
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

      console.log("just before gen markers")
      that.genMarkers(map.instance);

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
    this.configureDOM();
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
