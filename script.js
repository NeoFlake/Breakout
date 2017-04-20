CANVAS = document.getElementById("canvas");
CONTEXT = CANVAS.getContext("2d");

H = 500;
W = 1000;

vbX = Math.random() * 4;
vbY = Math.random() * 4;

background = new Image();
spaceship = new Image();
ball = new Image();

background.src = "img/background.png";
spaceship.src = "img/spaceship.png";
ball.src = "img/ball.png";

let mouseX;
let mouseY;

blc = {};
ship = {};

brickposition = [[400,200],[440,200],[480,200],[520,200],
				 [400,215],[440,215],[480,215],[520,215],
				 [400,230],[440,230],[480,230],[520,230],
				 [400,245],[440,245],[480,245],[520,245]];

bricktable = [[background,0,0]];

function brickImage(tab){
	for(let i = 0; i < tab.length; i++){
		let fnName = "brick" + i + " = new Image(); brick" + i + ".src = 'img/basicbrick.png';";
		eval(fnName);
	} 
}

brickImage(brickposition);

function createBrick(tab){
	for(let i = 0; i < tab.length; i++){
		let fnName = "brk" + i + " = {}; brk" + i + ".pv = 2;";
		eval(fnName);
	}
}

createBrick(brickposition);

function spriteDimension(bloc, sprite) {
	bloc.h = sprite.height;
	bloc.w = sprite.width;
}

function packOfSpriteDimension(tab){
	for(let i = 0; i < tab.length; i++){
		let fnName = "spriteDimension(brk" + i + ",brick" + i + ");";
		eval(fnName);
	}
}

function initShip(){
	ship.h = spaceship.height;
	ship.w = spaceship.width;
	ship.x = (W - ship.w) / 2;
	ship.y = 450;
}

function initBrick(tab){
	for(let i = 0; i < tab.length; i++){
		let fnName = "brk" + i + ".x = " + tab[i][0] + "; brk" + i + ".y = " + tab[i][1] + ";";
		eval(fnName);
	}
}

function sauvageInit(){
	packOfSpriteDimension(brickposition);
	initBrick(brickposition);
	createBrickTable(brickposition);
}

function souris(e){
	if (e.x != undefined && e.y != undefined){
		mouseX = e.x - 500;
		mouseY = e.y;
	}
	else {
	// Firefox patch
	mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
}

function initVariousParameters(){
	CANVAS.addEventListener("mousemove", souris, false);
	let canevas = document.getElementById("canvas");
	canevas.style.cursor = 'none';
	// document.body.style.cursor = 'none';
}

function createBrickTable(tab){
	for(let i = 0; i < tab.length; i++){
		let tempoTab = [];
		let fnName = "tempoTab.push(brick" + i + "); tempoTab.push(brk" + i + ".x); tempoTab.push(brk" + i + ".y);";
		eval(fnName);
		bricktable.push(tempoTab);
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
		
		vbY *= -1;
	}
}

function packOfCollisionEffect(tab){
	for(let i = 0; i < tab.length - 2; i++){
		let fnName = "collisionEffect(brk" + i + ");";
		eval(fnName);
	}
}

function bouncingBall(){
	if(blc.x < 0 || blc.x > 992){
		vbX *= -1;
	}
	if(blc.y < 0 || blc.y > 492){
		vbY *= -1;
	}
}

function init(){
	initCanvas();
	ballInit();
	initShip();
	sauvageInit();
	initVariousParameters();
}

function shipTravel(){
	ship.x = mouseX;
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
}

function embryonMain(){
	shipTravel();
	ballTravel();
	bouncingBall();
	packOfCollisionEffect(bricktable);
	shipCollision();
	fullrender();
}

window.onload = function() {

init();
setInterval(embryonMain, 15);

}