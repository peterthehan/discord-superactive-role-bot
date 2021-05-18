# Discord Superactive Role Bot

[![Discord](https://discord.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A Discord bot that randomly spawns a self-assignable, temporary role on a timer.

## Setup

1. Follow the instructions in [create-discord-bot](https://github.com/peterthehan/create-discord-bot).

   > Don't forget to give your bot the `Manage Roles` permission!

2. Download this widget and move the `src-discord-superactive-role-bot` folder into the [src/widgets/](https://github.com/peterthehan/create-discord-bot/tree/master/app/src/widgets) folder created in step 1.

3. Open [config.json](https://github.com/peterthehan/discord-superactive-role-bot/blob/master/config.json) to configure your own settings:

   ```json
   [
     {
       "emoji": "🅱️",
       "roleId": "738466795341479997",
       "guildId": "258167954913361930",
       "channelIds": [
         "258167954913361930",
         "418990932399226882",
         "264627745177206786",
         "419681885166239744",
         "747319121582096434",
         "842667470900822028",
         "755818716641624104",
         "266041562033553408",
         "765411104372817990",
         "755136985856737321"
       ],
       "maxRoleUsers": 3,
       "openText": "React to claim {role}!",
       "claimCloseText": "{users} claimed {role}!",
       "noClaimCloseText": "No one claimed {role}...",
       "role": {
         "duration": 3000,
         "randomDuration": 1200
       },
       "messageOpen": {
         "duration": 600,
         "randomDuration": 0
       },
       "messageClose": {
         "duration": 300,
         "randomDuration": 0
       }
     }
   ]
   ```

   Add as many rules as you want to configure for other servers.

   - `emoji` is the emoji the bot reacts with after sending the `openText` message. An emoji can be:

     - A unicode emoji. https://emojipedia.org is a good reference to copy and paste from.

       ```
       "😳", "🥺", // etc
       ```

     - An emoji ID for custom emojis. You can get a custom emoji's ID by sending `\:YourCustomEmoji:` in chat (prefix a backslash `\` character in front of your desired emoji).

       ```
       "716344914706694165", "622635442013208589", // etc
       ```

   - `roleId` is the role assigned to the user after reacting.
   - `guildId` is the server to enable this bot for.
   - `channelIds` is the list of channels the bot will randomly choose from when sending the `openText` message.
   - `maxRoleUsers` is the maximum number of users that are allowed to claim the role.
   - `openText` is the message the bot sends to poll for user reactions.
   - `claimCloseText` is the message the bot sends once the number of users that have claimed the role equals `maxRoleUsers` or when the `messageOpen.duration` has elapsed.
   - `noClaimCloseText` is the message the bot sends if no user has claimed the role and `messageOpen.duration` has elapsed.

     - You can embed `{users}` and `{role}` in any of the text configuration strings when crafting your message.

   - `role` durations specify how long the role can be claimed for before the bot unassigns it and polls again.
   - `messageOpen` durations specify how long the bot will poll for user reactions before closing the message.
   - `messageClose` durations specify how long the bot will keep the close message up before deleting the message. Exclude this field altogether from the configuration to keep the close message instead of deleting it.
     - `role`, `messageOpen`, `messageClose` require `duration` and `randomDuration` in seconds.

4. `npm start` to run the bot.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord Server"/>
</a>
