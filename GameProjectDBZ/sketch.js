// initialise some game world references
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

// scenery
var bg_trees;            
var collectables;
var clouds;
var mountainSmall;
var mountainBig;
var canyons;

// character movements
var isLeft;             
var isRight;
var isFalling;
var isPlummeting;
var isDead;

//game peripherals and level complete detection
var game_score;
var flagpole;
var lives = 3;

// background gradient colours
var c1; 
var c2;

// fire animation
var flames = [];
var sideFlames = [];

// arrays for mountain constructor functions
var bigMountains = [];
var smallMountains = [];

//game sound effects
var jumpSound;
var canyonSound;
var prettyFunSound;
var lastLifeSound;
var backgroundSound;
var superSaiyanSound;

var transformed;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.05);
    
    canyonSound = loadSound('assets/canyonFall.wav');
    canyonSound.setVolume(0.1);
    
    prettyFunSound = loadSound('assets/prettyFun.wav');
    prettyFunSound.setVolume(0.2);
    
    lastLifeSound = loadSound('assets/lastLife.wav');
    lastLifeSound.setVolume(0.3);
    
    backgroundSound = loadSound('assets/background.mp3');
    backgroundSound.setVolume(0.1);
    
    superSaiyanSound = loadSound('assets/superSaiyanAura.wav');
    superSaiyanSound.setVolume(0.1);
}


function setup()
    {
        startGame();
        backgroundMusic();
    }

function draw()
    {
        // draw the sky gradient
        setGradient(0, 0, width, height, c1, c2);
        
        // draw the ground
        noStroke();
        fill(25, 130, 102);
        rect(0, floorPos_y, width, height/4); // draw the ground

        // create a scrolling background
        push(); 
        translate(scrollPos,0);

        // run all game drawing functions and game mechanics
        drawMountains();
        moveClouds();
        drawTrees(); // background trees to fill out scenery   
        advancedTrees(-550,280); 
        advancedTrees(0,300);
        advancedTrees(340,300);
        advancedTrees(590,320);// dynamic trees with x & y pos parameters
        advancedTrees(1200,280);
        advancedTrees(1700,280);
        advancedTrees(2100,280);
        drawAndCheckCanyon(); // canyon with collision detection 
        drawAndCollectCollectible(); // also changes player score
        namekShip();// draw spaceship at flagpole location
        
        pop(); // end of translated "fixed" scenery objects 

        drawDynamicChar(); // draws transforming Goku 

        // display player lives and score to screen and check number of lives
        drawPlayerLives();
        lifeCounter();

        // prevents bug of instant game restart if spacebar still held at flagpole
        keyReset();
        
        // checks level complete, locks player x_position, awaits restart command
        levelComplete();
        
        // game mechanics
        mechanics();

        // checks if player died, if lives > 0, resets character
        checkPlayerDie();
      
        // plays sound for falling down canyon
        canyonFall();
        
        // stops the player from moving infinately to the right past flagpole
        stopPlayerRight();
        
        // create burning embers blowing in the wind with y and alpha parameters
        sideFire(random(2, 20), 255);
        
        // vegeta warning sound on game over
        lastLife();
    }



// ---------------------
// Key control functions
// ---------------------

//Function to control the animation of the character when keys are pressed.
function keyPressed()
    {
        if(keyCode == 37) // left arrow
            {
                isLeft = true;
                getAudioContext().resume();
            }

        else if(keyCode == 39) // right arrow
            {
                isRight = true;
                getAudioContext().resume();
            }

        // 32 = spacebar
        if(keyCode == 32 && gameChar_y == 432 &&
           flagpole.isReached == false && transformed == false)
            {
                gameChar_y -= 160;
                getAudioContext().resume();
                jumpSound.play();
            }
        
        if(keyCode == 32 && gameChar_y == 432 &&
           flagpole.isReached == false && transformed == true)
            {
                gameChar_y -= 200;
                getAudioContext().resume();
                jumpSound.play();
            }
        
        // 16 = press shift to transform into Super Saiyan & play sound effect
        if(keyCode == 16)
            {
                transformed = true;
                getAudioContext().resume();
                superSaiyanSound.playMode('restart');
                superSaiyanSound.play();
            }
        
        
    
    }

//Function to control the animation of the character when keys are released.
function keyReleased()
    {

        if(keyCode == 37)
            {
                isLeft = false;
            }

        else if(keyCode == 39)
            {
                 isRight = false;
            }
        
        if(transformed == true && keyCode == 16)
            {
                transformed = false;
            }
    }

// prevents immediate game restart if keycode == spacebar on reaching flagpole
function keyReset()
    {
        if(!flagpole.isReached)
            {
                keyCode = null;    
            }
    }

// stops infinite movement to the right, stops character at spaceship(flagpole) 
function stopPlayerRight()
{
    if(gameChar_world_x > 2800)
        {
            isRight = false;
        }
}



// ------------------------------
// Game character render function
// ------------------------------


