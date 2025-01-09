import { loadEvents } from "./eventLoader.js";

export const initialLoaders = async (client) => {
  await loadEvents(client);
};
