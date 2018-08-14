
// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 55;9
    this.speed = speed; 
    this.sprite = 'images/enemy-bug.png';  // The image/sprite for our enemies
    this.step = 101;
    this.boundary = this.step * 8;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

// If enemy is not passed boundary
    if(this.x < this.boundary) {
       // Move forward
       // Increment x by speed * dt 
       this.x += this.speed * dt;
    }

    else {

// Reset pos to start
       this.x = this.resetPos;
    }
};

// Draw the enemy on canvas
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Hero Constructor
class Hero {
    constructor() {
        this.sprite = 'images/char-boy.png';    // Properties and x, y pos
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 3;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
       }

// Sprite image
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
       }

// Update position
    update() {

// Check collision 
        for(let enemy of allEnemies) {
        if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
              this.reset();
            }
        };

// Check if won
        if(this.y === 55) {
              this.victory = true;
            }
        }

// Reset Hero
    reset() {
              this.y = this.startY;
              this.x = this.startX;
        }
  
// HandleInput method
    handleInput(input) {
        switch(input) {
            case 'left':
               if (this.x > 0) {
               this.x -= this.step;
           }
               break;
            case 'up':
               if (this.y > this.jump) {
               this.y -= this.jump;
           }
               break;
            case 'right':
               if (this.x < this.step * 7) {
               this.x += this.step;
           }
               break;
            case 'down':
               if (this.y < this.jump * 4) {
               this.y += this.jump;
           }
               break;
        }

    }
}

// New Hero object
const player = new Hero();

// Init allenemies array
const bug1 = new Enemy(-101, 0, 500);
const bug2 = new Enemy(-101, 83, 150);
const bug3 = new Enemy((-101*5), 83, 350);
const bug4 = new Enemy(-101*5, 166, 270);
const bug5 = new Enemy(-101*2, 249, 300);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3,bug4,bug5,);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
