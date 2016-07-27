import { default as _ } from "lodash";
import { triggerEvent } from "react-google-maps/lib/utils";
import { default as update } from "react-addons-update";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

const GoogleMap = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return({
      markerz: {
        position: {
          lat: 55.9532,
          lng: -3.1882,
        },
        key: "Taiwan",
        defaultAnimation: 2,
      },
    })
  },
  mixins: [ReactMeteorData],

  getMeteorData() {

    currentUser = Meteor.user() ? Meteor.user() : '';
  
    queryS = '.*'+this.state.filter+'.*';

    listMessageQuery = {username : {'$ne' : currentUser.username}};

    filterQuery = {foodName : {'$regex' : queryS}};

    return {
      foodItems: FoodItemsC.find({'$and' : [filterQuery, listMessageQuery]}, {sort: {createdAt: -1}}).fetch(),
      currentUser: currentUser
    };
  },


  renderList() {
    console.log("Location function called...")
    var locations = [];
    return this.data.foodItems.map((foodItem) => {
      locations.push(foodItem.location);
      return (
        ({locations})
      );   
    });
  },

componentDidMount() {
  var locations = this.renderList;
  console.log(locations)
  GoogleMaps.create({
    name: this.props.name,
    element: ReactDOM.findDOMNode(this),
    options: this.props.options
  });

  var listeners = this.props.listeners;
  var that = this;
  GoogleMaps.ready(this.props.name, function(map) {
    if (listeners){
      listeners.forEach(function(listener,index){
        google.maps.event.addListener(map.instance,listener.l,listener.f);
      })  
    }else{var dummyVar}
    
    var marker = new google.maps.Marker({
      position: that.state.markerz.position,
      map: map.instance
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
    return <div className="map-container"></div>;
  }
});
export default GoogleMap;