CANVAS = document.getElementById("canvas");
CONTEXT = CANVAS.getContext("2d");

H = 500;
W = 1000;
score = 0;
timePoint = 0;
life = 3;
launcher = 0;
musicTime = 0;
ballRot = 1;
beginGame = 0;
click_x = 0;
click_y = 0;
counterLevel = 0;
chocolat = 0;
endGameCounter = 0;
startEvent = false;
clickStart = false;
level1 = false;
endLevel = false;
looseGameCount = false;

vbX = Math.round(Math.random()* 6);
vbY = Math.round(Math.random()* -6);

background = new Image();
spaceship = new Image();
ball = new Image();
start = new Image();
over = new Image();

musicLevel = new Audio("sound/celestial.mp3");
triple = new Audio("sound/triple.mp3");

background.src = "img/background.png";
spaceship.src = "img/spaceship2.png";
start.src = "img/start.png";
ball.src = "img/ball1.png";
over.src = "img/gameOver.png";

let mouseX;
let mouseY;

blc = {};
ship = {};
st = {};
gm = {};

// brickpositionLevel1 = 	[[[400,200],[450,200],[500,200],[550,200]],
// 				 		[[400,220],[450,220],[500,220],[550,220]],
// 				 		[[400,240],[450,240],[500,240],[550,240]],
// 				 		[[400,260],[450,260],[500,260],[550,260]]];

//brickpositionLevel1 = 	[[[400,200],[450,200]]],

brickpositionLevel1 = 	[[[0,240],[50,240],[100,240],[150,240],[200,240],[250,240],[300,240],[350,240],
						[400,240],[450,240],[500,240],[550,240],[600,240],[650,240],[700,240],[750,240],
						[800,240],[850,240],[900,240],[950,240],[0,260],[50,260],[100,260],[150,260],
						[200,260],[250,260],[300,260],[350,260],
						[400,260],[450,260],[500,260],[550,260],[600,260],[650,260],[700,260],[750,260],
						[800,260],[850,260],[900,260],[950,260],[0,280],[50,280],[100,280],[150,280],
						[200,280],[250,280],[300,280],[350,280],
						[400,280],[450,280],[500,280],[550,280],[600,280],[650,280],[700,280],[750,280],
						[800,280],[850,280],[900,280],[950,280],[0,300],[50,300],[100,300],[150,300],
						[200,300],[250,300],[300,300],[350,300],
						[400,300],[450,300],[500,300],[550,300],[600,300],[650,300],[700,300],[750,300],
						[800,300],[850,300],[900,300],[950,300]],
						[[0,220],[50,220],[100,220],[150,220],[200,220],[250,220],[300,220],[350,220],
						[400,220],[450,220],[500,220],[550,220],[600,220],[650,220],[700,220],[750,220],
						[800,220],[850,220],[900,220],[950,220],[0,200],[50,200],[100,200],[150,200],
						[200,200],[250,200],[300,200],[350,200],
						[400,200],[450,200],[500,200],[550,200],[600,200],[650,200],[700,200],[750,200],
						[800,200],[850,200],[900,200],[950,200],[0,180],[50,180],[100,180],[150,180],
						[200,180],[250,180],[300,180],[350,180],
						[400,180],[450,180],[500,180],[550,180],[600,180],[650,180],[700,180],[750,180],
						[800,180],[850,180],[900,180],[950,180],[0,160],[50,160],[100,160],[150,160],
						[200,160],[250,160],[300,160],[350,160],
						[400,160],[450,160],[500,160],[550,160],[600,160],[650,160],[700,160],[750,160],
						[800,160],[850,160],[900,160],[950,160]],[[0,140],[50,140],[100,140],[150,140],[200,140],
						[250,140],[300,140],[350,140],
						[400,140],[450,140],[500,140],[550,140],[600,140],[650,140],[700,140],[750,140],
						[800,140],[850,140],[900,140],[950,140],[0,120],[50,120],[100,120],[150,120],
						[200,120],[250,120],[300,120],[350,120],
						[400,120],[450,120],[500,120],[550,120],[600,120],[650,120],[700,120],[750,120],
						[800,120],[850,120],[900,120],[950,120]],[[0,100],[50,100],[100,100],[150,100],[200,100],
						[250,100],[300,100],[350,100],
						[400,100],[450,100],[500,100],[550,100],[600,100],[650,100],[700,100],[750,100],
						[800,100],[850,100],[900,100],[950,100],[0,80],[50,80],[100,80],[150,80],
						[200,80],[250,80],[300,80],[350,80],
						[400,80],[450,80],[500,80],[550,80],[600,80],[650,80],[700,80],[750,80],
						[800,80],[850,80],[900,80],[950,80]]];



