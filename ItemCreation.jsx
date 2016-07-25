import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
       Step,
       Stepper,
       StepLabel,
       } from 'material-ui/Stepper';


import {
  TextField,
  RaisedButton,
  FlatButton,
  Dialog,
  Paper,
  Styles,
  Swipe,
  Tab,
  Tabs,
  IconButton,
  } from 'material-ui';



import {ImagePhotoCamera } from 'material-ui/svg-icons/image/photo-camera';
import {EditorModeEdit } from 'material-ui/svg-icons/editor/mode-edit';
import {MapsPlace } from 'material-ui/svg-icons/maps/place';

import PhotoUpload from './PhotoUpload.jsx';
import AddLocation from './AddLocation.jsx';
import AddItem from './AddItem.jsx';

const errContentStyle = {
	width: '100%',
	maxWidth: 'none',
};

const paperStyle = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

const ItemCreation = React.createClass({

	getInitialState(){
		return{
			//State for the stepper
			finished: false,
			stepIndex: 0,
			completedIndex: 0,
			
			//Sets the image URL from the photo upload component
			imageURL: "",			
			

		}
	},



	//Stepper Code 
	handleNext() {
	    stepIndex = this.state.stepIndex;
	    if((stepIndex+1) == this.state.completedIndex){
	    	    this.setState({
		    	stepIndex: stepIndex + 1,
			finished: stepIndex >= 2,
	    		});
	  } else {
	    console.log('error')
	  }
	},

	handlePrev(){
	    stepIndex = this.state.stepIndex;
	    if (stepIndex > 0){
	       this.setState({stepIndex: stepIndex - 1});
	    }
	},
	
	onUpload(url){
		this.setState({imageURL:url,
				completedIndex:1})
		
	},

	getStepContent(stepIndex) {
	    switch (stepIndex) {
      	        case 0:
        	    return <PhotoUpload onUpload={this.onUpload}/>;
      		case 1:
        	    return <AddLocation/>;
      		case 2:
        	    return <AddItem/>;
      		default:
		    return 'You\'re a long way from home sonny jim!';
            }
        },

	render() {
		const {finished, stepIndex} = this.state;
		const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Upload a Photograph of the Item(s)</StepLabel>
          </Step>
          <Step>
            <StepLabel>Add the Location of the Item(s)</StepLabel>
          </Step>
          <Step>
            <StepLabel>Add Details of the Item(s)</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
              >
                Click here
              </a> to reset the example.
            </p>
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
			
	}
});

export default ItemCreation;