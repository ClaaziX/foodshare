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
	var portionClaim = ReactDom.findDOMNode(this.refs.CSR).value.trim();

        console.log(portionClaim)
	
    },

    render(){
	return(
	<div>
	{this.calculatePortionsLeft() <=  this.props.portions
	? 
	<div>Claim:
	    <select name="claimSelect" ref="CSR" onChange={this.makeClaim}>
		<NumberOptions portions={this.calculatePortionsLeft()}/>
            </select>
	</div>
	: 
	''}
	

	</div>);
    }

});
