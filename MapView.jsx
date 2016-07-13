import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

const MapView = React.createClass({

      	      render(){
	      return(
	      <div>
	      <script type="text/javascript"
      src="https://maps.googleapis.com/maps/api/js">
</script>
		      <GoogleMapLoader
		              containerElement={
			                <div
					      style={{
					            height: "100%",
						                }}
				          />
					  }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}

          >
          </GoogleMap>
        }
      />
    </div>)
	      }      

      });
export default MapView;