// Function to draw regular Goku.
function drawGameChar()
    {
        if(isLeft && isFalling)
            {

                // jumping-left

                // hair
                push();
                translate(gameChar_x+5, gameChar_y-58);
                
                fill(0);
                superSaiyan(2, 2, 12, 20, 10);
                pop();

                //boots
                noStroke();
                fill(25,0,117);
                rect(gameChar_x-15,gameChar_y-25, 9,6);
                rect(gameChar_x+3,gameChar_y-25, 9,8);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-13,gameChar_y-33, 9,9);
                rect(gameChar_x+2,gameChar_y-33, 9,9);
                fill(25,0,117);
                rect(gameChar_x-10,gameChar_y-36, 18,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-6,gameChar_y-48, 18,11); // torso

                // right arm
                ellipse(gameChar_x-7,gameChar_y-45, 10,10);
                ellipse(gameChar_x-10,gameChar_y-43, 7,7);

                // left arm
                ellipse(gameChar_x+13,gameChar_y-45, 10,10);
                ellipse(gameChar_x+17,gameChar_y-43, 7,7);

                fill(245, 213, 211);
                ellipse(gameChar_x+3,gameChar_y-52, 25,17);
                
                fill(0);
                noStroke();
                triangle(gameChar_x-5,gameChar_y-62, 
                         gameChar_x+8,gameChar_y-63,
                         gameChar_x+5,gameChar_y-52);
                
                triangle(gameChar_x+5,gameChar_y-60, 
                         gameChar_x+25,gameChar_y-100,
                         gameChar_x+5,gameChar_y-60);
            }

        else if(isRight && isFalling)
            {
                // jumping-right

                // hair
                push();
                translate(gameChar_x+3, gameChar_y-58);
                fill(0);
                superSaiyan(2, 2, 12, 20, 10);

                pop();


                //boots
                fill(25,0,117);
                rect(gameChar_x-5,gameChar_y-25, 9,6);
                rect(gameChar_x+9,gameChar_y-25, 9,8);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-5,gameChar_y-33, 9,9);
                rect(gameChar_x+8,gameChar_y-33, 9,9);
                fill(25,0,117);
                rect(gameChar_x-5,gameChar_y-36, 18,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-6,gameChar_y-48, 18,11); // torso

                // right arm
                ellipse(gameChar_x-7,gameChar_y-45, 10,10);
                ellipse(gameChar_x-10,gameChar_y-43, 7,7);

                // left arm
                ellipse(gameChar_x+13,gameChar_y-45, 10,10);
                ellipse(gameChar_x+17,gameChar_y-43, 7,7);

                fill(245, 213, 211);
                ellipse(gameChar_x+3,gameChar_y-52, 20,20);
                
                fill(0);
                noStroke();
                triangle(gameChar_x-5,gameChar_y-62, 
                         gameChar_x+8,gameChar_y-63,
                         gameChar_x+5,gameChar_y-52);
                
                triangle(gameChar_x+5,gameChar_y-50, 
                         gameChar_x+25,gameChar_y-70,
                         gameChar_x+5,gameChar_y-50);
            }

        else if(isLeft)
            {
                // walking left

                // hair
                push();
                translate(gameChar_x-16, gameChar_y-55);
                fill(0);
                superSaiyan(2, 2, 12, 20, 10);

                pop();


                //boots
                fill(25,0,117);
                rect(gameChar_x-7,gameChar_y-15, 9,12);
                rect(gameChar_x+7,gameChar_y-15, 9,12);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-8,gameChar_y-20, 9,12);
                rect(gameChar_x+5,gameChar_y-20, 9,12);
                rect(gameChar_x-6,gameChar_y-30, 12,17);
                fill(25,0,117);
                rect(gameChar_x-7,gameChar_y-30, 12,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-10,gameChar_y-45, 12,15);

                // left arm
                ellipse(gameChar_x+2,gameChar_y-45, 10,10);
                ellipse(gameChar_x+5,gameChar_y-43, 7,7);
                rect(gameChar_x+3,gameChar_y-45, 5,9);

                fill(245, 213, 211);
                ellipse(gameChar_x-12,gameChar_y-45, 20,20);
                
                fill(0);
                noStroke();
                triangle(gameChar_x-5,gameChar_y-60, 
                         gameChar_x-30,gameChar_y-60,
                         gameChar_x-10,gameChar_y-43);
            }

        else if(isRight)
            {
                // walking right

                // hair
                push();
                translate(gameChar_x+25, gameChar_y-55);
                fill(0);
                superSaiyan(2, 2, 12, 20, 10);

                pop();


                //boots
                fill(25,0,117);
                rect(gameChar_x+7,gameChar_y-15, 9,12);
                rect(gameChar_x-7,gameChar_y-15, 9,12);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x+8,gameChar_y-20, 9,12);
                rect(gameChar_x-2,gameChar_y-20, 9,12);
                rect(gameChar_x+6,gameChar_y-30, 12,17);
                fill(25,0,117);
                rect(gameChar_x+6,gameChar_y-30, 12,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x+10,gameChar_y-45, 12,15);
                rect(gameChar_x+7,gameChar_y-20, 5,7); // cut knee

                // right arm
                ellipse(gameChar_x+9,gameChar_y-43, 10,10);
                ellipse(gameChar_x+7,gameChar_y-40, 7,7);
                rect(gameChar_x+3,gameChar_y-45, 5,12);

                fill(245, 213, 211);
                ellipse(gameChar_x+25,gameChar_y-45, 20,20);

                strokeWeight(2);
                stroke(255,112,103);
                line(gameChar_x+10,gameChar_y-17, gameChar_x+7,gameChar_y-20,);
                
                fill(0);
                noStroke();
                fill(0);
                noStroke();
                triangle(gameChar_x+15,gameChar_y-60, 
                         gameChar_x+30,gameChar_y-60,
                         gameChar_x+30,gameChar_y-43);
                
                noStroke();
            }

        else if(isPlummeting)
            {
                // jumping facing forwards

                // hair
                push();
                translate(gameChar_x+3, gameChar_y-63);
                fill(0);
                superSaiyan(2, 2, 12, 20, 10);

                pop();


                //boots
                fill(25,0,117);
                rect(gameChar_x-7,gameChar_y-25, 9,6);
                rect(gameChar_x+7,gameChar_y-25, 9,8);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-8,gameChar_y-33, 9,9);
                rect(gameChar_x+5,gameChar_y-33, 9,9);
                fill(25,0,117);
                rect(gameChar_x-6,gameChar_y-36, 18,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-6,gameChar_y-48, 18,11); // torso

                // right arm
                ellipse(gameChar_x-7,gameChar_y-45, 10,10);
                ellipse(gameChar_x-10,gameChar_y-43, 7,7);

                // left arm
                ellipse(gameChar_x+13,gameChar_y-45, 10,10);
                ellipse(gameChar_x+17,gameChar_y-43, 7,7);

                fill(245, 213, 211);
                ellipse(gameChar_x+3,gameChar_y-52, 25,17);
                
                fill(0);
                noStroke();
                triangle(gameChar_x-5,gameChar_y-69, 
                         gameChar_x+8,gameChar_y-69,
                         gameChar_x+5,gameChar_y-52);
                
                triangle(gameChar_x+5,gameChar_y-50, 
                         gameChar_x+25,gameChar_y-70,
                         gameChar_x+5,gameChar_y-50);
            }

        else if(isFalling)
            {
                // jumping facing forwards 

                // hair
                push();
                translate(gameChar_x+3, gameChar_y-60);
                fill(0);
                superSaiyan(2, 2, 12, 20, 10);

                pop();


                //boots
                fill(25,0,117);
                rect(gameChar_x-7,gameChar_y-25, 9,6);
                rect(gameChar_x+7,gameChar_y-25, 9,8);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-8,gameChar_y-33, 9,9);
                rect(gameChar_x+5,gameChar_y-33, 9,9);
                fill(25,0,117);
                rect(gameChar_x-6,gameChar_y-36, 18,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-6,gameChar_y-48, 18,11); // torso

                // right arm
                ellipse(gameChar_x-7,gameChar_y-45, 10,10);
                ellipse(gameChar_x-10,gameChar_y-43, 7,7);

                // left arm
                ellipse(gameChar_x+13,gameChar_y-45, 10,10);
                ellipse(gameChar_x+17,gameChar_y-43, 7,7);


                fill(245, 213, 211);
                ellipse(gameChar_x+3,gameChar_y-52, 20,20);
                
                fill(0);
                noStroke();
                triangle(gameChar_x-5,gameChar_y-62, 
                         gameChar_x+8,gameChar_y-63,
                         gameChar_x+5,gameChar_y-52);
                
                triangle(gameChar_x+5,gameChar_y-50, 
                         gameChar_x+25,gameChar_y-70,
                         gameChar_x+5,gameChar_y-50);
            }

        else
            {
                // standing front facing

                // hair
                push();
                translate(gameChar_x+3, gameChar_y-72);
                fill(0);
                superSaiyan(2, 2, 12, 20, 10);

                pop();

                //boots
                fill(25,0,117);
                rect(gameChar_x-9,gameChar_y-12, 9,12);
                rect(gameChar_x+7,gameChar_y-12, 9,12);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-8,gameChar_y-27, 9,15);
                rect(gameChar_x+5,gameChar_y-27, 9,15);
                rect(gameChar_x-6,gameChar_y-42, 18,22);
                fill(25,0,117);
                rect(gameChar_x-6,gameChar_y-42, 18,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-6,gameChar_y-57, 18,15); // torso
                rect(gameChar_x-7,gameChar_y-24, 5,7); // cut knee

              // left arm
                rect(gameChar_x-12,gameChar_y-54, 4,13);
                ellipse(gameChar_x-8,gameChar_y-54, 7,7);
                ellipse(gameChar_x-9,gameChar_y-48, 8,8);
                ellipse(gameChar_x-8,gameChar_y-40, 7,7);

                // right arm
                rect(gameChar_x+13,gameChar_y-54, 4,13);
                ellipse(gameChar_x+14,gameChar_y-54, 7,7);
                ellipse(gameChar_x+14,gameChar_y-48, 8,8);
                ellipse(gameChar_x+14,gameChar_y-40, 7,7);

                // head
                fill(245, 213, 211);
                ellipse(gameChar_x+3,gameChar_y-64, 20,20);

                // detail
                strokeWeight(1);
                stroke(255,172,203);
                line(gameChar_x+3,gameChar_y-43, gameChar_x+3,gameChar_y-50,);
                line(gameChar_x-3,gameChar_y-50, gameChar_x-3,gameChar_y-51,);
                line(gameChar_x+9,gameChar_y-50, gameChar_x+9,gameChar_y-51,);

                strokeWeight(2);
                stroke(255,112,103);
                line(gameChar_x-5,gameChar_y-20, gameChar_x-5,gameChar_y-22);
                
                fill(0);
                noStroke();
                triangle(gameChar_x-5,gameChar_y-70, 
                         gameChar_x+5,gameChar_y-80,
                         gameChar_x+5,gameChar_y-70);
                
                triangle(gameChar_x+5,gameChar_y-60, 
                         gameChar_x+25,gameChar_y-90,
                         gameChar_x+5,gameChar_y-80);

                noStroke();
            }

        
    }

