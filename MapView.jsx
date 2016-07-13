import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

const MapView = React.createClass({

      	      render(){
	      return(
		<section style={{height: "100%"}}>
		      <GoogleMapLoader
			containerElement={
				<div id='map' syle={{height:"100%",width:"100%",}}/>
			}
        		googleMapElement={
          		    <GoogleMap

            			defaultZoom={3}
            			defaultCenter={{ lat: -25.363882, lng: 131.044922 }}

			    >
			    </GoogleMap>
      
        		}
      		      />
		      </section>
		      );
	      	      }      

      });
export default MapView;