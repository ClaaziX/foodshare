var {
    List,
    ListItem,
    Divider,
    Colors
    } = MUI;

Request = React.createClass({

	generateRequests(){

		if(this.props.claims){
			return this.props.claims.map((claim) => {
			       return (<div>
			       	       <ListItem primaryText={claim.username+ " requested " + claim.portions + " portions."} />
			       	       <Divider	 />
				       </div>);
			       });
			       }
	},


	render(){
		return(
			<List subheader="Item Requests">
			      <Divider />
			      {this.generateRequests()}
			</List>
		);
	}

});