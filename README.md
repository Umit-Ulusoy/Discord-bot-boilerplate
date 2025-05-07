# Discord Bot Boilerplate

A modular, scalable Discord bot template built with Discord.js v14, featuring support for both prefix and slash commands.

## ✨ Features

- ✅ **Prefix Commands** — Traditional `!help` style commands supported  
- ✅ **Slash Commands** — Modern `/help` style commands with full Discord interaction support  
- ✅ **Automatic Command Loader** — Auto-loads all commands from the `commands` folder dynamically  
- ✅ **Modular Event System** — Events are cleanly separated and automatically registered  
- ✅ **Docker Support** — Ready-to-deploy using Docker  

## 🚀 Getting Started

### Prerequisites

- Node.js v16.9.0 or higher  
- npm or yarn  
- Docker (optional)  

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/umit-ulusoy/discord-bot-boilerplate.git
   cd discord-bot-boilerplate
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the config.example.js file to config.js and fill in the required fields:

   ```JS
export default {
    TOKEN: '', // Bot's token
    CLIENT_ID: '', // Bot's ID
    GUILD_ID: '', // ID of the Discord server where slash commands will be registered
    PREFIX: '', // Command prefix (e.g., "!")
    OWNERS: { // Owner IDs
        UMIT: ''
    }
}
   ```

4. Start the bot:

   ```bash
   npm start
   ```

## 🐳 Docker Deployment

1. Build the Docker image:

   ```bash
   docker build -t discord-bot .
   ```

2. Run the Docker container:

   ```bash
docker run -d --name discord-bot discord-bot
   ```

## 📁 Project Structure

```
📦 discord-bot-boilerplate
 📂 commands          # Contains both slash and prefix commands
 📂 events            # Handles all Discord event listeners
 📂 loaders           # Auto-loads commands and events
 📄 bot.js            # Entry point of the bot
 📄 Dockerfile        # Docker container setup
 📄 config.example.js # Sample configuration file
```

## 🤝 Contributing

Feel free to open issues or submit pull requests if you'd like to contribute or improve the boilerplate!

## 📜 License

This project is licensed under the MIT License.

```

