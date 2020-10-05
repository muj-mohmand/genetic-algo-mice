class SnakePopulation {
  constructor(m, num) {
    this.mutationRate = m; // Mutation rate
    this.population = []; // Array to hold the current population
    this.matingPool = []; // Array for mating pool
    this.generations = 0; // Number of generations
    //make a new set of creatures
    for (let i = 0; i < num; i++) {
      let location = createVector(width / 2, height - 20);
      this.population[i] = new Snake(new SnakeDNA(), location);
    }
  }

  start() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].run();
    }
  }

  // Calculate fitness for each creature
  fitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness();
    }
  }

  // Generate a mating pool
  selection() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    var maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the population (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (let i = 0; i < this.population.length; i++) {
      //map(value, start1, stop1, start2, stop2, [withinBounds])
      let fitnessNormal = map(
        this.population[i].getFitness(),
        0,
        maxFitness,
        0,
        1
      );
      let n = floor(fitnessNormal * 100); // Arbitrary multiplier

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Making the next generation
  reproduction() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      // Spin the wheel of fortune to pick two parents
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      // Pick two parents
      let parentA = this.matingPool[a];
      let parentB = this.matingPool[b];
      // Get their genes

      let parent_a_genes = parentA.getDNA();
      let parent_b_genes = parentB.getDNA();
      // Mate their genes
      let child = parent_a_genes.crossover(parent_b_genes);
      // Mutate their genes
      child.mutate(this.mutationRate);
      // Fill the new population with the new child
      let location = createVector(width / 2, height - 20);
      this.population[i] = new Snake(child, location);
    }
    this.generations++;
  }

  getGenerations() {
    return this.generations;
  }

  // Find highest fitness for the population
  getMaxFitness() {
    let record = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
      }
    }
    return record; // highest fitness score in the pool
  }
}