// Function to draw Super Saiyan Goku.
function drawSuperGameChar()
    {
        if(isLeft && isFalling)
            {

                // jumping-left

                //supersaiyan hair
                push();
                translate(gameChar_x+5, gameChar_y-58);
                rotate(frameCount / -1.3);
                fill(255, 217, 0);
                superSaiyan(2, 2, 12, 20, 10);
                pop();

                //boots
                noStroke();
                fill(25,0,117);
                rect(gameChar_x-15,gameChar_y-25, 9,6);
                rect(gameChar_x+3,gameChar_y-25, 9,8);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-13,gameChar_y-33, 9,9);
                rect(gameChar_x+2,gameChar_y-33, 9,9);
                fill(25,0,117);
                rect(gameChar_x-10,gameChar_y-36, 18,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-6,gameChar_y-48, 18,11); // torso

                // right arm
                ellipse(gameChar_x-7,gameChar_y-45, 10,10);
                ellipse(gameChar_x-10,gameChar_y-43, 7,7);

                // left arm
                ellipse(gameChar_x+13,gameChar_y-45, 10,10);
                ellipse(gameChar_x+17,gameChar_y-43, 7,7);

                fill(245, 213, 211);
                ellipse(gameChar_x+3,gameChar_y-52, 25,17);
            }

        else if(isRight && isFalling)
            {
                // jumping-right

                //supersaiyan hair
                push();
                translate(gameChar_x+2, gameChar_y-58);
                rotate(frameCount / -1.3);
                fill(255, 217, 0);
                superSaiyan(2, 2, 12, 20, 10);
                pop();

                //boots
                fill(25,0,117);
                rect(gameChar_x-5,gameChar_y-25, 9,6);
                rect(gameChar_x+9,gameChar_y-25, 9,8);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-5,gameChar_y-33, 9,9);
                rect(gameChar_x+8,gameChar_y-33, 9,9);
                fill(25,0,117);
                rect(gameChar_x-5,gameChar_y-36, 18,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-6,gameChar_y-48, 18,11); // torso

                // right arm
                ellipse(gameChar_x-7,gameChar_y-45, 10,10);
                ellipse(gameChar_x-10,gameChar_y-43, 7,7);

                // left arm
                ellipse(gameChar_x+13,gameChar_y-45, 10,10);
                ellipse(gameChar_x+17,gameChar_y-43, 7,7);

                fill(245, 213, 211);
                ellipse(gameChar_x+3,gameChar_y-52, 20,20);
            }

        else if(isLeft)
            {
                // walking left

                //supersaiyan hair
                push();
                translate(gameChar_x-15, gameChar_y-52);
                rotate(frameCount / -1.3);
                fill(255, 217, 0);
                superSaiyan(2, 2, 12, 20, 10);
                pop();

                //boots
                fill(25,0,117);
                rect(gameChar_x-7,gameChar_y-15, 9,12);
                rect(gameChar_x+7,gameChar_y-15, 9,12);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-8,gameChar_y-20, 9,12);
                rect(gameChar_x+5,gameChar_y-20, 9,12);
                rect(gameChar_x-6,gameChar_y-30, 12,17);
                fill(25,0,117);
                rect(gameChar_x-7,gameChar_y-30, 12,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-10,gameChar_y-45, 12,15);

                // left arm
                ellipse(gameChar_x+2,gameChar_y-45, 10,10);
                ellipse(gameChar_x+5,gameChar_y-43, 7,7);
                rect(gameChar_x+3,gameChar_y-45, 5,9);

                fill(245, 213, 211);
                ellipse(gameChar_x-12,gameChar_y-45, 20,20);
            }

        else if(isRight)
            {
                // walking right

                //supersaiyan hair
                push();
                translate(gameChar_x+25, gameChar_y-52);
                rotate(frameCount / -1.3);
                fill(255, 217, 0);
                superSaiyan(2, 2, 12, 20, 10);
                pop();

                //boots
                fill(25,0,117);
                rect(gameChar_x+7,gameChar_y-15, 9,12);
                rect(gameChar_x-7,gameChar_y-15, 9,12);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x+8,gameChar_y-20, 9,12);
                rect(gameChar_x-2,gameChar_y-20, 9,12);
                rect(gameChar_x+6,gameChar_y-30, 12,17);
                fill(25,0,117);
                rect(gameChar_x+6,gameChar_y-30, 12,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x+10,gameChar_y-45, 12,15);
                rect(gameChar_x+7,gameChar_y-20, 5,7); // cut knee

                // right arm
                ellipse(gameChar_x+9,gameChar_y-43, 10,10);
                ellipse(gameChar_x+7,gameChar_y-40, 7,7);
                rect(gameChar_x+3,gameChar_y-45, 5,12);

                fill(245, 213, 211);
                ellipse(gameChar_x+25,gameChar_y-45, 20,20);

                strokeWeight(2);
                stroke(255,112,103);
                line(gameChar_x+10,gameChar_y-17, gameChar_x+7,gameChar_y-20,);
                noStroke();
            }

        else if(isPlummeting)
            {
                // jumping facing forwards

                //supersaiyan hair
                push();
                translate(gameChar_x+3, gameChar_y-62);
                fill(0);
                superSaiyan(2, 2, 12, 20, 10);
                pop();

                //boots
                fill(25,0,117);
                rect(gameChar_x-7,gameChar_y-25, 9,6);
                rect(gameChar_x+7,gameChar_y-25, 9,8);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-8,gameChar_y-33, 9,9);
                rect(gameChar_x+5,gameChar_y-33, 9,9);
                fill(25,0,117);
                rect(gameChar_x-6,gameChar_y-36, 18,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-6,gameChar_y-48, 18,11); // torso

                // right arm
                ellipse(gameChar_x-7,gameChar_y-45, 10,10);
                ellipse(gameChar_x-10,gameChar_y-43, 7,7);

                // left arm
                ellipse(gameChar_x+13,gameChar_y-45, 10,10);
                ellipse(gameChar_x+17,gameChar_y-43, 7,7);

                fill(245, 213, 211);
                ellipse(gameChar_x+3,gameChar_y-52, 25,17);
            }

        else if(isFalling)
            {
                // jumping facing forwards 

                //supersaiyan hair
                push();
                translate(gameChar_x+3, gameChar_y-60);
                rotate(frameCount / -1.3);
                fill(255, 217, 0);
                superSaiyan(2, 2, 12, 20, 10);
                pop();

                //boots
                fill(25,0,117);
                rect(gameChar_x-7,gameChar_y-25, 9,6);
                rect(gameChar_x+7,gameChar_y-25, 9,8);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-8,gameChar_y-33, 9,9);
                rect(gameChar_x+5,gameChar_y-33, 9,9);
                fill(25,0,117);
                rect(gameChar_x-6,gameChar_y-36, 18,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-6,gameChar_y-48, 18,11); // torso

                // right arm
                ellipse(gameChar_x-7,gameChar_y-45, 10,10);
                ellipse(gameChar_x-10,gameChar_y-43, 7,7);

                // left arm
                ellipse(gameChar_x+13,gameChar_y-45, 10,10);
                ellipse(gameChar_x+17,gameChar_y-43, 7,7);


                fill(245, 213, 211);
                ellipse(gameChar_x+3,gameChar_y-52, 20,20);
            }

        else
            {
                // standing front facing

                //supersaiyan hair
                push();
                translate(gameChar_x+3, gameChar_y-72);
                rotate(frameCount / -1.3);
                fill(255, 217, 0);
                superSaiyan(2, 2, 12, 20, 10);

                pop();

                //boots
                fill(25,0,117);
                rect(gameChar_x-9,gameChar_y-12, 9,12);
                rect(gameChar_x+7,gameChar_y-12, 9,12);

                //legs
                fill(235, 109, 0);
                rect(gameChar_x-8,gameChar_y-27, 9,15);
                rect(gameChar_x+5,gameChar_y-27, 9,15);
                rect(gameChar_x-6,gameChar_y-42, 18,22);
                fill(25,0,117);
                rect(gameChar_x-6,gameChar_y-42, 18,3);

                //top half body
                fill(245, 213, 211);
                rect(gameChar_x-6,gameChar_y-57, 18,15); // torso
                rect(gameChar_x-7,gameChar_y-24, 5,7); // cut knee

              // left arm
                rect(gameChar_x-15,gameChar_y-54, 6,13);
                ellipse(gameChar_x-10,gameChar_y-54, 9,9);
                ellipse(gameChar_x-11,gameChar_y-48, 11,11);
                ellipse(gameChar_x-10,gameChar_y-40, 8,8);

                // right arm
                rect(gameChar_x+15,gameChar_y-54, 6,13);
                ellipse(gameChar_x+16,gameChar_y-54, 9,9);
                ellipse(gameChar_x+17,gameChar_y-48, 11,11);
                ellipse(gameChar_x+16,gameChar_y-40, 8,8);

                // head
                fill(245, 213, 211);
                ellipse(gameChar_x+3,gameChar_y-64, 20,20);

                // detail
                strokeWeight(1);
                stroke(255,172,203);
                line(gameChar_x+3,gameChar_y-43, gameChar_x+3,gameChar_y-50,);
                line(gameChar_x-3,gameChar_y-50, gameChar_x-3,gameChar_y-51,);
                line(gameChar_x+9,gameChar_y-50, gameChar_x+9,gameChar_y-51,);

                strokeWeight(2);
                stroke(255,112,103);
                line(gameChar_x-5,gameChar_y-20, gameChar_x-5,gameChar_y-22,);
                
                fill(255, 217, 0);
                noStroke();
                triangle(gameChar_x-5,gameChar_y-70, 
                         gameChar_x+5,gameChar_y-80,
                         gameChar_x+5,gameChar_y-70);
                
                triangle(gameChar_x+5,gameChar_y-60,
                         gameChar_x+15,gameChar_y-88,
                         gameChar_x,gameChar_y-80);

                noStroke();
            }
 
    }


