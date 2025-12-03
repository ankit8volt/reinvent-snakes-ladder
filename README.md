# Snakes and Ladders Game

A modern, browser-based implementation of the classic Snakes and Ladders board game with enhanced visuals, sound effects, and score tracking.

![Game Preview](https://img.shields.io/badge/Players-2--6-blue) ![Status](https://img.shields.io/badge/Status-Complete-success) ![License](https://img.shields.io/badge/License-MIT-green)

## 🎮 Features

### Core Gameplay
- **Multiplayer Support**: 2-6 players can compete on a single device
- **Classic Rules**: 10x10 grid board (100 squares) with 5 snakes and 5 ladders
- **Smart Movement**: Animated player movement with direct snake/ladder transitions
- **Win Condition**: First player to reach position 100 wins

### Visual Enhancements
- **Kiro Branding**: Players represented by colored Kiro logos with glow effects
- **3D Dice Animation**: Realistic dice rolling with rotation on all axes
- **Styled Board Elements**: Organic curved snakes and detailed wooden ladders
- **Confetti Celebrations**: Particle effects for high scores and victories
- **Visual Feedback**: Happy emojis for ladders, sad emojis for snakes
- **Horizontal Layout**: Optimized single-viewport design

### Audio System
- **Procedural Sound Effects**: Generated using Web Audio API
- **Dice Rolling**: Rattling sound with final thud
- **Ladder Climb**: Celebratory firecracker effect
- **Snake Bite**: Negative buzzer feedback
- **Graceful Degradation**: Game continues without audio if unavailable

### Score Tracking
- **Persistent Storage**: High scores saved in browser localStorage
- **Game History**: Last 10 games recorded with winner and player positions
- **Real-time Updates**: Live scoreboard showing current and high scores
- **Visual Indicators**: Special styling for players at their high score

## 🚀 Quick Start

### Play Online
Simply open `index.html` in any modern web browser. No installation or build process required!

### Local Development Server
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server

# Then visit http://localhost:8000
```

## 🎯 How to Play

1. **Start Game**: Select number of players (2-6) and click "Start Game"
2. **Roll Dice**: Click "Roll Dice" button to roll (1-6)
3. **Move Forward**: Your player automatically moves forward by the rolled amount
4. **Snakes & Ladders**: 
   - Land on a ladder bottom → climb to the top 🎉
   - Land on a snake head → slide to the tail 😢
5. **Win**: First player to reach position 100 wins!

## 🏗️ Technical Architecture

### Technology Stack
- **Vanilla JavaScript** (ES6+) - No frameworks or dependencies
- **HTML5 Canvas** - For game board rendering
- **CSS3** - Animations and 3D transforms
- **Web Audio API** - Procedural sound generation
- **localStorage** - Persistent score tracking

### Project Structure
```
/
├── index.html          # Main HTML structure
├── game.js             # Game logic and rendering
├── style.css           # Styling and animations
├── .kiro/              # Kiro configuration
│   ├── specs/          # Feature specifications
│   └── steering/       # Development guidelines
└── README.md           # This file
```

### Key Components

**Game State Management**
- Central `gameState` object tracks players, board, and game status
- Event-driven architecture with button handlers

**Rendering System**
- Canvas 2D context for board and player rendering
- `VisualRenderer` for styled snakes and ladders
- `EffectSystem` for confetti and emoji effects

**Animation System**
- `AnimationController` for dice rolling
- Smooth player movement with configurable timing
- Direct jump animations for snakes/ladders

**Audio System**
- `SoundEffects` object with Web Audio API
- Procedural sound generation (no audio files needed)
- Oscillators and gain nodes for realistic effects

**Persistence Layer**
- `ScoreManager` handles localStorage operations
- Automatic save/load on game start
- Error handling for quota and access issues

## 🎨 Customization

### Player Colors
Edit the `playerColors` array in `game.js`:
```javascript
const playerColors = ['#FF4444', '#4444FF', '#44FF44', '#FFFF44', '#FF8844', '#790ECB'];
```

### Board Configuration
Modify snake and ladder positions in `generateSnakesAndLadders()`:
```javascript
const snakeStarts = [98, 87, 64, 54, 31];
const snakeEnds = [28, 24, 19, 34, 7];
const ladderStarts = [4, 12, 22, 41, 63];
const ladderEnds = [56, 50, 58, 79, 95];
```

### Animation Speed
Adjust timing in `animateMovement()`:
```javascript
const interval = setInterval(() => {
    // Change 200 to adjust speed (milliseconds per step)
}, 200);
```

## 📚 Documentation

### Wiki Pages
- **[Wiki Home](docs/Home.md)** - Documentation hub
- **[Quick Reference](docs/QUICK_REFERENCE.md)** - Fast lookup guide

### Detailed Guides
- **[Game Rules](docs/RULES.md)** - Complete gameplay rules and mechanics
- **[Architecture](docs/ARCHITECTURE.md)** - Technical design and system architecture
- **[API Reference](docs/API.md)** - Complete function and object documentation
- **[Development Guide](docs/DEVELOPMENT.md)** - Contributing, extending, and debugging

### Spec Documentation
- **[Requirements](.kiro/specs/game-enhancements/requirements.md)** - Feature requirements with acceptance criteria
- **[Design](.kiro/specs/game-enhancements/design.md)** - Technical design with correctness properties
- **[Tasks](.kiro/specs/game-enhancements/tasks.md)** - Implementation plan and task list

## 🐛 Browser Compatibility

**Minimum Requirements:**
- HTML5 Canvas support
- ES6 JavaScript features
- CSS3 animations and 3D transforms
- Web Audio API (optional, for sound)

**Tested Browsers:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

This project was built during the AWS Re:Invent workshop. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Kiro AI](https://kiro.ai) during AWS Re:Invent workshop
- Kiro logo and branding by Kiro team
- Classic Snakes and Ladders game design

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ using Kiro AI**
