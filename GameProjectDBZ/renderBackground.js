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


