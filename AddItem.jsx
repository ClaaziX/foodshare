import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const AddItem = React.createClass({

    getInitialState(){
	return{
	    foodName:'',
	    foodDesc:''
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

	    Number of Portions: <NumberOptions options="20" optionChange={this.setPrtNo} />

	    <br/>

	    <RaisedButton label="Submit" secondary={true} fullWidth={true} onTouchTap={this.props.handleSubmit} />
	    
	</div>);
    }
    
});
export default AddItem;
