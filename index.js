const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let targetUrls = config.targetUrls;

client.once('ready', () => {
  console.clear();
  console.log('────────────────────────────────────────');
  console.log(`🤖 Bot is online: ${client.user.tag}`);
  console.log('💡 Auto-role system with dynamic URL tracking');
  console.log('👑 Developed with respect by bed0c → https://github.com/bed0c');
  console.log('────────────────────────────────────────');

  const embed = new EmbedBuilder()
    .setColor('DarkPurple')
    .setTitle('✅ Auto Role Bot Online')
    .setDescription('Now monitoring user presence.')
    .addFields(
      { name: 'Developer', value: '[bed0c](https://github.com/bed0c)' },
      { name: 'Status', value: 'Active' }
    )
    .setFooter({ text: 'Respect the devs. 🤝 | bed0c', iconURL: client.user.displayAvatarURL() });

  const logChannel = client.channels.cache.get(config.logChannelId);
  if (logChannel) logChannel.send({ embeds: [embed] });
});

client.on('presenceUpdate', async (_, newPresence) => {
  if (!newPresence?.userId || !newPresence.guild) return;

  const member = await newPresence.guild.members.fetch(newPresence.userId).catch(() => null);
  if (!member) return;

  const activities = newPresence.activities || [];
  const statusText = activities
    .filter(a => a.state)
    .map(a => a.state.toLowerCase())
    .join(' ');

  const hasUrl = targetUrls.some(url => statusText.includes(url));
  const hasRole = member.roles.cache.has(config.roleId);
  const logChannel = member.guild.channels.cache.get(config.logChannelId);

  if (hasUrl && !hasRole) {
    await member.roles.add(config.roleId).catch(console.error);
    if (logChannel) {
      logChannel.send({
        embeds: [new EmbedBuilder()
          .setColor('Green')
          .setDescription(`✅ <@${member.id}> received the role for sharing a tracked URL.`)
          .setFooter({ text: 'bed0c | auto role system' })
        ]
      });
    }
  } else if (!hasUrl && hasRole) {
    await member.roles.remove(config.roleId).catch(console.error);
    if (logChannel) {
      logChannel.send({
        embeds: [new EmbedBuilder()
          .setColor('Red')
          .setDescription(`❌ <@${member.id}> lost the role (no URL or offline).`)
          .setFooter({ text: 'bed0c | auto role system' })
        ]
      });
    }
  }
});

client.on('messageCreate', async (message) => {
  if (!message.guild || !message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const isAdmin = message.member.permissions.has(PermissionsBitField.Flags.ManageGuild);
  if (!isAdmin) return;

  if (command === 'addurl') {
    const url = args.join(' ').toLowerCase();
    if (!url || targetUrls.includes(url)) return message.reply('⚠️ URL is invalid or already tracked.');
    targetUrls.push(url);
    config.targetUrls = targetUrls;
    return message.reply({
      embeds: [new EmbedBuilder()
        .setColor('Green')
        .setDescription(`✅ Added URL: \`${url}\``)]
    });
  }

  if (command === 'removeurl') {
    const url = args.join(' ').toLowerCase();
    if (!targetUrls.includes(url)) return message.reply('⚠️ URL not found.');
    targetUrls = targetUrls.filter(u => u !== url);
    config.targetUrls = targetUrls;
    return message.reply({
      embeds: [new EmbedBuilder()
        .setColor('Orange')
        .setDescription(`🗑️ Removed URL: \`${url}\``)]
    });
  }

  if (command === 'listurls') {
    const embed = new EmbedBuilder()
      .setColor('Blurple')
      .setTitle('📌 Tracked URLs')
      .setDescription(targetUrls.length ? targetUrls.map(u => `• \`${u}\``).join('\n') : 'No URLs are being tracked.')
      .setFooter({ text: 'bed0c | url tracker' });

    return message.reply({ embeds: [embed] });
  }
});

client.login(config.token);