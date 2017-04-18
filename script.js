CANVAS = document.getElementById("canvas");
CONTEXT = CANVAS.getContext("2d");

H = 500;
W = 1000;

vbX = Math.random() * 16;
vbY = Math.random() * 16;

background = new Image();
spaceship = new Image();
ball = new Image();

background.src = "img/background.png";
spaceship.src = "img/spaceship.png";
ball.src = "img/ball.png";

let mouseX;

blc = {};
ship = {};

brickposition = [[400,200],[440,200],[480,200],[520,200],[400,215],[440,215],[480,215],[520,215],[400,230],[440,230],[480,230],[520,230],[400,245],[440,245],[480,245],[520,245]];

bricktable = [[background,0,0],[spaceship,300,450]];

function brickImage(tab){
	for(let i = 0; i < tab.length; i++){
		let fnName = "brick" + i + " = new Image(); brick" + i + ".src = 'img/basicbrick.png';";
		eval(fnName);
	} 
}

brickImage(brickposition);

function createBrick(tab){
	for(let i = 0; i < tab.length; i++){
		let fnName = "brk" + i + " = {};"
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

function createBrickTable(tab){
	for(let i = 0; i < tab.length; i++){
		let tempoTab = [];
		let fnName = "tempoTab.push(brick" + i + "); tempoTab.push(brk" + i + ".x); tempoTab.push(brk" + i + ".y);";
		eval(fnName);
		bricktable.push(tempoTab);
	}
}

function ballInit(){
	blc.x = (Math.random() * 10) * (Math.random() * 10) * (Math.random() * 10);
	blc.y = 150;
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

function parLeX(a,b){
	if((!(a.x > b.x+b.w) || !(a.x+a.w < b.x)) && (a.y != b.y+b.h) && (a.y+a.h != b.y)){
			vbX *= -1;
			console.log(a);
		}
}

function parLeY(a,b){
	if((!(a.y > b.y+b.h) || !(a.y+a.h < b.y)) && (a.x != b.x+b.w) && (a.x+a.w != b.x)){
			vbY *= -1;
			console.log(a);
		}
}

function collisionEffect(brick){	
		if(collisions(brick,blc)){	
		parLeX(brick,blc);
		parLeY(brick,blc);
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
	sauvageInit();
}

function ballrender(){
	CONTEXT.drawImage(ball,blc.x,blc.y);
}

function brickrender(tab){
	for(let i = 0; i < tab.length; i++){
		CONTEXT.drawImage(tab[i][0],tab[i][1],tab[i][2]);
	} 
}

function fullrender(){
	brickrender(bricktable);
	ballrender();
}

function embryonMain(){
	ballTravel();
	bouncingBall();
	packOfCollisionEffect(bricktable);
	fullrender();
}

window.onload = function() {

init();
setInterval(embryonMain, 10);

}