// Level Data


var levels = [
    
	[
        
		[0, 0, 0, 0, 0, 0, 0, 0],
        
		[0, 1, 1, 0, 1, 1, 1, 0],
        
		[0, 1, 0, 0, 0, 0, 1, 0],
        
		[0, 0, 0, 0, 0, 0, 1, 0],
        
		[0, 1, 0, 0, 5, 0, 0, 0],
        
		[0, 1, 0, 0, 0, 0, 1, 0],
        
		[0, 1, 1, 1, 0, 1, 1, 0],
        
		[0, 0, 0, 0, 0, 0, 0, 0]
    
	],
    
	[
        
		[0, 0, 0, 0, 0, 0, 0, 0],
        
		[0, 1, 1, 0, 1, 1, 1, 0],
        
		[0, 1, 0, 0, 0, 0, 1, 0],
        
		[0, 0, 0, 6, 0, 0, 1, 0],
        
		[0, 1, 0, 0, 0, 0, 0, 0],
        
		[0, 1, 0, 0, 0, 0, 1, 0],
        
		[0, 1, 1, 1, 0, 1, 1, 0],
        
		[0, 0, 0, 0, 0, 0, 0, 0]
    
	]

];


// 2 = red
var skin = [{"col":{"r":255,"g":255,"b":255,"a":0},"img":null},{"col":{"r":0,"g":0,"b":0,"a":255},"img":null},{"col":{"r":255,"g":0,"b":0,"a":255},"img":null},{"col":{"r":0,"g":255,"b":0,"a":255},"img":null},{"col":{"r":0,"g":0,"b":255,"a":255},"img":null},{"col":null,"img":"KEY"},{"col":null,"img":"DOOR"}];

var winMsgs = [
    
	"Great work!",
    
	"A true trick-master",
    
	"The very best like no one ever was",
    
	"Congratulations",
    
	"A real Atari Hero you are",
    
	"You are a WIZARD",
    
	"Pure genius or guesswork?",
	"Woke you are",
	"How is the real world out there?"
];

var winIndex = Math.floor(Math.random() * winMsgs.length);

// DIM Globals
var keyImg, door;
// var skin, levels;
var levelIndices = [];
var cartograph, locale, currentLevel, user, amtOLevels;

function showLocale(x_, y_, cartograph) {
    
	var x = x_;
    
	var y = y_;
    
	var s = width * 0.0325;
    
	stroke(0);
    
	for (var i = 0; i < cartograph.length; i++) {
        
		for (var j = 0; j < cartograph[i].length; j++) {
            
			if (j === x && i === y) {
                
				fill(255, 255, 0, 100);
            
			} else {fill(0, 0, 0, 0);}
            
			rect(j * s, i * s, s, s);
        
		}
    
	}

}

function levelRandomizer(cols, rows, skin) {
    
	var level = [];
    
	var gimmeIndex;
    
	for (var i = 0; i < rows; i++) {
        
		level.push([]);
        
		for (var j = 0; j < cols; j++) {
            
			var percentBlank = 70;
            
			if (Math.random() * 100 <= percentBlank) {
                
				gimmeIndex = 0;
            
			} else {
                
				gimmeIndex = Math.floor(Math.random() * (skin.length - 2));
            
			}
            
			if (i === 0 || i === rows - 1 || j === 0 || j === cols - 1) {
                
				gimmeIndex = 0;
            
			}
            
			level[i].push(gimmeIndex);
        
		}
    
	}
    
	return level;

}

function createMap(chooseFrom) {
    
	var side = Math.round(Math.sqrt(chooseFrom.length));
    
	var cartograph = [];
    
	for (var i = 0; i < side; i++) {
        
		cartograph.push([]);
        
		for (var j = 0; j < side; j++) {
            
			var index = Math.floor(Math.random() * chooseFrom.length);
            
			cartograph[i].push(chooseFrom[index]);
            
			chooseFrom.splice(index, 1);
        
		}
    
	}
    
	return cartograph;

}

function printLevel(level) {
    
	noStroke();
  
	var gimmeImg;  
	for (var rows = 0; rows < level.length; rows++) {
        
		for (var cols = 0; cols < level[rows].length; cols++) {
            
			var w = width / level[rows].length;
            
			var h = height / level.length;
            
			var skinIndex = level[rows][cols];
            
			if (skin[skinIndex].col) {
                
				fill(skin[skinIndex].col.r, skin[skinIndex].col.g, skin[skinIndex].col.b, skin[skinIndex].col.a);
                
				rect(cols * w, rows * h, w, h);
            
			}
            
			if (skin[skinIndex].img) {

				if (skin[skinIndex].img === "DOOR") {
					image(door, cols * w, rows * h, w, h);
 
				}  
				else {//(skin[skinIndex].img === "KEY") {
					image(keyImg, cols * w, rows * h, w, h);
 
				}	         
			}
        
		}
    
	}

}

function winScreen(msg) {
    
	textAlign(CENTER, CENTER);
    
	background(80, 200, 80);
    
    
	fill(255);
    
	rect(width * 0.25, height * 0.4, width * 0.5, height * 0.2);

	
	textSize((width + height) * 0.06);
    
	text("YOU HAVE WON", width * 0.5, height * 0.2);
    
    
	fill(0);
    
	textSize((width + height) * 0.02);
    
	text(msg, width * 0.3, height * 0.43, width * 0.4, height * 0.15);

}

function preload() {
	keyImg = loadImage("cgi-bin/key.jpg");
	door = loadImage("cgi-bin/door.jpg");
	//levels = loadJSON("levels.json");
	//skin = loadJSON("skin.json");
}

function setup() {
	var cnv = createCanvas(windowHeight * 0.8, windowHeight * 0.8);
	cnv.position((windowWidth - width) * 0.5, (windowHeight - height) * 0.5);
	
	// create remaining levels
	amtOLevels = 9 - levels.length;
	for (var i = 0; i < amtOLevels; i++) {
    
		var gimmeLevel = levelRandomizer(16, 16, skin);
    
		levels.push(gimmeLevel);

	}
	
	// assign level indices
	levelIndices = [];

	for (var i = 0; i < levels.length; i++) {
    
		levelIndices.push(i);

	}
	
	// create a map of all the levels
	cartograph = createMap(levelIndices);

	// DIM user
	locale = {x: 1, y: 1};
	
currentLevel = levels[0];

	user = new User(width / 2, height / 2, 30, 30, locale);
}

function draw() {
	background(255);
    
	user.w = width / currentLevel.length * 0.8;
    
	user.h = width / currentLevel.length * 0.8;
    
	currentLevel = levels[cartograph[user.locale.x][user.locale.y]];
    
	printLevel(currentLevel);
    
	user.collision(currentLevel);
    
	user.update();
    
	user.render();
    
	user.edges();
    
	showLocale(user.locale.x, user.locale.y, cartograph);

	if (user.has.win) {
		winScreen(winMsgs[winIndex]);
	}
	if (user.has.invincibility) {
		background(0);
	}
}