ItemView = React.createClass({
        mixins: [ReactMeteorData],

	getMeteorData() {

	return {
	       foodItem: (FoodItemsC.find({_id: this.props.params.itemID}).fetch()[0])
	};
	
	},

	renderComments(){
		if (this.data.foodItem.comments){
		   return this.data.foodItem.comments.map((comment) => {
		       return <Comment comment={comment.comment} date={comment.createdAt.toString()} username={comment.username}/>;
		       });
		}
		
	},
	 
	addComment(event) {
		 event.preventDefault()   
            	 var comment = ReactDOM.findDOMNode(this.refs.comment).value.trim();

		 FoodItemsC.update({_id: this.data.foodItem._id},{$push : {
		 	comments:{
			username: Meteor.user().username,
			comment: comment,
			createdAt: new Date()
			}
		 }});

		 ReactDOM.findDOMNode(this.refs.comment).value = "";

	},

	render() {
		 return (
		 <div>
			<table className="itemListView">
		 	 	<FoodItems key={this.data.foodItem._id} foodItem={this.data.foodItem}/>
			</table>
			<form className="new-comment" onSubmit={this.addComment}>
			      Comment: <input type="text" name="comment" ref="comment" />
			</form>
			<table classname="itemListView">
			       {this.renderComments()}
			</table>
		</div>
			);
	}
});