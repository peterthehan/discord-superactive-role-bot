const SuperActiveRoleManager = require("../classes/SuperActiveRoleManager");

module.exports = async (messageReaction, user) => {
  const manager = new SuperActiveRoleManager(messageReaction);
  if (!manager.isValidMessageReactionAdd(messageReaction.emoji, user)) {
    return;
  }

  await manager.addRole(user);
  if (manager.isNotFull()) {
    return;
  }

  manager.closeRole();
};
