//===================================================================================================//
//  ____  _____ _   _ ____  _____ ____      _    _   _ ____  __  __    _    ___ _   _      _ ____  	 //
// |  _ \| ____| \ | |  _ \| ____|  _ \    / \  | \ | |  _ \|  \/  |  / \  |_ _| \ | |    | / ___| 	 //
// | |_) |  _| |  \| | | | |  _| | |_) |  / _ \ |  \| | | | | |\/| | / _ \  | ||  \| | _  | \___ \   //
// |  _ <| |___| |\  | |_| | |___|  _ <  / ___ \| |\  | |_| | |  | |/ ___ \ | || |\  || |_| |___) |  //
// |_| \_\_____|_| \_|____/|_____|_| \_\/_/   \_\_| \_|____/|_|  |_/_/   \_\___|_| \_(_)___/|____/   //
//																									 //
//===================================================================================================//
                                                                                                 
// Gestionnaire du visuel des points de vie (en haut à gauche de l'écran)

let lifeRender = () => {
	for(let i = 1; i <= life; i++){
		translateFunction("CONTEXT.drawImage(vie" + i +", " + i * 25 + ", 25);");
	}		
}

// Gestionnaire du visuel du score (en haut à droite de l'écran)

let drawScore = () => {
	CONTEXT.fillStyle = "lightblue";
	CONTEXT.font = "24px Sans-Serif";
	CONTEXT.textAlign = "right";
	CONTEXT.fillText(score + " ", 980, 40);
}

// Gestionnaire du visuel des éléments non récurents du jeu

let bckRender = () => CONTEXT.drawImage(background,0,0);
let ballrender = () => CONTEXT.drawImage(ball,blc.x,blc.y);
let shiprender = () => CONTEXT.drawImage(spaceship,ship.x,ship.y);
let startRender = () => CONTEXT.drawImage(start,st.x,st.y);
let cursorRender = () => CONTEXT.drawImage(star,crsr.x,crsr.y);
let GmOvRender = () => CONTEXT.drawImage(over,gm.x,gm.y);
let finalStoryRender = () => CONTEXT.drawImage(finalStory,fnlstr.x,fnlstr.y);
let creditsRender = () => CONTEXT.drawImage(credits,crdt.x,crdt.y);
let finalScreenRender = () => CONTEXT.drawImage(finalScreen,fnlscrn.x,fnlscrn.y);

// Génération dynamique des visuels de briques en fonction de leur points de vie et de leur localisation dans
// le tableau brickposition du départ (voir model.js)

let brickrender = (tab,level) => {
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			translateFunction("if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv > 0){CONTEXT.drawImage(brick" + ((level * 1000) + (i + memoryLength)) + ",brk" + ((level * 1000) + (i + memoryLength)) + ".x,brk" + ((level * 1000) + (i + memoryLength)) + ".y);}");
			memoryLength++;
		}
	} 
}

// Gestionnaire du visuel des éléments récurents d'entre-niveaux

let storyLevelScreenRender = token => translateFunction("CONTEXT.drawImage(storyLevel" + token + "Screen,storylvl" + token + "scrn.x,storylvl" + token + "scrn.y);");
let lvlScreenRender = token => translateFunction("CONTEXT.drawImage(level" + token + "Screen,lvl" + token + "scrn.x,lvl"+ token + "scrn.y);");

// Manager des visuels des élements récurents d'entre-niveaux

let interLevelScreenRender = token => {
	if(swtchStoryScreen && !swtchlvlScreen){
		storyLevelScreenRender(token);
	}
	else if(swtchlvlScreen && !swtchStoryScreen){
		lvlScreenRender(token);
	}
}

// Manager des visuels des écrans de fin de niveau

let endingScreenRenderManager = () => {
	if(endGameStory && (!endGameCredits && !endGameFinalScreen)){
		finalStoryRender();
	}
	else if (endGameCredits && (!endGameStory && !endGameFinalScreen)){
		creditsRender();
	}
	else if(endGameFinalScreen && (!endGameStory && !endGameCredits)){
		finalScreenRender();
	}
}

// Fonction gérant l'intégralité des visuels du jeu en fonction de conditionnelle

let fullRender = () => {
	bckRender();
	if(!startEvent){
		if(!looseGameCount){
			startRender();
			cursorRender();
		}
		else{
			GmOvRender();
		}
	}
	if(startEvent){
		if(swtchInLvl){
			if(!endGame){
				interLevelScreenRender(counterLevel);
			}
			if(endGame){
				endingScreenRenderManager();
			}
		}
		if(!swtchInLvl){
			shiprender();
			ballrender();
			drawScore();
			lifeRender();
			brickrender(translateFunction("brickpositionLevel" + counterLevel),counterLevel);
		}	
	}
}

// Fonction de boucle permettant au jeu de se modifier de manière récurrente grâce au setInterval

let main = () => {
	gameLauncher();
	game();
	fullRender();
}

// Fonction réceptacle de l'intégralité du programme

let ECMA = City => {
	brickBuilder();
	window.onload = function() {
		init();
		setInterval(main, 20);
	}
}