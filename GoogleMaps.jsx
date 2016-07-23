import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";

const GoogleMaps = React.createClass({

  render(){
  return (
    <section style={{height: "100%"}}>
      <GoogleMapLoader
        containerElement={
          <div
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
            onClick={""}
          >
              );
            })}
          </GoogleMap>
        }
      />
    </section>
  );
  }
});
export default GoogleMaps;