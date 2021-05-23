const getCache = require("../util/getCache");

const cache = getCache();

module.exports = class SuperActiveRoleManager {
  constructor(messageReaction, user) {
    this.messageReaction = messageReaction;
    this.user = user;
    this.guild = messageReaction.message.guild;
    this.rule = user.client.superActiveRoleRules[this.guild.id];
  }

  isNotFull() {
    return (
      this.guild.id in cache &&
      cache[this.guild.id].userIds.size < this.rule.maxRoleUsers
    );
  }

  isValidMessageReactionAdd() {
    return (
      !this.user.bot &&
      !this.user.system &&
      this.isNotFull() &&
      !cache[this.guild.id].userIds.has(this.user.id) &&
      cache[this.guild.id].message.id === this.messageReaction.message.id &&
      this.rule.emoji ===
        (this.messageReaction.emoji.id || this.messageReaction.emoji.name)
    );
  }

  async addRole() {
    cache[this.guild.id].userIds.add(this.user.id);
    const member = this.guild.members.resolve(this.user);
    await member.roles.add(this.rule.roleId);
  }
};
