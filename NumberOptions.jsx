var {
  DropDownMenu,
  MenuItem
    } = MUI;

NumberOptions = React.createClass({

	getInitialState(){
		return{
		openClaim: false,
		values: 1,
		}
	},

    genPtNo: function (pNo) {
	var x = [];
	for (i = 1; i <= pNo; i++){
	    x.push(<MenuItem value={i} key={i} primaryText={i}/>);
	}
	return x
    },

	handleChange : function (e, index, value){
		this.setState({values: value});
		this.props.optionChange(value);
	},

    render() {
	return(
		<DropDownMenu maxHeight={300} value={this.state.values} onChange={this.handleChange}>
			{this.genPtNo(this.props.options)}
        </DropDownMenu>
	);
    }

});