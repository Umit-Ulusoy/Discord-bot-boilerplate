import {
    Client,
    GatewayIntentBits,
} from 'discord.js';
import config from './config.js';
import { initialLoaders } from './loaders/index.js';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
    ]
});

initialLoaders(client);

client.login(config.TOKEN);