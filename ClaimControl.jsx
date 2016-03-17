ClaimControl = React.createClass({
    
    getDefaultProps(){
	return {
	       claims: false
	       };
    },


    makeClaim(){
        var inputVal = ReactDOM.findDOMNode(this.refs.CSR).value.trim();
	
	FoodItemsC.update({_id : this.props.id}, {$push : {
	    		       	 		 	  claims : {
								username : this.props.username,
								createdAt : new Date(),
								portions : inputVal,
								accepted : false
								}
						  }	   });

								 

	ReactDOM.findDOMNode(this.refs.CSR).value = "1"
    },

    render(){

	return(
	<div>
	{this.props.portionsLeft <=  this.props.portions
	? 
	<div>Claim:
            <NumberOptions options={this.props.portionsLeft} ref="CSR" optionChange={this.makeClaim}/>
	</div>
	: 
	''}
	</div>

	);
    }

});
