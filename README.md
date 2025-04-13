
# Discord Auto URL Role Bot

A simple and efficient Discord bot that automatically assigns a role to users who share specific URLs in their presence status. This bot listens to presence updates and checks if users have URLs from a predefined list in their status. If a matching URL is found, the bot grants the user a role; if not, the role is removed.

## Features

- **Auto-role system**: Automatically assigns a specific role to users who share one of the tracked URLs in their Discord presence.
- **Dynamic URL tracking**: Easily manage the list of URLs to track via bot commands.
- **Logging**: Tracks when users gain or lose the assigned role and logs these actions in a specified channel.
- **Admin commands**: Allows admins to add/remove tracked URLs and view the list of URLs currently being tracked.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Admin Commands](#admin-commands)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- A Discord bot token
- A Discord server where you have admin privileges

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/bed0c/Discord-Auto-URL-Role-Bot.git
   cd Discord-Auto-URL-Role-Bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the `config.json` file with your bot's token, server ID, role ID, prefix, log channel ID, and the target URLs you want to track.
   ```json
   {
     "token": "YOUR_BOT_TOKEN",
     "guildId": "YOUR_GUILD_ID",
     "roleId": "ROLE_ID",
     "prefix": ".",
     "logChannelId": "LOG_CHANNEL_ID",
     "targetUrls": [
       ".gg/bed0c",
       "gg/bed0c",
       "/bed0c",
       "discord.gg/bed0c",
       "@bed0c"
     ]
   }
   ```

4. Run the bot:
   ```bash
   node index.js
   ```

Your bot should now be running and ready to monitor user presence for tracked URLs.

## Configuration

In the `config.json` file, you'll need to fill in the following fields:

- `token`: Your bot's token.
- `guildId`: The ID of your Discord guild (server).
- `roleId`: The ID of the role that will be assigned to users who share a tracked URL.
- `prefix`: The command prefix to use for admin commands (default is `.`, but you can change this).
- `logChannelId`: The ID of the channel where logs will be sent.
- `targetUrls`: A list of URLs that the bot will track in user presence statuses. Add URLs in this array as strings (e.g., `".gg/bed0c"`).

Here’s an example of a `config.json` file:

```json
{
  "token": "YOUR_BOT_TOKEN",
  "guildId": "YOUR_GUILD_ID",
  "roleId": "ROLE_ID",
  "prefix": ".",
  "logChannelId": "LOG_CHANNEL_ID",
  "targetUrls": [
    ".gg/bed0c",
    "gg/bed0c",
    "/bed0c",
    "discord.gg/bed0c",
    "@bed0c"
  ]
}
```

## Usage

### Admin Commands

- **`addurl [url]`**: Adds a new URL to the list of tracked URLs.
  - Example: `.addurl .gg/example`
- **`removeurl [url]`**: Removes a URL from the list of tracked URLs.
  - Example: `.removeurl .gg/example`
- **`listurls`**: Displays all currently tracked URLs.
  - Example: `.listurls`

### Bot Behavior

- When a user shares a tracked URL in their presence status, the bot will automatically assign the specified role to the user.
- If the user no longer shares the tracked URL or goes offline, the bot will remove the assigned role.
- All role assignments and removals are logged in the specified log channel.

## Contributing

Contributions are welcome! If you would like to improve the bot, feel free to fork the repository, make your changes, and submit a pull request. Please ensure your changes align with the existing code style and include relevant tests if applicable.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
