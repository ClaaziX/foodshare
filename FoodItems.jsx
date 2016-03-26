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
  DropDownMenu,
  MenuItem
    } = MUI;

var { FontIcon, SvgIcons } = MUI.Libs;
   
var { ThemeManager, LightRawTheme } = Styles;

const {Link} = ReactRouter;

const claimContentStyle = {
                width: '100%',
                maxWidth: 'none',
              };


FoodItems = React.createClass({

  mixins: [ReactMeteorData],
  propTypes: {
  foodItem: React.PropTypes.object.isRequired
  },

  getInitialState(){
      return{
      openClaim: false,
      }
  },

  calculatePortionsLeft(){
    var x = 0;
    var claims = this.props.foodItem.claims;
    if (claims){
             for(claim in claims){
                  if(claim.accepted){
          		x = x + claims.portions;
            }
              }
      	 return (this.props.foodItem.portionNo - x);
     }
     return this.props.foodItem.portionNo;

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
    var pCla = this.props.foodItem.portionNo - this.calculatePortionsLeft();
    var pNum = this.props.foodItem.portionNo - pCla;

    var x = [];
    for (i = 0; i < pNum; i++){
      x.push(<SvgIcons.MapsLocalDining color={Styles.Colors.green500} />);
    }

    var z = [];
    for (n = 0; n < pCla; n++){
      z.push(<SvgIcons.MapsLocalDining color={Styles.Colors.grey500} />);
    }

    return <div>{z}{x}</div>;

  },

    handleOpen : function () {
        this.setState({openClaim: true});
    },

    handleClose : function () {
        this.setState({openClaim: false});
    },

    genProfImg() {
   	return
    	<img className="profilePic" src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png" />;
    },

  render() {

    const actions = [     
        <ClaimControl 
            id={this.props.foodItem._id}
            claims={this.props.foodItem.claims}
            portions={this.props.foodItem.portionNo}
            username={this.data.currentUser}
            portionsLeft={this.calculatePortionsLeft()}
            finishIt={this.handleClose}
        />,
        <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleClose}
        />,
    ];

    return (
        <Card actAsExpander={true}>
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

            { this.data.currentUser  == this.props.foodItem.username 
  	    	?
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
	                    contentStyle={claimContentStyle}
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
    );
    }
    });
