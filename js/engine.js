/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

let Engine = (function(global) {
    let doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime,
        gameOver;

    const modal = document.querySelector('.modal_bg');
    const replay = document.querySelector('.modal_button');
    document.querySelector('.btn-success').addEventListener('click', () => {
        startGame();
    });
    document.querySelector('.modal_close').addEventListener('click', () => {
    toggleModal();
});

    replay.addEventListener('click', function() {
        toggleModal();
        player.reset();
        player.victory = false;
        win.requestAnimationFrame(main);
    });

    canvas.width = 808;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
        let now = Date.now(),
            dt = (now - lastTime) / 1000.0;
        update(dt);
        render();

        lastTime = now;

         if (player.victory === true) {
            win.cancelAnimationFrame(gameOver);
            toggleModal();
        } else {
              gameOver = win.requestAnimationFrame(main);
        }
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }
    
    function startGame() {
        player.reset();
        player.victory = false;
        win.requestAnimationFrame(main);
    }
    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
         allEnemies.forEach(function(enemy) {
             enemy.update(dt);
         });
         player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        let rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 4 of stone
                'images/stone-block.png',   // Row 2 of 4 of stone
                'images/stone-block.png',   // Row 3 of 4 of stone
                'images/stone-block.png',   // Row 3 of 4 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 9,
            row, col;

        
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }     let gemBlue = Resources.get('images/Gem Blue.png');
              let gemGreen = Resources.get('images/Gem Green.png');
              let gemOrange = Resources.get('images/Gem Orange.png');
              let rock1 = Resources.get('images/Rock.png');
              let rock2 = Resources.get('images/Rock.png');
              let rock3 = Resources.get('images/Rock.png');
              let rock4 = Resources.get('images/Rock.png');
              
              ctx.drawImage(gemBlue, 5, 85, 80, 130); 
              ctx.drawImage(gemGreen, 104 * 4, 166, 80, 130);
              ctx.drawImage(gemOrange, 104 * 6, 249, 80, 130);
              ctx.drawImage(rock1, 0 * 1, 310);
              ctx.drawImage(rock2, 101 * 5, 230);
              ctx.drawImage(rock3, 101 * 2, 150);
              ctx.drawImage(rock3, 101 * 6, 60);

        renderEntities();
    }
    

    function renderEntities() {
         allEnemies.forEach(function(enemy) {
             enemy.render();
         });

        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }
    let focusedElementBeforeModal;
    // Show or hide modal
    function toggleModal() {
        // Save current focus
    focusedElementBeforeModal = document.activeElement;
        // Listen for and trap the keyboard
    modal.addEventListener('keydown', trapTabKey);
    
    let focusableElementsString = 'a[href], area[href], input:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let focusableElements = modal.querySelectorAll(focusableElementsString);
    // Convert NodeList to Array
    focusableElements = Array.prototype.slice.call(focusableElements);

    let firstTabStop = focusableElements[0];
    let lastTabStop = focusableElements[focusableElements.length - 1];
    modal.classList.toggle('hide');
    // modal.style.display = 'block';
    
    // Focus first child
    firstTabStop.focus();

    function trapTabKey(e) {
        // Check for TAB key press
        if (e.keyCode === 9) {

            // SHIFT + TAB
            if (e.shiftKey) {
              if (document.activeElement === firstTabStop) {
                e.preventDefault();
                lastTabStop.focus();
              }

              //TAB
            } else {
                if (document.activeElement === lastTabStop) {
                    e.preventDefault();
                    firstTabStop.focus();
                }
            }
         }

         // ESCAPE
         if (e.keyCode === 27) {
            toggleModal();
         }
       }
    }
 
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Gem Blue.png',    
        'images/Gem Green.png',   
        'images/Gem Orange.png',  
        'images/Heart.png',                   
        'images/Rock.png',          
        'images/char-cat-girl.png',          
        'images/char-horn-girl.png',          
        'images/char-pink-girl.png',          
        'images/char-princess-girl.png',
        'images/Key.png',
        'images/Star.png',
        'images/Selector.png' 
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
