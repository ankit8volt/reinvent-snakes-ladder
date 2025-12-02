# Product Overview

This is a browser-based Snakes and Ladders game built during the AWS Re:Invent workshop. The game supports 2-6 players competing on a 10x10 grid board (100 squares) with 5 snakes and 5 ladders.

## Core Features
- Multiplayer support (2-6 players)
- Emoji-based player characters (🔴, 🔵, 🟢, 🟡, 🟠, 🟣)
- Animated player movement across the board
- Snake and ladder mechanics with visual feedback
- Real-time scoreboard showing player positions
- Three game states: start screen, gameplay, and game over

## Game Rules
- Players start at position 0 (off the board)
- Roll dice (1-6) to move forward
- Landing on a snake head moves player down to the tail
- Landing on a ladder bottom moves player up to the top
- First player to reach position 100 wins
- Cannot move beyond 100 (roll is wasted if it would exceed)

## Visual Design
- Dark theme with Kiro brand purple (#790ECB) accents
- Canvas-based board rendering
- Smooth animations for dice rolls and player movement
- Glowing effects and hover states for interactive elements

