const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  AttachmentBuilder,
} = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("setup")
    .setDescription(`Setup a new embed channel`)
    .addChannelOption(option => 
       option.setName("channel")
        .setDescription("Choose the channel to send the embed to")
       .setRequired(true)),

  async execute(interaction) {
    
    if (
     !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      const Embed = new EmbedBuilder()
        .setTitle(":x: | Invalid Permissions")
        .setDescription(`To use this command, you must have the required **admin** permissions.`)
        .setColor("Red")
      return interaction.reply({ ephemeral: true, embeds: [Embed] });
    }
    let channel = interaction.options.getChannel('channel');
    let button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setEmoji("🐈")
        .setCustomId("create_ticket")
        .setStyle(ButtonStyle.Danger)
    );
    let toLogChannel = new EmbedBuilder()
      .setTitle("🐈 | Create Gatcha Room")
      .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL()})
      .setThumbnail("https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_message_attachment_large_thumb/v1/secured-attachments/messaging_message/attachment/46912c8961a5b259230b743f036f3d1e-1728555427704/image.png?__cld_token__=exp=1728612375~hmac=d80ecb807c47922cbd41447299b3fa47ac5275fdf35c40cec7bb9207644193d8")
      .setDescription(
        `> Dear Member,\n\n> Would you like to open your own **Gatcha Room**? Well, now you can!\n> - Press the 🐈 to make your private room!`
      )
      .setColor("Red")
      .setTimestamp();

    await channel.send({
      embeds: [toLogChannel],
      components: [button],
    });
   await channel.permissionOverwrites.edit(interaction.guild.id, {
     SendMessages: false, 
    }, { reason: 'Locking the channel to prevent sending messages.' });
   
    await interaction.reply({ ephemeral: true, content: `> :white_check_mark: Successfully sent the embed to that channel.` });
 
  },
};
