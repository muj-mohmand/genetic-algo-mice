class Mouse {
  constructor(dna, pos) {
    this.r = 2.5;
    //DNA and fitness
    this.dna = dna;
    this.fitness = 0;
    //physics variables
    this.acceleration = createVector();
    this.velocity = createVector();
    this.position = pos.copy();

    // To count which force we're on in the genes
    this.geneCounter = 0;

    this.hitTarget = false; // has target been reached?

    this.trapped = false; // check to see if we hit an obstacle?
    this.dead = false;
  }

  calcFitness() {
    // fitness = 1/ distance from target squared
    let distance = dist(this.position.x, this.position.y, target.x, target.y);
    if (this.dead || this.trapped) {
      distance += width / 2;
    }

    this.fitness = pow(1 / distance, 2);
  }

  run(traps) {
    this.checkDistance(); // Check to see if we've reached the target
    this.trapChecker(traps);
    if (!this.hitTarget && !this.trapped && !this.dead) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length; // run through genes of dna
      this.update();
    }
    this.display();
  }

  checkDistance() {
    let d = dist(this.position.x, this.position.y, target.x, target.y);
    if (d < 10) {
      this.hitTarget = true;
    }
  }

  applyForce(f) {
    // adds force to acceleration
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    let theta = this.velocity.heading() + PI / 2;
    let r = this.r;

    push();

    translate(this.position.x, this.position.y);
    rotate(theta);

    noStroke();
    fill("gray");
    if (this.trapped || this.dead) fill("#f22525");
    triangle(0, 10 * r, 5 * r, 0, 10 * r, 10 * r);

    strokeWeight(0.5 * r);
    stroke(1);
    fill("black");
    //eyes

    circle(4.5 * r, 3 * r, 0);
    circle(5.5 * r, 3 * r, 0);

    //ears
    fill("pink");
    ellipseMode(CENTER);
    arc(3 * r, 5 * r, 3 * r, 3 * r, 0, PI * 1.25, OPEN);
    arc(8 * r, 5 * r, 3 * r, 3 * r, -45, PI * 1, OPEN);
    //ellipse(7,3, 3, 3); // Inner gray
    fill("black");
    strokeWeight(0.5);
    beginShape();

    vertex(4 * r, 9 * r);
    vertex(5 * r, 10 * r);
    vertex(4 * r, 11 * r);
    vertex(5 * r, 12 * r);

    endShape();
    pop();
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  trapChecker(traps) {
    for (let i = 0; i < traps.length; i++) {
      if (
        this.position.x > traps[i].position.x &&
        this.position.x < traps[i].position.x + traps[i].width &&
        this.position.y > traps[i].position.y &&
        this.position.y < traps[i].position.y + traps[i].height
      ) {
        this.trapped = true;
      }
    }
  }
} // end class
