# Quick Reference Guide

Fast lookup for common tasks and information.

## 🎮 Game Controls

| Action | Control |
|--------|---------|
| Start Game | Click "Start Game" button |
| Roll Dice | Click "Roll Dice" button |
| Restart | Click "Play Again" after game over |

## 🎯 Board Positions

### Snakes (Head → Tail)
- 98 → 28 (70 squares down!)
- 87 → 24 (63 squares down)
- 64 → 19 (45 squares down)
- 54 → 34 (20 squares down)
- 31 → 7 (24 squares down)

### Ladders (Bottom → Top)
- 4 → 56 (52 squares up!)
- 12 → 50 (38 squares up)
- 22 → 58 (36 squares up)
- 41 → 79 (38 squares up)
- 63 → 95 (32 squares up)

## 🎨 Player Colors

| Player | Color | Hex Code |
|--------|-------|----------|
| Player 1 | Red | #FF4444 |
| Player 2 | Blue | #4444FF |
| Player 3 | Green | #44FF44 |
| Player 4 | Yellow | #FFFF44 |
| Player 5 | Orange | #FF8844 |
| Player 6 | Purple | #790ECB |

## 🔊 Sound Effects

| Event | Sound | Duration |
|-------|-------|----------|
| Dice Roll | Rattling + Thud | ~800ms |
| Ladder Climb | Firecracker Pops | ~1000ms |
| Snake Bite | Descending Buzzer | 450ms |

## 💾 localStorage Keys

| Key | Content |
|-----|---------|
| `snakesAndLadders_scores` | Player high scores |
| `snakesAndLadders_history` | Last 10 games |

## 📐 Canvas Dimensions

| Property | Value |
|----------|-------|
| Grid Size | 10x10 |
| Total Cells | 100 |
| Max Canvas Size | 600x600 px |
| Cell Size | Dynamic (canvas.width / 10) |

## ⏱️ Animation Timings

| Animation | Duration |
|-----------|----------|
| Dice Roll | 1500ms (1.5s) |
| Dice Alert | 1000ms (1s) |
| Player Movement | 200ms per step |
| Snake/Ladder Jump | 300ms |
| Emoji Effects | 1500ms |
| Confetti | Until particles fall |

## 🎯 Key Functions

### Game Flow
```javascript
init()                    // Initialize game
startGame()              // Start new game
rollDice()               // Roll dice
movePlayer(player, steps) // Move player
checkWinCondition(player) // Check if won
resetGame()              // Reset to start
```

### Rendering
```javascript
drawBoard()              // Draw entire board
drawPlayer(player)       // Draw one player
drawSnake(start, end)    // Draw snake
drawLadder(start, end)   // Draw ladder
updateScoreboard()       // Update UI
```

### Effects
```javascript
EffectSystem.showConfetti()           // Celebration
EffectSystem.showHappyEffect(pos)     // Ladder emojis
EffectSystem.showSadEffect(pos)       // Snake emojis
EffectSystem.clearEffects()           // Clean up
```

### Audio
```javascript
SoundEffects.init()           // Initialize audio
SoundEffects.playDiceRoll()   // Dice sound
SoundEffects.playFirecracker() // Ladder sound
SoundEffects.playBuzzer()     // Snake sound
```

### Scores
```javascript
ScoreManager.init()                      // Load scores
ScoreManager.updateScore(id, pos)        // Update score
ScoreManager.getHighScore(id)            // Get high score
ScoreManager.saveGameHistory(w, p)       // Save game
ScoreManager.loadGameHistory()           // Load history
```

## 🔧 Common Customizations

### Change Animation Speed
```javascript
// In animateMovement()
}, 200);  // Change this number (milliseconds)
```

### Change Confetti Count
```javascript
// In EffectSystem.showConfetti()
const particleCount = 150;  // Adjust this
```

### Change Dice Duration
```javascript
// In AnimationController.animateDiceRoll()
const duration = 1500;  // Adjust this
```

### Add More Players
```javascript
// In index.html
<input type="number" id="playerCount" min="2" max="8" value="2">

// Add more colors to playerColors array
const playerColors = [
    '#FF4444', '#4444FF', '#44FF44', 
    '#FFFF44', '#FF8844', '#790ECB',
    '#FF00FF', '#00FFFF'  // NEW
];
```

