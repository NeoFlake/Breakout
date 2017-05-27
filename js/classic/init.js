 //====================================//
 //    ___ _   _ ___ _____    _ ____   //
 //   |_ _| \ | |_ _|_   _|  | / ___|  //
 //    | ||  \| || |  | | _  | \___ \  //
 //    | || |\  || |  | || |_| |___) | //
 //   |___|_| \_|___| |_(_)___/|____/  //
 //									   //
 //====================================//

// Initialisation des éléments non récurents du jeu                           

let initSt = () => {
	st.x = 0;
	st.y = 0;
}

let initGm = () => {
	gm.x = 0;
	gm.y = 0;
}

let initFinalScreens = () => {
	fnlstr.x = 0;
	fnlstr.y = 0;
	crdt.x = 0;
	crdt.y = 0;
	fnlscrn.x = 0;
	fnlscrn.y = 0;
}

let initStar = () => {
	crsr.h = star.height;
	crsr.w = star.width;
	crsr.x = (W - crsr.w) / 2;
	crsr.y = (H - crsr.h) /2;
}

let initShip = () => {
	ship.h = spaceship.height;
	ship.w = spaceship.width;
	ship.x = (W - ship.w) / 2;
	ship.y = 425;
}

let ballInit = () => {
	blc.y = 400;
	blc.x = 500;
	blc.h = ball.height;
	blc.w = ball.width;
}

let initCanvas = () => {
	CANVAS.height = H;
	CANVAS.width = W;
}

// Initialisation des écrans de chargement d'entre-niveaux

let initLoadingObj = token => "lvl" + token + "scrn.x = 0; lvl" + token + "scrn.y = 0;";
let initStoryScreenObj = token => "storylvl" + token + "scrn.x = 0; storylvl" + token + "scrn.y = 0;";

// Reliaison entre la taille d'un objet physique avec son image associé

let spriteDimension = (bloc, sprite) => {
	bloc.h = sprite.height;
	bloc.w = sprite.width;
}

// Manager permettant de créer dynamiquement les fonctions de reliaison de taille physique/image

let packOfSpriteDimension = (tab,level) => {
	memoryLength = 0;
	spriteDimension(st,start);
	initSt();
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			translateFunction("spriteDimension(brk" + ((level * 1000) + (i + memoryLength)) + ",brick" + ((level * 1000) + (i + memoryLength)) + ");");
			memoryLength++;
		}
	}
}

// Initialisation des objets récurrents du jeu (les briques en l'occurence)

let initBrick = (tab,level) => {
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			translateFunction("brk" + ((level * 1000) + (i + memoryLength)) + ".x = " + tab[i][j][0] + "; brk" + ((level * 1000) + (i + memoryLength)) + ".y = " + tab[i][j][1] + ";");
			memoryLength++;
		}	
	}
}

// Manager permettant d'exécuter l'ensemble de la génération de briques plus rapidement

let sauvageInit = () => {
	for(let i = 1; i < 4; i++){
		packOfSpriteDimension(eval("brickpositionLevel" + i),i);
		initBrick(eval("brickpositionLevel" + i),i);
	}
}

// Manager du positionnement de la souris dans le jeu

let souris = (e) => {
	(e.x != undefined && e.y != undefined) ? 
	(mouseX = (e.x -= CANVAS.offsetLeft), mouseY = (e.y -= CANVAS.offsetTop)) :
	// Firefox Patch
	(mouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, mouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop );

	ship.x = mouseX - (ship.w / 2);
	crsr.x = mouseX - (crsr.w / 2);
	crsr.y = mouseY - (crsr.h / 2);
}

// Manager permettant de récupérer le clic gauche souris et de l'interpréter en fonction de certaines conditions

let getPosition = event => {
	Click_x = event.x;
	Click_y = event.y;
	Click_x -= canvas.offsetLeft;
	Click_y -= canvas.offsetTop;

	!startEvent ? (
		clickStart = true, 
		tryAgainCount = false ) : false;
		
	(looseGameCount || (endGame && endGameFinalScreen)) ? window.location.reload() : false;
}

// Manager permettant de gérer l'utilisation du clavier à la place de la souris

let keyboardManager = e => {
	e.keyCode === 13 ? (
		!startEvent ? clickStart = true : false,
		((endGame && endGameFinalScreen) || looseGameCount) ? window.location.reload() : false
	) : false;
	(startEvent && !swtchInLvl) ? (
		e.keyCode === 37 ? (
			ship.x >= -20 ? ship.x -= 30 : ship.x = 930
		) : false,
		e.keyCode === 39 ? (
			ship.x <= 930 ? ship.x += 30 : ship.x = -50
		) : false
	) : false;
	(e.keyCode === 13 || e.keyCode === 37 || e.keyCode === 39) ? e.preventDefault() : false;
}

// Manager permettant de générer les objets lié à l'entre-niveaux

let initInterLevelObjManager = token => {
	translateFunction(initLoadingObj(token));
	translateFunction(initStoryScreenObj(token));
}

// Manager global permettant la génération des écrans d'entre-niveaux

let initInterLevelManager = () => {
	for(let i = 1; i < 4; i++){
		createInterLevelScreenManager(i);
		initInterLevelObjManager(i);
	}
}

// Initialisation des écouteurs d'évènements

let initEventListener = () => {
	window.addEventListener("mousemove", souris, false);
	CANVAS.addEventListener("mousedown", getPosition, false);
	window.addEventListener("keydown", keyboardManager, false);
	document.getElementById("canvas").style.cursor = 'none';
}

// Fonction Manager permettant d'initialiser toutes les fonctions préalablement créées

let init = () => {
	initCanvas();
	initInterLevelManager();
	initFinalScreens();
	initLife();
	initMusicLevel();
	ballInit();
	initGm();
	initStar();
	initShip();
	sauvageInit();
	initEventListener();
	launcher = 1;
}