const LoopManager = require("../classes/LoopManager");
const SuperActiveRoleManager = require("../classes/SuperActiveRoleManager");

module.exports = async (messageReaction, user) => {
  const manager = new SuperActiveRoleManager(messageReaction, user);
  if (!manager.isValidMessageReactionAdd()) {
    return;
  }

  await manager.addRole();
  if (manager.isNotFull()) {
    return;
  }

  await new LoopManager(messageReaction.message.guild).closeRole();
};
