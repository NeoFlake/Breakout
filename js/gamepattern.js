//======================================================================================//
//     ____    _    __  __ _____ ____   _  _____ _____ _____ ____  _   _      _ ____  	//
//    / ___|  / \  |  \/  | ____|  _ \ / \|_   _|_   _| ____|  _ \| \ | |    | / ___|   //
//   | |  _  / _ \ | |\/| |  _| | |_) / _ \ | |   | | |  _| | |_) |  \| | _  | \___ \   //
//   | |_| |/ ___ \| |  | | |___|  __/ ___ \| |   | | | |___|  _ <| |\  || |_| |___) |  //
//    \____/_/   \_\_|  |_|_____|_| /_/   \_\_|   |_| |_____|_| \_\_| \_(_)___/|____/   //
//																						//
//======================================================================================//

 // Manager du déroulement de l'écran d'histoire du jeu                                                                                

let storyManager = token => {
	if(swtchStoryScreen){
		if(translateFunction("storylvl" + token + "scrn.y === 0")){
		setTimeout(function(){if(translateFunction("storylvl" + token + "scrn.y === 0")){translateFunction("storylvl" + token + "scrn.y -=1;")}},3000);
		}
		else if(translateFunction("storylvl" + token + "scrn.y < 0") && translateFunction("storylvl" + token + "scrn.y > -500")){
			translateFunction("storylvl" + token + "scrn.y -= .5");
		}
		else if(translateFunction("storylvl" + token + "scrn.y <= -500")){
			setTimeout(function(){swtchStoryScreen = false; swtchlvlScreen = true;},3000);
		}
	}	
}

// Fonction permettant de différer le lancement du prochain niveau en laissant l'écran Titre du niveau pendant cinq seconde

let lvlScreenManager = () => {
	swtchlvlScreen ? (
		setTimeout(function(){swtchlvlScreen = false; swtchInLvl = false;},5000)
	) : false;
}

// Manager des écrans d'entre-niveaux

let interLevelManager = token => {
	storyManager(token);
	lvlScreenManager();
}

// Manager du déroulement de l'écran d'histoire de la fin du jeu

let endStory = () => {
	if(endGameStory){
		if(fnlstr.y === 0){
			setTimeout(function(){if(fnlstr.y === 0){fnlstr.y -= 1;}}, 3000);
		}
		else if(fnlstr.y > -500){
			fnlstr.y -= .5;
		}
		else if(fnlstr.y <= -500){
			setTimeout(function(){endGameStory = false; endGameCredits = true}, 3000);
		}
	}
}

// Fonction permettant le déroulement des crédits

let endCredits = () => {
	if(endGameCredits){
		if(crdt.y === 0){
			setTimeout(function(){if(crdt.y === 0){crdt.y -= 1;}}, 3000);
		}
		else if (crdt.y > -500){
			crdt.y -= .5;
		}
		else if(crdt.y <= -500){
			setTimeout(function(){endGameCredits = false; endGameFinalScreen = true}, 3000);
		}
	}
}

// Fonction permettant le redémarrage du jeu à la fin de celui-ci au bout de dix secondes

let finalEndScreen = () => {
	endGameFinalScreen ? (
		setTimeout(function(){window.location.reload();}, 100000)
	) : false;
}

// Manager de la fin du jeu

let endGameManager = () => {
	endStory();
	endCredits();
	finalEndScreen();
}

// Fonction de lancement du jeu

let gameLauncher = () => {
	clickStart ? (
		startEvent = true,
		clickStart = false,
		swtchInLvl = true,
		swtchStoryScreen = true
	) : false;
}

// Gestionnaire de l'intégralité des fonctions inhérente à la partie jouable du jeu (et des entre-niveaux)

let game = () => {
	if(startEvent){
		ballRotation();
		ballTravel();
		bouncingBall();
		shipCollisionManager();
		gainPoint();
		looseLife();
		looseGame();
		if(swtchInLvl){
			if(!endGame){
				interLevelManager(counterLevel);
				interLevelMusicManager();
			}
			if(endGame){
				endGameManager();
				endGameMusicManager();
			}
		}
		if(!swtchInLvl){
			if(counterLevel === 1){
				packOfCollisionEffect(translateFunction("brickpositionLevel" + counterLevel),counterLevel);
			}
			if(counterLevel > 1 && launcher != 1){
				packOfCollisionEffect(translateFunction("brickpositionLevel" + counterLevel),counterLevel);
			}
			brickDesign(translateFunction("brickpositionLevel" + counterLevel),counterLevel);
			levelMusic(counterLevel);
			winLevelMusicLauncher(translateFunction("brickpositionLevel" + counterLevel),counterLevel);
			passLevel(translateFunction("brickpositionLevel" + counterLevel),counterLevel);
		}
	}
	if(!startEvent){
		gameOverMusicManager(counterLevel);
	}
}