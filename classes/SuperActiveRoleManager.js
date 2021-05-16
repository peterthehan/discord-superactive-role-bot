module.exports = class SuperActiveRoleManager {
  constructor(guild, user) {
    this.guild = guild;
    this.rule = guild.client.superActiveRoleRules[guild.id];
    this.member = guild.members.resolve(user);
  }

  isFull() {
    return (
      this.guild.roles.resolve(this.rule.roleId).members.size >=
      this.rule.maxRoleUsers
    );
  }

  isValidMessageReactionAdd(emoji) {
    return (
      emoji &&
      !this.member.user.bot &&
      !this.member.user.system &&
      this.rule.emoji === (emoji.id || emoji.name) &&
      !this.member.roles.cache.has(this.rule.roleId) &&
      !this.isFull()
    );
  }

  async addRole() {
    await this.member.roles.add(this.rule.roleId);
  }
};
