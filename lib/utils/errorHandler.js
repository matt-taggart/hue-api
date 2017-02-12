module.exports = function errorHandler(results) {
  results.forEach(element => {
    if (element.error) {
      throw new Error('Failed to set color. This is most likely due to a light being set to off.');
    }
  });
};