brickpositionLevel2 = [[[400,200],[450,200],[500,200],[550,200],[400,220],[550,220],
						[400,240],[550,240],[400,260],[450,260],[500,260],[550,260]],
						[[450,240]],[[450,220],[500,240]],[[500,220]]];

bricktableLevel1 = [];

bricktableLevel2 = [];

function initSt(){
	st.x = 0;
	st.y = 0;
}

function initGm(){
	gm.x = 0;
	gm.y = 0;
}

function ballRotation(){
	if(ballRot >= 1 && ballRot < 10){
		ball.src = "img/ball1.png";
	}
	if(ballRot >= 10 && ballRot < 20){
		ball.src = "img/ball2.png";
	}
	if(ballRot >= 20 && ballRot < 30){
		ball.src = "img/ball3.png";
	}
	if(ballRot >= 30 && ballRot < 40){
		ball.src = "img/ball4.png";
	}
	if(ballRot >= 40 && ballRot <= 50){
		ball.src = "img/ball5.png";
	}
	ballRot--;
	if(ballRot === 0){
		ballRot = 50;
	}
}

function brickImage(tab,level){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			if(i === 0){
				let fnName = "brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/brick.png';";
				eval(fnName);
			}
			if(i === 1){
				let fnName = "brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/metalbrick1.png';";
				eval(fnName);
			}
			if(i === 2){
				let fnName = "brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/goldbrick1.png';";
				eval(fnName);
			}
			if(i === 3){
				let fnName = "brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/diamondbrick.png';";
				eval(fnName);
			}
			memoryLength++;
		}
	} 
}

function createBrick(tab,level){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			if(i === 0){
				let fnName = "brk" + ((level * 1000) + (i + memoryLength)) + " = {}; brk" + ((level * 1000) + (i + memoryLength)) + ".pv = 1;";
				eval(fnName);
			}
			if(i === 1){
				let fnName = "brk" + ((level * 1000) + (i + memoryLength)) + " = {}; brk" + ((level * 1000) + (i + memoryLength)) + ".pv = 2;";
				eval(fnName);
			}
			if(i === 2){
				let fnName = "brk" + ((level * 1000) + (i + memoryLength)) + " = {}; brk" + ((level * 1000) + (i + memoryLength)) + ".pv = 3;";
				eval(fnName);
			}
			if(i === 3){
				let fnName = "brk" + ((level * 1000) + (i + memoryLength)) + " = {}; brk" + ((level * 1000) + (i + memoryLength)) + ".pv = 10;";
				eval(fnName);
			}
			memoryLength++;
		}
	}
}


function spriteDimension(bloc, sprite) {
	bloc.h = sprite.height;
	bloc.w = sprite.width;
}

function packOfSpriteDimension(tab,level){
	memoryLength = 0;
	spriteDimension(st,start);
	initSt();
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			let fnName = "spriteDimension(brk" + ((level * 1000) + (i + memoryLength)) + ",brick" + ((level * 1000) + (i + memoryLength)) + ");";
			eval(fnName);
			memoryLength++;
		}
	}
}

function brickDesign(tab,level){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			if(i === 1){
				let fnName = "if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv === 1){ brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/metalbrick2.png'}";
				eval(fnName);	
			}
			if(i === 2){
				let fnName = "if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv === 2){ brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/goldbrick2.png'} if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv === 1){ brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/goldbrick3.png'}";
				eval(fnName);
			}
			memoryLength++;
		}
	}
}

function initShip(){
	ship.h = spaceship.height;
	ship.w = spaceship.width;
	ship.x = (W - ship.w) / 2;
	ship.y = 425;
}

