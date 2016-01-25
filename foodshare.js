FoodItems = new Mongo.Collection("foodItem");

function foodItemSubmit() {

    form = {};

    $.each($('#new-foodItem').serializeArray(), function() {
        form[this.name] = this.value;
    });

    //do validation on form!!!

    FoodItems.insert(form, function(err) {
        if(!err) {
            alert("Submitted!");
            $('#new-foodItem')[0].reset();
        }
        else
        {
            alert("Something is wrong");
            console.log(err);
        }
    });

}

if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
        foodItems: function () {
            return FoodItems.find({}, {sort: {createdAt: -1}});
        }
    });
 
Template.body.events({'submit' : function(event) {
    foodItemSubmit();
    event.preventDefault(); //prevent page refresh
}});
}


