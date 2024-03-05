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
