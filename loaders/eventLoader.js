import { readdirSync } from 'fs';
import path from 'path';
import {
  pathToFileURL,
  fileURLToPath
} from 'url';

export const loadEvents = async (client) => {
  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const eventsPath = path.join(dirname, '..', 'events');

  const eventFiles = readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

  let loadedCount = 0;
  let failedCount = 0;
  let failedEvents = [];

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const fileUrl = pathToFileURL(filePath).href;

    try {
      const event = await import(fileUrl);

      const { name, once, execute } = event.default;

      if (!name || !execute) {
        console.warn(`⚠️ ${file} event is missing "name" or "execute" property.`);
        failedCount++;
        failedEvents.push(file);
        continue;
      }

      if (once) {
        client.once(name, (...args) => execute(client, ...args));
      } else {
        client.on(name, (...args) => execute(client, ...args));
      }

      loadedCount++;
    } catch (error) {
      console.error(`❌ Error loading event from ${file}:`, error);
      failedCount++;
      failedEvents.push(file);
    }
  }

  const message = loadedCount 
  ? `📦 ${loadedCount} event loaded successfully`
  : 'No event found to load.';

console.log(message);
  
  if (failedCount) {
    console.error(`⚠️ Total failed events: ${failedCount}`);
    console.error(`Failed event files: ${failedEvents.join(', ')}`);
  }
};
