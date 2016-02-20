MultiViewApp = React.createClass({
	  getInitialState : function() {
	  		  return {
			  view : 'foodView'
			  }
	  },

	  render : function(){

		switch(this.state.view){
			case 'foodView':
				return (<FoodView />);
		
		}


	         	
	  }

})	 