# Architecture Documentation

Technical architecture and design decisions for the Snakes and Ladders game.

## Table of Contents
- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Core Components](#core-components)
- [Data Flow](#data-flow)
- [Rendering Pipeline](#rendering-pipeline)
- [State Management](#state-management)
- [Design Patterns](#design-patterns)

## Overview

### Technology Stack
- **Language**: Vanilla JavaScript (ES6+)
- **Rendering**: HTML5 Canvas 2D Context
- **Styling**: CSS3 with animations and 3D transforms
- **Audio**: Web Audio API
- **Storage**: Browser localStorage
- **Build**: None - runs directly in browser

### Architecture Style
- Single-page application (SPA)
- Event-driven architecture
- Component-based design (without framework)
- Functional programming patterns

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│  (HTML + CSS - index.html, style.css)                   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Game Controller                         │
│  (Event Handlers - init, startGame, rollDice)           │
└────┬──────────┬──────────┬──────────┬──────────────────┘
     │          │          │          │
┌────▼────┐ ┌──▼──────┐ ┌─▼────────┐ ┌▼──────────────┐
│  Game   │ │Animation│ │  Effect  │ │     Sound     │
│  State  │ │Controller│ │  System  │ │    Effects    │
└────┬────┘ └──┬──────┘ └─┬────────┘ └┬──────────────┘
     │         │          │            │
┌────▼─────────▼──────────▼────────────▼──────────────┐
│              Rendering Layer                         │
│  (Canvas 2D, VisualRenderer, drawBoard)             │
└──────────────────────────────────────────────────────┘
     │
┌────▼──────────────────────────────────────────────────┐
│              Persistence Layer                        │
│  (ScoreManager, localStorage)                        │
└───────────────────────────────────────────────────────┘
```

## Core Components

### 1. Game State (`gameState`)

Central state object managing all game data.

```javascript
{
    state: 'start' | 'playing' | 'gameOver',
    players: Array<Player>,
    currentPlayerIndex: number,
    snakes: Array<{start, end}>,
    ladders: Array<{start, end}>,
    isAnimating: boolean
}
```

**Responsibilities:**
- Track current game phase
- Store player data
- Maintain board configuration
- Prevent concurrent animations

### 2. Score Manager (`ScoreManager`)

Handles persistence and score tracking.

**Methods:**
- `init()` - Load scores from localStorage
- `updateScore(playerId, position)` - Update and check high score
- `getHighScore(playerId)` - Retrieve player's high score
- `saveGameHistory(winner, players)` - Record completed game
- `loadGameHistory()` - Retrieve game history

**Storage Structure:**
```javascript
localStorage: {
    'snakesAndLadders_scores': {
        '0': { highScore: 95, gamesPlayed: 3 },
        '1': { highScore: 100, gamesPlayed: 5 }
    },
    'snakesAndLadders_history': [
        { timestamp, winner, players }
    ]
}
```

### 3. Animation Controller (`AnimationController`)

Manages dice rolling animations and alerts.

**Methods:**
- `animateDiceRoll(finalValue, callback)` - 3D dice animation
- `showDiceAlert(value)` - Display roll result
- `hideDiceAlert()` - Remove alert

**Features:**
- 1.5 second animation duration
- CSS 3D transforms
- Callback-based completion
- Animation state tracking

### 4. Effect System (`EffectSystem`)

Renders visual effects and celebrations.

**Methods:**
- `showConfetti()` - Particle celebration
- `showHappyEffect(position)` - Ladder emojis
- `showSadEffect(position)` - Snake emojis
- `clearEffects()` - Cleanup

**Confetti System:**
- 150 particles
- Physics simulation (gravity, velocity)
- Kiro purple color scheme
- RequestAnimationFrame loop

### 5. Sound Effects (`SoundEffects`)

Procedural audio generation using Web Audio API.

**Methods:**
- `init()` - Create AudioContext
- `playDiceRoll()` - Rattling + thud
- `playFirecracker()` - Ascending pops
- `playBuzzer()` - Descending tones

**Audio Architecture:**
```
AudioContext
    ├── Oscillator (frequency, type)
    ├── GainNode (volume envelope)
    └── Destination (speakers)
```

### 6. Visual Renderer (`VisualRenderer`)

Draws styled board elements.

**Methods:**
- `drawStyledSnake(from, to, ctx)` - Bezier curve snakes
- `drawStyledLadder(from, to, ctx)` - Angled ladder rungs

**Rendering Techniques:**
- Bezier curves for organic shapes
- Gradient fills for depth
- Shadow effects for 3D appearance
- Trigonometry for angle calculations

### 7. Kiro Logo System

SVG-based player representation.

**Functions:**
- `createColoredKiroIcon(color)` - Generate SVG
- `drawKiroLogo(ctx, x, y, size, color)` - Render with glow

**Features:**
- SVG to Image conversion
- Color caching
- Canvas shadow effects
- Base64 encoding for scoreboard

## Data Flow

### Game Start Flow
```
User clicks "Start Game"
    ↓
Validate player count
    ↓
Initialize players with colors
    ↓
Load high scores from localStorage
    ↓
Generate snakes and ladders
    ↓
Switch to game screen
    ↓
Draw initial board
    ↓
Update scoreboard
```

### Dice Roll Flow
```
User clicks "Roll Dice"
    ↓
Check if animation in progress (exit if true)
    ↓
Generate random number (1-6)
    ↓
Disable roll button
    ↓
Play dice sound
    ↓
Animate 3D dice rotation (1.5s)
    ↓
Show dice alert (1s)
    ↓
Move player
    ↓
Check for snake/ladder
    ↓
Update scores
    ↓
Check win condition
    ↓
Next player or game over
```

### Movement Flow
```
Calculate new position
    ↓
Animate step-by-step movement
    ↓
Update displayPosition each step
    ↓
Redraw board each frame
    ↓
Check landing position
    ↓
If snake/ladder:
    ├─ Show effect (happy/sad)
    ├─ Play sound (firecracker/buzzer)
    ├─ Wait 500ms
    └─ Direct jump animation
    ↓
Update final position
    ↓
Update scores and high scores
    ↓
Trigger confetti if new high score
    ↓
Check win condition
```

## Rendering Pipeline

### Board Rendering Sequence

1. **Clear Canvas**
   ```javascript
   ctx.clearRect(0, 0, canvas.width, canvas.height)
   ```

2. **Draw Grid**
   - Iterate 10x10 cells
   - Alternating colors
   - Cell borders
   - Cell numbers

3. **Draw Snakes**
   - For each snake
   - Calculate bezier curves
   - Apply gradients
   - Draw head/tail markers

4. **Draw Ladders**
   - For each ladder
   - Calculate angle
   - Draw rails
   - Draw rungs

5. **Draw Players**
   - For each player with position > 0
   - Calculate coordinates
   - Apply offset if multiple on same cell
   - Draw Kiro logo with glow

### Canvas Coordinate System

```
Board: 10x10 grid, bottom-left to top-right
Cell numbering: Serpentine (alternating rows)

Row 9: 91 92 93 94 95 96 97 98 99 100
Row 8: 90 89 88 87 86 85 84 83 82 81
Row 7: 71 72 73 74 75 76 77 78 79 80
...
Row 0: 10  9  8  7  6  5  4  3  2  1
```

**Coordinate Conversion:**
```javascript
function getCoordinates(position) {
    const index = position - 1;
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    
    // Handle serpentine numbering
    const actualCol = row % 2 === 0 ? col : GRID_SIZE - 1 - col;
    const actualRow = GRID_SIZE - 1 - row;
    
    return {
        x: actualCol * CELL_SIZE + CELL_SIZE / 2,
        y: actualRow * CELL_SIZE + CELL_SIZE / 2
    };
}
```

## State Management

### State Transitions

```
START ──[startGame]──> PLAYING ──[checkWinCondition]──> GAME_OVER
  ↑                                                          │
  └────────────────────[resetGame]────────────────────────┘
```

### Animation State

Prevents race conditions:
```javascript
if (gameState.isAnimating || AnimationController.isAnimating) {
    return; // Ignore input
}
```

### Score State Synchronization

```
Player Position (source of truth)
    ↓
Update gameState.players[i].position
    ↓
Update gameState.players[i].displayPosition
    ↓
Call ScoreManager.updateScore()
    ↓
Update localStorage
    ↓
Update UI (scoreboard)
    ↓
Trigger effects if high score
```

## Design Patterns

### 1. Module Pattern

Components are organized as singleton objects:
```javascript
const ScoreManager = {
    scores: {},
    init() { /* ... */ },
    updateScore() { /* ... */ }
};
```

**Benefits:**
- Namespace isolation
- Encapsulation
- Single instance
- Clear API

### 2. Observer Pattern

Event-driven updates:
```javascript
// Event registration
document.getElementById('rollDiceButton')
    .addEventListener('click', rollDice);

// State change triggers updates
function updateScoreboard() {
    // Observers react to state changes
}
```

### 3. Strategy Pattern

Different animation strategies:
```javascript
function animateMovement(player, from, to, callback, isDirect) {
    if (isDirect) {
        // Direct jump strategy (snakes/ladders)
    } else {
        // Step-by-step strategy (normal movement)
    }
}
```

### 4. Factory Pattern

Dynamic object creation:
```javascript
function createColoredKiroIcon(color) {
    // Factory creates SVG images
    const svgData = `<svg>...</svg>`;
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    return img;
}
```

### 5. Callback Pattern

Asynchronous flow control:
```javascript
AnimationController.animateDiceRoll(diceValue, () => {
    movePlayer(currentPlayer, diceValue);
});
```

## Performance Considerations

### Optimization Techniques

1. **Caching**
   - Kiro logo SVGs cached by color
   - Coordinate calculations memoized
   - DOM element references stored

2. **RequestAnimationFrame**
   - Confetti uses RAF for smooth 60fps
   - Syncs with browser repaint cycle

3. **Event Delegation**
   - Single event listener per button
   - No dynamic listener creation

4. **Canvas Optimization**
   - Full redraw only when needed
   - Minimal state changes
   - Efficient path drawing

### Memory Management

- **Cleanup**: Effects removed after animation
- **Limits**: Game history capped at 10 entries
- **Garbage Collection**: Temporary objects released
- **No Leaks**: Event listeners properly managed

## Error Handling

### localStorage Errors
```javascript
try {
    localStorage.setItem(key, value);
} catch (error) {
    console.error('Storage error:', error);
    // Graceful degradation to in-memory
}
```

### Audio Errors
```javascript
try {
    this.audioContext = new AudioContext();
} catch (error) {
    console.warn('Audio not supported:', error);
    // Game continues without sound
}
```

### Canvas Errors
```javascript
const coords = getCoordinates(position);
if (!coords) return; // Invalid position, skip rendering
```

## Extensibility

### Adding New Features

**New Board Elements:**
1. Add to `gameState` configuration
2. Implement drawing function
3. Add to `drawBoard()` sequence
4. Update collision detection

**New Sound Effects:**
1. Add method to `SoundEffects`
2. Define oscillator parameters
3. Call from appropriate game event

**New Animations:**
1. Add method to `EffectSystem`
2. Implement animation logic
3. Add cleanup to `clearEffects()`

**New Player Attributes:**
1. Add to player object in `startGame()`
2. Update `updateScoreboard()` display
3. Add persistence if needed

## Testing Considerations

### Unit Testing Targets
- Coordinate conversion functions
- Score calculation logic
- State transition validation
- localStorage operations

### Integration Testing
- Complete game flow
- Animation sequences
- Score persistence
- Multi-player scenarios

### Manual Testing
- Visual quality
- Audio synchronization
- Performance on different devices
- Browser compatibility

---

**This architecture provides a solid foundation for a maintainable, extensible game implementation.**
