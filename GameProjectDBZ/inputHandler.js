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