const rules = require("../config");
const SuperActiveRoleManager = require("../classes/SuperActiveRoleManager");
const getDuration = require("../util/getDuration");

const loop = async (manager) => {
  await manager.removeRoleFromAllMembers();
  await manager.openRole();

  setTimeout(() => manager.closeRole(), getDuration(manager.rule.messageOpen));
};

module.exports = async (client) => {
  console.log("superActiveRole: ready");

  client.superActiveRoleRules = {};
  for (const rule of rules) {
    client.superActiveRoleRules[rule.guildId] = rule;
    const guild = client.guilds.resolve(rule.guildId);
    const messageReaction = { message: { guild }, client };
    const manager = new SuperActiveRoleManager(messageReaction);
    loop(manager);

    setInterval(() => loop(manager), getDuration(manager.rule.role));
  }
};
