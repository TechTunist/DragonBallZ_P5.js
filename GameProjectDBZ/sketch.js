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


// // life counter
// function lifeCounter()
//     {
//         if(isDead && lives == 1)
//             {
//                 lives = 0;
//             }
        
//         if(lives == 0)
//             {
//                 push();
//                 strokeWeight(2);
//                 stroke(5);
//                 textSize(60);
//                 text("GAME OVER", 335, 300);
//                 textSize(30);
//                 fill(0,255,0);
//                 text( "PRESS SPACE TO CONTINUE", 310, 350);
//                 isRight = false;
//                 isLeft = false;
                
//                 pop();
//             }

//         if(lives == 0 && keyCode == 32)
//             {
//                 startGame();
//             }

//         if(flagpole.isReached)
//             {
//                 push();
//                 strokeWeight(2);
//                 stroke(5);
//                 textSize(60);
//                 fill(255, 154, 1);
//                 text("LEVEL COMPLETE", 275, 200);
//                 textSize(30);
//                 text( "PRESS SPACE TO CONTINUE", 320, 230);
//                 pop();
//             }
        
//         // cannot complete game til all dragonballs collected
//         if(gameChar_world_x > 2200 && game_score < 7)
//             {
//                 push();
//                 strokeWeight(1);
//                 stroke(5);
//                 textSize(40);
//                 fill(247, 33, 17);
//                 text("YOU NEED TO FIND ALL 7 DRAGONBALLS", 115, 300);
//                 fill(0, 255, 166);
//                 textSize(35);
//                 text("HINT: USE YOUR SENZU BEANS", 235, 360);

//                 pop();
//             }
//         if(gameChar_world_x > 1840 && gameChar_world_x < 2000)
//             {
//                 push();
//                 translate(scrollPos,0);
//                 fill(255, 217, 0);
//                 textSize(18);
//                 text("POWER UP TO", 1940, 450);
//                 text("MAKE THIS JUMP", 1940, 470);
//                 pop();
                
//             }
//     }


// // create a finish line that also checks all collectables have been found
// function checkFlagpole()
//     {
//         var d = abs(gameChar_world_x - flagpole.x_pos);

//         if(d < 15 && game_score == 7)
//             {
//                 flagpole.isReached = true;
//             }
//     }

// // check player dead and remove life
// function checkPlayerDie()
//     {
//         if(gameChar_y > 700)
//             {
//                 isDead = true
//             }

//         if(isDead && lives > 1)
//             {
//                 lives -= 1;
//                 resetGame();
//             }
//     }

// // game details display
// function drawPlayerLives()
//     {
//         fill(0,255,0);
        
//         textSize(16);
//         text("score: " + game_score, 20,20);
//         text("senzu beans: ", 100,20);
//         textSize(18);
//         text("hold 'shift' to transform", 820,20)
        
//         for(var i = 0; i < lives - 1; i++)
//             {
//                 noStroke();
//                 fill(118, 227, 68);
//                 ellipse(210 + i * 16, 15, 9, 12);
//             }
//     }

// // resets player after death
// function resetGame()
//     {
//          // Initial game conditions
//         gameChar_x = width/2;
//         gameChar_y = floorPos_y;

//         // Variable to control the background scrolling.
//         scrollPos = 0;

//         // Variable to store the real position of the gameChar in the game world (collision detection).
//         gameChar_world_x = gameChar_x - scrollPos;
        
//         // Boolean variables to control the movement of the game character.
//         isLeft = false;
//         isRight = false;
//         isFalling = false;
//         isPlummeting = false;
//         isDead = false;
        
//     }

// // initialise the game
// function startGame()
//     {
//         // create canvas & set floor position
//         createCanvas(1024, 576);
//         floorPos_y = height * 3/4;
        
//         // if player beat the game, play happy Goku sound
//         if(game_score == 7)
//             {
//                 prettyFun();
//             }
        
//         // Initial game conditions
//         game_score = 0;
//         lives = 4;
//         flagpole = {isReached: false, x_pos: 2600};
//         transformed = false;
        
//         gameChar_x = width/2;
//         gameChar_y = floorPos_y;

//         // Variable to control the background scrolling.
//         scrollPos = 0;

//         // Variable to store the real position of the gameChar in the game world (collision detection).
//         gameChar_world_x = gameChar_x - scrollPos;

//         // Boolean variables to control the movement of the game character.
//         isLeft = false;
//         isRight = false;
//         isFalling = false;
//         isPlummeting = false;
//         isDead = false;
        
//         // background gradient colours
//         c1 = color(0);
//         c2 = color(0,255,0);
        
        
//         // Initialise arrays of scenery objects.
        
// //        background tree array
//         bg_trees = [
//             {
//             x_pos: random(-1000,-800),
//             y_pos: floorPos_y,
//             width: 3,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(-800,-600),
//             y_pos: floorPos_y,
//             width: 3,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(-400,-300),
//             y_pos: floorPos_y,
//             width: 5,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(-400,-100),
//             y_pos: floorPos_y,
//             width: 5,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(-200,50),
//             y_pos: floorPos_y,
//             width: 5,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(-150,100),
//             y_pos: floorPos_y,
//             width: 5,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(200,400),
//             y_pos: floorPos_y,
//             width: 3,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(300,600),
//             y_pos: floorPos_y,
//             width: 3,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(500,600),
//             y_pos: floorPos_y,
//             width: 5,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(900,1100),
//             y_pos: floorPos_y,
//             width: 5,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(1000,1300),
//             y_pos: floorPos_y,
//             width: 5,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(1400,1500),
//             y_pos: floorPos_y,
//             width: 5,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(1600,1800),
//             y_pos: floorPos_y,
//             width: 5,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             },
            
