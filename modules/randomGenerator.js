var randomNumAnimals = function(){
  function randomNumber(min, max){ return Math.floor(Math.random() * (1 + max - min) + min); }
  var randomNum = randomNumber(1, 100);
  return randomNum;
};
module.exports = randomNumAnimals;