function initBrick(tab,level){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			let fnName = "brk" + ((level * 1000) + (i + memoryLength)) + ".x = " + tab[i][j][0] + "; brk" + ((level * 1000) + (i + memoryLength)) + ".y = " + tab[i][j][1] + ";";
			eval(fnName);
			memoryLength++;
		}	
	}
}

function preInit(){
brickImage(brickpositionLevel1,1);
createBrick(brickpositionLevel1,1);
brickImage(brickpositionLevel2,2);
createBrick(brickpositionLevel2,2);
}

function sauvageInit(){
	packOfSpriteDimension(brickpositionLevel1,1);
	initBrick(brickpositionLevel1,1);
	createBrickTable(brickpositionLevel1,bricktableLevel1,1);
	packOfSpriteDimension(brickpositionLevel2,2);
	initBrick(brickpositionLevel2,2);
	createBrickTable(brickpositionLevel2,bricktableLevel2,2);
}

function souris(e){
	if (e.x != undefined && e.y != undefined){
		mouseX = e.x - 210 - (ship.w/2);
		mouseY = e.y;
	}
	else {
	// Firefox patch
	mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	ship.x = mouseX;
}

function getPosition(event){
	Click_x = event.x;
	Click_y = event.y;
	Click_x -= canvas.offsetLeft;
	Click_y -= canvas.offsetTop;
	if(collisions(gm, ship)&& !startEvent && looseGameCount){
		H = 500;
		W = 1000;
		score = 0;
		timePoint = 0;
		life = 3;
		launcher = 0;
		musicTime = 0;
		ballRot = 1;
		beginGame = 0;
		click_x = 0;
		click_y = 0;
		counterLevel = 0;
		startEvent = false;
		clickStart = false;
		level1 = false;
		endScreen = false;
		looseGameCount = false;

		vbX = Math.round(Math.random()* 6);
		vbY = Math.round(Math.random()* -6);

		background = new Image();
		spaceship = new Image();
		ball = new Image();
		start = new Image();
		over = new Image();

		musicLevel = new Audio("sound/celestial.mp3");

		background.src = "img/background.png";
		spaceship.src = "img/spaceship2.png";
		start.src = "img/start.png";
		ball.src = "img/ball1.png";
		over.src = "img/gameOver.png";

		let mouseX;
		let mouseY;

		blc = {};
		ship = {};
		st = {};
		gm = {};

		brickpositionLevel1 = 	[[[400,200],[450,200],[500,200],[550,200],
				 				[400,220],[450,220],[500,220],[550,220],
				 				[400,240],[450,240],[500,240],[550,240],
				 				[400,260],[450,260],[500,260],[550,260]]];

		brickpositionLevel2 = [[[400,200],[450,200],[500,200],[550,200],[400,220],[550,220],
								[400,240],[550,240],[400,260],[450,260],[500,260],[550,260]],
								[[450,240]],[[450,220],[500,240]],[[500,220]]];

		bricktableLevel1 = [];

		bricktableLevel2 = [];
		init();
	}
	if(collisions(st, ship) && !startEvent && !looseGameCount){
		clickStart = true;
	}
}

function gameLauncher() {
	if(clickStart){
		startEvent = true;
		level1 = true;
		clickStart = false;
		start.src = "";
		counterLevel = 1;
	}
}

function initVariousParameters(){
	CANVAS.addEventListener("mousemove", souris, false);
	CANVAS.addEventListener("mousedown", getPosition, false);
	let canevas = document.getElementById("canvas");
	canevas.style.cursor = 'none';
}

function createBrickTable(tab,finalTab,level){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			let tempoTab = [];
			let fnName = "tempoTab.push(brick" + ((level * 1000) + (i + memoryLength)) + "); tempoTab.push(brk" + ((level * 1000) + (i + memoryLength)) + ".x); tempoTab.push(brk" + ((level * 1000) + (i + memoryLength)) + ".y);";
			eval(fnName);
			finalTab.push(tempoTab);
			memoryLength++;
		}
	}
}

function ballInit(){
	blc.x = 500;
	blc.y = 350;
	blc.h = ball.height;
	blc.w = ball.width;
}

function ballTravel(){
	blc.x += vbX;
	blc.y += vbY;
}

function initCanvas(){
	CANVAS.height = H;
	CANVAS.width = W;
}

