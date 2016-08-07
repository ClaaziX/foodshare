import React from 'react';
import ReactDOM from 'react-dom';
import {Mongo} from 'meteor/mongo';

import Snackbar from 'material-ui/Snackbar';

const PhotoUpload = React.createClass({
      mixins: [ReactMeteorData],

      getMeteorData(){
	return{}
      },

    getInitialState(){
		return({
			imageUpload:'',
			open: false
		})
    },

        onDrop(file){

		//A call back to handle the error with a toast
		var callBackError = (function(){

		    this.setState({open:true})
		    
		}).bind(this);

		//This function is here just so we can actually push to scope
	    var callBackState = (function(imageUrl){
		console.log(imageUrl);
		    this.setState({imageUpload:imageUrl});
		    this.props.onUpload(imageUrl);
		    
		}).bind(this);

		//Initiate insert and get fileObj handle
     	        images.insert(file[0], function(err,fileObj){
						if(err){
						     //do something to handle errors that get thrown
						     callBackError()
						     console.log(err)
							} else {
				//Check the database and find out when all data is uploaded then call the call back
			var liveQuery = images.find(fileObj._id).observe({
			changed : function(newImage, OldImage){
				if (newImage.url() != null){
				    liveQuery.stop();
				    console.log(newImage.url())
				    callBackState(newImage.url());
		   		}
			}
		});
 						       }
						 });
		

	},
        
        render() {
    		 return (
		 <div>
		 	<div>

		 	</div>
		     <Dropzone onDrop={this.onDrop} multiple={false}>
		         {this.state.imageUpload == '' ? <div>Drop files here for upload</div> : <img width="350" src={this.state.imageUpload} />}
	             </Dropzone>
		     <Snackbar
			open={this.state.open}
			message="Sadly an error has occured please try to upload your image again."
			autoHideDuration={4000}
			onRequestClose={this.handleRequestClose}
		     />
		 </div>
		 );
    	}
      
});
export default PhotoUpload;
