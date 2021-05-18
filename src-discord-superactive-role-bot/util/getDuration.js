const getRandomInt = require("./getRandomInt");

module.exports = (entity) => {
  return (entity.duration + getRandomInt(0, entity.randomDuration)) * 1000;
};
