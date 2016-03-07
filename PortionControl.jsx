PortionControl = React.createClass({
    
    render(){
	return(
	      <select name="portionSelect" ref="PSR">
	      	      <NumberOptions portions={this.props.portions} />
	      </select>
	);
    }



});