// create goku's dynamic supuersaiyan hair
function superSaiyan(x, y, rad1, rad2, spikes)
    {
        var angle = TWO_PI / spikes;
        var halfAngle = angle / 5;
        beginShape();
        for (var i = 0; i < TWO_PI; i += angle)
            {
                var sx = x + cos(i) * rad2;
                var sy = y + sin(i) * rad2;
                vertex(sx, sy);
                sx = x + cos(i + halfAngle) * rad1;
                sy = y + sin(i + halfAngle) * rad1;
                vertex(sx, sy);
            }
      endShape(CLOSE);
    }
    



// Background gradient for advanced sky colours
function setGradient(x, y, w, h, c1, c2)
    {
        for (var i = y; i <= y + h; i++)
            {
              var inter = map(i, y, y + h, 0, 1);
              var c = lerpColor(c1, c2, inter);
              stroke(c);
              line(x, i, x + w, i);
            }
    } 
    


// Function to draw cloud objects.
function moveClouds()
    {
    
        for(var i = 0; i < clouds.length; i++)
            {
                //map clouds to player movement
                if(clouds[i].y_pos > 300)
                    {
                        var moveClouds = map(gameChar_world_x, 0, 3000, 0, 500);
                    }
                else if(clouds[i].y_pos > 150)
                    {
                        var moveClouds = map(gameChar_world_x, 0, 3000, 0, 250);
                    }
                else
                    {
                        var moveClouds = map(gameChar_world_x, 0, 3000, 0, 125);
                    }
                
                fill(178, 209, 163, 250);

                ellipse(
                    clouds[i].x_pos+65 + moveClouds,
                    clouds[i].y_pos-27,
                    clouds[i].size+40,
                    clouds[i].size+40);

                ellipse(
                    clouds[i].x_pos+25 + moveClouds,
                    clouds[i].y_pos-15,
                    clouds[i].size+30,
                    clouds[i].size+30);

                ellipse(
                    clouds[i].x_pos-5 + moveClouds,
                    clouds[i].y_pos,
                    clouds[i].size+30,
                    clouds[i].size);

                ellipse(
                    clouds[i].x_pos+85 + moveClouds,
                    clouds[i].y_pos,
                    clouds[i].size+30,
                    clouds[i].size);
                
                ellipse(
                    clouds[i].x_pos+45 + moveClouds,
                    clouds[i].y_pos,
                    clouds[i].size+30,
                    clouds[i].size);
                
            }
    }

