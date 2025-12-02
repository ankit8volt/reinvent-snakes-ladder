// Game State
const gameState = {
    state: 'start', // 'start', 'playing', 'gameOver'
    players: [],
    currentPlayerIndex: 0,
    snakes: [],
    ladders: [],
    isAnimating: false
};

// Sound Effects System
const SoundEffects = {
    audioContext: null,
    
    // Initialize audio context
    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    },
    
    // Play dice roll sound
    playDiceRoll() {
        if (!this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        
        // Create multiple short bursts to simulate dice rattling
        for (let i = 0; i < 8; i++) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Random frequency for rattling effect
            oscillator.frequency.value = 100 + Math.random() * 200;
            oscillator.type = 'square';
            
            // Short burst
            const startTime = now + (i * 0.08);
            const endTime = startTime + 0.05;
            
            gainNode.gain.setValueAtTime(0.1, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);
            
            oscillator.start(startTime);
            oscillator.stop(endTime);
        }
        
        // Final "thud" when dice lands
        setTimeout(() => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = 80;
            oscillator.type = 'sine';
            
            const startTime = this.audioContext.currentTime;
            gainNode.gain.setValueAtTime(0.2, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + 0.2);
        }, 600);
    },
    
    // Play firecracker sound for ladder celebration
    playFirecracker() {
        if (!this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        
        // Multiple ascending pops for firecracker effect
        for (let i = 0; i < 12; i++) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Ascending frequencies for celebration
            oscillator.frequency.value = 400 + (i * 100) + Math.random() * 50;
            oscillator.type = 'sawtooth';
            
            const startTime = now + (i * 0.05);
            const endTime = startTime + 0.03;
            
            gainNode.gain.setValueAtTime(0.15, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);
            
            oscillator.start(startTime);
            oscillator.stop(endTime);
        }
        
        // Add sparkle sounds
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.value = 1000 + Math.random() * 1000;
                oscillator.type = 'sine';
                
                const startTime = this.audioContext.currentTime;
                gainNode.gain.setValueAtTime(0.08, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
                
                oscillator.start(startTime);
                oscillator.stop(startTime + 0.1);
            }, i * 80);
        }
    },
    
    // Play buzzer sound for snake bite
    playBuzzer() {
        if (!this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        
        // Low descending buzz for negative feedback
        for (let i = 0; i < 3; i++) {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Descending frequencies for negative effect
            oscillator.frequency.value = 200 - (i * 40);
            oscillator.type = 'sawtooth';
            
            const startTime = now + (i * 0.15);
            const endTime = startTime + 0.15;
            
            gainNode.gain.setValueAtTime(0.2, startTime);
            gainNode.gain.linearRampToValueAtTime(0.2, endTime - 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.01, endTime);
            
            oscillator.start(startTime);
            oscillator.stop(endTime);
        }
    }
};

// Score Manager - handles score tracking and localStorage persistence
const ScoreManager = {
    storageKeys: {
        scores: 'snakesAndLadders_scores',
        history: 'snakesAndLadders_history'
    },
    
    // Initialize score manager and load from localStorage
    init() {
        try {
            const stored = localStorage.getItem(this.storageKeys.scores);
            if (stored) {
                this.scores = JSON.parse(stored);
            } else {
                this.scores = {};
            }
        } catch (error) {
            console.error('Error loading scores from localStorage:', error);
            this.scores = {};
        }
    },
    
    // Update player score and check for high score
    updateScore(playerId, newPosition) {
        if (!this.scores[playerId]) {
            this.scores[playerId] = {
                highScore: 0,
                gamesPlayed: 0
            };
        }
        
        // Check if this is a new high score
        const isNewHighScore = newPosition > this.scores[playerId].highScore;
        
        if (isNewHighScore) {
            this.scores[playerId].highScore = newPosition;
            this._saveScores();
        }
        
        return isNewHighScore;
    },
    
    // Get player's high score
    getHighScore(playerId) {
        return this.scores[playerId]?.highScore || 0;
    },
    
    // Save game to history
    saveGameHistory(winner, players) {
        try {
            let history = [];
            const stored = localStorage.getItem(this.storageKeys.history);
            if (stored) {
                history = JSON.parse(stored);
            }
            
            const gameEntry = {
                timestamp: Date.now(),
                winner: {
                    id: winner.id,
                    emoji: winner.emoji,
                    finalPosition: winner.position
                },
                players: players.map(p => ({
                    id: p.id,
                    emoji: p.emoji,
                    finalPosition: p.position
                }))
            };
            
            history.unshift(gameEntry);
            
            // Keep only last 10 games
            if (history.length > 10) {
                history = history.slice(0, 10);
            }
            
            localStorage.setItem(this.storageKeys.history, JSON.stringify(history));
            
            // Update games played count
            if (this.scores[winner.id]) {
                this.scores[winner.id].gamesPlayed++;
                this._saveScores();
            }
        } catch (error) {
            console.error('Error saving game history:', error);
        }
    },
    
    // Load game history
    loadGameHistory() {
        try {
            const stored = localStorage.getItem(this.storageKeys.history);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading game history:', error);
            return [];
        }
    },
    
    // Private method to save scores to localStorage
    _saveScores() {
        try {
            localStorage.setItem(this.storageKeys.scores, JSON.stringify(this.scores));
        } catch (error) {
            console.error('Error saving scores to localStorage:', error);
        }
    }
};

