const LoopManager = require("../classes/LoopManager");
const SuperActiveRoleManager = require("../classes/SuperActiveRoleManager");

module.exports = async (messageReaction, user) => {
  const { guild } = messageReaction.message;
  const manager = new SuperActiveRoleManager(guild, user);

  if (!manager.isValidMessageReactionAdd(messageReaction.emoji)) {
    return;
  }

  await manager.addRole();

  if (manager.isFull()) {
    await new LoopManager(guild).closeRole();
  }
};
