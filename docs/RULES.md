# Game Rules

Complete rules and gameplay mechanics for Snakes and Ladders.

## Table of Contents
- [Basic Rules](#basic-rules)
- [Setup](#setup)
- [Gameplay](#gameplay)
- [Snakes and Ladders](#snakes-and-ladders)
- [Winning](#winning)
- [Scoring System](#scoring-system)

## Basic Rules

Snakes and Ladders is a classic board game where players race to reach position 100 first. The game combines luck (dice rolling) with the excitement of snakes (setbacks) and ladders (shortcuts).

### Objective
Be the first player to reach exactly position 100 on the game board.

## Setup

### Starting the Game
1. Select the number of players (2-6)
2. Click "Start Game"
3. All players start at position 0 (off the board)
4. Player 1 goes first

### Player Identification
Each player is represented by a colored Kiro logo:
- Player 1: Red
- Player 2: Blue
- Player 3: Green
- Player 4: Yellow
- Player 5: Orange
- Player 6: Purple

## Gameplay

### Taking a Turn

1. **Roll the Dice**
   - Click the "Roll Dice" button
   - Watch the 3D dice animation
   - A number between 1-6 will be rolled

2. **Move Your Player**
   - Your player automatically moves forward by the rolled amount
   - Movement is animated step-by-step
   - Current position updates in real-time

3. **Check for Snakes or Ladders**
   - If you land on a ladder bottom, you climb up! 🎉
   - If you land on a snake head, you slide down 😢
   - Snake/ladder movement is direct (no intermediate positions)

4. **End of Turn**
   - Your score is updated
   - High score is checked and updated if needed
   - Next player's turn begins

### Movement Rules

- **Normal Movement**: Players move forward by the exact dice roll amount
- **Starting**: First roll moves you from position 0 to the rolled number
- **Exact Landing**: You must land exactly on 100 to win
- **Overshooting**: If your roll would take you past 100, you stay at your current position

## Snakes and Ladders

### Board Layout

The game board has 5 snakes and 5 ladders at fixed positions:

**Snakes** (Head → Tail):
- 98 → 28
- 87 → 24
- 64 → 19
- 54 → 34
- 31 → 7

**Ladders** (Bottom → Top):
- 4 → 56
- 12 → 50
- 22 → 58
- 41 → 79
- 63 → 95

### Snake Mechanics

When you land on a snake head:
1. Sad emoji effects appear (😢, 💔, 😞)
2. Buzzer sound plays
3. You slide directly to the tail position
4. Your score updates to the lower position
5. Turn ends

### Ladder Mechanics

When you land on a ladder bottom:
1. Happy emoji effects appear (✨, 😊, 🎉)
2. Firecracker sound plays
3. You climb directly to the top position
4. Your score updates to the higher position
5. Turn ends

### Special Cases

- **Multiple Players on Same Position**: Players are offset horizontally so all are visible
- **Landing on Both**: Not possible - each position has at most one snake or ladder
- **Consecutive Snakes/Ladders**: You can land on another snake/ladder after moving

## Winning

### Victory Condition
The first player to reach position 100 wins the game!

### Winning Sequence
1. Player reaches position 100
2. Confetti celebration animation plays
3. Game state changes to "Game Over"
4. Winner is announced with their player color
5. Game history is saved to localStorage
6. "Play Again" button appears

### Exact Landing
- You must roll the exact number needed to reach 100
- Example: At position 97, you need to roll 3 or less
- Rolling 4, 5, or 6 means you stay at 97

## Scoring System

### Current Score
Your current position on the board (0-100)

### High Score
The highest position you've ever reached across all games in this browser session.

### High Score Features
- Automatically tracked and saved
- Persists across game sessions (localStorage)
- Displayed in the scoreboard
- Special visual styling when at your high score
- Confetti celebration when achieving a new high score

### Score Updates
Scores update in these situations:
- After normal movement
- After climbing a ladder
- After sliding down a snake
- When reaching position 100

### Score Persistence
- Scores are saved to browser localStorage
- Survives page refreshes
- Separate high score for each player ID (0-5)
- Game history stores last 10 completed games

## Visual and Audio Feedback

### Visual Effects
- **Dice Rolling**: 3D rotating dice cube
- **Movement**: Smooth step-by-step animation
- **Snakes**: Sad emoji effects
- **Ladders**: Happy emoji effects
- **High Score**: Purple glow on scoreboard
- **Winning**: Confetti particle animation

### Audio Effects
- **Dice Roll**: Rattling sound with final thud
- **Ladder**: Celebratory firecracker pops
- **Snake**: Negative buzzer tones
- **Note**: Audio requires Web Audio API support

## Tips and Strategy

### Luck-Based Game
Snakes and Ladders is purely luck-based - there's no skill or strategy involved in dice rolling!

### Psychological Tips
- Stay positive when hitting snakes
- Celebrate ladder climbs
- Enjoy the journey, not just the destination
- Remember: everyone has equal chances

### Fun Variations (Not Implemented)
- **Speed Mode**: Faster animations
- **Custom Boards**: Different snake/ladder positions
- **Power-ups**: Special abilities on certain squares
- **Team Play**: Players work in teams

## Troubleshooting

### Common Issues

**Dice Won't Roll**
- Wait for current animation to complete
- Check that it's your turn
- Ensure game is in "playing" state

**No Sound**
- Check browser audio permissions
- Verify Web Audio API support
- Game continues without sound if unavailable

**Scores Not Saving**
- Check localStorage is enabled
- Verify not in private/incognito mode
- Clear browser cache if corrupted

**Players Overlapping**
- This is normal when on same position
- Players are automatically offset horizontally
- All players remain visible

## Accessibility

### Keyboard Support
Currently mouse/touch only. Keyboard support could be added:
- Space/Enter to roll dice
- Tab to navigate buttons

### Screen Readers
Visual game with limited screen reader support. Improvements could include:
- ARIA labels on game elements
- Text announcements for moves
- Alternative text-based mode

### Color Blindness
Player colors are distinct but could be improved:
- Add patterns or symbols
- Increase contrast
- Provide color-blind friendly palette option

---

**Enjoy the game and may the dice be in your favor!** 🎲
