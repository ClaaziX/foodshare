ClaimControl = React.createClass({

    calculatePortions(){
	var x = 0;
	var claims = this.props.claims;
	if (claims){
           for(claim in claims){
                if(claim.accepted){
        		x = x + claims.portions;
	        }
            }
    	 return this.props.portions - x;
	 }
	 return this.props.portions

    },

    makeClaim(){
	var portionClaim = ReactDom.findDOMNode(this.refs.PSR).value.trim();
	
    },

    render(){
	<div>
	
	{this.props.claims < this.props.protions? 
	    <select onchange={this.makeClaim}>
		<NumberOptions portions={this.calculatePortions()}/>
            </select>
	: ''}
	

	</div>
    }

});