// Visual Renderer - draws styled snakes and ladders
const VisualRenderer = {
    // Draw styled snake with curved, organic shape
    drawStyledSnake(from, to, ctx) {
        const startCoords = getCoordinates(from);
        const endCoords = getCoordinates(to);
        
        if (!startCoords || !endCoords) return;
        
        // Calculate control points for bezier curve
        const dx = endCoords.x - startCoords.x;
        const dy = endCoords.y - startCoords.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Create multiple control points for more organic curve
        const midX = (startCoords.x + endCoords.x) / 2;
        const midY = (startCoords.y + endCoords.y) / 2;
        
        // Perpendicular offset for curve
        const perpX = -dy / distance;
        const perpY = dx / distance;
        const curveAmount = distance * 0.3;
        
        const cp1x = startCoords.x + dx * 0.25 + perpX * curveAmount;
        const cp1y = startCoords.y + dy * 0.25 + perpY * curveAmount;
        const cp2x = startCoords.x + dx * 0.75 - perpX * curveAmount * 0.5;
        const cp2y = startCoords.y + dy * 0.75 - perpY * curveAmount * 0.5;
        
        // Draw snake body with gradient
        const gradient = ctx.createLinearGradient(startCoords.x, startCoords.y, endCoords.x, endCoords.y);
        gradient.addColorStop(0, '#ff8844');
        gradient.addColorStop(0.5, '#ffaa44');
        gradient.addColorStop(1, '#ff6644');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Draw main snake body
        ctx.beginPath();
        ctx.moveTo(startCoords.x, startCoords.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endCoords.x, endCoords.y);
        ctx.stroke();
        
        // Draw snake pattern (stripes)
        ctx.strokeStyle = 'rgba(200, 100, 50, 0.6)';
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(startCoords.x, startCoords.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endCoords.x, endCoords.y);
        ctx.stroke();
        
        // Draw snake head (larger circle at start)
        const headGradient = ctx.createRadialGradient(startCoords.x, startCoords.y, 0, startCoords.x, startCoords.y, 15);
        headGradient.addColorStop(0, '#ff6644');
        headGradient.addColorStop(1, '#cc4422');
        ctx.fillStyle = headGradient;
        ctx.beginPath();
        ctx.arc(startCoords.x, startCoords.y, 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw eyes on snake head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(startCoords.x - 5, startCoords.y - 3, 3, 0, Math.PI * 2);
        ctx.arc(startCoords.x + 5, startCoords.y - 3, 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(startCoords.x - 5, startCoords.y - 3, 1.5, 0, Math.PI * 2);
        ctx.arc(startCoords.x + 5, startCoords.y - 3, 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw snake tail (smaller circle at end)
        const tailGradient = ctx.createRadialGradient(endCoords.x, endCoords.y, 0, endCoords.x, endCoords.y, 10);
        tailGradient.addColorStop(0, '#ffaa44');
        tailGradient.addColorStop(1, '#ff8844');
        ctx.fillStyle = tailGradient;
        ctx.beginPath();
        ctx.arc(endCoords.x, endCoords.y, 10, 0, Math.PI * 2);
        ctx.fill();
    },
    
    // Draw styled ladder with angled rungs
    drawStyledLadder(from, to, ctx) {
        const startCoords = getCoordinates(from);
        const endCoords = getCoordinates(to);
        
        if (!startCoords || !endCoords) return;
        
        // Calculate angle and distance
        const dx = endCoords.x - startCoords.x;
        const dy = endCoords.y - startCoords.y;
        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Ladder rail offset (width between rails)
        const railOffset = 12;
        
        // Calculate perpendicular offset for rails
        const perpX = Math.cos(angle + Math.PI / 2) * railOffset;
        const perpY = Math.sin(angle + Math.PI / 2) * railOffset;
        
        // Draw ladder shadow for depth
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startCoords.x - perpX + 2, startCoords.y - perpY + 2);
        ctx.lineTo(endCoords.x - perpX + 2, endCoords.y - perpY + 2);
        ctx.moveTo(startCoords.x + perpX + 2, startCoords.y + perpY + 2);
        ctx.lineTo(endCoords.x + perpX + 2, endCoords.y + perpY + 2);
        ctx.stroke();
        
        // Draw ladder rails (side poles)
        const railGradient = ctx.createLinearGradient(
            startCoords.x - perpX, startCoords.y - perpY,
            startCoords.x + perpX, startCoords.y + perpY
        );
        railGradient.addColorStop(0, '#8B4513');
        railGradient.addColorStop(0.5, '#A0522D');
        railGradient.addColorStop(1, '#654321');
        
        ctx.strokeStyle = railGradient;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        
        // Left rail
        ctx.beginPath();
        ctx.moveTo(startCoords.x - perpX, startCoords.y - perpY);
        ctx.lineTo(endCoords.x - perpX, endCoords.y - perpY);
        ctx.stroke();
        
        // Right rail
        ctx.beginPath();
        ctx.moveTo(startCoords.x + perpX, startCoords.y + perpY);
        ctx.lineTo(endCoords.x + perpX, endCoords.y + perpY);
        ctx.stroke();
        
        // Draw rungs (horizontal steps)
        const numRungs = Math.max(5, Math.floor(distance / 60));
        ctx.strokeStyle = '#D2691E';
        ctx.lineWidth = 6;
        
        for (let i = 0; i <= numRungs; i++) {
            const t = i / numRungs;
            const rungX = startCoords.x + dx * t;
            const rungY = startCoords.y + dy * t;
            
            // Draw rung with gradient
            const rungGradient = ctx.createLinearGradient(
                rungX - perpX, rungY - perpY,
                rungX + perpX, rungY + perpY
            );
            rungGradient.addColorStop(0, '#CD853F');
            rungGradient.addColorStop(0.5, '#DEB887');
            rungGradient.addColorStop(1, '#CD853F');
            
            ctx.strokeStyle = rungGradient;
            ctx.beginPath();
            ctx.moveTo(rungX - perpX, rungY - perpY);
            ctx.lineTo(rungX + perpX, rungY + perpY);
            ctx.stroke();
            
            // Add rung highlights for 3D effect
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(rungX - perpX, rungY - perpY);
            ctx.lineTo(rungX + perpX * 0.5, rungY + perpY * 0.5);
            ctx.stroke();
        }
    }
};

// Effect System - renders visual effects (confetti, happy/sad animations)
const EffectSystem = {
    confettiParticles: [],
    effectElements: [],
    
    // Show confetti animation
    showConfetti() {
        const canvas = document.getElementById('confettiCanvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size to window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Create confetti particles with Kiro purple theme
        const particleCount = 150;
        const colors = ['#790ECB', '#9a3de8', '#b84fff', '#d580ff', '#ffffff', '#ffff44'];
        
        for (let i = 0; i < particleCount; i++) {
            this.confettiParticles.push({
                x: Math.random() * canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10
            });
        }
        
        // Animate confetti
        this.animateConfetti(canvas, ctx);
    },
    
    // Animate confetti particles
    animateConfetti(canvas, ctx) {
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            let activeParticles = 0;
            
            this.confettiParticles.forEach(particle => {
                if (particle.y < canvas.height) {
                    activeParticles++;
                    
                    // Update position
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    particle.rotation += particle.rotationSpeed;
                    particle.vy += 0.1; // Gravity
                    
                    // Draw particle
                    ctx.save();
                    ctx.translate(particle.x, particle.y);
                    ctx.rotate(particle.rotation * Math.PI / 180);
                    ctx.fillStyle = particle.color;
                    ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                    ctx.restore();
                }
            });
            
            if (activeParticles > 0) {
                requestAnimationFrame(animate);
            } else {
                this.clearEffects();
            }
        };
        
        animate();
    },
    
    // Show happy effect (for ladders)
    showHappyEffect(position) {
        const coords = getCoordinates(position);
        if (!coords) return;
        
        const emojis = ['✨', '😊', '🎉'];
        const gameCanvas = document.getElementById('gameCanvas');
        const rect = gameCanvas.getBoundingClientRect();
        
        emojis.forEach((emoji, index) => {
            const effectDiv = document.createElement('div');
            effectDiv.className = 'effect-emoji happy-effect';
            effectDiv.textContent = emoji;
            effectDiv.style.left = `${rect.left + coords.x}px`;
            effectDiv.style.top = `${rect.top + coords.y}px`;
            effectDiv.style.animationDelay = `${index * 0.1}s`;
            
            document.body.appendChild(effectDiv);
            this.effectElements.push(effectDiv);
            
            // Remove after animation
            setTimeout(() => {
                effectDiv.remove();
                const idx = this.effectElements.indexOf(effectDiv);
                if (idx > -1) this.effectElements.splice(idx, 1);
            }, 1500);
        });
    },
    
    // Show sad effect (for snakes)
    showSadEffect(position) {
        const coords = getCoordinates(position);
        if (!coords) return;
        
        const emojis = ['😢', '💔', '😞'];
        const gameCanvas = document.getElementById('gameCanvas');
        const rect = gameCanvas.getBoundingClientRect();
        
        emojis.forEach((emoji, index) => {
            const effectDiv = document.createElement('div');
            effectDiv.className = 'effect-emoji sad-effect';
            effectDiv.textContent = emoji;
            effectDiv.style.left = `${rect.left + coords.x}px`;
            effectDiv.style.top = `${rect.top + coords.y}px`;
            effectDiv.style.animationDelay = `${index * 0.1}s`;
            
            document.body.appendChild(effectDiv);
            this.effectElements.push(effectDiv);
            
            // Remove after animation
            setTimeout(() => {
                effectDiv.remove();
                const idx = this.effectElements.indexOf(effectDiv);
                if (idx > -1) this.effectElements.splice(idx, 1);
            }, 1500);
        });
    },
    
    // Clear all effects
    clearEffects() {
        this.confettiParticles = [];
        this.effectElements.forEach(el => el.remove());
        this.effectElements = [];
        
        const canvas = document.getElementById('confettiCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
};

// Animation Controller - manages dice roll animations and alerts
const AnimationController = {
    isAnimating: false,
    
    // Animate dice roll for 1-2 seconds with 3D rotation
    animateDiceRoll(finalValue, callback) {
        this.isAnimating = true;
        const duration = 1500; // 1.5 seconds
        const dice3D = document.getElementById('dice3D');
        const diceDisplay = document.getElementById('diceResult');
        
        // Play dice roll sound
        SoundEffects.playDiceRoll();
        
        // Remove any existing face classes
        dice3D.className = 'dice-3d';
        
        // Add rolling animation
        dice3D.classList.add('rolling');
        
        // Show rolling text
        diceDisplay.textContent = '🎲 Rolling...';
        
        // After animation completes
        setTimeout(() => {
            // Remove rolling class
            dice3D.classList.remove('rolling');
            
            // Show final face
            dice3D.classList.add(`show-${finalValue}`);
            
            // Update display
            diceDisplay.textContent = `🎲 ${finalValue}`;
            this.isAnimating = false;
            
            // Show alert with final value
            this.showDiceAlert(finalValue);
            
            // Call callback after alert is shown
            if (callback) {
                setTimeout(callback, 1500); // Wait for alert to be visible
            }
        }, duration);
    },
    
    // Show centered alert displaying dice result
    showDiceAlert(value) {
        const alert = document.getElementById('diceAlert');
        const alertText = document.getElementById('diceAlertText');
        
        alertText.textContent = `You rolled: ${value}`;
        alert.classList.add('show');
        
        // Hide alert after 1 second
        setTimeout(() => {
            this.hideDiceAlert();
        }, 1000);
    },
    
    // Hide dice alert
    hideDiceAlert() {
        const alert = document.getElementById('diceAlert');
        alert.classList.remove('show');
    }
};

// Player colors for Kiro logo
const playerColors = ['#FF4444', '#4444FF', '#44FF44', '#FFFF44', '#FF8844', '#790ECB'];

// Function to draw Kiro logo
function drawKiroLogo(ctx, x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    
    // Draw K letter in Kiro style
    ctx.fillStyle = color;
    ctx.font = `bold ${size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('K', 0, 0);
    
    // Add glow effect
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillText('K', 0, 0);
    
    ctx.restore();
}

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const GRID_SIZE = 10;
let CELL_SIZE = canvas.width / GRID_SIZE;

// Adjust canvas size for viewport
function adjustCanvasSize() {
    const maxHeight = window.innerHeight - 160;
    const maxWidth = Math.min(600, window.innerWidth * 0.5);
    const size = Math.min(maxHeight, maxWidth, 600);
    
    canvas.width = size;
    canvas.height = size;
    CELL_SIZE = size / GRID_SIZE;
}

// Initialize game
function init() {
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('rollDiceButton').addEventListener('click', rollDice);
    document.getElementById('restartButton').addEventListener('click', resetGame);
    
    // Initialize Score Manager
    ScoreManager.init();
    
    // Initialize Sound Effects
    SoundEffects.init();
    
    // Adjust canvas size on load and resize
    adjustCanvasSize();
    window.addEventListener('resize', () => {
        adjustCanvasSize();
        if (gameState.state === 'playing') {
            drawBoard();
        }
    });
}

function startGame() {
    const playerCount = parseInt(document.getElementById('playerCount').value);
    
    if (playerCount < 2 || playerCount > 6) {
        alert('Please select between 2 and 6 players!');
        return;
    }

    // Initialize players
    gameState.players = [];
    for (let i = 0; i < playerCount; i++) {
        gameState.players.push({
            id: i,
            color: playerColors[i],
            position: 0, // Starting outside the board
            displayPosition: 0,
            currentScore: 0,
            highScore: ScoreManager.getHighScore(i)
        });
    }

    // Generate snakes and ladders
    generateSnakesAndLadders();

    // Change screen
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('gameScreen').classList.remove('hidden');
    
    gameState.state = 'playing';
    gameState.currentPlayerIndex = 0;
    
    drawBoard();
    updateScoreboard();
    updateCurrentPlayer();
}

function generateSnakesAndLadders() {
    gameState.snakes = [];
    gameState.ladders = [];
    
    // Generate 5 snakes (head at higher position, tail at lower)
    const snakeStarts = [98, 87, 64, 54, 31];
    const snakeEnds = [28, 24, 19, 34, 7];
    
    for (let i = 0; i < 5; i++) {
        gameState.snakes.push({
            start: snakeStarts[i],
            end: snakeEnds[i]
        });
    }
    
    // Generate 5 ladders (bottom at lower position, top at higher)
    const ladderStarts = [4, 12, 22, 41, 63];
    const ladderEnds = [56, 50, 58, 79, 95];
    
    for (let i = 0; i < 5; i++) {
        gameState.ladders.push({
            start: ladderStarts[i],
            end: ladderEnds[i]
        });
    }
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid and numbers
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const x = col * CELL_SIZE;
            const y = row * CELL_SIZE;
            
            // Alternating row colors
            ctx.fillStyle = (row + col) % 2 === 0 ? '#2a2a2a' : '#1a1a1a';
            ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            
            // Grid lines
            ctx.strokeStyle = '#3a3a3a';
            ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
            
            // Calculate cell number (bottom-left to top-right, alternating)
            const cellNumber = getCellNumber(row, col);
            
            // Draw cell number
            ctx.fillStyle = '#666666';
            ctx.font = '14px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(cellNumber, x + 5, y + 5);
        }
    }
    
    // Draw snakes
    gameState.snakes.forEach(snake => {
        drawSnake(snake.start, snake.end);
    });
    
    // Draw ladders
    gameState.ladders.forEach(ladder => {
        drawLadder(ladder.start, ladder.end);
    });
    
    // Draw players
    gameState.players.forEach(player => {
        if (player.displayPosition > 0) {
            drawPlayer(player);
        }
    });
}

function getCellNumber(row, col) {
    const bottomRow = GRID_SIZE - 1 - row;
    if (bottomRow % 2 === 0) {
        return bottomRow * GRID_SIZE + col + 1;
    } else {
        return bottomRow * GRID_SIZE + (GRID_SIZE - col);
    }
}

function getCoordinates(position) {
    if (position < 1 || position > 100) return null;
    
    const index = position - 1;
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    
    let actualCol;
    if (row % 2 === 0) {
        actualCol = col;
    } else {
        actualCol = GRID_SIZE - 1 - col;
    }
    
    const actualRow = GRID_SIZE - 1 - row;
    
    return {
        x: actualCol * CELL_SIZE + CELL_SIZE / 2,
        y: actualRow * CELL_SIZE + CELL_SIZE / 2
    };
}

function drawSnake(start, end) {
    VisualRenderer.drawStyledSnake(start, end, ctx);
}

function drawLadder(start, end) {
    VisualRenderer.drawStyledLadder(start, end, ctx);
}

function drawPlayer(player) {
    const coords = getCoordinates(player.displayPosition);
    if (!coords) return;
    
    // Offset players on same cell
    const playersOnSameCell = gameState.players.filter(p => 
        p.displayPosition === player.displayPosition && p.displayPosition > 0
    );
    const playerIndex = playersOnSameCell.indexOf(player);
    const offsetX = (playerIndex - playersOnSameCell.length / 2) * 20;
    
    // Draw Kiro logo instead of emoji
    drawKiroLogo(ctx, coords.x + offsetX, coords.y, 32, player.color);
}

function rollDice() {
    if (gameState.isAnimating || gameState.state !== 'playing' || AnimationController.isAnimating) return;
    
    const diceValue = Math.floor(Math.random() * 6) + 1;
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Disable button during animation
    document.getElementById('rollDiceButton').disabled = true;
    gameState.isAnimating = true;
    
    // Use animation controller for dice roll
    AnimationController.animateDiceRoll(diceValue, () => {
        movePlayer(currentPlayer, diceValue);
    });
}

function movePlayer(player, steps) {
    let newPosition = player.position + steps;
    
    // Check if player wins by reaching or exceeding 100
    if (newPosition >= 100) {
        newPosition = 100;
        
        // Animate movement to 100
        animateMovement(player, player.position, newPosition, () => {
            player.position = 100;
            player.displayPosition = 100;
            player.currentScore = 100;
            
            // Update score - player reached 100
            ScoreManager.updateScore(player.id, 100);
            player.highScore = 100;
            
            // Update scoreboard immediately
            updateScoreboard();
            
            // Trigger confetti for winning
            EffectSystem.showConfetti();
            
            // Player wins!
            checkWinCondition(player);
        }, false);
        return;
    }
    
    // Animate movement
    animateMovement(player, player.position, newPosition, () => {
        player.position = newPosition;
        player.displayPosition = newPosition;
        player.currentScore = newPosition;
        
        // Update score and check for high score (only if not at a snake/ladder)
        const snake = gameState.snakes.find(s => s.start === newPosition);
        const ladder = gameState.ladders.find(l => l.start === newPosition);
        
        // Only update high score if not landing on snake/ladder (will update after snake/ladder move)
        if (!snake && !ladder) {
            ScoreManager.updateScore(player.id, newPosition);
            if (newPosition > player.highScore) {
                player.highScore = newPosition;
            }
            // Update scoreboard immediately after position change
            updateScoreboard();
        }
        
        if (snake) {
            // Show sad effect for landing on snake
            EffectSystem.showSadEffect(newPosition);
            // Play buzzer sound
            SoundEffects.playBuzzer();
            
            setTimeout(() => {
                // Direct animation for snake (no intermediate positions)
                animateMovement(player, newPosition, snake.end, () => {
                    player.position = snake.end;
                    player.displayPosition = snake.end;
                    player.currentScore = snake.end;
                    
                    // Update score after snake (no confetti for high scores during game)
                    ScoreManager.updateScore(player.id, snake.end);
                    if (snake.end > player.highScore) {
                        player.highScore = snake.end;
                    }
                    
                    // Update scoreboard immediately
                    updateScoreboard();
                    
                    checkWinCondition(player);
                }, true); // isDirect = true
            }, 500);
        } else if (ladder) {
            // Show happy effect for landing on ladder
            EffectSystem.showHappyEffect(newPosition);
            // Play firecracker sound
            SoundEffects.playFirecracker();
            
            setTimeout(() => {
                // Direct animation for ladder (no intermediate positions)
                animateMovement(player, newPosition, ladder.end, () => {
                    player.position = ladder.end;
                    player.displayPosition = ladder.end;
                    player.currentScore = ladder.end;
                    
                    // Update score after ladder (no confetti for high scores during game)
                    ScoreManager.updateScore(player.id, ladder.end);
                    if (ladder.end > player.highScore) {
                        player.highScore = ladder.end;
                    }
                    
                    // Update scoreboard immediately
                    updateScoreboard();
                    
                    checkWinCondition(player);
                }, true); // isDirect = true
            }, 500);
        } else {
            checkWinCondition(player);
        }
    }, false); // isDirect = false for normal movement
}

function animateMovement(player, from, to, callback, isDirect = false) {
    if (isDirect) {
        // Direct jump for snakes and ladders - no intermediate positions
        player.displayPosition = to;
        drawBoard();
        updateScoreboard();
        
        if (callback) {
            setTimeout(callback, 300);
        }
    } else {
        // Normal step-by-step movement
        const steps = Math.abs(to - from);
        const direction = to > from ? 1 : -1;
        let currentStep = 0;
        
        const interval = setInterval(() => {
            currentStep++;
            player.displayPosition = from + (direction * currentStep);
            drawBoard();
            updateScoreboard();
            
            if (currentStep >= steps) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 200);
    }
}

function checkWinCondition(player) {
    if (player.position === 100) {
        gameState.state = 'gameOver';
        
        // Save game history
        ScoreManager.saveGameHistory(player, gameState.players);
        
        showGameOver(player);
    } else {
        nextPlayer();
    }
}

function nextPlayer() {
    gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
    updateCurrentPlayer();
    document.getElementById('rollDiceButton').disabled = false;
    gameState.isAnimating = false;
}

function updateCurrentPlayer() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const playerDisplay = document.getElementById('currentPlayer');
    playerDisplay.innerHTML = `Current Player: <span style="color: ${currentPlayer.color}; font-weight: bold;">Player ${currentPlayer.id + 1}</span>`;
}

function updateScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    scoreboard.innerHTML = '';
    
    gameState.players.forEach((player, index) => {
        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'player-score';
        if (index === gameState.currentPlayerIndex) {
            scoreDiv.classList.add('active');
        }
        
        // Check if player is at their high score
        const atHighScore = player.position > 0 && player.position === player.highScore;
        if (atHighScore) {
            scoreDiv.classList.add('at-high-score');
        }
        
        scoreDiv.innerHTML = `
            <div class="player-icon" style="color: ${player.color}; font-weight: bold; font-size: 2em;">K</div>
            <div class="player-info">
                <div class="player-position">Player ${player.id + 1} - Position: ${player.position}</div>
                <div class="player-high-score" style="color: ${atHighScore ? '#790ECB' : '#888'}">
                    High Score: ${player.highScore}
                </div>
            </div>
        `;
        
        scoreboard.appendChild(scoreDiv);
    });
}

function showGameOver(winner) {
    document.getElementById('winner').innerHTML = 
        `<span style="color: ${winner.color}; font-weight: bold;">Player ${winner.id + 1}</span> Wins! 🎉`;
    
    setTimeout(() => {
        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('gameOverScreen').classList.remove('hidden');
    }, 1000);
}

function resetGame() {
    gameState.state = 'start';
    gameState.players = [];
    gameState.currentPlayerIndex = 0;
    gameState.isAnimating = false;
    
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    document.getElementById('diceResult').textContent = '';
}

// Initialize on load
init();
