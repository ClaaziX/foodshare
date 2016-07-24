import React from 'react';
import ReactDOM from 'react-dom';
import {Mongo} from 'meteor/mongo';

const PhotoUpload = React.createClass({
      mixins: [ReactMeteorData],

      getMeteorData(){
	return{}
      },

      getInitialState(){
	return({imageUpload:false})
      },

        onDrop(file){

     	        fileObj = images.insert(file[0], function(err,fileObj){
						     //do something to handle errors that get thrown
						     console.log(err)
						 }

		);
		while(!fileObj.isUploaded()){
				console.log('has it uploaded yet',fileObj.isUploaded());
		}
		console.log('id',fileObj._id);
		console.log('fileobj', fileObj);
		console.log('db entry',images.findOne(fileObj._id).url());
		this.setState({imageUpload:images.findOne(fileObj._id).url()});
		console.log(this.state.imageUpload);
		
	},
        
        render() {
	     console.log(this.state.imageUpload)
    		 return (
		     <Dropzone check={this.state.imageUpload} onDrop={this.onDrop}>
		         {!this.state.imageUpload ? <div>Drop files here for upload</div> : <img src={this.state.imageUpload.url()} />}
	             </Dropzone>

		 );
    	}
      
});
export default PhotoUpload;