function collisions(A,B) {
	if (A.y+A.h < B.y || A.y > B.y+B.h || A.x > B.x+B.w || A.x+A.w < B.x)
		return false;
	return true;
}

function brickDeath(brick,tab){
	if(brick.pv <= 0) {
		score += 1000;
		brick.h = 0;
		brick.w = 0;
		for(let i = 0; i < tab.length; i++){
			if(brick.x === tab[i][1] && brick.y === tab[i][2]){
				tab[i][0].src = "";
				tab[i][1] = 100000;
				tab[i][2] = 100000;
				brick.x = 100000;
				brick.y = 100000;
			}
		}
	}
}

function collisionEffect(brick,brickTab){	
	if(collisions(brick,blc)){
		score += 100;
		if(blc.y <= brick.y - (brick.h/2)){
			blc.y = brick.y - blc.h - 1;
			vbY *= -1;
		}
		else if(blc.y >= brick.y + (brick.h/2)){
			blc.y = brick.y + brick.h - 1;
			vbY *= -1;
		}
		else if(blc.x < brick.x){
		    blc.x = brick.x - blc.w - 1;
		    vbX *= -1;
		}
		else if(blc.x > brick.x){
		  blc.x = brick.x + brick.w + 1;
		  vbX *= -1;
		}
		brick.pv -= 1;
		brickDeath(brick,brickTab);
		if(brick.pv > 0){
			snd = new Audio("sound/rebond.wav");
			snd.play();
		}
		else{
			snd = new Audio("sound/break.mp3");
			snd.play();
		}
	}
}

function shipCollision(){
	if(collisions(ship,blc)){
		if(launcher != 1){
		snd = new Audio("sound/rebond.wav");
		snd.play();
		}
		if(((blc.x + (blc.w / 2) -1) >= ship.x) && ((blc.x + (blc.w / 2) -1) <= ship.x + (ship.w / 5) -1)){
			if(vbY > 0){
				if(vbX < 0){
					vbY *= -.5;
					if(vbX > -6){
						vbX *= 1.25;
					}
				}
				if(vbX > 0){
					vbY *= -.75;
					if(vbX < 6){
						vbX *= -1.25;
					}
				}
			}
			if(vbY === 0){
				vbY = -2;
			}
		}
		if(((blc.x + (blc.w / 2) -1) > ship.x + (ship.w / 5) -1) && ((blc.x + (blc.w / 2) -1) <= ship.x + ((ship.w * 2) / 5 -1))){
			vbY *= -1;
			if(vbX < 0){
				vbX *= 1;
			}
			if(vbX > 0){
				vbX *= -1;
			}
		}
		if(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 2) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + (((ship.w * 3) / 5) -1))){
			if(vbX < 0){
				vbX *= .5;
				if(vbY < 6){
					vbY *= -1.5;
				}
			}
			if(vbX === 0){
				if(vbY < 3){
					vbY *= -2;
				}
				else if(vbY < 5){
					vbY *= -1.5;
				}
			}
			if(vbX > 0){
				vbX *= .5;
				if(vbY < 6){
					vbY *= -1.5;
				}
			}
		}
		if(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 3) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + (((ship.w * 4) / 5) -1))){
			vbY *= -1;
			if(vbX < 0){
				vbX *= -1;
			}
			if(vbX > 0){
				vbX *= 1;
			}
		}
		if(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 4) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + ship.w - 1)){
			if(vbY > 0){
				if(vbX < 0){
					vbY *= -.5;
					if(vbX > -6){
						vbX *= -1.25;
					}
				}
				if(vbX > 0){
					vbY *= -.75;
					if(vbX < 6){
						vbX *= 1.25;
					}
				}
			}
			if(vbY === 0){
				vbY = -2;
			}
		}
	}
}

function gainPoint(){
	timePoint++;
	if(timePoint === 50){
		score += 1;
		timePoint = 0;
	}
}

function mainMusic() {
	if(musicTime === 0){
	musicLevel.play();
	}
	musicTime++;
	if(musicTime === 10600){
		musicTime = 0;
		musicLevel.currentTime = 0;
	}
}

function packOfCollisionEffect(tab,level){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j =0; j < tab[i].length; j++){
			let fnName = "collisionEffect(brk" + ((level * 1000) + (i + memoryLength)) + ", bricktableLevel" + counterLevel + ");";
			eval(fnName);
			memoryLength++;
		}
	}
}

