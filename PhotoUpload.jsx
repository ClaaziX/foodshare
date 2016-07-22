import React from 'react';
import ReactDOM from 'react-dom';
import {Mongo} from 'meteor/mongo';

const PhotoUpload = React.createClass({
      mixins: [ReactMeteorData],

      getMeteorData(){
	return{imageUpload:false}
      },

      backCall(){
	console.log('success')
      },
      
      getInitialState(){
	return({imageUpload:false})
      },

        onDrop(file){
	        console.log('Received Files:', file);	   
		var id;
     	        images.insert(file[0], function(err, fileObj){
				       this.backCall()
				     console.log('fileObj.url',fileObj.url());

				     console.log(fileObj._id);

				     console.log('findone',images.findOne(fileObj._id));

				     //Get the fileObj to display to confirm upload etc
				     id = fileObj._id;
				    console.log('id1',id) 
				    this.data.imageUpload = images.findOne(fileObj._id);

				    console.log('imageupload',this.data.imageUpload);
	
		});
		console.log('id',id);
	},
        
        render() {
	     console.log(this.state.imageUpload)
    		 return (
		     <Dropzone onDrop={this.onDrop}>
		         {!this.data.imageUpload ? <div>Drop files here for upload</div> : <img src={this.data.imageUpload.url()} />}
	             </Dropzone>

		 );
    	}
      
});
export default PhotoUpload;