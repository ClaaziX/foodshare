AppHeader = React.createClass({

    getCurrentView : function(){
	switch(this.state.view){
	    case 'foodView':
		return(<FoodView />);
	}
    },

    getInitialState : function() {
	return {
	    view : 'foodView'
	}
    },

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
