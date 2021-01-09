let counter = 0;
module.exports = {
  getCounter() {
    return counter;
  },
  incrementCounter() {
    counter += 1;
  },
};