function bouncingBall(){
	if(blc.x < 0 || blc.x > 992){
		snd = new Audio("sound/rebond.wav");
		snd.play();
		vbX *= -1;
	}
	if(blc.y < 0 || blc.y > 492){
		snd = new Audio("sound/rebond.wav");
		snd.play();
		vbY *= -1;
	}
}

function initLife(){
	for(let i = 1; i <= life; i++){
		let fnName = "vie" + i + " = new Image(); vie" + i + ".src = 'img/minispaceship.png';";
		eval(fnName);
	}
}

function lifeRender(){
	for(let i = 1; i <= life; i++){
		let fnName = "CONTEXT.drawImage(vie" + i +", " + i * 25 + ", 25);";
		eval(fnName);
	}		
}

function looseLife(){
	if(blc.y > 490){
		snd = new Audio("sound/wilhelm.wav");
		snd.play();
		life -= 1;
		blc.y = ship.y - 13;
		blc.x = ship.x + (ship.w/2);
		vbX = 0;
		vbY = 0;
		launcher = 1;
	}
	if(launcher === 2 && vbY === 0){
		vbX = Math.random() * 4;
		vbY = Math.random() * -4;
	}
	if(launcher === 1){
		blc.y = ship.y - 13;
		blc.x = ship.x + (ship.w/2);
		vbX = 0;
		vbY = 0;
		setTimeout(function(){launcher = 2;}, 1000);
	}
}

function looseGame(){
	if(life <= 0){
		musicLevel.pause();
		musicLevel.currentTIme = 0;
		startEvent = false;
		looseGameCount = true;
	}
}

function drawScore(){
	CONTEXT.fillStyle = "lightblue";
	CONTEXT.font = "24px Sans-Serif";
	CONTEXT.textAlign = "right";
	CONTEXT.fillText(score + " ", 980, 40);
}

function init(){
	initCanvas();
	initLife();
	ballInit();
	initShip();
	sauvageInit();
	initVariousParameters();
	initGm();
}

function bckRender(){
	CONTEXT.drawImage(background,0,0);
}

function ballrender(){
	CONTEXT.drawImage(ball,blc.x,blc.y);
}

function shiprender(){
	CONTEXT.drawImage(spaceship,ship.x,ship.y);
}

function brickrender(tab){
	for(let i = 0; i < tab.length; i++){
		CONTEXT.drawImage(tab[i][0],tab[i][1],tab[i][2]);
	} 
}

function startRender(){
	CONTEXT.drawImage(start,st.x,st.y);
}

function GmOvRender(){
	CONTEXT.drawImage(over,gm.x,gm.y);
}

function winGame(tab){
	let isSame = true;
	for (let i = 1; isSame && i < tab.length; i++) {
		isSame = ((tab[0][1] === tab[0][2]) && (tab[0][1] === tab[i][1]));
	}
	if(!isSame){
		return false;
	}
	if(isSame){
		level1 = false;
		triple.currentTime = 4;
		triple.play();
		musicLevel.pause();
		startEvent = false;
		endLevel = true;
	}
}

function endOfGame(){
	if(endLevel){
		endGameCounter++;
		if(endGameCounter === 300){
			triple.pause();
		}
	}
}

function fullRender(){
	bckRender();
	if(!startEvent && !looseGameCount){
		startRender();
	}
	shiprender();
	if(!startEvent && looseGameCount){
		GmOvRender();
	}
	if(startEvent){
		ballrender();
		drawScore();
		lifeRender();
		if(level1){
			brickrender(bricktableLevel1);
		}
	}
}

function game(){
	if(startEvent){
		ballRotation();
		ballTravel();
		bouncingBall();
		shipCollision();
		gainPoint();
		looseLife();
		mainMusic();
		if(level1){
			packOfCollisionEffect(brickpositionLevel1,1);
			brickDesign(brickpositionLevel1,1);
			winGame(bricktableLevel1);
		}
	}
}

function main(){
	gameLauncher();
	game();
	looseGame();
	endOfGame();
	fullRender();
}

preInit();

window.onload = function() {
	init();
	setInterval(main, 20);
}