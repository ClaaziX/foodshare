import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

const AddItem = React.createClass({

    getInitialState(){
	return{
	    foodName:'',
	    foodDesc:'',
	    prtNo:1,
	    open:false
	    
	    }
    },

    setPrtNo(prtNo){
	this.setState({prtNo:prtNo});
    },
    
    handleName(event){
	this.setState({foodName:event.target.value});
    },

    handleDesc(event){
	this.setState({foodDesc:event.target.value});
    },

    handleRequestClose(){
	this.setState({open:false});
    },
    
    handleSubmit(){
	if((this.state.foodName == '') || (this.state.foodDesc == '') ){
	    this.setState({open:true});
	}else{
	    this.props.handleSubmit({name: this.state.foodName,description:this.state.foodDesc, portions:this.state.prtNo});
	    this.setState({foodName:'',foodDesc:'',prtNo:1})
		
	}
    },
    
    render() {
    	return (<div>
	    Please add the details of all of the items in the picture and the number of items that you have.

	    <TextField
		hintText="Please enter name of the item."
		value={this.state.foodName}
		onChange={this.handleName}
	    />

	    <br />
	    
	    <TextField
		hintText="Please enter a description of the item."
		floatingLabelText="Describe your item."
		multiLine={true}
		rows={2}
		value={this.state.foodDesc}
		onChange={this.handleDesc}
	    />

	    <br/>

	    Number of Portions: <NumberOptionsState value={this.state.prtNo} options="20" optionChange={this.setPrtNo} />

	    <br/>

	    <RaisedButton label="Submit" secondary={true} fullWidth={true} onTouchTap={this.handleSubmit} />
	    <Snackbar
		open={this.state.open}
		message="Please fill out all fields."
		autoHideDuration={4000}
		onRequestClose={this.handleRequestClose}
            />
	</div>);
    }
    
});
export default AddItem;
