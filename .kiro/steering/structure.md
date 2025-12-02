# Project Structure

## File Organization
```
/
├── .kiro/              # Kiro configuration and steering files
│   └── steering/       # AI assistant guidance documents
├── .vscode/            # VS Code workspace settings
├── index.html          # Main HTML file with game screens
├── game.js             # Game logic and canvas rendering
├── style.css           # Styling with Kiro brand colors
└── user-context.md     # User preferences and specifications
```

## Code Organization

### game.js Structure
- **Game State**: Global `gameState` object tracking players, snakes, ladders, and current state
- **Constants**: Player emojis, canvas setup, grid configuration
- **Initialization**: `init()` sets up event listeners
- **Game Flow**: `startGame()` → `rollDice()` → `movePlayer()` → `checkWinCondition()`
- **Rendering**: `drawBoard()`, `drawSnake()`, `drawLadder()`, `drawPlayer()`
- **Utilities**: `getCoordinates()`, `getCellNumber()` for board position calculations
- **Animation**: `animateMovement()` for smooth player transitions
- **UI Updates**: `updateScoreboard()`, `updateCurrentPlayer()`, `showGameOver()`

### index.html Structure
- Three main screens managed by `.hidden` class:
  - `#startScreen` - Player count selection
  - `#gameScreen` - Canvas board and game controls
  - `#gameOverScreen` - Winner display and restart option

### style.css Structure
- Global resets and body styling
- Container and heading styles
- Screen layouts (start, game, game over)
- Button styles with hover/active states
- Canvas styling with purple border
- Scoreboard and player card layouts

## Conventions
- Use emoji characters for player representation
- Kiro purple (#790ECB) for primary actions and accents
- Dark backgrounds (#0a0a0a, #1a1a1a, #2a2a2a)
- 200ms animation intervals for smooth movement
- Disable controls during animations to prevent race conditions
- Position 0 represents "off the board" (starting position)