// big mountain constructor function
function BigMountain(x, y)
    {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.drawBigMountain = function(){

            stroke(25, 200, 102);
            strokeWeight(4);
            line(this.x+780, this.y-100,
                 this.x+770, this.y-110);

            line(this.x+690, this.y-80,
                 this.x+550, this.y-20);

            fill(201,163,64);
            strokeWeight(0.5);
            stroke(0,1);
            beginShape();

            vertex(
                this.x+400,
                this.y+32);
            vertex(
                this.x+800,
                this.y+32);
            vertex(
                this.x+780,
                this.y-100);
            vertex(
                this.x+770,
                this.y-110);
            vertex(
                this.x+760,
                this.y-350);
            vertex(
                this.x+700,
                this.y-350);
            vertex(
                this.x+690,
                this.y-80);
            vertex(
                this.x+550,
                this.y-20);
            vertex(
                this.x+420,
                this.y-18);
            vertex(
                this.x+410,
                this.y-20);

            endShape(CLOSE);

            stroke(25, 200, 102);
            strokeWeight(3);
            line(this.x+760, this.y-350,
                 this.x+700, this.y-350);

            line(this.x+700, this.y-25,
                 this.x+420, this.y-20);

            noStroke();
        }
    }

// small mountain constructor function
function SmallMountain(x, y)
    {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.drawSmallMountain = function(){
            
            var perspective = map(gameChar_world_x, 0, 3000, 0, 50);
                
            fill(201,150,64);
            stroke(201,125,64);
            strokeWeight(1);
            beginShape();

            vertex(
                this.x+400 * 0.5 + perspective,
                this.y+32);
            vertex(
                this.x+800* 0.5 + perspective,
                this.y+32);
            vertex(
                this.x+780* 0.5 + perspective,
                this.y-120);
            vertex(
                this.x+770* 0.5 + perspective,
                this.y-130);
            vertex(
                this.x+760* 0.5 + perspective,
                this.y-310);
            vertex(
                this.x+700* 0.5 + perspective,
                this.y-320);
            vertex(
                this.x+690* 0.5 + perspective,
                this.y-80);
            vertex(
                this.x+600* 0.5 + perspective,
                this.y-20);


            endShape(CLOSE);

            stroke(25, 200, 102);
            strokeWeight(4);
            
            line(this.x+764* 0.5 + perspective,
                 this.y-310,
                 this.x+704* 0.5 + perspective,
                 this.y-320);

            line(this.x+694* 0.5 + perspective,
                 this.y-80,
                 this.x+604* 0.5 + perspective,
                 this.y-20);

            line(this.x+604* 0.5 + perspective,
                 this.y-20,
                 this.x+404 * 0.5 + perspective,
                 this.y+30);

            noStroke();
        }
    }

