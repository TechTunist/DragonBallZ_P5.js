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
