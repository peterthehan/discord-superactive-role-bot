const getDuration = require("../util/getDuration");
const getRandomInt = require("../util/getRandomInt");

const cache = {};

module.exports = class SuperActiveRoleManager {
  constructor(messageReaction) {
    this.message = messageReaction.message;
    this.guild = messageReaction.message.guild;
    this.rule = messageReaction.client.superActiveRoleRules[this.guild.id];
  }

  async removeRoleFromAllMembers() {
    return Promise.all(
      this.guild.members.cache
        .filter((member) => member.roles.cache.has(this.rule.roleId))
        .map((member) => member.roles.remove(this.rule.roleId))
    );
  }

  async openRole() {
    this.message = await this._sendRandomMessage();

    cache[this.message.id] = new Set();
    this.message.react(this.rule.emoji);
  }

  isNotFull() {
    return (
      this.message.id in cache &&
      cache[this.message.id].size < this.rule.maxRoleUsers
    );
  }

  isValidMessageReactionAdd(emoji, user) {
    return (
      this.isNotFull() &&
      !cache[this.message.id].has(user.id) &&
      this.rule.emoji === (emoji.id || emoji.name) &&
      !user.bot &&
      !user.system &&
      this.message.channel.type === "text"
    );
  }

  async addRole(user) {
    cache[this.message.id].add(user.id);

    const member = await this.guild.members.fetch(user);
    member.roles.add(this.rule.roleId);
  }

  async closeRole() {
    if (!(this.message.id in cache)) {
      return;
    }

    this.message.reactions.removeAll();
    const users = [...cache[this.message.id]].map((userId) => `<@!${userId}>`);
    delete cache[this.message.id];

    await this._editMessage(users);

    if ("messageClose" in this.rule) {
      setTimeout(
        () => this._deleteMessage(),
        getDuration(this.rule.messageClose)
      );
    }
  }

  async _sendRandomMessage() {
    const randomIndex = getRandomInt(0, this.rule.channelIds.length);
    const channelId = this.rule.channelIds[randomIndex];
    const channel = await this.guild.client.channels.fetch(channelId);

    const openText = this._formatText(this.rule.openText);
    return channel.send(openText);
  }

  async _editMessage(users) {
    const closeText = this._formatText(
      users.length === 0
        ? this.rule.noClaimCloseText
        : this.rule.claimCloseText,
      users
    );

    return this.message.edit(closeText);
  }

  async _deleteMessage() {
    return this.message.delete();
  }

  _formatText(text, users = []) {
    return text
      .replace(/\{users\}/gi, users.join(" "))
      .replace(/\{role\}/gi, `<@&${this.rule.roleId}>`);
  }
};
