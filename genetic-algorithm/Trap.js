class Trap {
  constructor(location) {
    // All of our physics stuff
    this.position = location.copy();
    // Size
    this.width = 50;
    this.height = 1.3 * this.width;
    //directions of the cat
    //life of the cat

    this.image = loadImage("images/mousetrap.png");
  }

  display() {
    image(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
} // end class
