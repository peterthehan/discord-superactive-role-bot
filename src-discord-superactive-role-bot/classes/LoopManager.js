const getCache = require("../util/getCache");
const getRandomInt = require("../util/getRandomInt");

const cache = getCache();

module.exports = class LoopManager {
  constructor(guild) {
    this.guild = guild;
    this.rule = guild.client.superActiveRoleRules[guild.id];
  }

  async removeRoleFromAllMembers() {
    this.guild.members.cache
      .filter((member) => member.roles.cache.has(this.rule.roleId))
      .forEach((member) => member.roles.remove(this.rule.roleId));
  }

  async openRole() {
    const randomIndex = getRandomInt(0, this.rule.channelIds.length);
    const channelId = this.rule.channelIds[randomIndex];
    const channel = await this.guild.client.channels.fetch(channelId);

    const openText = this._formatText(this.rule.openText);
    const message = await channel.send(openText);

    await message.react(this.rule.emoji);

    cache[this.guild.id] = { message, userIds: new Set() };
  }

  async closeRole() {
    if (!(this.guild.id in cache)) {
      return;
    }

    const { message } = cache[this.guild.id];
    delete cache[this.guild.id];

    await message.reactions.removeAll();

    const { members } = await this.guild.roles.fetch(this.rule.roleId);
    const closeText = this._formatText(
      members.size === 0
        ? this.rule.noClaimCloseText
        : this.rule.claimCloseText,
      members.map((member) => member.toString())
    );
    await message.edit(closeText);

    if ("messageClose" in this.rule) {
      setTimeout(
        () => message.delete(),
        getRandomInt(
          this.rule.messageClose.minDuration,
          this.rule.messageClose.maxDuration
        )
      );
    }
  }

  _formatText(text, users = []) {
    return text
      .replace(/\{users\}/gi, users.join(" "))
      .replace(/\{role\}/gi, `<@&${this.rule.roleId}>`);
  }
};
