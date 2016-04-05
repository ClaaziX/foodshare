var {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  FlatButton,
  CardText,
  Paper,
  Styles,
  Dialog,
  Snackbar,
  DropDownMenu,
  MenuItem,
  Tabs,
  Tab,
  GridList,
  GridTile,
  IconButton
    } = MUI;

var { FontIcon, SvgIcons } = MUI.Libs;
   
var { ThemeManager, LightRawTheme } = Styles;

const {Link} = ReactRouter;

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 400,
    overflowY: 'auto',
    marginBottom: 24,
  },
  claim: {
                width: '100%',
                maxWidth: 'none',
  },
};

FoodItems = React.createClass({

  mixins: [ReactMeteorData],

  propTypes: {
  foodItem: React.PropTypes.object.isRequired
  },

  getInitialState(){
      return({
      openClaim: false,
      alreadyClaimed: false,
      claimPop: false
      })
  },
  calculatePortionsLeft(){
    var x = 0;
    var claims = this.props.foodItem.claims;
    if (claims){
			for(claim in claims){
          		x = x + claims[claim].accepted;
      	}
		} return x
  },
 
	getMeteorData(){
		return{
			currentUser: Meteor.user() ? Meteor.user().username : ''
			};
	},

  deleteThisItem() {
    FoodItemsC.remove(this.props.foodItem._id);
  },

  genPrtnImg: function () {
    var pCla = this.calculatePortionsLeft();
    var pNum = this.props.foodItem.portionNo - pCla;
    var x = [];
    for (i = 0; i < pNum; i++){
      x.push(<img className="carrotImg" src="/imgs/carrot.png" />);
    }

    var z = [];
    for (n = 0; n < pCla; n++){
      z.push(<img className="carrotImg" src="/imgs/noCarrot.png" />);
    }

    return <div>{x}{z}({pNum})</div>;

  },

    handleOpen : function () {
        this.setState({openClaim: true});
    },

    handleClose : function (alreadyClaimed) {
        this.setState({openClaim: false});
        this.setState({alreadyClaimed: alreadyClaimed});
        this.setState({claimPop: true});
    },

    genProfImg() {
   	return(<img className="profilePic" src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />);
    },

    genClaimMess : function () {
    	if (this.state.alreadyClaimed){
    		return "You've already claimed that item!"
    	}else{
    		return "Item claimed! Please wait for a response."
    	}
    },

    handleRequestClose : function () {
    	this.setState({claimPop: false});
    },

  render : function (){

    const actions = [     
			<ClaimControl 
			    id={this.props.foodItem._id}
			    claims={this.props.foodItem.claims}
			    portions={this.props.foodItem.portionNo}
			    username={this.data.currentUser}
			    portionsLeft={this.props.foodItem.portionNo - this.calculatePortionsLeft()}
			    accept={false}
			    finishIt={this.handleClose}
			/>,
			<FlatButton
			    label="Cancel"
			    secondary={true}
			    onTouchTap={this.handleClose}
			/>
			];

    return(
			<div>
				<Tabs>
		            <Tab label={ <IconButton>
		                        <SvgIcons.ActionViewModule color='White' />
		                        </IconButton>}>
		              <div style={styles.root}>
		                  <GridList
		                  cellHeight={200}
		                  style={styles.gridList}
		                  >
		                      <GridTile
		                      key={this.props.foodItem.imgURL}
		                      title={this.props.foodItem.foodName}
		                      subtitle={<span>by <b>{this.props.foodItem.username}</b></span>}
		                      actionIcon={
		                        <div>
		                          <IconButton onTouchTap={this.handleOpen}>
		                            <SvgIcons.ActionShoppingCart color='White' />
		                          </IconButton>                        
		                          <IconButton containerElement={ <Link to={'/ItemView/'+this.props.foodItem._id}/> } linkButton={true}>
		                            <SvgIcons.CommunicationChatBubble color='White' />
		                          </IconButton>
		                        </div>
		                      }
		                      >
		                        <img src={this.props.foodItem.imgURL} />
		                      </GridTile>
		   
		                  </GridList>
		              </div>
		            </Tab>
		            <Tab label={<SvgIcons.ActionList color='White' />}>
		            	<div>
						<Card>
							<CardHeader
								title={this.props.foodItem.foodName}
								subtitle={this.genPrtnImg()}
								avatar={this.props.foodItem.imgURL}
								actAsExpander={true}
								showExpandableButton={true}
							/>
							<CardMedia 
								expandable={true}
								overlay={
									<CardTitle
										title={this.props.foodItem.foodDesc}
										subtitle={"Offered By: " + this.props.foodItem.username}
									/>
								}
							>
								<img src={this.props.foodItem.imgURL} />
							</CardMedia>

							{ this.props.pathName == '/Messages' && this.props.foodItem.claims ?

								<CardText expandable={true}>
								<Request claims={this.props.foodItem.claims} />
								</CardText>
							:			
							""
							}

							{ this.data.currentUser == this.props.foodItem.username ?

								<CardActions expandable={true}>
								<Link to={'/ItemView/'+this.props.foodItem._id}>
								<FlatButton label="Discuss" />
								</Link>

								<FlatButton
									label="Delete"
									primary={true}
									onTouchTap={this.deleteThisItem}
								/>
								</CardActions>

							:

								<CardActions expandable={true}>
								<FlatButton
									label="Claim"
									primary={true}
									onTouchTap={this.handleOpen}
								/>
								<Dialog
									title="Claim!"
									actions={actions}
									modal={true}
									contentStyle={styles.claim}
									open={this.state.openClaim}
								>
									How many portions do you wish to claim?
								</Dialog>
								<Link to={'/ItemView/'+this.props.foodItem._id}>
								<FlatButton label="Discuss" />
								</Link>
								</CardActions>

							}
						</Card>
						</div>
					</Tab>
			    </Tabs>
				<Snackbar
					open={this.state.claimPop}
					message={this.genClaimMess()}
					autoHideDuration={3600}
					action="Close"
					onTouchTap={this.handleRequestClose}
					onRequestClose={this.handleRequestClose}
				/>
				
			</div>
    );
   }
});
