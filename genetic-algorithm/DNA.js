// Pathfinding w/ Genetic Algorithms
// DNA is an array of vectors

class DNA {
  constructor(genes) {
    this.senseOfSmell = 0.1; // measure of sense of smell for mouse

    if (genes) {
      this.genes = genes;
    } else {
      //create a random 2d vector for each frame of the mice will exist
      this.genes = [];
      for (let i = 0; i < lifetime; i++) {
        let geneVector = p5.Vector.random2D();

        //multiply by sense of smell
        geneVector.mult(random(0, this.senseOfSmell));

        this.genes.push(geneVector);
      }
    }
    // Let's give each Rocket an extra boost of strength for its first frame
    this.genes[0].normalize();
  } // end constructor

  // CROSSOVER
  // Creates new DNA sequence from two (this & and a partner)
  crossover(partner) {
    let childGenes = new Array(this.genes.length);
    // Pick a midpoint
    let crossoverPoint = int(random(this.genes.length));
    //add genes first uptill crossover point, then add partners genes after crossover point to child.
    for (let i = 0; i < this.genes.length; i++) {
      if (i > crossoverPoint) childGenes[i] = this.genes[i];
      else childGenes[i] = partner.genes[i];
    }
    return new DNA(childGenes);
  }
  // Based on a mutation probability, picks a new random Vector
  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        // if random number is less than mutation rate then mutate
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].mult(random(0, this.senseOfSmell));
        // if (i == 0) this.genes[i].normalize();
      }
    }
  }
}
