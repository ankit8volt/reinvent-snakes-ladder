# Technology Stack

## Core Technologies
- **Vanilla JavaScript** (ES6+) - No frameworks or build tools
- **HTML5 Canvas** - For game board rendering
- **CSS3** - For UI styling and animations

## Architecture
- Single-page application with three screens (start, game, game over)
- State management via global `gameState` object
- Event-driven architecture with button click handlers
- Canvas 2D rendering context for all game graphics

## Key Libraries
None - pure vanilla implementation

## File Structure
- `index.html` - Main HTML structure and game screens
- `game.js` - All game logic, rendering, and state management
- `style.css` - Styling with Kiro brand colors
- `user-context.md` - User preferences and game specifications

## Running the Game
No build process required. Simply open `index.html` in a modern web browser:
```bash
open index.html
```

Or use a local development server:
```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Browser Compatibility
Requires modern browser with:
- HTML5 Canvas support
- ES6 JavaScript features
- CSS3 animations and transforms
