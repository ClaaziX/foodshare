let {
	Styles,
	List,
	ListItem,
	Avatar,
	Divider
} = MUI;

PrivateChat = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() {
		currentUser = Meteor.user() ? Meteor.user() : '';
		return {
			currentUser: currentUser,
		    foodChats: FoodItemsC.find({}, 
		    	{ privateChat: { $exists: true } }
		    ).fetch()
		};
	
	},
	
	generateChat : function (){
		if(this.data.foodChats.privateChat){
			return this.data.foodChats.privateChat.map((chat) => {
				if(chat.owner == this.data.currentUser){
					return
						<div>
							<ListItem
								leftAvatar={<Avatar src="/imgs/bob.jpg" />}
								primaryText={chat.claimer}
								secondaryText={
						            <p>
						              <span style={{color: Styles.Colors.darkBlack}}>Name of food item</span>
						            </p>
									}
								secondaryTextLines={1}
								onTouchTap={this.handleOpenChat(chat.owner, chat.claimer, claim.parentId)}
							/>
							<Divider inset={true} />
						</div>
				}
			});
		}
	},

	handleOpenChat : function (owner, claimer, ID) {
		console.log(owner, claimer, ID)
		console.log("open chat in new left nav bar")
	},

	render : function () {
		 return (
		 	<div>
		 		<List>
		 			{this.generateChat()}
		 		</List>
		 	</div>
		 	);
	}
});