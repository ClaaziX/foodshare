ClaimControl = React.createClass({
    
    getDefaultProps(){
	return {
	       claims: false
	       };
    },

    calculatePortionsLeft(){
	var x = 0;
	var claims = this.props.claims;
	if (claims){
           for(claim in claims){
                if(claim.accepted){
        		x = x + claims.portions;
	        }
            }
    	 return (this.props.portions - x);
	 }
	 return this.props.portions;

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
	{this.calculatePortionsLeft() <=  this.props.portions
	? 
	<div>Claim:
            <NumberOptions options={this.calculatePortionsLeft()} ref="CSR" optionChange={this.makeClaim}/>
	</div>
	: 
	''}
	</div>

	);
    }

});
