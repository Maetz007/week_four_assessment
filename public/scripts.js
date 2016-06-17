$(document).ready(function(){

//------------------------------------------------------------------------------------------------------------------

$("#addAnimalBtn").on("click", function(){
  var newAnimal = $("#animalInput").val();
  var randomNum = randomNumber(1, 100);
  var empty = "";
    if (newAnimal == empty){
      alert("Zoo doesn't accept invisible animals!");
  } else {
    var animalObject = {
      "animalbOj": newAnimal,
      "randomNumObj": randomNum,
  }; // end task object
    $.ajax({
      type: "POST",
      url: "/addAnimal",
      data: animalObject,
      success: function(){
        document.getElementById("animalZoo").innerHTML = "";
        animalsDisplay();
      } // end success
    }); // end ajax
  } // end else
}); // end add animal button

//------------------------------------------------------------------------------------------------------------------

function animalsDisplay(){
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

function randomNumber(min, max){ return Math.floor(Math.random() * (1 + max - min) + min); }

}); // end document ready