function drawMountains()
{
    for(var i = 0; i < bigMountains.length; i++)
            {
                bigMountains[i].drawBigMountain();
                smallMountains[i].drawSmallMountain();
            }
}


// Function to draw dynamic trees
function advancedTrees(leaves_x, leaves_y)
            {
                strokeWeight(0.2);
                fill(154, 127, 94);
                rect(leaves_x,floorPos_y,7,-100);
                
                var points = [];
                var size = 56;

                for(var i = 0; i < 56; i++)
                        {
                            var v = createVector(1,random(0.4,0.65));
                            var r = (PI * 2 * i)/56; 
                            v.rotate(r);
                            points.push(v);
                        }
                fill(25, 170, 122);
                beginShape();
                
                for(var j = 0; j < points.length; j++)
                    {
                        var v = p5.Vector.mult(points[j], size);

                        curveVertex(v.x + leaves_x,v.y + leaves_y);
                    }
                
                endShape();

            }

//background trees
function drawTrees()
    {
        for (var i = 0; i < bg_trees.length; i++)
            {
                fill(163, 153, 88);
                strokeWeight(0.2);
                stroke(0);
                
                rect(bg_trees[i].x_pos,
                     floorPos_y,
                     bg_trees[i].width,
                     bg_trees[i].height);

                fill(26,155,150);
                stroke(0);
                strokeWeight(0.3);
                
                ellipse(bg_trees[i].x_pos + 1,
                        bg_trees[i].height + bg_trees[i].y_pos,
                        bg_trees[i].size,
                        bg_trees[i].size);
            }
        
    }

// namek spacechip at flagpole location
function namekShip()
    {
        stroke(0);
        strokeWeight(0.5);
        fill(245,245,245);
        
        ellipse(800 + 1800, 290, 200, 220); // main body
        
        triangle(680 + 1800,450, 720 + 1800,347, 735 + 1800,360);// landing spikes
        triangle(920 + 1800,450, 880 + 1800,347, 865 + 1800,360);
        
        triangle(755 + 1800,240, 720 + 1800,160, 770 + 1800,225); //eyebrow spikes
        triangle(845 + 1800,240, 880 + 1800,160, 830 + 1800,225);
        
        triangle(670 + 1800,290, 740 + 1800,280, 740 + 1800,300); //whiskers
        triangle(930 + 1800,290, 860 + 1800,280, 860 + 1800,300);
        
        strokeWeight(3);
        fill(125,0,255);
        
        ellipse(800 + 1800, 290, 80, 80); //window
        noStroke();
        fill(125,95,255);
        ellipse(780 + 1800, 280, 20, 20);
    }


function sideFire(radius, alpha)
    {
        // loop through all the flame objects backwards to draw older ones on top
      for(var i = sideFlames.length -1; i >= 0; i--)
          {
              sideFlames[i].move(-30, -1);
              sideFlames[i].show();
              sideFlames[i].shrink(0.1);

              if(sideFlames[i].radius <= 0 )
                  {
                      //remove the burnt objects
                      sideFlames.splice(i, 1);
                  }
          }

        var x = random(3000,-1500);
        var y = random(0, floorPos_y -10);
        var alpha = alpha;
        var c = new fire(x, y, radius, alpha);
        sideFlames.push(c);
        
    }

//draw canyon fire with radiuis relative to the canyon where it is used
function canyonFire(x_pos, y_pos, radius, alpha)
    {
        // loop through all the flame objects backwards to draw older ones on top
      for(var i = flames.length -1; i >= 0; i--)
          {
              flames[i].move(random(-3, 3), random(1, 3));
              flames[i].show();
              flames[i].shrink(0.9);

              if(flames[i].radius <= 0 )
                  {
                      //remove the burnt objects
                      flames.splice(i, 1);
                  }
          }

        var x = x_pos;
        var y = y_pos +50;
        var alpha = alpha;
        var b = new fire(x, y, radius, alpha);
        flames.push(b);
        
    }

// create dynamic fire
// a class uses different syntax from constructor function, main principles remain the same
class fire
    {
        constructor(tempX, tempY, tempR, alpha)
            {
                this.x = tempX;
                this.y = tempY;
                this.radius = tempR;
                this.alpha = alpha;

                // generate random colours
                this.color = color(255);
                let r = random(3);
                
                // set the colours
                if(r < 1)
                    {
                      this.color = color(255,100,20, alpha); 
                    }
                
                else if(r >= 1 && r < 2 )
                    {
                      this.color = color(255, 200, 10, alpha); 
                    }
                
                else if(r >= 2 )
                        {
                          this.color = color(255, 80, 5, alpha); 
                        }
            }

          show() {
            noStroke();
            fill(this.color);
            ellipse(this.x, this.y, this.radius);
          }

          move(dir_x, dir_y) {
            this.x += dir_x;
            this.y -= dir_y;
          }

          shrink(scale){    
           // reduce size as fire rises
           this.radius -= scale;
          }

    }


// ---------------------------------
// Canyon render and check functions
// ---------------------------------


// Function to draw canyon objects.

function drawCanyon(t_canyon)
    {
        stroke(255, 77, 0);
        strokeWeight(10);
        line(t_canyon.x_pos,437,t_canyon.x_pos,582);
        line(t_canyon.x_pos + t_canyon.width,437,
             t_canyon.x_pos + t_canyon.width,582);
        
        noStroke();
        fill(255,0,0, 150);
        rect(t_canyon.x_pos,432, t_canyon.width,148,t_canyon.radius);
        canyonFire(t_canyon.x_pos + t_canyon.width /2, 552, t_canyon.width, 50);
    }


// Function to check character is over a canyon.
function checkCanyon(t_canyon)
    {
        if(gameChar_world_x > t_canyon.x_pos &&
           gameChar_world_x < t_canyon.x_pos + t_canyon.width &&
           gameChar_y >= 432)
            {
                // diable player lateral movement
                isLeft = false;
                isRight = false;
                isPlummeting = true;
            }
        
        if(isPlummeting == true)
                    {
                        gameChar_y += 0.5; // rate of fall down the canyon
                    }
        
    }

// loop through canyon array and draw all canyon objects while checking player position
function drawAndCheckCanyon()
    {
        for(var i = 0; i < canyons.length; i++)
            {
                drawCanyon(canyons[i]);
                checkCanyon(canyons[i]);
            }
    }

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------


