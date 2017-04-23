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

vbX = Math.random() * 4;
vbY = Math.random() * -4;

background = new Image();
spaceship = new Image();
ball = new Image();

background.src = "img/background.png";
spaceship.src = "img/spaceship2.png";
let mouseX;
let mouseY;

blc = {};
ship = {};

brickposition = [[[400,200],[450,200],[500,200],[550,200],
				 [400,220],[450,220],[500,220],[550,220]],
				 [[400,240],[450,240],[500,240],[550,240],
				 [400,260],[450,260],[500,260],[550,260]]];

bricktable = [[background,0,0]];

function ballRotation(){
	if(ballRot >= 1 && ballRot < 25){
		ball.src = "img/ball1.png";
	}
	if(ballRot >= 25 && ballRot < 50){
		ball.src = "img/ball2.png";
	}
	if(ballRot >= 50 && ballRot < 75){
		ball.src = "img/ball3.png";
	}
	if(ballRot >= 75 && ballRot < 100){
		ball.src = "img/ball4.png";
	}
	if(ballRot >= 100 && ballRot <= 125){
		ball.src = "img/ball5.png";
	}
	ballRot++;
	if(ballRot > 125){
		ballRot = 0;
	}
}

function brickImage(tab){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			if(i === 0){
				let fnName = "brick" + (i + memoryLength) + " = new Image(); brick" + (i + memoryLength) + ".src = 'img/metalbrick1.png';";
				eval(fnName);
			}
			if(i === 1){
				let fnName = "brick" + (i + memoryLength) + " = new Image(); brick" + (i + memoryLength) + ".src = 'img/goldbrick1.png';";
				eval(fnName);
			}
			memoryLength++;
		}
	} 
}

brickImage(brickposition);

function createBrick(tab){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			if(i === 0){
				let fnName = "brk" + (i + memoryLength) + " = {}; brk" + (i + memoryLength) + ".pv = 2;";
				eval(fnName);
			}
			if(i === 1){
				let fnName = "brk" + (i + memoryLength) + " = {}; brk" + (i + memoryLength) + ".pv = 3;";
				eval(fnName);
			}
			memoryLength++;
		}
	}
}

createBrick(brickposition);

function spriteDimension(bloc, sprite) {
	bloc.h = sprite.height;
	bloc.w = sprite.width;
}

function packOfSpriteDimension(tab){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			let fnName = "spriteDimension(brk" + (i + memoryLength) + ",brick" + (i + memoryLength) + ");";
			eval(fnName);
			memoryLength++;
		}
	}
}

function brickDesign(tab){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			if(i === 0){
				let fnName = "if(brk" + (i + memoryLength) + ".pv === 1){ brick" + (i + memoryLength) + ".src = 'img/metalbrick2.png'}";
				eval(fnName);	
			}
			if(i === 1){
				let fnName = "if(brk" + (i + memoryLength) + ".pv === 2){ brick" + (i + memoryLength) + ".src = 'img/goldbrick2.png'} if(brk" + (i + memoryLength) + ".pv === 1){ brick" + (i + memoryLength) + ".src = 'img/goldbrick3.png'}";
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

function initBrick(tab){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			let fnName = "brk" + (i + memoryLength) + ".x = " + tab[i][j][0] + "; brk" + (i + memoryLength) + ".y = " + tab[i][j][1] + ";";
			eval(fnName);
			memoryLength++;
		}	
	}
}

function sauvageInit(){
	packOfSpriteDimension(brickposition);
	initBrick(brickposition);
	createBrickTable(brickposition);
}

function souris(e){
	if (e.x != undefined && e.y != undefined){
		mouseX = e.x - 460 - (ship.w/2);
		mouseY = e.y;
	}
	else {
	// Firefox patch
	mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	ship.x = mouseX;
}

function initVariousParameters(){
	CANVAS.addEventListener("mousemove", souris, false);
	let canevas = document.getElementById("canvas");
	canevas.style.cursor = 'none';
}

function createBrickTable(tab){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			let tempoTab = [];
			let fnName = "tempoTab.push(brick" + (i + memoryLength) + "); tempoTab.push(brk" + (i + memoryLength) + ".x); tempoTab.push(brk" + (i + memoryLength) + ".y);";
			eval(fnName);
			bricktable.push(tempoTab);
			memoryLength++;
		}
	}
}

function ballInit(){
	blc.x = 500;
	blc.y = 300;
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
				tab[i][1] = 100000;
				tab[i][2] = 100000;
				brick.x = 100000;
				brick.y = 100000;
			}
		}
	}
}

function collisionEffect(brick){	
	if(collisions(brick,blc)){
		brick.pv -= 1;
		if(brick.pv > 0){
			snd = new Audio("sound/rebond.wav");
			snd.play();
		}
		else{
			snd = new Audio("sound/break.mp3");
			snd.play();
		}
		score += 100;
		brickDeath(brick,bricktable);
		if(blc.y <= brick.y - (brick.h/2)){
			blc.y = blc.y - 20;
			vbY *= -1;
		}
		else {
			if(blc.y >= brick.y + (brick.h/2)){
				blc.y = blc.y + 20;
				vbY *= -1;
			}
			else {
				if(blc.x < brick.x){
				  blc.x = blc.x - blc.w - 20;
				  vbX *= -1;
				}
				else{
					if(blc.x > brick.x){
					  blc.x = blc.x + 20;
					  vbX *= -1;
					}
				}
			}		
		}
	}
}

function shipCollision(){
	if(collisions(blc,ship)){
		if(launcher != 1){
		snd = new Audio("sound/rebond.wav");
		snd.play();
		}
		if(((blc.x + (blc.w / 2) -1) >= ship.x) && ((blc.x + (blc.w / 2) -1) <= ship.x + (ship.w / 5) -1)){
			vbX *= -1.2;
			vbY *= -1;
		}
		if(((blc.x + (blc.w / 2) -1) > ship.x + (ship.w / 5) -1) && ((blc.x + (blc.w / 2) -1) <= ship.x + ((ship.w * 2) / 5 -1))){
			vbX *= -1
			vbY *= -1;
		}
		if(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 2) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + (((ship.w * 3) / 5) -1))){
			vbX *= .5;
			vbY *= -.5;
		}
		if(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 3) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + (((ship.w * 4) / 5) -1))){
			vbX *= 1.15;
			vbY *= -1;
		}
		if(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 4) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + ship.w - 1)){
			vbX *= 1.2;
			vbY *= -1;
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
	musicLevel = new Audio("sound/celestial.mp3");
	if(musicTime === 0){
	musicLevel.play();
	}
	musicTime++;
	if(musicTime === 10600){
		musicTime = 0;
		musicLevel.currentTime = 0;
	}
}

function packOfCollisionEffect(tab){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j =0; j < tab[i].length; j++){
			let fnName = "collisionEffect(brk" + (i + memoryLength) + ");";
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
		life -= 1;
		blc.y = ship.y - blc.h;
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
		blc.y = ship.y - blc.h;
		blc.x = ship.x + (ship.w/2);
		vbX = 0;
		vbY = 0;
		setTimeout(function(){launcher = 2;}, 1000);
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

function fullrender(){
	brickrender(bricktable);
	shiprender();
	ballrender();
	drawScore();
	lifeRender();
}

function embryonMain(){
	ballRotation();
	ballTravel();
	bouncingBall();
	packOfCollisionEffect(brickposition);
	brickDesign(brickposition);
	shipCollision();
	gainPoint();
	looseLife();
	mainMusic();
	fullrender();
}

window.onload = function() {

init();
setInterval(embryonMain, 20);

}