//             {
//             x_pos: random(1700,2000),
//             y_pos: floorPos_y,
//             width: 5,
//             height: random(50, 250)*-1,
//             size: random(30,50)
//             }
//         ];
        
//         // array of DragonBalls
//         collectables = [
//             {x_pos: -1200, y_pos: 500, size: 35, isFound: false},
//             {x_pos: -360, y_pos: 400, size: 35, isFound: false},
            
//             {x_pos: 135, y_pos: 350, size: 35, isFound: false},
            
//             {x_pos: 730, y_pos: 400, size: 35, isFound: false},
            
//             {x_pos: 1260, y_pos: 540, size: 35, isFound: false},
//             {x_pos: 1700, y_pos: 300, size: 35, isFound: false},
//             {x_pos: 1780, y_pos: 400, size: 35, isFound: false},
            
            
            
//         ];

//         // array of clouds
//         clouds = [
//             {x_pos: -700, y_pos: 350, size: 20, radius: 30},
//             {x_pos: -400, y_pos: 150, size: 20, radius: 30},
//             {x_pos: -300, y_pos: 151, size: 20, radius: 30},
//             {x_pos: 100, y_pos: 200, size: 20, radius: 30},
//             {x_pos: 450, y_pos: 150, size: 20, radius: 30},
//             {x_pos: 470, y_pos: 151, size: 20, radius: 30},
//             {x_pos: 600, y_pos: 301, size: 20, radius: 30},
//             {x_pos: 680, y_pos: 50, size: 20, radius: 30},
//             {x_pos: 512, y_pos: 301, size: 20, radius: 30},
//             {x_pos: 1000, y_pos: 350, size: 20, radius: 30},
//             {x_pos: 1100, y_pos: 151, size: 20, radius: 30},
//             {x_pos: 1150, y_pos: 151, size: 20, radius: 30},
//             {x_pos: 1700, y_pos: 120, size: 20, radius: 30}
//         ];
        

//         // array of canyon objects. Radius is of related fire object
//         canyons = [
//             {
//             x_pos: -1650,
//             width: 260,
//             radius: 4
//             },
            
//             {
//             x_pos: -1450,
//             width: 260,
//             radius: 4
//             },
            
//             {
//             x_pos: -1250,
//             width: 260,
//             radius: 4
//             },
            
//             {
//             x_pos: -500,
//             width: random(80,140),
//             radius: 4
//             },
            
//             {
//             x_pos: 100,
//             width: random(80,140),
//             radius: 4
//             },

//             {
//             x_pos: 700,
//             width: random(80,140),
//             radius: 4
//             },

//             {
//             x_pos: 1220,
//             width: 100,
//             radius: 4
//             },
            
//             {
//             x_pos: 1420,
//             width: 100,
//             radius: 4
//             },
            
//             {
//             x_pos: 1620,
//             width: 100,
//             radius: 4
//             },
            
//             {
//             x_pos: 1930,
//             width: 250,
//             radius: 4
//             },
           
//         ];
        
//         // populate mountain arrays from constructor functions
//         // use random() to create a fresh layout of mountain scenery every new game
//         for(var i = 0; i < 2; i++)
//             {
//                 bigMountains.push(new BigMountain(random(-800, 2000), 400));
//                 smallMountains.push(new SmallMountain(random(-300, 2000), 400));
//             }
//         for(var i = 0; i < 2; i++)
//             {
//                 bigMountains.push(new BigMountain(random(-800, 2500), 400));
//                 smallMountains.push(new SmallMountain(random(-1400, 2200), 400));
//             }
        
//     }

// // checks to see if player has completed the level & starts new game on spacebar
// function levelComplete()
//     {
//         // Update real position of gameChar for collision detection.
//         gameChar_world_x = gameChar_x - scrollPos;

//         if(flagpole.isReached == false)
//             {
//                 checkFlagpole();
//             }
        
//         if(flagpole.isReached)
//             {
//                 isLeft = false;
//                 isRight = false;
//                 isFalling = false;
//                 isPlummeting = false;
//                 isDead = false;
//             }
        
//         if(flagpole.isReached && keyCode == 32)
//             {
//                 startGame();
//             }
//     }

// // play scream if player falls
// function canyonFall()
//     {
//         if(gameChar_y > 442 && gameChar_y < 448)
//             {
//                 canyonSound.play();
//             }
//     }

// // play happy Goku on spacebar press if player wins
// function prettyFun()
//     {
//         if(keyCode == 32 && isDead == false)
//             {
//                 prettyFunSound.play();
//             }
//     }

// // plays Vegeta warning on game over
// function lastLife()
//     {
//         if(lives == 1 && isDead == true)
//             {
//                 lastLifeSound.play();
//             }
//     }

// // play background music
// function backgroundMusic()
//     {
//         backgroundSound.play();        
//     }

// // draws either regular Goku or Super Saiyan Goku depending on game conditions
// function drawDynamicChar()
//     {
//         if(transformed == false)
//             {
//                 drawGameChar();
//             }
//         else
//             {
//                 drawSuperGameChar();
//             }
//     }