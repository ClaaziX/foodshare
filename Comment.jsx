var { 
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    FlatButton,
    CardText
    } = MUI ;

Comment = React.createClass({

	render(){
	return(
           this.props.username == Meteor.user().username ?
	   
	   <Card>
		<CardHeader
			title={this.props.username}
			subtitle={this.props.date}
			avatar="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png"
			style={{
				float:'right'			
				}}
		/>
		<CardText>
			{this.props.comment}
		</CardText>
	    </Card>		
	   
	   :
	   
	   <Card>
		<CardHeader
		title={this.props.username}
		subtitle={this.props.date}
		avatar="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png"
		/>
		<CardText>
			{this.props.comment}
		</CardText>
	    </Card>		
	);}

});
