AppHeader = React.createClass({


    render : function(){
	    return(
		<div className="container">

		    <header>
			<h1>Food Sharing</h1>
			<AccountsUIWrapper />
		    </header>

		    {this.props.children}    

		</div>    
	    );

    }

})	 
