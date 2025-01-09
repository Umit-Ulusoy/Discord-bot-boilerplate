import {
	Events,
	ActivityType
} from 'discord.js';

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`${client.user.tag} is here for you!`);

			client.user.setPresence({
				activities: [
					{
						name: 'Eagles - Hotel California',
						type: ActivityType.Listening
					}
				],
				status: "dnd",
			});
	},
};
