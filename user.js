var User = function(x, y, w, h, locale) {
    
	this.pos = {
        
		x: x,
        
		y: y
    
	};
    
	this.locale = locale || {x:0, y:0};
    
	this.w = w;
    
	this.h = h;
    
	this.has = {
        
		"key": false,
        
		"sword": false,
        
		"win": false
,
		"invincibility": false   
	};
    
	this.spd = (width + height) * 0.00375;
  
	this.invincibility = 90; // frames
	this.invincibilityTimer = 0;
	this.render = function() {
        
		stroke(0);
        
		fill(255);
        
		rect(this.pos.x, this.pos.y, this.w, this.h);
        
		if (this.has.key) {
            
			image(
				keyImg, 
				this.pos.x + this.w, this.pos.y, 
				this.w * 0.75, this.h * 0.75
			);
        
		}

		if (this.has.invincibility) {
			background(255, 255, 0);
		}
	};
    
	this.update = function() {
        
		if (keyIsPressed && keyCode === UP_ARROW) {
            
			this.pos.y -= this.spd;
        
		}
        
		if (keyIsPressed && keyCode === DOWN_ARROW) {
            
			this.pos.y += this.spd;
        
		}
        
		if (keyIsPressed && keyCode === LEFT_ARROW) {
            
			this.pos.x -= this.spd;
        
		}
        
		if (keyIsPressed && keyCode === RIGHT_ARROW) {
            
			this.pos.x += this.spd;
        
		}
    

		if (this.has.invincibility) {
			if (this.invincibilityTimer > frameCount) {
				this.has.invincibility = false;
			}
		}
	};
    
	this.collision = function(level) {
        
		var bw, bh, bx, by;
        
		for (by = 0; by < level.length; by++) {
            
			for (bx = 0; bx < level[by].length; bx++) {
                
				bw = width / level[by].length;
                
				bh = height / level.length;
                
                
				var onThe = {
                    
					"left": ((this.pos.y > by * bh && this.pos.y < by * bh + bh) || (this.pos.y + this.h > by * bh && this.pos.y + this.h < by * bh + bh)) && this.pos.x + this.w > bx * bw && this.pos.x < bx * bw && level[by][bx] > 0,
                    
					"right": ((this.pos.y > by * bh && this.pos.y < by * bh + bh) || (this.pos.y + this.h > by * bh && this.pos.y + this.h < by * bh + bh)) && this.pos.x < bx * bw + bw && this.pos.x + this.w > bx * bw + bw && level[by][bx] > 0,
                    
					"bottom": ((this.pos.x > bx * bw && this.pos.x < bx * bw + bw) || (this.pos.x + this.w > bx * bw && this.pos.x + this.w < bx * bw + bw)) && this.pos.y < by * bh + bh && this.pos.y + this.h > by * bh + bh && level[by][bx] > 0,
                    
					"top": ((this.pos.x > bx * bw && this.pos.x < bx * bw + bw) || (this.pos.x + this.w > bx * bw && this.pos.x + this.w < bx * bw + bw)) && this.pos.y < by * bh && this.pos.y + this.h > by * bh && level[by][bx] > 0
                
				};
                
                
				if ((onThe.top || onThe.bottom || onThe.left || onThe.right) && level[by][bx] === 5) {
                    
					this.has.key = true;
                
				}
                
				if ((onThe.top || onThe.bottom || onThe.left || onThe.right) && level[by][bx] === 6 && this.has.key) {
                    
					this.has.win = true;
                
				}
 
				if ((onThe.top || onThe.bottom || onThe.left || onThe.right) && level[by][bx] === 2 && !this.has.invincibility) {
                    
					this.has.invincibility = true;
 
					this.invincibilityTimer = frameCount + this.invincibility;               
				}
               
				if (onThe.top) {this.pos.y = by * bh - this.h;}
                
				if (onThe.bottom) {this.pos.y = by * bh + bh;}
                
				if (onThe.left) {this.pos.x = bx * bw - this.w;}
                
				if (onThe.right) {this.pos.x = bx * bw + bw;}
            
			}
        
		}
    
	};
    
	this.edges = function() {
        
		// left wall
        
		if (this.pos.x < 0) {
            
			if (this.locale.x > 0) {
                
				this.locale.x--;
                
				this.pos.x = width - this.w;
            
			} else {
                
				this.pos.x = 0;
            
			}
        
		}
        
		// right wall
        
		if (this.pos.x + this.w > width) {
            
			if (this.locale.x < cartograph.length - 1) {
                
				this.locale.x++;
                
				this.pos.x = 0;
       
			} else {
                
				this.pos.x = width - this.w;
            
			}
        
		}
        
		// floor
        
		if (this.pos.y + this.h > height) {
            
			if (this.locale.y < cartograph.length - 1) {
                
				this.locale.y++;
                
				this.pos.y = 0;
   
			} else {
                
				this.pos.y = height - this.h;
            
			}
        
		}
        
		// ceiling
        
		if (this.pos.y < 0) {
            
			if (this.locale.y > 0) {
                
				this.locale.y--;
                
				this.pos.y = height - this.h;

			} else {
                
				this.pos.y = 0;
            
			}
        
		}
    
	};

};