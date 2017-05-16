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
interlevelOn = false;
endGameCounter = 0;
startEvent = false;
clickStart = false;
endLevel = false;
looseGameCount = false;
swtchInLvl = false;

vbX = 0;
vbY = 0;

background = new Image();
star = new Image();
spaceship = new Image();
ball = new Image();
start = new Image();

interLevel1Screen = new Image();

background.src = "img/background.png";
star.src = "img/star.png";
spaceship.src = "img/spaceship2.png";
start.src = "img/start.png";
ball.src = "img/ball1.png";
interLevel1Screen.src = "img/interlevel.png";

let mouseX;
let mouseY;

blc = {};
crsr = {}; 
ship = {};
st = {};
inlvl1Scrn = {};

brickpositionLevel1 = 	[[[400,200],[450,200]]];

brickpositionLevel2 = [[[400,200],[450,200],[500,200],[550,200],[400,220],[550,220],
						[400,240],[550,240],[400,260],[450,260],[500,260],[550,260]],
						[[450,240]],[[450,220],[500,240]],[[500,220]]];

function initSt(){
	st.x = 0;
	st.y = 0;
}

function initInLvlObj1(){
	inlvl1Scrn.x = 0;
	inlvl1Scrn.y = 0;
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

function initStar(){
	crsr.h = star.height;
	crsr.w = star.width;
	crsr.x = (W - crsr.w) / 2;
	crsr.y = (H - crsr.h) /2;
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

function brickInit(){
	for(let i = 1; i < 3; i++){
		brickImage(eval("brickpositionLevel" + i),i);
		createBrick(eval("brickpositionLevel" + i),i);
	}
}

function sauvageInit(){
	for(let i = 1; i < 3; i++){
		packOfSpriteDimension(eval("brickpositionLevel" + i),i);
		initBrick(eval("brickpositionLevel" + i),i);
	}
}

function souris(e){
	if (e.x != undefined && e.y != undefined){
		mouseX = (e.x -= CANVAS.offsetLeft);
		mouseY = (e.y -= CANVAS.offsetTop);
	}
	else {
		// Firefox patch
		mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	ship.x = mouseX - (ship.w / 2);
	crsr.x = mouseX - (crsr.w / 2);
	crsr.y = mouseY - (crsr.h / 2);
}

function getPosition(event){
	Click_x = event.x;
	Click_y = event.y;
	Click_x -= canvas.offsetLeft;
	Click_y -= canvas.offsetTop;

	if(collisions(st, crsr) && !startEvent){
		clickStart = true;
	}
}

function keyboardManager(e){
	if(!startEvent){
		if(e.keyCode === 13){
			e.preventDefault();
			clickStart = true;
		}
	}
	if(startEvent){
		if(e.keyCode === 37){
			e.preventDefault();
			ship.x -= 10;
		}
		if(e.keyCode === 39){
			e.preventDefault();
			ship.x += 10;
		}
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
	window.addEventListener("keydown", keyboardManager, false);
	document.getElementById("canvas").style.cursor = 'none';
}

function ballInit(){
	blc.y = 400;
	blc.x = 500;
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

function brickDeath(brick){
	if(brick.pv <= 0) {
		score += 1000;
		brick.h = 0;
		brick.w = 0;
	}
}

function collisionEffect(brick){	
	if(collisions(brick,blc)){
		score += 100;
		if(blc.y <= brick.y + (brick.h/2)){
			blc.y = blc.y - 13;
			vbY *= -1;
		}
		else {
			if(blc.y >= brick.y - (brick.h/2)){
				blc.y = blc.y + 13;
				vbY *= -1;
			}
			else {
				if(blc.x < (brick.x + brick.w)){
				  blc.x = blc.x - blc.w - 13;
				  vbX *= -1;
				}
				else{
					if((blc.x + blc.w) > brick.x){
					  blc.x = blc.x + 13;
					  vbX *= -1;
					}
				}
			}		
		}
		brick.pv -= 1;
		brickDeath(brick);
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

function leftShipCollision(){
	if(((blc.x + (blc.w / 2) -1) >= ship.x) && ((blc.x + (blc.w / 2) -1) <= ship.x + (ship.w / 5) -1)){
		if(vbX < 0 && vbX > -6){
			vbX -= 1;
		}
		else if(vbX > 0 && vbX < 6){
			vbX = (vbX * -1) -1;
		}
		else {
			vbX = -2;
		}
		if(vbY > 0){
			if(vbY < 4){
				vbY *= -1;
			}
			else if(vbY >= 4){
				vbY = (vbY * -1) +1;
			}
		}
	}
}

function middleLeftShipCollision(){
	if(((blc.x + (blc.w / 2) -1) > ship.x + (ship.w / 5) -1) && ((blc.x + (blc.w / 2) -1) <= ship.x + ((ship.w * 2) / 5 -1))){
		vbY *= -1;
		if(vbX < 0){
			vbX *= 1;
		}
		else if(vbX > 0){
			vbX *= -1;
		}
		else{
			vbX = -1;
		}
	}
}

function middleShipCollision(){
	if(launcher != 2){
		if(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 2) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + (((ship.w * 3) / 5) -1))){
			if(vbX > 0){
				vbX -= 1;
			}
			else if(vbX < 0){
				vbX += 1;
			}
			if(vbY < 6){
				vbY = (vbY * -1) -1;
			}
			else {
				vbY *= -1;
			}
		}
	}
}

function middleRightShipCollision(){
	if(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 3) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + (((ship.w * 4) / 5) -1))){
		vbY *= -1;
		if(vbX < 0){
			vbX *= -1;
		}
		else if(vbX > 0){
			vbX *= 1;
		}
		else {
			vbX = 1;
		}
	}
}

function rightShipCollision(){
	if(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 4) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + ship.w - 1)){
		if(vbX < 0 && vbX > -6){
			vbX = (vbX * -1) +1;
		}
		else if(vbX > 0 && vbX < 6){
			vbX += 1;
		}
		else {
			vbX = 2;
		}
		if(vbY > 0){
			if(vbY < 4){
				vbY *= -1;
			}
			else if(vbY >= 4){
				vbY = (vbY * -1) +1;
			}
		}
	}
}

function shipCollisionManager(){
	if(collisions(ship,blc)){
		if(launcher != 1){
		snd = new Audio("sound/rebond.wav");
		snd.play();
		}
		leftShipCollision();
		middleLeftShipCollision();
		middleShipCollision();
		middleRightShipCollision();
		rightShipCollision();
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
	musicLevel = new Audio("sound/celestial.mp3");
	if(musicTime === 0){
	musicLevel.play();
	musicLevel.volume = 0.4;
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
			let fnName = "if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv > 0){collisionEffect(brk" + ((level * 1000) + (i + memoryLength)) + ");}";
			eval(fnName);
			memoryLength++;
		}
	}
}

function bouncingBall(){
	if(blc.x < 0 || blc.x > 992){
		snd = new Audio("sound/rebond.wav");
		snd.play();
		snd.volume = 0.7;
		vbX *= -1;
	}
	if(blc.y < 0 || blc.y > 492){
		snd = new Audio("sound/rebond.wav");
		snd.play();
		snd.volume = 0.7;
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

function stickTheBallOnTheShip(){
	blc.y = ship.y - 13;
	blc.x = ship.x + (ship.w/2);
	vbX = 0;
	vbY = 0;
}

function initialVector(){
	vbX = Math.round(Math.random() * 4) + 2;
	vbY = (Math.round(Math.random() * 4) + 2) * -1;
	launcher = 0;
}

function ballLauncher(){
	CANVAS.addEventListener("click", function(){launcher = 2;});
	window.addEventListener("keypress", function(e){
		if(e.keyCode === 32){
			e.preventDefault();
			launcher = 2;
		}
	});
}

function launcherOnPhaseOne(){
	if(launcher === 1){
		stickTheBallOnTheShip();
		ballLauncher();
	}
}

function launcherOnPhaseTwo(){
	if(launcher === 2 && vbY === 0 && vbX === 0){
		initialVector();
	}
}

function launcherSwitch(){
	launcherOnPhaseOne();
	launcherOnPhaseTwo();
}

function looseLife(){
	if(blc.y > 490){
		snd = new Audio("sound/wilhelm.wav");
		snd.play();
		snd.volume = 0.7;
		life -= 1;
		stickTheBallOnTheShip();
		launcher = 1;
	}
	launcherSwitch();
}

function drawScore(){
	CONTEXT.fillStyle = "lightblue";
	CONTEXT.font = "24px Sans-Serif";
	CONTEXT.textAlign = "right";
	CONTEXT.fillText(score + " ", 980, 40);
}

function init(){
	initCanvas();
	initInLvlObj1();
	initLife();
	ballInit();
	initStar();
	initShip();
	sauvageInit();
	initVariousParameters();
	launcher = 1;
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

function brickrender(tab,level){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			let fnName = "if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv > 0){CONTEXT.drawImage(brick" + ((level * 1000) + (i + memoryLength)) + ",brk" + ((level * 1000) + (i + memoryLength)) + ".x,brk" + ((level * 1000) + (i + memoryLength)) + ".y);}";
			eval(fnName);
			memoryLength++;
		}
	} 
}

function startRender(){
	CONTEXT.drawImage(start,st.x,st.y);
}

function interLevelScreenRender(){
	CONTEXT.drawImage(interLevel1Screen,inlvl1Scrn.x,inlvl1Scrn.y);
}

function cursorRender(){
	CONTEXT.drawImage(star,crsr.x,crsr.y);
}

function GmOvRender(){
	CONTEXT.drawImage(over,gm.x,gm.y);
}

function winLevel(tab,level){
	bricksCleared = true;
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			let fnName = "if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv > 0){bricksCleared = false;}";
			eval(fnName);
			memoryLength++;
		}	
	}
	return bricksCleared;
}

