var aJsonArray = new Array();
var aJson = new Object();
 
aJson.korName = "삽잡이";
aJson.engName = "shovelMan";
aJson.sex = "남";
aJson.bloodType = "B";
 
aJsonArray.push(aJson);
 
aJson.kroName = "삽돌이";
aJson.engName = "sapMan";
aJson.sex = "여";
aJson.bloodType ="A";
 
aJsonArray.push(aJson);
 
var sJson = JSON.stringify(aJsonArray);

console.log(sJson);