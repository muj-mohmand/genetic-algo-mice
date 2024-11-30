//Mujtaba Mohmand
/* 
A pathing finding solution found using Genetic algorithms. 
The mice try to reach the target represented as the yellow square (cheese).
Mouse traps can be placed as obstacles. There can be a population of snakes added that also evovle as
well to become better hunters and act as moving obstacles. 
*/

let lifetime; // How long should each generation live

let population; // Population
let numOfMice = 50;
let mutationRate = 0.01;

let snakePopulation = null; // Initialize as null

let lifeCounter; // Timer for cycle of generation

let target; // Target position

let traps;

let info;
let snakeRelease = false;

let button;

function setup() {
  background(10);
  createCanvas(700, 400);
  // The number of cycles we will allow a generation to live
  lifetime = height;

  // Initialize variables
  lifeCounter = 0;

  target = createVector(width - 20, height / 2);
  button = createButton("Release Snakes");
  button.position(width - button.width, height + 10);
  button.mousePressed(snakeReleased);
  button.style("background: #fc3d03");

  // Create a population with a mutation rate, and population max

  population = new Population(mutationRate, numOfMice);

  info = createP("");
  info.position(10, 380);

  traps = [];
}

function draw() {
  background(240);

  // Draw the start and target positions
  fill("yellow");
  stroke(0);
  rect(target.x, target.y, 24, 24);

  // If the generation hasn't ended yet
  if (lifeCounter < lifetime) {
    population.start(traps);
    if (snakePopulation) snakePopulation.start();
    lifeCounter++;
    // Otherwise a new generation
  } else {
    lifeCounter = 0;
    population.fitness();
    population.selection();
    population.reproduction();

    //snakes
    if (snakePopulation) {
      snakePopulation.fitness();
      snakePopulation.selection();
      snakePopulation.reproduction();
    }
  }

  // Display some info
  fill(0);

  info.html(
    "Generation #: " +
      population.getGenerations() +
      "<br>" +
      "Cycles left: " +
      (lifetime - lifeCounter) +
      "<br>" +
      "Click on the screen to place mouse traps" +
      ` <p class="info">` +
      "A pathing finding solution found using Genetic algorithms. The mice try to reach the target represented as the yellow square (cheese). The closer they are the better chance they have in passing their genes onto  the next generation. The mice evolve and becoming smarter and get closer to the target as generation cycles complete. Mouse traps can be placed  as obstacles for them to avoid. There can be a population of snakes  added that also evovle as well to become better hunters and act as moving obstacles. Inspired by my introduction to AI course and the Nature of Code series. " +
      "</p>"
  );

  traps.forEach(trap => {
    trap.display();
  });
} // end draw

function mouseClicked() {
  let trap = new Trap(createVector(mouseX, mouseY));
  traps.push(trap);
}

function snakeReleased() {
  console.log("snake released pressed");
  if (!snakePopulation) {
    snakePopulation = new SnakePopulation(mutationRate, numOfMice / 4);
  }
}
