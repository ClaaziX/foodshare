var {
  Styles,
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
};

GridView = React.createClass({

	propTypes: {
		foodItems: React.PropTypes.array.isRequired
	},

	getOpenPop: function(item) {
    	var that = this;
  		openPop = function(event) {
  			that.props.handlePop(item)
			}
	  return openPop
	},

	render: function () {
		var foodS = this.props.foodItems;
		return(
			<div style={styles.root}>
				<GridList
				cellHeight={200}
				style={styles.gridList}
				>
					{foodS.map(tile => (
					  <GridTile
					  key={tile._id}
					  title={tile.foodName}
					  subtitle={<span>by <b>{tile.username}</b></span>}
					  actionIcon={
					    <div>
					      <IconButton onTouchTap={this.getOpenPop(tile)}>
					        <SvgIcons.ActionShoppingCart color='White' />
					      </IconButton>                        
					      <IconButton containerElement={ <Link to={'/ItemView/'+tile._id}/> } linkButton={true}>
					        <SvgIcons.CommunicationChatBubble color='White' />
					      </IconButton>
					    </div>
					  }
					  >
					    <img src={tile.imgURL} />
					  </GridTile>
					))}
				</GridList>
			</div>
		);
	}
});