## 🐛 Debug Commands

Open browser console and try:

```javascript
// View game state
gameState

// View all players
gameState.players

// View current player
gameState.players[gameState.currentPlayerIndex]

// Force move player
movePlayer(gameState.players[0], 50)

// Trigger confetti
EffectSystem.showConfetti()

// Play sounds
SoundEffects.playFirecracker()

// Check scores
ScoreManager.scores

// Check localStorage
localStorage.getItem('snakesAndLadders_scores')
```

## 📊 Game State Structure

```javascript
gameState = {
    state: 'start' | 'playing' | 'gameOver',
    players: [
        {
            id: 0,
            color: '#FF4444',
            position: 0,
            displayPosition: 0,
            currentScore: 0,
            highScore: 0
        },
        // ... more players
    ],
    currentPlayerIndex: 0,
    snakes: [
        { start: 98, end: 28 },
        // ... more snakes
    ],
    ladders: [
        { start: 4, end: 56 },
        // ... more ladders
    ],
    isAnimating: false
}
```

## 🎨 CSS Classes

### Screens
- `.screen` - Base screen style
- `.hidden` - Hide screen
- `#startScreen` - Start screen
- `#gameScreen` - Game screen
- `#gameOverScreen` - Game over screen

### Game Elements
- `.game-layout` - Horizontal layout
- `.board-section` - Canvas container
- `.controls-section` - Controls container
- `.player-score` - Scoreboard entry
- `.player-score.active` - Current player
- `.player-score.at-high-score` - At high score

### Effects
- `.dice-alert` - Dice result overlay
- `.dice-alert.show` - Visible alert
- `.effect-emoji` - Emoji effect
- `.happy-effect` - Ladder emojis
- `.sad-effect` - Snake emojis
- `.confetti-canvas` - Confetti overlay

### Dice
- `.dice-3d` - 3D dice container
- `.dice-3d.rolling` - Rolling animation
- `.dice-3d.show-1` through `.show-6` - Final faces
- `.dice-face` - Individual face
- `.dice-face-1` through `.dice-face-6` - Face positions

## 🔍 Coordinate System

### Cell Numbering
```
91  92  93  94  95  96  97  98  99  100  ← Row 9
90  89  88  87  86  85  84  83  82  81   ← Row 8
71  72  73  74  75  76  77  78  79  80   ← Row 7
70  69  68  67  66  65  64  63  62  61   ← Row 6
51  52  53  54  55  56  57  58  59  60   ← Row 5
50  49  48  47  46  45  44  43  42  41   ← Row 4
31  32  33  34  35  36  37  38  39  40   ← Row 3
30  29  28  27  26  25  24  23  22  21   ← Row 2
11  12  13  14  15  16  17  18  19  20   ← Row 1
10   9   8   7   6   5   4   3   2   1   ← Row 0
```

### Convert Position to Coordinates
```javascript
const coords = getCoordinates(position);
// Returns: { x: number, y: number }
```

### Convert Grid to Cell Number
```javascript
const cellNum = getCellNumber(row, col);
// Returns: number (1-100)
```

## 📦 File Sizes

| File | Lines | Size |
|------|-------|------|
| game.js | 1136 | ~40 KB |
| style.css | ~400 | ~12 KB |
| index.html | ~60 | ~3 KB |
| **Total** | **~1600** | **~55 KB** |

## 🌐 Browser Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### Required Features
- HTML5 Canvas
- ES6 JavaScript
- CSS3 Animations
- CSS 3D Transforms
- Web Audio API (optional)
- localStorage (optional)

## 🚀 Performance Tips

1. **Reduce Confetti**: Lower particle count
2. **Faster Animations**: Reduce timing values
3. **Disable Shadows**: Remove glow effects
4. **Simplify Snakes**: Use straight lines
5. **Cache More**: Preload all assets

## 📱 Mobile Considerations

Currently optimized for desktop. For mobile:
- Add touch event handlers
- Adjust canvas size for mobile screens
- Increase button sizes
- Test on various devices
- Consider portrait/landscape modes

## 🔗 Useful Links

- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

---

**Need more details? Check the full documentation:**
- [Game Rules](RULES.md)
- [Architecture](ARCHITECTURE.md)
- [API Reference](API.md)
- [Development Guide](DEVELOPMENT.md)
