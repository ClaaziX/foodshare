import React from 'react';
import ReactDOM from 'react-dom';

import GoogleMapAdd from './GoogleMapAdd.jsx';
import GeoComplete from './GeoComplete.jsx';
import Geosuggest from 'react-geosuggest';
import { Meteor } from 'meteor/meteor';

const AddLocation = React.createClass({

    getInitialState(){
	return({loaded:false});
	},

    getCoordsMap(coords){
	this.setState({coords:coords});
    },

    getCoordsGeosuggest(suggest){

	var coords = suggest.location;
	this.setState({coords:coords,marker:coords});


    },

    loaded(loaded){
	this.setState({loaded:loaded});

	},

    render() {
	return (
	    <div>
		{this.state.loaded ?
		<Geosuggest onSuggestSelect={this.getCoordsGeosuggest}/> : ''}
  		<ALMapView loaded={this.loaded} getCoords={this.getCoordsMap} suggestionMarker={this.state.marker}/>
	    </div>
	);
    }     
});
export default AddLocation;


//Map component - bit of boiler plate here but don't think there's a better way at the mo

const ALMapView = React.createClass({

    mixins: [ReactMeteorData],
    
    listeners(map) {

        //Let other elements know that the map is loaded and ready
    	this.props.loaded(true);
	
	//set the map instance to state
	this.setState({map:map.instance});	

	//Function to set the coords 
	var getCoords = (function(marker){
	    this.setState({location:marker.position});
	}).bind(this);

	//Function to set the marker 
	var setMarker = (function(marker){
	    this.setState({marker:marker});
	}).bind(this);

	//Function to get the marker
	var getMarker = (function(){
	    return this.state.marker;
	}).bind(this);
	

	map.instance.addListener('click', function(e){

	    //Get marker ref
	    var Marker = getMarker();
	    
	    if(Marker != undefined){
		Marker = Marker.setMap(null);
		}
	    Marker = new google.maps.Marker({
		position:e.latLng,
		map:map.instance
	    });
	    
	    //set the marker ref
	    setMarker(Marker);
	    
	    //Set coords in state
	    getCoords(Marker);
		
	})
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

    componentWillReceiveProps(nextProps){

    if (nextProps.suggestionMarker!=undefined){
	this.setMarkerFromProp(nextProps);
	};

    },

    setMarkerFromProp(nextProps){
	var map = this.state.map;
	var Marker = this.state.marker;




	if(Marker != undefined){
		Marker = Marker.setMap(null);
		}

	Marker = new google.maps.Marker({
	    position:new google.maps.LatLng(nextProps.suggestionMarker),
	    map:map
	    });

	this.setState({marker:Marker});

	return(Marker)
	
	
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
