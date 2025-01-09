import { readdirSync } from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import config from '../config.js';

export const loadCommands = async (client) => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);

  const prefixCommandsPath = path.join(dirname, '..', 'commands', 'prefix-commands');

  const prefixCommandFiles = readdirSync(prefixCommandsPath).filter((file) => file.endsWith('.js'));

  let prefixCount = 0;
  let failedCount = 0;
  let failedCommands = [];

  for (const file of prefixCommandFiles) {
    const filePath = path.join(prefixCommandsPath, file);
    const fileUrl = pathToFileURL(filePath).href;

    try {
      const command = await import(fileUrl);

      const { name, execute } = command.default;

      if (!name || !execute) {
        console.warn(`⚠️ ${file} command is missing "name" or "execute" property.`);
        failedCount++;
        failedCommands.push(file);
        continue;
      }

      client.prefixCommands.set(name, execute);
      prefixCount++;
    } catch (error) {
      console.error(`❌ Error loading prefix command from ${file}:`, error);
      failedCount++;
      failedCommands.push(file);
    }
  }


  console.log(prefixCount
    ? `✅ ${prefixCount} prefix command(s) loaded successfully.`
    : '🤔 No prefix command found to load.'
  );
  
  if (failedCount) {
    console.error(`⚠️ Total failed commands: ${failedCount}`);
    console.error(`Failed command files: ${failedCommands.join(', ')}`);
  }
};
