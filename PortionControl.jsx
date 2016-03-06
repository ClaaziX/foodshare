PortionControl = React.createClass({
    
    genPtNo: function (pNo) {
	var x = [];
	for (i = 1; i <= pNo; i++){
	    x.push(<option value={i}>{i}</option>);
	}
	return <select name="portionSelect" ref="PSR">{x}</select>;
    },
    
    render() {
	return(
	    this.genPtNo(this.props.portions)
	);
    }




});
