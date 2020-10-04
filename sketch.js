//Create variables here

var database;
var dog, happyDog;
var foods, foodStock;
var firebase;
var food;
var foodArray = [];

var dogImage, dogImage2, dogSprite;

var gameStage = "start";

function preload()
{
  dogImage = loadImage("images/Full.png");
  dogImage2 = loadImage("images/Hungry.png");
  foodImage = loadImage("images/Milk.png");
  
}

function setup() {
  createCanvas(1200, 600);
  
  dogSprite = createSprite(250,350, 30,30);
  dogSprite.addImage(dogImage);

  //initialize the firebase connection
  firebase.initializeApp(firebaseConfig);
  console.log(firebase);

  //create the database
  database = firebase.database();
  
  // Use the food variable
  foodStock = database.ref('Food');

  //On is a function handler which reads changes to the food variable
  foodStock.on('value', readStock);

  //Create FEED Button
  feed = createButton("Feed Odie");
  feed.position(1400, 60);

  //Create ADD Button
  add = createButton("Add Food Item");
  add.position(1250, 60);

  dogSprite.addImage(dogImage2); 
  dogSprite.scale = 0.1;

  showFood();
}


function draw() {  
  background(46, 139, 87);

  feed.mousePressed(feedDog);
  add.mousePressed(addFood);

  drawSprites();
  
  text("Food Left: "+foods, 180, 85);
}

function mouseReleased(){
  dogSprite.addImage(dogImage2);
  dogSprite.scale = 0.1;
}

// Readstock is a asynchronous 
function readStock (data){
  foods = data.val();
}

function showFood(){
  for(var i = 0; i < 21; i++){
    if(i < 10){
      foodArray[i] = createSprite(640 + i * 30, 300, 20, 20)
      foodArray[i].addImage(foodImage);
      foodArray[i].scale = 0.1;
    }
    if(i > 10){
      foodArray[i] = createSprite(610 + (i - 10) * 30, 380, 20, 20)
      foodArray[i].addImage(foodImage);
      foodArray[i].scale = 0.1;
    }
    console.log(foodArray[i]);
  }
}

function feedDog(){
  foods = foods - 1;
  console.log(foods);
  dogSprite.addImage(dogImage);
  dogSprite.scale = 0.3;
  foodArray[foods+1].visible = false;
}

function addFood(){
  foods = foods + 1;
  console.log(foods);
  foodArray[foods-1].visible = true;

  if(foods > 20){
    text("NO MORE THAN 20 BOTTLES", 200,100);
  }
}





