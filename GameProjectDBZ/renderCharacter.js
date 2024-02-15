
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