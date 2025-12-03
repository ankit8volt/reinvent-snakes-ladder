# Development Guide

Guide for developers who want to contribute to or extend the Snakes and Ladders game.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Adding Features](#adding-features)
- [Testing](#testing)
- [Debugging](#debugging)
- [Common Tasks](#common-tasks)
- [Deployment](#deployment)

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Text editor or IDE (VS Code recommended)
- Basic knowledge of JavaScript, HTML5 Canvas, and CSS
- Optional: Local web server for testing

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd snakes-and-ladders
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file
   open index.html
   
   # Option 2: Local server (recommended)
   python3 -m http.server 8000
   # Visit http://localhost:8000
   ```

3. **Open in editor**
   ```bash
   code .  # VS Code
   # or your preferred editor
   ```

### Project Structure
```
/
├── index.html              # Main HTML file
├── game.js                 # Game logic (1136 lines)
├── style.css               # Styling and animations
├── docs/                   # Documentation
│   ├── RULES.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── DEVELOPMENT.md (this file)
├── .kiro/                  # Kiro AI configuration
│   ├── specs/              # Feature specifications
│   └── steering/           # Development guidelines
└── README.md               # Project overview
```

## Development Workflow

### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes**
   - Edit files in your editor
   - Test in browser
   - Iterate until working

3. **Test thoroughly**
   - Test all player counts (2-6)
   - Test edge cases (winning, snakes, ladders)
   - Test on different browsers
   - Check console for errors

4. **Commit changes**
   ```bash
   git add .
   git commit -m "Add feature: description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/my-feature
   # Create pull request on GitHub
   ```

### Live Reload Setup

For faster development, use a live reload server:

```bash
# Using browser-sync
npx browser-sync start --server --files "*.html, *.css, *.js"

# Using live-server
npx live-server
```

## Code Style

### JavaScript Style

**Naming Conventions:**
```javascript
// Constants: UPPER_SNAKE_CASE
const GRID_SIZE = 10;

// Objects/Classes: PascalCase
const ScoreManager = { /* ... */ };

// Functions: camelCase
function movePlayer(player, steps) { /* ... */ }

// Variables: camelCase
let currentPlayer = gameState.players[0];
```

**Function Structure:**
```javascript
/**
 * Brief description of function
 * 
 * @param {Type} paramName - Description
 * @returns {Type} Description
 */
function functionName(paramName) {
    // Validate inputs
    if (!paramName) return;
    
    // Main logic
    const result = doSomething(paramName);
    
    // Return or side effects
    return result;
}
```

**Object Patterns:**
```javascript
// Module pattern for components
const ComponentName = {
    // Private-ish properties
    _internalState: null,
    
    // Public methods
    init() {
        // Initialization
    },
    
    publicMethod() {
        // Public API
    }
};
```

### CSS Style

**Organization:**
```css
/* 1. Reset and globals */
* { margin: 0; padding: 0; }

/* 2. Layout */
.container { /* ... */ }

/* 3. Components */
.player-score { /* ... */ }

/* 4. Animations */
@keyframes diceRoll { /* ... */ }

/* 5. Responsive */
@media (max-width: 768px) { /* ... */ }
```

**Naming:**
- Use kebab-case for classes
- Use semantic names (`.player-score` not `.purple-box`)
- Use BEM for complex components (optional)

### HTML Style

**Structure:**
```html
<!-- Semantic elements -->
<div class="container">
    <h1>Title</h1>
    
    <!-- Screens -->
    <div id="startScreen" class="screen">
        <!-- Content -->
    </div>
</div>

<!-- Scripts at end -->
<script src="game.js"></script>
```

## Adding Features

### Adding a New Visual Effect

1. **Add to EffectSystem**
   ```javascript
   const EffectSystem = {
       // ... existing methods
       
       showMyEffect(position) {
           const coords = getCoordinates(position);
           if (!coords) return;
           
           // Create effect element
           const effectDiv = document.createElement('div');
           effectDiv.className = 'effect-emoji my-effect';
           effectDiv.textContent = '🎯';
           effectDiv.style.left = `${coords.x}px`;
           effectDiv.style.top = `${coords.y}px`;
           
           document.body.appendChild(effectDiv);
           this.effectElements.push(effectDiv);
           
           // Auto-remove
           setTimeout(() => {
               effectDiv.remove();
               const idx = this.effectElements.indexOf(effectDiv);
               if (idx > -1) this.effectElements.splice(idx, 1);
           }, 1500);
       }
   };
   ```

2. **Add CSS animation**
   ```css
   .my-effect {
       animation-name: myAnimation;
   }
   
   @keyframes myAnimation {
       0% { transform: scale(0); opacity: 1; }
       100% { transform: scale(2); opacity: 0; }
   }
   ```

3. **Call from game logic**
   ```javascript
   // In appropriate place
   EffectSystem.showMyEffect(position);
   ```

### Adding a New Sound Effect

1. **Add to SoundEffects**
   ```javascript
   const SoundEffects = {
       // ... existing methods
       
       playMySound() {
           if (!this.audioContext) return;
           
           const now = this.audioContext.currentTime;
           const oscillator = this.audioContext.createOscillator();
           const gainNode = this.audioContext.createGain();
           
           oscillator.connect(gainNode);
           gainNode.connect(this.audioContext.destination);
           
           // Configure sound
           oscillator.frequency.value = 440; // A4 note
           oscillator.type = 'sine';
           
           // Envelope
           gainNode.gain.setValueAtTime(0.3, now);
           gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
           
           oscillator.start(now);
           oscillator.stop(now + 0.5);
       }
   };
   ```

2. **Call from game logic**
   ```javascript
   SoundEffects.playMySound();
   ```

### Adding a New Board Element

1. **Add to gameState**
   ```javascript
   gameState.powerUps = [
       { position: 25, type: 'speed' },
       { position: 75, type: 'shield' }
   ];
   ```

2. **Add drawing function**
   ```javascript
   function drawPowerUp(position, type) {
       const coords = getCoordinates(position);
       if (!coords) return;
       
       ctx.save();
       // Draw power-up
       ctx.fillStyle = '#FFD700';
       ctx.beginPath();
       ctx.arc(coords.x, coords.y, 15, 0, Math.PI * 2);
       ctx.fill();
       ctx.restore();
   }
   ```

3. **Add to drawBoard()**
   ```javascript
   function drawBoard() {
       // ... existing code
       
       // Draw power-ups
       gameState.powerUps.forEach(powerUp => {
           drawPowerUp(powerUp.position, powerUp.type);
       });
       
       // ... rest of code
   }
   ```

4. **Add collision detection**
   ```javascript
   function movePlayer(player, steps) {
       // ... existing code
       
       // Check for power-up
       const powerUp = gameState.powerUps.find(p => p.position === newPosition);
       if (powerUp) {
           handlePowerUp(player, powerUp);
       }
       
       // ... rest of code
   }
   ```

### Adding Player Customization

1. **Add to player object**
   ```javascript
   gameState.players.push({
       id: i,
       color: playerColors[i],
       name: `Player ${i + 1}`,  // NEW
       avatar: 'default',         // NEW
       position: 0,
       // ... rest
   });
   ```

2. **Update UI to collect data**
   ```html
   <input type="text" id="player1Name" placeholder="Player 1 Name">
   ```

3. **Update display functions**
   ```javascript
   function updateScoreboard() {
       // Use player.name instead of "Player X"
       scoreDiv.innerHTML = `
           <div class="player-position">${player.name} - Position: ${player.position}</div>
       `;
   }
   ```

## Testing

### Manual Testing Checklist

**Basic Functionality:**
- [ ] Game starts with 2-6 players
- [ ] Dice rolls 1-6
- [ ] Players move correctly
- [ ] Snakes work (all 5)
- [ ] Ladders work (all 5)
- [ ] Winning at 100 works
- [ ] Game over screen shows
- [ ] Restart works

**Visual Effects:**
- [ ] Dice animation smooth
- [ ] Player movement smooth
- [ ] Snake effects show
- [ ] Ladder effects show
- [ ] Confetti shows on high score
- [ ] Confetti shows on win

**Audio:**
- [ ] Dice sound plays
- [ ] Ladder sound plays
- [ ] Snake sound plays
- [ ] Game works without audio

**Persistence:**
- [ ] High scores save
- [ ] High scores load on refresh
- [ ] Game history saves
- [ ] Works in private browsing (no errors)

**Edge Cases:**
- [ ] Can't roll past 100
- [ ] Multiple players on same cell
- [ ] Rapid clicking doesn't break
- [ ] Resize window works
- [ ] All player counts (2-6)

### Browser Testing

Test on multiple browsers:
```bash
# Chrome
open -a "Google Chrome" index.html

# Firefox
open -a Firefox index.html

# Safari
open -a Safari index.html
```

### Console Debugging

Add debug logging:
```javascript
function movePlayer(player, steps) {
    console.log(`Moving player ${player.id} by ${steps} steps`);
    console.log(`From: ${player.position}, To: ${player.position + steps}`);
    
    // ... rest of function
}
```

## Debugging

### Common Issues

**Issue: Players not visible**
```javascript
// Check displayPosition
console.log('Player positions:', gameState.players.map(p => p.displayPosition));

// Check coordinates
const coords = getCoordinates(50);
console.log('Coords for 50:', coords);
```

**Issue: Animations not working**
```javascript
// Check animation flags
console.log('gameState.isAnimating:', gameState.isAnimating);
console.log('AnimationController.isAnimating:', AnimationController.isAnimating);
```

**Issue: Sounds not playing**
```javascript
// Check audio context
console.log('AudioContext:', SoundEffects.audioContext);
console.log('AudioContext state:', SoundEffects.audioContext?.state);
```

**Issue: Scores not saving**
```javascript
// Check localStorage
console.log('Scores:', localStorage.getItem('snakesAndLadders_scores'));
console.log('History:', localStorage.getItem('snakesAndLadders_history'));
```

### Browser DevTools

**Useful Console Commands:**
```javascript
// Inspect game state
gameState

// Force move player
movePlayer(gameState.players[0], 50)

// Trigger effects
EffectSystem.showConfetti()

// Play sounds
SoundEffects.playFirecracker()

// Check high scores
ScoreManager.scores
```

## Common Tasks

### Change Board Size

```javascript
// In game.js
const GRID_SIZE = 8;  // Change from 10 to 8

// Update snake/ladder positions accordingly
```

### Change Animation Speed

```javascript
// In animateMovement()
const interval = setInterval(() => {
    // Change 200 to desired milliseconds
}, 100);  // Faster movement
```

### Add More Snakes/Ladders

```javascript
function generateSnakesAndLadders() {
    gameState.snakes = [
        { start: 98, end: 28 },
        { start: 87, end: 24 },
        // Add more...
        { start: 45, end: 12 }  // NEW
    ];
    
    gameState.ladders = [
        { start: 4, end: 56 },
        // Add more...
        { start: 30, end: 85 }  // NEW
    ];
}
```

### Change Color Scheme

```javascript
// In game.js
const playerColors = [
    '#FF0000',  // Red
    '#00FF00',  // Green
    // ... customize
];

// In style.css
:root {
    --primary-color: #790ECB;  /* Change Kiro purple */
}
```

### Add Keyboard Controls

```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        // Space or Enter to roll
        if (gameState.state === 'playing' && !gameState.isAnimating) {
            rollDice();
        }
    }
});
```

## Deployment

### GitHub Pages

1. **Enable GitHub Pages**
   - Go to repository settings
   - Enable Pages from main branch
   - Site will be at `https://username.github.io/repo-name`

2. **No build needed**
   - Static files work directly
   - Just push to main branch

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Netlify

1. **Drag and drop**
   - Go to netlify.com
   - Drag project folder
   - Done!

2. **Or use CLI**
   ```bash
   npm i -g netlify-cli
   netlify deploy
   ```

### Custom Server

```bash
# Copy files to server
scp -r * user@server:/var/www/html/game/

# Or use rsync
rsync -avz --exclude '.git' . user@server:/var/www/html/game/
```

## Performance Optimization

### Canvas Optimization

```javascript
// Only redraw when needed
let needsRedraw = false;

function requestRedraw() {
    needsRedraw = true;
}

function gameLoop() {
    if (needsRedraw) {
        drawBoard();
        needsRedraw = false;
    }
    requestAnimationFrame(gameLoop);
}
```

### Reduce Confetti Particles

```javascript
// In EffectSystem.showConfetti()
const particleCount = 75;  // Reduce from 150
```

### Optimize Image Caching

```javascript
// Preload all images at start
function preloadAssets() {
    playerColors.forEach(color => {
        createColoredKiroIcon(color);
    });
}
```

## Contributing Guidelines

### Code Review Checklist

- [ ] Code follows style guide
- [ ] No console.log in production code
- [ ] Functions have clear names
- [ ] Complex logic has comments
- [ ] No magic numbers (use constants)
- [ ] Error handling present
- [ ] Tested on multiple browsers
- [ ] No performance regressions

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested all player counts
- [ ] Tested edge cases

## Screenshots
If applicable, add screenshots
```

## Resources

### Learning Resources
- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Web Audio API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [JavaScript ES6 Features](https://es6-features.org/)

### Tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [VS Code](https://code.visualstudio.com/)
- [Can I Use](https://caniuse.com/) - Browser compatibility

### Community
- Open issues on GitHub
- Join discussions
- Share your improvements

---

**Happy coding! 🎮**
