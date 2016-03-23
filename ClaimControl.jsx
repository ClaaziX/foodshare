var {
	FlatButton
    } = MUI;

ClaimControl = React.createClass({
    
    getDefaultProps(){
	return {
	       claims: false,
	       value: 1
	       };
    },


    makeClaim(inputVal){
    	this.setState({value: inputVal});
    },

	submitClaim(){
	FoodItemsC.update({_id : this.props.id}, {$push : {
	    		       	 	claims : {
								username : this.props.username,
								createdAt : new Date(),
								portions : this.state.value,
								accepted : false
								}
						  }	   });
	this.props.finishIt();
    },

	render(){

		return(
			<div>
			<NumberOptions options={this.props.portionsLeft} optionChange={this.makeClaim} />
			<FlatButton
			    label="Claim"
			    primary={true}
			    onTouchTap={this.submitClaim}
			/>
			</div>
		);
	}

});
