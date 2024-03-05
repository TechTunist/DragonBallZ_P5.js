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

