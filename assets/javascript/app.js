$(document).ready(function(){

    var displayedButtons = ["Asparagus", "Steak", "Lobster", "Sour Patch Kids", "Crepes", "Chocolate", "Crab Legs", "Chicken Wings"];

    function displayImg(){

        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=IUABehSkrxv2WnnE0ota8xteIf4oxMxH";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(var j = 0; j < limit; j++) {    

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
            
                var image = $("<img>");
                image.attr("src", response.data[j].images.fixed_height_still.url);
                image.attr("data-still", response.data[j].images.fixed_height_still.url);
                image.attr("data-animate", response.data[j].images.fixed_height.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.prepend(image);

                var rating = response.data[j].rating;
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").prepend(displayDiv);
            }
        });
    }

    function renderButtons(){ 

        $("#display-buttons").empty();

        for (var i = 0; i < displayedButtons.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-outline-dark");
            newButton.attr("id", "input")  
            newButton.attr("data-name", displayedButtons[i]); 
            newButton.text(displayedButtons[i]); 
            $("#display-buttons").append(newButton); 
        }
    }

    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#submitPress").on("click", function(){

        var input = $("#user-input").val().trim();
        form.reset();
        displayedButtons.push(input);
                
        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});