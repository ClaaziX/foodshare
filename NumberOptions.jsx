NumberOptions = React.createClass({

    genPtNo: function (pNo) {
	var x = [];
	for (i = 1; i <= pNo; i++){
	    x.push(<option value={i}>{i}</option>,);
	}
	return x
    },

    genPtNo: function (pNo) {
	var x = [];
	for (i = 1; i <= pNo; i++){
	    x.push(<option value={i}>{i}</option>,);
	}
	return x
    },
    
    render() {
	return(
		    {return [this.genPtNo(this.props.portions]}
	
	);
    }

});