import { loadEvents } from "./eventLoader.js";
import { loadCommands } from "./commandLoader.js";

export const initialLoaders = async (client) => {
  await loadEvents(client);
  await loadCommands(client);
};
