Comment = React.createClass({

	render(){
	return(
	      <tbody>
	          <tr>
          	      <td>
		      {this.props.comment}
          	      </td>
                      <td>
                          <img className="profilePic" src="http://thesocialmediamonthly.com/wp-content/uploads/2015/08/photo.png"></img>
                      </td>
                  </tr>
        	  <tr>
		      <td>{this.props.date}</td>
          	      <td>{this.props.username}</td>
        	  </tr>
             </tbody>



	)}

});