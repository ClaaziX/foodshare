import { default as _ } from "lodash";
import { triggerEvent } from "react-google-maps/lib/utils";
import { default as update } from "react-addons-update";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import AddLocation from './AddLocation.jsx';
import TimeSince from './TimeSince.jsx';

import ActionSchedule from 'material-ui/svg-icons/action/schedule';

var iwArray = [];
var markArray =[];

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
var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 31536000);

      if (interval > 1) {
          return interval + " yrs";
      }
      interval = Math.floor(seconds / 2592000);
      if (interval > 1) {
          return interval + " mths";
      }
      interval = Math.floor(seconds / 86400);
      if (interval > 1) {
          return interval + " days";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
          return interval + " hrs";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
          return interval + " mins";
      }
      return Math.floor(seconds) + " secs";
  },


  genMarkers(maps) {
    if(typeof this.props.markers !== "undefined"){
      var that= this;
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
          });

        var imgURL = foodItem.imgURL;
        var imgsrc = "<IMG id='mapImg' width='100%' BORDER='0' ALIGN='Left' SRC='" + imgURL + "' />";
        var tSince = this.calcTime(foodItem.createdAt);
        var foodDesc = foodItem.foodDesc;
        if (foodDesc == undefined){
          foodDesc = "No food description provided... Ask a question!"
        }

        var content = '<div id="iw-container">' +
                  '<div class="iw-title">' + foodItem.foodName.toString() + '</div>' +
                  '<div class="iw-content">' +
                    '<div className="buttons-container">' +
                      '<div className="rightbutton">'
                         + "Uploadedd " + tSince + ' ago<br/>' +
                        'by ' + foodItem.username.toString() +
                      '</div>' +
                      '<div className="rightbutton">' +
                        '<a href src="/ItemView/' + foodItem._id.toString() + '"><img src="/imgs/icons/messages.svg" /></a>' +
                      '</div>' +
                    '</div>' +
                    imgsrc +
                    '<p>' + foodDesc + '</p>' +
                  '<div class="iw-bottom-gradient"></div>' +
                '</div>';
                //create event listener from mapImg & rightbutton2 that navigates to ItemView
        google.maps.event.addListener(marker, 'click', function() {
            if(!marker.open){
                that.closeAllInfoWindows()
                infowindow.open(maps,marker);
                if(infowindow){
                  iwArray.push(infowindow);
                }
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

        google.maps.event.addListener(infowindow, 'domready', function() {
          that.genDOMmanip();
        });
        return (
          infowindow.setContent(content), 
        );
      });
    }else{console.log("error: props.markers == " + this.props.markers)}
  },

  closeAllInfoWindows() {
    if(iwArray.length > 0){
      for (var i=0;i<iwArray.length;i++) {
         iwArray[i].close();
      }
    }
  },

  hideMarkers(){
    if(markArray.length > 0){
      for (var i=0;i<markArray.length;i++) {
         markArray[i].setVisible(false);
      }
    }
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

  genDOMmanip(noX) {
    console.log("genDOMmanip has been called...")
    var el = ReactDOM.findDOMNode(this);
    var iwMain = el.getElementsByClassName("gm-style-iw")[0];
    var iwBackground = iwMain.previousElementSibling;
    var iwCloseBtn = iwMain.nextElementSibling;
    var iwOuter = iwMain.parentNode.parentNode;

    iwMain.style['max-width'] = '228px';
    iwMain.style['max-height'] = '240px';

    iwMain.childNodes[0].style['max-width'] = '228px';
    iwMain.childNodes[0].style['max-height'] = '240px';
    iwMain.childNodes[0].style['overflow'] = 'hidden';

    // Removes background shadow DIV
    iwBackground.childNodes[1].style['display'] = 'none';

    // Removes white background DIV
    iwBackground.childNodes[3].style['display'] = 'none';
    iwBackground.childNodes[3].style['max-width'] = '228px';

    iwMain.parentNode.style['max-width'] = '230px';
    // Apply the desired effect to the close button
    iwCloseBtn.style["opacity"] = '1';
    iwCloseBtn.style["right"] = '-28px';
    iwCloseBtn.style["top"] = '3px';
    iwCloseBtn.style["border"] = '7px solid #99ff66';
    iwCloseBtn.style["border-radius"] = '13px';
    iwCloseBtn.style["box-shadow"] = '0 0 5px #99ff66';

    if(noX == "noX"){
      iwCloseBtn.style["display"] = 'none';
    }
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
      if(marker){
        markArray.push(marker);
      }
      if(infowindow){
        iwArray.push(infowindow);
      }

      searchBox.addListener('place_changed', function() {
          that.closeAllInfoWindows()
          marker.setVisible(false);
          var place = searchBox.getPlace();
          if (!place.geometry) {
            console.log("Autocomplete's returned place contains no geometry");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            mapz.fitBounds(place.geometry.viewport);
          } else {
            mapz.setCenter(place.geometry.location);
            mapz.setZoom(20);
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

          google.maps.event.addListener(infowindow, 'domready', function() {
            that.genDOMmanip("noX");
          });

          google.maps.event.addListener(marker, 'click', function() {
            if(!marker.open){
                infowindow.close();
                infowindow.open(mapz,marker);
                marker.open = true;
            }
            else{
                infowindow.close();
                marker.open = false;
            }
            google.maps.event.addListener(mapz, 'click', function() {
                infowindow.close();
                marker.open = false;
            });
          });
          mapz.addListener('click', function() {
            that.closeAllInfoWindows();
            that.hideMarkers();
            searchBox.set('place', null);
          });
          var mc = new MarkerClusterer(mapz);
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
