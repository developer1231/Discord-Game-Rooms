# Discord Gacha Ticket Bot 🎮🐈

A Discord bot designed to create private gacha game rooms for server members. Admins can use the `/setup` command to generate an interactive embed with a button that allows users to create their own private gacha game rooms. These rooms are fully private, visible only to the user who opened the room and the server's admins.

### Features:
- **Admin-only Setup**: Only server admins can run the `/setup` command to initialize the game room system.
- **Private Gacha Rooms**: Users can create private rooms to play gacha games, away from the main server channels.
- **Self-managed Rooms**: Each room includes a **Close Channel** button, allowing users to close the room once they're done. The room and its contents are deleted automatically after closing.
- **Custom Embed Notifications**: Beautiful embed messages guide users through the process and provide feedback when rooms are created or closed.

### Tech Stack:
- **Node.js**
- **Discord.js** (v14)

### Installation & Setup:
1. Clone the repository.
2. Set up your `.env` file with your Discord bot token and client ID.
3. Run the bot and let admins create private gacha rooms effortlessly!
