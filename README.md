# Perch Discord Bot

## Overview

Perch Discord Bot is a bot initially created for anglers but later expanded with features for other Discord server users.

## Features

- `/lista`: Lists available fish photos.
- `/fish <fish_name>`: Displays a photo of the specified fish.
- `/newlifecatch <fish_name> <fish_size> <weight> <location>`: Adds or updates the record for the specified fish.
- `/lifecatches <username>`: Lists the records of the specified user.
- `/ciekawostka`: Random fishing trivia.
- `/randomchamp`: Random character for the game Valorant.
- `/score`: Current number of messages sent on the server.
- `/rank`: Server ranking based on sent messages.
- `/skill`: Random percentage representing your skill.
- `/like`: Random percentage representing the friendship level between two users.
- `/ping`: Responds with "Pong!".
- `/user`: Displays information about the logged-in user.
- `/server`: Displays information about the server.
- `/help`: Displays a list of available commands.

## Technologies Used

- **Node.js**: For the backend runtime environment.
- **Discord.js**: For interacting with the Discord API.
- **Firebase**: For database and authentication.
- **Canvas**: For image manipulation.

## Code Structure

- **commands/**: Contains all the slash commands.
- **champs-images/**: Contains all images for `/randomchamp`.
- **fish-images/**: Contains all images for `/fish <fish_name>`.
- **images/**: Contains rest of used images.
- **txtFiles/**: Contains files with string resources.
- **firebase/**: Contains all files for database.
- **src/**: Contains source file.
