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

	submitIt : function () {
		if(this.props.accept){
			FoodItemsC.update(
				{_id : this.props.id},
					{$inc : {portionsClaimed: this.state.value}},
			);
			Meteor.call('updateClaims', this.props.id, this.state.value, this.props.username)
		}else{
			FoodItemsC.update({_id : this.props.id}, {$push : {
				claims : {
					username : this.props.username,
					createdAt : new Date(),
					portions : this.state.value,
					accepted : 0,
					rejected : false,
					parentId: this.props.id,
				}
			}	});
		}
		this.props.finishIt();
    },

	render(){
		return(
			<div>
			<NumberOptions options={this.props.portionsLeft} optionChange={this.makeClaim} />
			<FlatButton
			    label="Claim"
			    primary={true}
			    onTouchTap={this.submitIt}
			/>
			</div>
		);
	}

});
