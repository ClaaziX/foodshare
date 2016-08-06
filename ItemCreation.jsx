import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import {
    Step,
    Stepper,
    StepLabel,
    StepContent,
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

    onCoordSelection(location){
	console.log('location',location);
	this.setState({latLng:location.latLng,
		       address:location.address,
		       completedIndex:2
	})

    },

    genStepButtons(step) {
	const {stepIndex} = this.state;
	return (
	    <div style={{margin: '12px 0'}}>
		<RaisedButton
		    label={stepIndex === 2 ? 'Finish' : 'Next'}
		    disableTouchRipple={true}
		    disableFocusRipple={true}
		    primary={true}
		    onTouchTap={this.handleNext}
		    style={{marginRight: 12}}
		/>
		{step > 0 && (
		     <FlatButton
			 label="Back"
			 disabled={stepIndex === 0}
			 disableTouchRipple={true}
			 disableFocusRipple={true}
			 onTouchTap={this.handlePrev}
		     />
		 )}
	    </div>
	);
    },

    render() {
	const {finished, stepIndex} = this.state;
	const contentStyle = {margin: '0 16px'};

	return (
	    <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
		<Stepper activeStep={stepIndex} orientation="vertical">
		    <Step>
			<StepLabel>Upload a Photograph of the Item(s)</StepLabel>
			<StepContent>
			    <PhotoUpload onUpload={this.onUpload}/>
			    {this.genStepButtons(0)}
			</StepContent>
		    </Step>
		    <Step>
			<StepLabel>Add the Location of the Item(s)</StepLabel>
			<StepContent>
			    <AddLocation onCoordSelection={this.onCoordSelection}/>
			    {this.genStepButtons(1)}
			</StepContent>
		    </Step>
		    <Step>
			<StepLabel>Add Details of the Item(s)</StepLabel>
			<StepContent>
			    <AddItem/>
			    {this.genStepButtons(2)}
			</StepContent>
		    </Step>
		</Stepper>
		<div style={contentStyle}>
		    {finished ? 
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
		     : "" }
		</div>
	    </div>
	);
	
    }
});

export default ItemCreation;
