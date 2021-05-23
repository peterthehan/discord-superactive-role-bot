const getRandomInt = require("./getRandomInt");

module.exports = (intervalFunction, minDelay = 0, maxDelay = 0) => {
  let timeout;

  const runInterval = () => {
    const delay = getRandomInt(minDelay, maxDelay);
    timeout = setTimeout(() => {
      intervalFunction(delay);
      runInterval();
    }, delay);
  };

  runInterval();

  return {
    clear() {
      clearTimeout(timeout);
    },
  };
};