// Function to draw collectable objects.
function drawCollectable(t_collectable)
    {
        fill(255, 131, 1);
        stroke(0);
        strokeWeight(0.2);
        ellipse(
            t_collectable.x_pos,
            t_collectable.y_pos,
            t_collectable.size,
            t_collectable.size);

        fill(255, 154, 1);
        noStroke();
        ellipse(
            t_collectable.x_pos+1,
            t_collectable.y_pos+1,
            t_collectable.size-9,
            t_collectable.size-9);

        fill(255,127,3);
        
        noStroke();
        triangle(
            t_collectable.x_pos+3,
            t_collectable.y_pos-2,
            t_collectable.x_pos-5,
            t_collectable.y_pos-2,
            t_collectable.x_pos-1,
            t_collectable.y_pos+6);

        triangle(
            t_collectable.x_pos+3,
            t_collectable.y_pos+3,
            t_collectable.x_pos-5,
            t_collectable.y_pos+3,
            t_collectable.x_pos-1,
            t_collectable.y_pos-5);
    }


// scrolling / movement mechanics
function mechanics()
    {
        // Logic to make the game character move or the background scroll.
        if(isLeft)
            {
                if(gameChar_x > width * 0.2)
                {
                    gameChar_x -= 6.5;
                }

                else
                {
                    scrollPos += 5;
                }
            }
        
        if(isLeft && transformed == true)// increase speed when Super Saiyan
            {
                if(gameChar_x > width * 0.2)
                {
                    gameChar_x -= 7;
                }

                else
                {
                    scrollPos += 5;
                }
            }

        if(isRight)
            {
                if(gameChar_x < width * 0.8)
                {
                    gameChar_x  += 6.5;
                }

                else
                {
                    scrollPos -= 5; // negative for moving against the background
                }
            }
        
        if(isRight && transformed == true) // increase speed when Super Saiyan
            {
                if(gameChar_x < width * 0.8)
                {
                    gameChar_x  += 7;
                }

                else
                {
                    scrollPos -= 5; // negative for moving against the background
                }
            }


        // Logic to make the game character rise and fall.
        if (gameChar_y < floorPos_y)
            {
                gameChar_y += 5;
                isFalling = true;
            }

        if (gameChar_y > 420)
            {
                isFalling = false;
            }
    }


// Function to check character has collected an item.
function checkCollectable(t_collectable)
    {
        if(dist(gameChar_world_x,gameChar_y,
            t_collectable.x_pos,
            t_collectable.y_pos) < 40)
            {
                t_collectable.isFound = true
                game_score += 1;
            }
    }


function drawAndCollectCollectible()
    {
        for(var i = 0; i < collectables.length; i++)
            {
                if(collectables[i].isFound == false)
                    {
                        drawCollectable(collectables[i]);
                    } 
            }

        for(var i = 0; i < collectables.length; i++)
            {

                if(!collectables[i].isFound)
                    {
                        checkCollectable(collectables[i]);
                    } 
            }
    }


// life counter
function lifeCounter()
    {
        if(isDead && lives == 1)
            {
                lives = 0;
            }
        
        if(lives == 0)
            {
                push();
                strokeWeight(2);
                stroke(5);
                textSize(60);
                text("GAME OVER", 335, 300);
                textSize(30);
                fill(0,255,0);
                text( "PRESS SPACE TO CONTINUE", 310, 350);
                isRight = false;
                isLeft = false;
                
                pop();
            }

        if(lives == 0 && keyCode == 32)
            {
                startGame();
            }

        if(flagpole.isReached)
            {
                push();
                strokeWeight(2);
                stroke(5);
                textSize(60);
                fill(255, 154, 1);
                text("LEVEL COMPLETE", 275, 200);
                textSize(30);
                text( "PRESS SPACE TO CONTINUE", 320, 230);
                pop();
            }
        
        // cannot complete game til all dragonballs collected
        if(gameChar_world_x > 2200 && game_score < 7)
            {
                push();
                strokeWeight(1);
                stroke(5);
                textSize(40);
                fill(247, 33, 17);
                text("YOU NEED TO FIND ALL 7 DRAGONBALLS", 115, 300);
                fill(0, 255, 166);
                textSize(35);
                text("HINT: USE YOUR SENZU BEANS", 235, 360);

                pop();
            }
        if(gameChar_world_x > 1840 && gameChar_world_x < 2000)
            {
                push();
                translate(scrollPos,0);
                fill(255, 217, 0);
                textSize(18);
                text("POWER UP TO", 1940, 450);
                text("MAKE THIS JUMP", 1940, 470);
                pop();
                
            }
    }


// create a finish line that also checks all collectables have been found
function checkFlagpole()
    {
        var d = abs(gameChar_world_x - flagpole.x_pos);

        if(d < 15 && game_score == 7)
            {
                flagpole.isReached = true;
            }
    }

// check player dead and remove life
function checkPlayerDie()
    {
        if(gameChar_y > 700)
            {
                isDead = true
            }

        if(isDead && lives > 1)
            {
                lives -= 1;
                resetGame();
            }
    }

// game details display
function drawPlayerLives()
    {
        fill(0,255,0);
        
        textSize(16);
        text("score: " + game_score, 20,20);
        text("senzu beans: ", 100,20);
        textSize(18);
        text("hold 'shift' to transform", 820,20)
        
        for(var i = 0; i < lives - 1; i++)
            {
                noStroke();
                fill(118, 227, 68);
                ellipse(210 + i * 16, 15, 9, 12);
            }
    }

// resets player after death
function resetGame()
    {
         // Initial game conditions
        gameChar_x = width/2;
        gameChar_y = floorPos_y;

        // Variable to control the background scrolling.
        scrollPos = 0;

        // Variable to store the real position of the gameChar in the game world (collision detection).
        gameChar_world_x = gameChar_x - scrollPos;
        
        // Boolean variables to control the movement of the game character.
        isLeft = false;
        isRight = false;
        isFalling = false;
        isPlummeting = false;
        isDead = false;
        
    }

