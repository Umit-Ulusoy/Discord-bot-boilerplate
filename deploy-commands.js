import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import { 
	pathToFileURL,
	fileURLToPath 
 } from 'url';
import config from './config.js';

const {
	CLIENT_ID,
	TOKEN
} = config;

const commands = [];
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const commandsPath = path.join(dirname, '.', 'commands/slash-commands');

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const commandFile of commandFiles) {

    const commandPath = path.join(commandsPath, commandFile);
    const commandUrl = pathToFileURL(commandPath).href;

  const { default: command } = await import(commandUrl);
  if ('data' in command && 'execute' in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(`[WARNING] The command at ${commandFile} is missing a required "data" or "execute" property.`);
  }
}

const rest = new REST()
.setToken(TOKEN);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
