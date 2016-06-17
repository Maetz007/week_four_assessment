var express = require("express");
var app = express();
var path = require("path");
var pg = require("pg");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended:false});
var connectionString = 'postgres://localhost:5432/animalDatabase';
var randomGenerator = require("../modules/randomGenerator");

app.use( express.static("public"));

app.listen(3000, "localhost", function(){ console.log("All clear on 3K, boss."); });

app.get("/", function(req, res){
  console.log("URL hit");
  res.sendFile( path.resolve ("views/index.html") );
}); // end URL app.get

//-------------------------------------------------------------------------------------------------------------------

app.post("/addAnimal", urlencodedParser, function(req, res){
  pg.connect( connectionString, function( err, client, done ){
    client.query("INSERT INTO animals (animal_type, num_animals) VALUES ($1, $2);", [req.body.animalbOj, randomGenerator()]);
  }); // end pg.connect
  res.send("res success");
}); // end /addAnimal

//-------------------------------------------------------------------------------------------------------------------

app.get("/getAllAnimals", function(req, res){
  var animalResult = [];
  pg.connect( connectionString, function(err, client, done){
    var callData = client.query("SELECT * FROM animals;");
    callData.on('row', function(row){
      animalResult.push(row);
    });
    callData.on('end', function (){
      return res.json(animalResult);
    }); // end callData
  }); // end connect
}); // end app.get /getAllAnimals
