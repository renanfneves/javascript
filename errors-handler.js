const Rectangle = function (x, y) {
  this.x = x;
  this.y = y;
  this.calculateArea = function () {
    if (this.x > 0 && this.y > 0) {
      return this.x * this.y;
    } else {
      throw 'Invalid value for x or y';
    }
  };
}

try {
  const rectangle = new Rectangle(-10, 2);
  console.log(rectangle.calculateArea());
} catch (error) {
  console.log('Error:', error);  
}