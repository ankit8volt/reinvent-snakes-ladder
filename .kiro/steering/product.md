# Product Overview

This is a browser-based Snakes and Ladders game built during the AWS Re:Invent workshop. The game supports 2-6 players competing on a 10x10 grid board (100 squares) with 5 snakes and 5 ladders.

## Core Features
- Multiplayer support (2-6 players)
- Kiro logo-based player characters with distinct colors (red, blue, green, yellow, orange, purple)
- Animated player movement across the board with smooth transitions
- Snake and ladder mechanics with visual and audio feedback
- Real-time scoreboard showing player positions and high scores
- Persistent score tracking using localStorage
- Three game states: start screen, gameplay, and game over
- 3D dice rolling animation with rotation effects
- Procedural sound effects using Web Audio API
- Confetti celebration for high scores and wins
- Styled snakes and ladders with organic curves and detailed rendering

## Game Rules
- Players start at position 0 (off the board)
- Roll dice (1-6) to move forward
- Landing on a snake head moves player down to the tail
- Landing on a ladder bottom moves player up to the top
- First player to reach position 100 wins
- Cannot move beyond 100 (roll is wasted if it would exceed)

## Visual Design
- Dark theme with Kiro brand purple (#790ECB) accents
- Canvas-based board rendering with styled snakes and ladders
- 3D dice cube with rotation animations
- Smooth animations for dice rolls and player movement
- Glowing effects and hover states for interactive elements
- Colored Kiro logos for player representation with glow effects
- Confetti particle system for celebrations
- Emoji-based visual effects (happy for ladders, sad for snakes)
- Horizontal layout optimized for single viewport display

## Audio Design
- Procedural sound effects generated with Web Audio API
- Dice rolling sound with rattling and thud effects
- Celebratory firecracker sound for climbing ladders
- Negative buzzer sound for snake encounters
- Graceful degradation when audio is unavailable

