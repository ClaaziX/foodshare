var {
    List,
    ListItem
    } = MUI;

Request = React.createClass({

	generateRequests(){

		if(this.props.claims){
			return this.props.claims.map((claim) => {
			       return <ListItem primaryText={claim.username}/>;
			       });
			       }
	},


	render(){
		return(
			<List subheader="Item Requests">
			      {this.generateRequests()}
			</List>
		);
	}

});