// initialise the game
function startGame()
    {
        // create canvas & set floor position
        createCanvas(1024, 576);
        floorPos_y = height * 3/4;
        
        // if player beat the game, play happy Goku sound
        if(game_score == 7)
            {
                prettyFun();
            }
        
        // Initial game conditions
        game_score = 0;
        lives = 4;
        flagpole = {isReached: false, x_pos: 2600};
        transformed = false;
        
        gameChar_x = width/2;
        gameChar_y = floorPos_y;

        // Variable to control the background scrolling.
        scrollPos = 0;

        // Variable to store the real position of the gameChar in the game world (collision detection).
        gameChar_world_x = gameChar_x - scrollPos;

        // Boolean variables to control the movement of the game character.
        isLeft = false;
        isRight = false;
        isFalling = false;
        isPlummeting = false;
        isDead = false;
        
        // background gradient colours
        c1 = color(0);
        c2 = color(0,255,0);
        
        
        // Initialise arrays of scenery objects.
        
//        background tree array
        bg_trees = [
            {
            x_pos: random(-1000,-800),
            y_pos: floorPos_y,
            width: 3,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(-800,-600),
            y_pos: floorPos_y,
            width: 3,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(-400,-300),
            y_pos: floorPos_y,
            width: 5,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(-400,-100),
            y_pos: floorPos_y,
            width: 5,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(-200,50),
            y_pos: floorPos_y,
            width: 5,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(-150,100),
            y_pos: floorPos_y,
            width: 5,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(200,400),
            y_pos: floorPos_y,
            width: 3,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(300,600),
            y_pos: floorPos_y,
            width: 3,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(500,600),
            y_pos: floorPos_y,
            width: 5,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(900,1100),
            y_pos: floorPos_y,
            width: 5,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(1000,1300),
            y_pos: floorPos_y,
            width: 5,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(1400,1500),
            y_pos: floorPos_y,
            width: 5,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(1600,1800),
            y_pos: floorPos_y,
            width: 5,
            height: random(50, 250)*-1,
            size: random(30,50)
            },
            
            {
            x_pos: random(1700,2000),
            y_pos: floorPos_y,
            width: 5,
            height: random(50, 250)*-1,
            size: random(30,50)
            }
        ];
        
        // array of DragonBalls
        collectables = [
            {x_pos: -1200, y_pos: 500, size: 35, isFound: false},
            {x_pos: -360, y_pos: 400, size: 35, isFound: false},
            
            {x_pos: 135, y_pos: 350, size: 35, isFound: false},
            
            {x_pos: 730, y_pos: 400, size: 35, isFound: false},
            
            {x_pos: 1260, y_pos: 540, size: 35, isFound: false},
            {x_pos: 1700, y_pos: 300, size: 35, isFound: false},
            {x_pos: 1780, y_pos: 400, size: 35, isFound: false},
            
            
            
        ];

        // array of clouds
        clouds = [
            {x_pos: -700, y_pos: 350, size: 20, radius: 30},
            {x_pos: -400, y_pos: 150, size: 20, radius: 30},
            {x_pos: -300, y_pos: 151, size: 20, radius: 30},
            {x_pos: 100, y_pos: 200, size: 20, radius: 30},
            {x_pos: 450, y_pos: 150, size: 20, radius: 30},
            {x_pos: 470, y_pos: 151, size: 20, radius: 30},
            {x_pos: 600, y_pos: 301, size: 20, radius: 30},
            {x_pos: 680, y_pos: 50, size: 20, radius: 30},
            {x_pos: 512, y_pos: 301, size: 20, radius: 30},
            {x_pos: 1000, y_pos: 350, size: 20, radius: 30},
            {x_pos: 1100, y_pos: 151, size: 20, radius: 30},
            {x_pos: 1150, y_pos: 151, size: 20, radius: 30},
            {x_pos: 1700, y_pos: 120, size: 20, radius: 30}
        ];
        

        // array of canyon objects. Radius is of related fire object
        canyons = [
            {
            x_pos: -1650,
            width: 260,
            radius: 4
            },
            
            {
            x_pos: -1450,
            width: 260,
            radius: 4
            },
            
            {
            x_pos: -1250,
            width: 260,
            radius: 4
            },
            
            {
            x_pos: -500,
            width: random(80,140),
            radius: 4
            },
            
            {
            x_pos: 100,
            width: random(80,140),
            radius: 4
            },

            {
            x_pos: 700,
            width: random(80,140),
            radius: 4
            },

            {
            x_pos: 1220,
            width: 100,
            radius: 4
            },
            
            {
            x_pos: 1420,
            width: 100,
            radius: 4
            },
            
            {
            x_pos: 1620,
            width: 100,
            radius: 4
            },
            
            {
            x_pos: 1930,
            width: 250,
            radius: 4
            },
           
        ];
        
        // populate mountain arrays from constructor functions
        // use random() to create a fresh layout of mountain scenery every new game
        for(var i = 0; i < 2; i++)
            {
                bigMountains.push(new BigMountain(random(-800, 2000), 400));
                smallMountains.push(new SmallMountain(random(-300, 2000), 400));
            }
        for(var i = 0; i < 2; i++)
            {
                bigMountains.push(new BigMountain(random(-800, 2500), 400));
                smallMountains.push(new SmallMountain(random(-1400, 2200), 400));
            }
        
    }

// checks to see if player has completed the level & starts new game on spacebar
function levelComplete()
    {
        // Update real position of gameChar for collision detection.
        gameChar_world_x = gameChar_x - scrollPos;

        if(flagpole.isReached == false)
            {
                checkFlagpole();
            }
        
        if(flagpole.isReached)
            {
                isLeft = false;
                isRight = false;
                isFalling = false;
                isPlummeting = false;
                isDead = false;
            }
        
        if(flagpole.isReached && keyCode == 32)
            {
                startGame();
            }
    }

// play scream if player falls
function canyonFall()
    {
        if(gameChar_y > 442 && gameChar_y < 448)
            {
                canyonSound.play();
            }
    }

// play happy Goku on spacebar press if player wins
function prettyFun()
    {
        if(keyCode == 32 && isDead == false)
            {
                prettyFunSound.play();
            }
    }

// plays Vegeta warning on game over
function lastLife()
    {
        if(lives == 1 && isDead == true)
            {
                lastLifeSound.play();
            }
    }

// play background music
function backgroundMusic()
    {
        backgroundSound.play();        
    }

// draws either regular Goku or Super Saiyan Goku depending on game conditions
function drawDynamicChar()
    {
        if(transformed == false)
            {
                drawGameChar();
            }
        else
            {
                drawSuperGameChar();
            }
    }