import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

const AddItem = React.createClass({

    getInitialState(){
	return{
	    foodName:'',
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

    handleRequestClose(){
	this.setState({open:false});
    },
    
    handleSubmit(){
	if((this.state.foodName == '')){
	    this.setState({open:true});
	}else{
	    this.props.handleSubmit({name: this.state.foodName,portions:this.state.prtNo});
	    this.setState({foodName:'',prtNo:1})
		
	}
    },
    
    render() {
    	return (
    		<div>
				<div className="textBox">
					<TextField
						hintText="Please enter name of the item."
						value={this.state.foodName}
						onChange={this.handleName}
					/>
				</div>

				<br />
				
				<div className="textBox">
					Number of Portions: <NumberOptionsState value={this.state.prtNo} options="20" optionChange={this.setPrtNo} />
				</div>

				<p>
					Fill this in for each item in your picture!
				</p>

				<RaisedButton
					label="Add Item"
					primary={true}
					fullWidth={true}
					onTouchTap={this.handleSubmit}
				/>

				<Snackbar
					open={this.state.open}
					message="Please fill out all fields."
					autoHideDuration={4000}
					onRequestClose={this.handleRequestClose}
				/>
			</div>
		);
    }
    
});
export default AddItem;
