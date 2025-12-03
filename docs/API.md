# API Reference

Complete reference for all functions, objects, and interfaces in the Snakes and Ladders game.

## Table of Contents
- [Global Objects](#global-objects)
- [Game State](#game-state)
- [Score Manager](#score-manager)
- [Animation Controller](#animation-controller)
- [Effect System](#effect-system)
- [Sound Effects](#sound-effects)
- [Visual Renderer](#visual-renderer)
- [Kiro Logo Functions](#kiro-logo-functions)
- [Game Functions](#game-functions)
- [Utility Functions](#utility-functions)

## Global Objects

### `gameState`

Central state object for the entire game.

**Type:** `Object`

**Properties:**
```javascript
{
    state: 'start' | 'playing' | 'gameOver',
    players: Array<Player>,
    currentPlayerIndex: number,
    snakes: Array<{start: number, end: number}>,
    ladders: Array<{start: number, end: number}>,
    isAnimating: boolean
}
```

**Player Object:**
```javascript
{
    id: number,              // 0-5
    color: string,           // Hex color code
    position: number,        // 0-100
    displayPosition: number, // Current visual position
    currentScore: number,    // Same as position
    highScore: number        // Highest ever position
}
```

### `playerColors`

Array of hex color codes for players.

**Type:** `Array<string>`

**Value:**
```javascript
['#FF4444', '#4444FF', '#44FF44', '#FFFF44', '#FF8844', '#790ECB']
```

### `kiroIcons`

Cache object for generated Kiro logo images.

**Type:** `Object<string, Image>`

**Structure:**
```javascript
{
    '#FF4444': Image,
    '#4444FF': Image,
    // ... one entry per color
}
```

## Score Manager

### `ScoreManager.init()`

Initialize the score manager and load data from localStorage.

**Parameters:** None

**Returns:** `void`

**Side Effects:**
- Loads scores from localStorage
- Initializes `ScoreManager.scores` object
- Logs errors if localStorage unavailable

**Example:**
```javascript
ScoreManager.init();
```

---

### `ScoreManager.updateScore(playerId, newPosition)`

Update a player's score and check for new high score.

**Parameters:**
- `playerId` (number): Player ID (0-5)
- `newPosition` (number): New board position (0-100)

**Returns:** `boolean` - True if new high score achieved

**Side Effects:**
- Updates internal scores object
- Saves to localStorage if high score
- Does not trigger confetti (caller's responsibility)

**Example:**
```javascript
const isNewHighScore = ScoreManager.updateScore(0, 95);
if (isNewHighScore) {
    EffectSystem.showConfetti();
}
```

---

### `ScoreManager.getHighScore(playerId)`

Retrieve a player's high score.

**Parameters:**
- `playerId` (number): Player ID (0-5)

**Returns:** `number` - High score (0-100), or 0 if never played

**Example:**
```javascript
const highScore = ScoreManager.getHighScore(2);
console.log(`Player 3 high score: ${highScore}`);
```

---

### `ScoreManager.saveGameHistory(winner, players)`

Save a completed game to history.

**Parameters:**
- `winner` (Player): The winning player object
- `players` (Array<Player>): All players in the game

**Returns:** `void`

**Side Effects:**
- Adds entry to localStorage history
- Keeps only last 10 games
- Increments winner's games played count

**Example:**
```javascript
ScoreManager.saveGameHistory(
    gameState.players[0],
    gameState.players
);
```

---

### `ScoreManager.loadGameHistory()`

Load game history from localStorage.

**Parameters:** None

**Returns:** `Array<GameHistoryEntry>`

**GameHistoryEntry:**
```javascript
{
    timestamp: number,
    winner: {
        id: number,
        emoji: string,
        finalPosition: number
    },
    players: Array<{
        id: number,
        emoji: string,
        finalPosition: number
    }>
}
```

**Example:**
```javascript
const history = ScoreManager.loadGameHistory();
history.forEach(game => {
    console.log(`Winner: Player ${game.winner.id + 1}`);
});
```

## Animation Controller

### `AnimationController.animateDiceRoll(finalValue, callback)`

Animate 3D dice rolling with rotation.

**Parameters:**
- `finalValue` (number): Final dice value (1-6)
- `callback` (Function): Called after animation completes

**Returns:** `void`

**Duration:** 1500ms (1.5 seconds)

**Side Effects:**
- Sets `AnimationController.isAnimating = true`
- Plays dice roll sound
- Shows dice alert
- Updates dice display
- Calls callback after 1.5s

**Example:**
```javascript
AnimationController.animateDiceRoll(4, () => {
    console.log('Dice animation complete');
    movePlayer(currentPlayer, 4);
});
```

---

### `AnimationController.showDiceAlert(value)`

Display centered alert with dice result.

**Parameters:**
- `value` (number): Dice value to display (1-6)

**Returns:** `void`

**Duration:** Alert visible for 1 second

**Example:**
```javascript
AnimationController.showDiceAlert(6);
```

---

### `AnimationController.hideDiceAlert()`

Hide the dice result alert.

**Parameters:** None

**Returns:** `void`

**Example:**
```javascript
AnimationController.hideDiceAlert();
```

## Effect System

### `EffectSystem.showConfetti()`

Display confetti particle celebration.

**Parameters:** None

**Returns:** `void`

**Details:**
- Creates 150 particles
- Uses Kiro purple color scheme
- Animates with gravity physics
- Auto-cleans up when complete

**Example:**
```javascript
EffectSystem.showConfetti();
```

---

### `EffectSystem.showHappyEffect(position)`

Show happy emoji effects for ladder climbs.

**Parameters:**
- `position` (number): Board position (1-100)

**Returns:** `void`

**Emojis:** ✨, 😊, 🎉

**Duration:** 1.5 seconds

**Example:**
```javascript
EffectSystem.showHappyEffect(22); // Ladder at position 22
```

---

### `EffectSystem.showSadEffect(position)`

Show sad emoji effects for snake bites.

**Parameters:**
- `position` (number): Board position (1-100)

**Returns:** `void`

**Emojis:** 😢, 💔, 😞

**Duration:** 1.5 seconds

**Example:**
```javascript
EffectSystem.showSadEffect(98); // Snake at position 98
```

---

### `EffectSystem.clearEffects()`

Clear all active effects and particles.

**Parameters:** None

**Returns:** `void`

**Side Effects:**
- Removes all confetti particles
- Removes all emoji effect elements
- Clears confetti canvas

**Example:**
```javascript
EffectSystem.clearEffects();
```

## Sound Effects

### `SoundEffects.init()`

Initialize Web Audio API context.

**Parameters:** None

**Returns:** `void`

**Side Effects:**
- Creates AudioContext
- Logs warning if unavailable
- Sets `SoundEffects.audioContext`

**Example:**
```javascript
SoundEffects.init();
```

---

### `SoundEffects.playDiceRoll()`

Play dice rolling sound effect.

**Parameters:** None

**Returns:** `void`

**Sound Design:**
- 8 rattling bursts (100-300 Hz, square wave)
- Final thud at 80 Hz (sine wave)
- Total duration: ~800ms

**Example:**
```javascript
SoundEffects.playDiceRoll();
```

---

### `SoundEffects.playFirecracker()`

Play celebratory firecracker sound for ladders.

**Parameters:** None

**Returns:** `void`

**Sound Design:**
- 12 ascending pops (400-1600 Hz, sawtooth)
- 6 sparkle sounds (1000-2000 Hz, sine)
- Total duration: ~1000ms

**Example:**
```javascript
SoundEffects.playFirecracker();
```

---

### `SoundEffects.playBuzzer()`

Play negative buzzer sound for snakes.

**Parameters:** None

**Returns:** `void`

**Sound Design:**
- 3 descending tones (200-120 Hz, sawtooth)
- Each tone: 150ms
- Total duration: 450ms

**Example:**
```javascript
SoundEffects.playBuzzer();
```

## Visual Renderer

### `VisualRenderer.drawStyledSnake(from, to, ctx)`

Draw a styled snake with curved body.

**Parameters:**
- `from` (number): Snake head position (1-100)
- `to` (number): Snake tail position (1-100)
- `ctx` (CanvasRenderingContext2D): Canvas context

**Returns:** `void`

**Visual Features:**
- Bezier curve body
- Orange/yellow gradient
- Head with eyes
- Tail marker

**Example:**
```javascript
VisualRenderer.drawStyledSnake(98, 28, ctx);
```

---

### `VisualRenderer.drawStyledLadder(from, to, ctx)`

Draw a styled ladder with rungs.

**Parameters:**
- `from` (number): Ladder bottom position (1-100)
- `to` (number): Ladder top position (1-100)
- `ctx` (CanvasRenderingContext2D): Canvas context

**Returns:** `void`

**Visual Features:**
- Angled side rails
- Evenly-spaced rungs
- Brown/tan gradient
- Shadow for depth

**Example:**
```javascript
VisualRenderer.drawStyledLadder(4, 56, ctx);
```

## Kiro Logo Functions

### `createColoredKiroIcon(color)`

Generate a colored Kiro logo SVG image.

**Parameters:**
- `color` (string): Hex color code (e.g., '#FF4444')

**Returns:** `Image` - Image object with SVG data URL

**Caching:** Results cached in `kiroIcons` object

**Example:**
```javascript
const redLogo = createColoredKiroIcon('#FF4444');
```

---

### `drawKiroLogo(ctx, x, y, size, color)`

Draw a Kiro logo on canvas with glow effect.

**Parameters:**
- `ctx` (CanvasRenderingContext2D): Canvas context
- `x` (number): Center X coordinate
- `y` (number): Center Y coordinate
- `size` (number): Base size (actual size is size * 1.2)
- `color` (string): Hex color code

**Returns:** `void`

**Visual Features:**
- Glow effect matching color
- Shadow blur: 10px
- Centered positioning

**Example:**
```javascript
drawKiroLogo(ctx, 300, 300, 32, '#4444FF');
```

## Game Functions

### `init()`

Initialize the game on page load.

**Parameters:** None

**Returns:** `void`

**Side Effects:**
- Registers event listeners
- Initializes ScoreManager
- Initializes SoundEffects
- Adjusts canvas size
- Registers resize handler

**Example:**
```javascript
init(); // Called automatically on load
```

---

### `startGame()`

Start a new game with selected player count.

**Parameters:** None (reads from UI)

**Returns:** `void`

**Side Effects:**
- Validates player count
- Initializes players
- Generates snakes/ladders
- Switches to game screen
- Draws initial board

**Example:**
```javascript
document.getElementById('startButton')
    .addEventListener('click', startGame);
```

---

### `rollDice()`

Roll the dice and move current player.

**Parameters:** None

**Returns:** `void`

**Validation:**
- Checks if animation in progress
- Checks if game is playing
- Disables roll button during animation

**Example:**
```javascript
document.getElementById('rollDiceButton')
    .addEventListener('click', rollDice);
```

---

### `movePlayer(player, steps)`

Move a player forward by specified steps.

**Parameters:**
- `player` (Player): Player object to move
- `steps` (number): Number of steps (1-6)

**Returns:** `void`

**Logic:**
- Calculates new position
- Handles winning (position 100)
- Animates movement
- Checks for snakes/ladders
- Updates scores
- Triggers effects

**Example:**
```javascript
movePlayer(gameState.players[0], 4);
```

---

### `animateMovement(player, from, to, callback, isDirect)`

Animate player movement on board.

**Parameters:**
- `player` (Player): Player to animate
- `from` (number): Starting position
- `to` (number): Ending position
- `callback` (Function): Called when complete
- `isDirect` (boolean): If true, jump directly (snakes/ladders)

**Returns:** `void`

**Timing:**
- Normal: 200ms per step
- Direct: 300ms total

**Example:**
```javascript
animateMovement(player, 10, 15, () => {
    console.log('Movement complete');
}, false);
```

---

### `checkWinCondition(player)`

Check if player has won and handle game over.

**Parameters:**
- `player` (Player): Player to check

**Returns:** `void`

**Logic:**
- If position === 100, trigger game over
- Save game history
- Show game over screen
- Otherwise, next player's turn

**Example:**
```javascript
checkWinCondition(gameState.players[0]);
```

---

### `nextPlayer()`

Advance to next player's turn.

**Parameters:** None

**Returns:** `void`

**Side Effects:**
- Increments `currentPlayerIndex` (wraps around)
- Updates current player display
- Re-enables roll button
- Clears animation flag

**Example:**
```javascript
nextPlayer();
```

---

### `updateCurrentPlayer()`

Update UI to show current player.

**Parameters:** None

**Returns:** `void`

**Example:**
```javascript
updateCurrentPlayer();
```

---

### `updateScoreboard()`

Update the scoreboard display with current scores.

**Parameters:** None

**Returns:** `void`

**Features:**
- Shows current position
- Shows high score
- Highlights active player
- Special styling for players at high score
- Displays colored Kiro logos

**Example:**
```javascript
updateScoreboard();
```

---

### `showGameOver(winner)`

Display game over screen with winner.

**Parameters:**
- `winner` (Player): The winning player

**Returns:** `void`

**Delay:** 1 second before showing screen

**Example:**
```javascript
showGameOver(gameState.players[2]);
```

---

### `resetGame()`

Reset game to start screen.

**Parameters:** None

**Returns:** `void`

**Side Effects:**
- Resets gameState
- Clears players array
- Returns to start screen
- Clears dice display

**Example:**
```javascript
document.getElementById('restartButton')
    .addEventListener('click', resetGame);
```

## Utility Functions

### `generateSnakesAndLadders()`

Generate fixed snake and ladder positions.

**Parameters:** None

**Returns:** `void`

**Side Effects:**
- Populates `gameState.snakes`
- Populates `gameState.ladders`

**Configuration:**
```javascript
Snakes: [98→28, 87→24, 64→19, 54→34, 31→7]
Ladders: [4→56, 12→50, 22→58, 41→79, 63→95]
```

**Example:**
```javascript
generateSnakesAndLadders();
```

---

### `drawBoard()`

Render the complete game board.

**Parameters:** None

**Returns:** `void`

**Rendering Order:**
1. Clear canvas
2. Draw grid cells
3. Draw cell numbers
4. Draw snakes
5. Draw ladders
6. Draw players

**Example:**
```javascript
drawBoard();
```

---

### `getCellNumber(row, col)`

Convert grid coordinates to cell number.

**Parameters:**
- `row` (number): Grid row (0-9, top to bottom)
- `col` (number): Grid column (0-9, left to right)

**Returns:** `number` - Cell number (1-100)

**Logic:** Handles serpentine numbering (alternating row direction)

**Example:**
```javascript
const cellNum = getCellNumber(0, 0); // Returns 91
```

---

### `getCoordinates(position)`

Convert cell number to canvas coordinates.

**Parameters:**
- `position` (number): Cell number (1-100)

**Returns:** `{x: number, y: number} | null`

**Returns null if:** position < 1 or position > 100

**Coordinates:** Center of cell in canvas pixels

**Example:**
```javascript
const coords = getCoordinates(50);
// Returns {x: 270, y: 270} (example values)
```

---

### `drawSnake(start, end)`

Wrapper function to draw a snake.

**Parameters:**
- `start` (number): Snake head position
- `end` (number): Snake tail position

**Returns:** `void`

**Example:**
```javascript
drawSnake(98, 28);
```

---

### `drawLadder(start, end)`

Wrapper function to draw a ladder.

**Parameters:**
- `start` (number): Ladder bottom position
- `end` (number): Ladder top position

**Returns:** `void`

**Example:**
```javascript
drawLadder(4, 56);
```

---

### `drawPlayer(player)`

Draw a player on the board.

**Parameters:**
- `player` (Player): Player object to draw

**Returns:** `void`

**Features:**
- Draws Kiro logo
- Handles multiple players on same cell (offset)
- Only draws if displayPosition > 0

**Example:**
```javascript
drawPlayer(gameState.players[0]);
```

---

### `adjustCanvasSize()`

Adjust canvas size to fit viewport.

**Parameters:** None

**Returns:** `void`

**Logic:**
- Calculates optimal size based on viewport
- Maximum 600x600
- Updates CELL_SIZE

**Example:**
```javascript
adjustCanvasSize();
window.addEventListener('resize', adjustCanvasSize);
```

## Constants

### `GRID_SIZE`
**Type:** `number`  
**Value:** `10`  
**Description:** Number of cells per row/column

### `CELL_SIZE`
**Type:** `number`  
**Value:** `canvas.width / GRID_SIZE` (dynamic)  
**Description:** Size of each cell in pixels

### `canvas`
**Type:** `HTMLCanvasElement`  
**Description:** Main game board canvas

### `ctx`
**Type:** `CanvasRenderingContext2D`  
**Description:** 2D rendering context for canvas

---

**This API reference covers all public functions and objects in the game. For implementation details, see [ARCHITECTURE.md](ARCHITECTURE.md).**
