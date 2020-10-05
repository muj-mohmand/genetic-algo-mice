class Snake {
  constructor(dna, location) {
    //directions of the snake
    this.dna = dna;
    this.fitness;
    this.geneCounter = 0;

    // All of our physics stuff
    this.acceleration = createVector();
    this.velocity = createVector();
    this.position = location.copy();
    // Size and display
    this.r = 2;
    this.movement = false;

    //life of the cat
    this.lifetime = 300;

    this.killCount = 1;
    this.totalDistance = 0;

    this.foundMouse = false;

    //this.circleOfDeath = killRadius;
  }

  calcFitness() {
    //fitness = number of mice killed + circle of death radius
    this.updateKillCount();
    this.fitness = pow(this.killCount, 2);
  }

  run() {
    if (!this.foundMouse) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length; // run through genes of dna
      this.update();
    }
    this.display();
  }
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.updateKillCount();
  }
  applyForce(f) {
    // adds force to acceleration
    this.acceleration.add(f);
  }

  updateKillCount() {
    let mousePopulation = population.population;
    for (let i = 0; i < mousePopulation.length; i++) {
      // loop through each mouse in population
      let d = dist(
        this.position.x,
        this.position.y,
        mousePopulation[i].position.x,
        mousePopulation[i].position.y
      );

      if (d < 4) {
        this.killCount++;
        //this.foundMouse = true;
        mousePopulation[i].dead = true;
      }
    } //end loop
  }

  display() {
    let theta = this.velocity.heading() + PI / 2;
    let r = 2;

    push();

    translate(this.position.x, this.position.y);
    rotate(theta);

    noStroke();
    fill("green");
    triangle(0, 10 * r, 5 * r, 0, 10 * r, 10 * r);

    strokeWeight(1 * r);
    stroke(1);

    //eyes

    circle(4 * r, 5 * r, 0);
    circle(6 * r, 5 * r, 0);
    noStroke();
    beginShape();

    vertex(0, 10 * r);
    vertex(10 * r, 10 * r);
    vertex(10 * r, 10 * r * 4);
    vertex(0, 10 * r * 4);

    endShape();
    pop();
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }
}
