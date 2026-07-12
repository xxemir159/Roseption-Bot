require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const axios = require("axios");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const CHANNEL_ID = process.env.CHANNEL_ID;
const KICK_CHANNEL = process.env.KICK_CHANNEL;

let lastStreamId = null;

client.once("ready", () => {
  console.log(`✅ ${client.user.tag} aktif!`);

  checkLive();

  setInterval(checkLive, 30000);
});
async function checkLive() {

    try {

        const response = await axios.get(
            `https://kick.com/api/v2/channels/${KICK_CHANNEL}`
        );

        const channel = response.data;

        if (!channel.livestream) {
            lastStreamId = null;
            return;
        }

        const stream = channel.livestream;

        if (lastStreamId === stream.id)
            return;

        lastStreamId = stream.id;

        await sendLiveMessage(channel, stream);

    } catch (err) {

        console.log(err.message);

    }

}
async function sendLiveMessage(channel, stream) {

    const discordChannel =
        await client.channels.fetch(CHANNEL_ID);

}
