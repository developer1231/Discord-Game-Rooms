require('dotenv').config();
const fs = require("node:fs");
const path = require("node:path");
const {
  REST,
  Routes,
  ChannelType,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  AttachmentBuilder,
  Embed,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ThreadAutoArchiveDuration,
} = require("discord.js");
const {
  Client,
  Events,
  GatewayIntentBits,
  PermissionFlagsBits,
  Collection,
  EmbedBuilder,
} = require("discord.js");
const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});

const commands = [];
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
client.commands = new Collection();
for (const folder of commandFolders) {
  if (fs.lstatSync("./commands/" + folder).isDirectory()) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
}

const rest = new REST().setToken(process.env.DISCORD_BOT_TOKEN);
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );
    const data = await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}


 
   
   
     
client.on(Events.InteractionCreate, async (interaction) => {
  let command = client.commands.get(interaction.commandName);
  if (interaction.isCommand()) {
    command.execute(interaction);
  }
 
 if(interaction.isButton()){
  if(interaction.customId === "close_ticket"){
   
      let toLogChannel = new EmbedBuilder()
      .setTitle(":x: | Gatcha Room Closed")
      .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
      .setThumbnail("https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_message_attachment_large_thumb/v1/secured-attachments/messaging_message/attachment/46912c8961a5b259230b743f036f3d1e-1728555427704/image.png?__cld_token__=exp=1728612375~hmac=d80ecb807c47922cbd41447299b3fa47ac5275fdf35c40cec7bb9207644193d8")
      .setDescription(
        `> ${interaction.member} has successfully marked this room as closed. The channel shall be deleted in exactly 1 minute.`
      )
      .setColor("Red")
      .setTimestamp();
  
    await interaction.reply({
      embeds: [toLogChannel],
    });
    setTimeout(async () => {
      await interaction.channel.delete();
    }, 60000);
    

  }
 if(interaction.customId === "create_ticket"){
  let channel = await interaction.guild.channels.create({
    name: `🐈-${interaction.member.user.username}`,
    type: ChannelType.GuildText,
   permissionOverwrites: [{
    id: `${interaction.guild.id}`,
    deny: [PermissionFlagsBits.ViewChannel]
   },
   {
    id: `${interaction.member.id}`,
    allow: [PermissionFlagsBits.ViewChannel]
   }]
});
let button = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
   .setCustomId('close_ticket')
   .setLabel('Close Channel')
   .setStyle(ButtonStyle.Danger)
)
  let toLogChannel = new EmbedBuilder()
  .setTitle("🐈 | Welcome!")
  .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
  .setThumbnail("https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_message_attachment_large_thumb/v1/secured-attachments/messaging_message/attachment/46912c8961a5b259230b743f036f3d1e-1728555427704/image.png?__cld_token__=exp=1728612375~hmac=d80ecb807c47922cbd41447299b3fa47ac5275fdf35c40cec7bb9207644193d8")
  .setDescription(
    `> Dear ${interaction.member},\n\n> Welcome to your private room!\n> Here you can play all gatcha games privately, without other people disturbing you.\n> **Done playing?** Simply click the **Close Channel** button to delete this room and all messages.\n\n> **Have Fun!**`
  )
  .setColor("Red")
  .setTimestamp();

await channel.send({
  embeds: [toLogChannel],
  components: [button],
});
  await interaction.reply({ ephemeral:true, content: `> A new private Gatcha game room has been created. Please head over to the ${channel} channel.` });
}
 
  
 }
  
});

client.login(process.env.DISCORD_BOT_TOKEN);