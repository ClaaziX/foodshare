let{
    TextField,
    RaisedButton
} = MUI;



ItemView = React.createClass({
    
    mixins: [ReactMeteorData],

    getMeteorData() {

	return {
	    foodItem: (FoodItemsC.find({_id: this.props.params.itemID}).fetch()[0])
	};
	
    },

    getInitialState(){
	return{
	    commentText:""
	}
    },

    renderComments(){
		if (this.data.foodItem.comments){
		    return this.data.foodItem.comments.map((comment) => {
			return(
			    <div>
			       	<Comment
			       	    comment={comment.comment}
			       	    date={this.timeSince(comment.createdAt)}
			       	    username={comment.username}
			       	/>
			       	<br />
			    </div>)
		    });
		}
    },

    timeSince(date) {
	    var seconds = Math.floor((new Date() - date) / 1000);

	    var interval = Math.floor(seconds / 31536000);

	    if (interval > 1) {
	        return interval + " years";
	    }
	    interval = Math.floor(seconds / 2592000);
	    if (interval > 1) {
	        return interval + " months";
	    }
	    interval = Math.floor(seconds / 86400);
	    if (interval > 1) {
	        return interval + " days";
	    }
	    interval = Math.floor(seconds / 3600);
	    if (interval > 1) {
	        return interval + " hours";
	    }
	    interval = Math.floor(seconds / 60);
	    if (interval > 1) {
	        return interval + " minutes";
	    }
	    return Math.floor(seconds) + " seconds";
	},
    handleComment(event){
	this.setState({
	    commentText : event.target.value,
	});
    },

    addComment(event) {
	event.preventDefault();
	var comment = this.state.commentText
	console.log(this.state.commentText);
	FoodItemsC.update({_id: this.data.foodItem._id},{$push : {
	    comments:{
		username: Meteor.user().username,
		comment: comment,
		createdAt: new Date()
	    }
	}});

	this.setState({commentText:null});
	console.log(this.state.commentText);


    },

    calculatePortionsLeft(item){
	    var x = 0;
	    var claims = item.claims;
	    if (claims){
	      for(claim in claims){
	              x = x + claims[claim].accepted;
	        }
	    } return x
  },

    render : function () {
	return (
	    <div>

	 	<FoodItems key={this.data.foodItem._id} foodItem={this.data.foodItem} calculatePortionsLeft={this.calculatePortionsLeft} /><br />

	 	{this.renderComments()}

		<TextField hintText="You can leave a comment here" onChange={this.handleComment} value={this.state.commentText}/><br />

		<RaisedButton label="Submit" primary={true} onTouchTap={this.addComment} /><br /><br />

		
	    </div>
	);
    }
});
