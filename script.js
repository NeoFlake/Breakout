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
startEvent = false;
clickStart = false;
level1 = false;
level2 = false;
levelcounter = 1;

vbX = Math.round(Math.random()* 6);
vbY = Math.round(Math.random()* -6);

background = new Image();
spaceship = new Image();
ball = new Image();
start = new Image();

background.src = "img/background.png";
spaceship.src = "img/spaceship2.png";
start.src = "img/start.png";
ball.src = "img/ball1.png";

let mouseX;
let mouseY;

blc = {};
ship = {};
st = {};

 brickpositionLevel1 = 	[[[400,200],[450,200],[500,200],[550,200]]];

brickpositionLevel2 = [[[400,200],[450,200],[500,200],[550,200],[400,220],[550,220],
						[400,240],[550,240],[400,260],[450,260],[500,260],[550,260]],
						[[450,240]],[[450,220],[500,240]],[[500,220]]];

function initSt(){
	st.x = 0;
	st.y = 0;
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
	packOfSpriteDimension(brickpositionLevel2,2);
	initBrick(brickpositionLevel2,2);
}

function souris(e){
	if (e.x != undefined && e.y != undefined){
		mouseX = e.x - (ship.w / 2);
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

	if(collisions(st, ship) && !startEvent){
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
			for(let j = 0; j < tab[i].length; j++){
				if(brick.x === tab[i][j][0] && brick.y === tab[i][j][1]){
					tab[i][j][0] = 100000;
					tab[i][j][1] = 100000;
					brick.x = 100000;
					brick.y = 100000;
				}
			} 
		}
	}
}

function collisionEffect(brick,brickTab){	
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

function packOfCollisionEffect(tab,level){
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j =0; j < tab[i].length; j++){
			let fnName = "collisionEffect(brk" + ((level * 1000) + (i + memoryLength)) + ",brickpositionLevel" + counterLevel + ");";
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

function winLevel(tab){
	let isSame = true;
	for (let i = 0; isSame && i < tab.length; i++) {
		for(let j = 1; isSame && j < tab[i].length; j++){
			isSame = ((tab[i][0][0] === tab[i][0][1]) && (tab[i][0][0] === tab[i][j][0]));
		}
	}
	if(!isSame){
		return false;
	}
	else {
		return true;
	}
}

function passTheLevel(tab,level){
	if(winLevel(tab)){
		let fnName = "level" + level + "= false; level" + (level + 1) + "= true;";
		eval(fnName);
	}
}

function fullRender(){
	bckRender();
	startRender();
	shiprender();
	if(startEvent){
		ballrender();
		drawScore();
		lifeRender();
		if(level1){
			brickrender(brickpositionLevel1,1);
		}
		if(level2){
			brickrender(brickpositionLevel2,2);
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
		if(level1 && !level2){
			packOfCollisionEffect(brickpositionLevel1,1);
			brickDesign(brickpositionLevel1,1);
			passTheLevel(brickpositionLevel1,1);
		}
		if(level2 && !level1){
			packOfCollisionEffect(brickpositionLevel2,2);
			brickDesign(brickpositionLevel2,2);
		}
	}
}

function main(){
	gameLauncher();
	game();
	fullRender();
}

preInit();

window.onload = function() {
	init();
	setInterval(main, 20);
}