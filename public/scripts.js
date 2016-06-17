$(document).ready(function(){

//------------------------------------------------------------------------------------------------------------------

$("#addAnimalBtn").on("click", function(){
  var newAnimal = $("#animalInput").val();
  var empty = "";
    if (newAnimal == empty){
      alert("Zoo doesn't accept invisible animals!");
  } else {
    var animalObject = {
      "animalbOj": newAnimal,
  }; // end task object
    $.ajax({
      type: "POST",
      url: "/addAnimal",
      data: animalObject,
      success: function(){
        animalsDisplay();
      } // end success
    }); // end ajax
  } // end else
}); // end add animal button

//------------------------------------------------------------------------------------------------------------------

function animalsDisplay(){
  document.getElementById("animalZoo").innerHTML = "";
    $.ajax({
      type: "GET",
      url: "/getAllAnimals",
      success: function(data){
        for (var i = 0; i < data.length; i++) {
          var displayAnimals = document.createElement("p");
          var animal = "Animals from Zoo-tabase: " + data[i].num_animals + " " + data[i].animal_type;
          displayAnimals.textContent = animal;
          $("#animalZoo").append(displayAnimals);
        } // end for loop
     } // end success
   }); // end ajax
} // end animalsDisplay

//------------------------------------------------------------------------------------------------------------------

$("#loadAnimals").on("click", function(){
  animalsDisplay();
});

//------------------------------------------------------------------------------------------------------------------

}); // end document ready
