const rules = require("../config.json");
const LoopManager = require("../classes/LoopManager");
const getRandomInt = require("../util/getRandomInt");
const setRandomInterval = require("../util/setRandomInterval");

const loop = async (manager) => {
  await manager.removeRoleFromAllMembers();
  await manager.openRole();

  setTimeout(
    () => manager.closeRole(),
    getRandomInt(
      manager.rule.messageOpen.minDuration,
      manager.rule.messageOpen.maxDuration
    )
  );
};

module.exports = async (client) => {
  console.log(__dirname.split("\\").slice(-2)[0]);

  client.superActiveRoleRules = {};
  for (const rule of rules) {
    client.superActiveRoleRules[rule.guildId] = rule;

    const guild = client.guilds.resolve(rule.guildId);
    const manager = new LoopManager(guild);

    loop(manager);

    setRandomInterval(
      () => loop(manager),
      rule.role.minDuration,
      rule.role.maxDuration
    );
  }
};
