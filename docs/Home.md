# Snakes and Ladders - Wiki Home

Welcome to the Snakes and Ladders game documentation! This wiki provides comprehensive information about the game, its architecture, and how to contribute.

## 🎮 Quick Links

### For Players
- **[Game Rules](RULES.md)** - Learn how to play the game
- **[Quick Reference](QUICK_REFERENCE.md)** - Fast lookup guide
- **[README](../README.md)** - Quick start and features overview

### For Developers
- **[Architecture](ARCHITECTURE.md)** - System design and technical decisions
- **[API Reference](API.md)** - Complete function and object documentation
- **[Development Guide](DEVELOPMENT.md)** - Contributing and extending the game
- **[Quick Reference](QUICK_REFERENCE.md)** - Fast lookup for common tasks

### For Spec-Driven Development
- **[Requirements](.kiro/specs/game-enhancements/requirements.md)** - Feature requirements with acceptance criteria
- **[Design](.kiro/specs/game-enhancements/design.md)** - Technical design with correctness properties
- **[Tasks](.kiro/specs/game-enhancements/tasks.md)** - Implementation plan and task list

## 📚 Documentation Structure

### Game Documentation
```
docs/
├── Home.md (this page)
├── RULES.md          - Complete gameplay rules
├── ARCHITECTURE.md   - Technical architecture
├── API.md            - API reference
└── DEVELOPMENT.md    - Development guide
```

### Spec Documentation
```
.kiro/specs/game-enhancements/
├── requirements.md   - User stories and acceptance criteria
├── design.md         - Technical design and properties
└── tasks.md          - Implementation tasks
```

## 🎯 What's in This Wiki

### Game Rules
Everything you need to know to play:
- Basic rules and objectives
- How snakes and ladders work
- Scoring system
- Visual and audio feedback
- Tips and strategies

### Architecture
Deep dive into the technical implementation:
- System architecture overview
- Core components and their responsibilities
- Data flow and state management
- Rendering pipeline
- Design patterns used
- Performance considerations

### API Reference
Complete reference for all code:
- Global objects and state
- Score Manager API
- Animation Controller
- Effect System
- Sound Effects
- Visual Renderer
- Game functions
- Utility functions

### Development Guide
For contributors and extenders:
- Getting started
- Development workflow
- Code style guidelines
- Adding new features
- Testing strategies
- Debugging tips
- Common tasks
- Deployment options

## 🚀 Getting Started

### Play the Game
1. Open `index.html` in a modern browser
2. Select number of players (2-6)
3. Click "Start Game"
4. Roll dice and race to position 100!

### Develop the Game
1. Clone the repository
2. Open in your favorite editor
3. Make changes to `game.js`, `index.html`, or `style.css`
4. Test in browser
5. Submit a pull request

### Understand the Specs
1. Read `requirements.md` for feature requirements
2. Review `design.md` for technical design
3. Check `tasks.md` for implementation status
4. See how spec-driven development works

## 🎨 Key Features

### Visual Enhancements
- **Kiro Branding**: Colored Kiro logos for players
- **3D Dice**: Realistic rolling animation
- **Styled Board**: Organic snakes and wooden ladders
- **Confetti**: Celebration effects
- **Emoji Feedback**: Happy/sad effects

### Audio System
- **Procedural Sounds**: Generated with Web Audio API
- **Dice Rolling**: Rattling and thud effects
- **Ladder Climb**: Firecracker celebration
- **Snake Bite**: Negative buzzer
- **Graceful Degradation**: Works without audio

### Score Tracking
- **Persistent Storage**: localStorage integration
- **High Scores**: Track personal bests
- **Game History**: Last 10 games recorded
- **Real-time Updates**: Live scoreboard

### Technical Excellence
- **Vanilla JavaScript**: No frameworks needed
- **Canvas Rendering**: Smooth 2D graphics
- **CSS Animations**: 3D transforms
- **Responsive Design**: Fits in viewport
- **Browser Compatible**: Works everywhere

## 📖 How to Use This Wiki

### Navigation
- Use the sidebar to jump between pages
- Click links within pages for related content
- Use browser back button to return

### Search
- Use GitHub's wiki search feature
- Search for specific functions or concepts
- Find examples and code snippets

### Contributing to Docs
1. Edit markdown files in `docs/` folder
2. Follow existing formatting
3. Add examples where helpful
4. Submit PR with documentation changes

## 🏗️ Project Structure

```
snakes-and-ladders/
│
├── index.html              # Main HTML file
├── game.js                 # Game logic (1136 lines)
├── style.css               # Styling and animations
├── README.md               # Project overview
│
├── docs/                   # Documentation
│   ├── Home.md            # This page
│   ├── RULES.md           # Game rules
│   ├── ARCHITECTURE.md    # Technical design
│   ├── API.md             # API reference
│   └── DEVELOPMENT.md     # Dev guide
│
└── .kiro/                  # Kiro AI configuration
    ├── specs/              # Feature specifications
    │   └── game-enhancements/
    │       ├── requirements.md
    │       ├── design.md
    │       └── tasks.md
    └── steering/           # Development guidelines
        ├── product.md
        ├── tech.md
        ├── structure.md
        └── game-style-guide.md
```

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Report Bugs**: Open an issue with details
2. **Suggest Features**: Describe your idea
3. **Submit Code**: Fork, code, test, PR
4. **Improve Docs**: Fix typos, add examples
5. **Share Feedback**: Tell us what you think

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed guidelines.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Kiro AI](https://kiro.ai)
- Created during AWS Re:Invent workshop
- Kiro logo and branding by Kiro team

## 📧 Support

- **Issues**: Open a GitHub issue
- **Questions**: Start a discussion
- **Feedback**: Submit a PR or issue

---

## Recent Updates

### Latest Features
- ✅ Sound effects with Web Audio API
- ✅ Kiro logo player representation
- ✅ Styled snakes and ladders
- ✅ 3D dice animation
- ✅ Confetti celebrations
- ✅ Score persistence
- ✅ Horizontal layout

### Coming Soon
- Property-based testing
- Keyboard controls
- Accessibility improvements
- Mobile optimization
- Custom board editor

---

**Ready to dive in? Pick a page from the sidebar and start exploring!** 🎲

**Made with ❤️ using Kiro AI**