function passLevel(tab,level){
	if(winLevel(tab,level)){
		launcher = 1;
		swtchInLvl = true;
	}
}

function interLevelManager() {
	if(inlvl1Scrn.y > -500){
		inlvl1Scrn.y -= 1;
	}
	if(inlvl1Scrn.y <= -500){
		setTimeout(function(){counterLevel++; swtchInLvl = false;},3000);
	}
}

function fullRender(){
	bckRender();
	startRender();
	if(!startEvent){
		cursorRender();
	}
	if(startEvent){
		if(swtchInLvl){
			interLevelScreenRender();
		}
		if(!swtchInLvl){
			shiprender();
			ballrender();
			drawScore();
			lifeRender();
			switch(counterLevel){
				case 1:
					brickrender(brickpositionLevel1,1);
					break;
				case 2:
					brickrender(brickpositionLevel2,2);
					break;
				default:
					break;
			}
		}	
	}
}

function game(){
	if(startEvent){
		ballRotation();
		ballTravel();
		bouncingBall();
		shipCollisionManager();
		gainPoint();
		looseLife();
		mainMusic();
		if(swtchInLvl){
			interLevelManager();
		}
		if(!swtchInLvl){
			if(counterLevel === 1){
				packOfCollisionEffect(brickpositionLevel1,1);
				brickDesign(brickpositionLevel1,1);
				passLevel(brickpositionLevel1,1);
			}
			if(counterLevel === 2){
				if(launcher != 1){
					packOfCollisionEffect(brickpositionLevel2,2);
				}
				brickDesign(brickpositionLevel2,2);
				passLevel(brickpositionLevel2,2);
			}
		}
	}
}

function main(){
	gameLauncher();
	game();
	fullRender();
}

brickInit();

window.onload = function() {
	init();
	setInterval(main, 20);
}