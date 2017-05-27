 //==============================================================================//
 //     ____ ___  _   _ _____ ____   ___  _     _     _____ ____       _ ____  	 //
 //    / ___/ _ \| \ | |_   _|  _ \ / _ \| |   | |   | ____|  _ \     | / ___|   //
 //   | |  | | | |  \| | | | | |_) | | | | |   | |   |  _| | |_) | _  | \___ \   //
 //   | |__| |_| | |\  | | | |  _ <| |_| | |___| |___| |___|  _ < | |_| |___) |  //
 //    \____\___/|_| \_| |_| |_| \_\\___/|_____|_____|_____|_| \_(_)___/|____/   //
 //																				 //
 //==============================================================================//
                                                                          
// Manager de collision, fonction renvoyant true s'il y a une collision et false dans tous les cas contraires

let collisions = (A,B) => {
	if (A.y+A.h < B.y || A.y > B.y+B.h || A.x > B.x+B.w || A.x+A.w < B.x)
		return false;
	return true;
}

// Fonction gérant le positionnement de la balle en fonction de ses vectorielles de déplacement

let ballTravel = () => {
	blc.x += vbX;
	blc.y += vbY;
}

// Permet à la balle de rebondir contre les murs

let bouncingBall = () => {
	(blc.x < 0 || blc.x > 992) ? (
		(!vbX && blc.x < 0) ? vbX = 2 : false,
		(!vbX && blc.x > 992) ? vbX = -2 : false,
		vbX *= -1
	) : false;
	(blc.y < 0 || blc.y > 492) ? (
		vbY *= -1
	) : false;
}

// Permet de corriger un bug permettant à la balle de sortir de l'écran de jeu

let ballOnTheBattlefront = () => {
	launcher != 1 ? (
		(blc.x > W) ? (
			blc.x = W - blc.w, 
			vbY = -2 
		) : false,
		(blc.x <= -blc.w/2) ? (
			blc.x = 0, 
			vbY = -2
		) : false
	) : false;
}

// Manager d'un ensemble de fonction inhérente à la balle

let ballManager = () => {
	ballRotation();
	ballTravel();
	bouncingBall();
	ballOnTheBattlefront();
}

// Permet de réinitialiser la balle contre le paddle de jeu

let stickTheBallOnTheShip = () => {
	blc.y = ship.y - 13;
	blc.x = ship.x + (ship.w/2);
	vbX = 0;
	vbY = 0;
}

// Écouteur d'évènement permetttant de lancer la balle

let ballLauncher = () => {
	CANVAS.addEventListener("click", function(){(startEvent && !swtchInLvl) ? launcher = 2 : false;});
	window.addEventListener("keypress", function(e){
		(startEvent && !swtchInLvl) ? (
			e.keyCode === 32 ? (
				e.preventDefault(),
				launcher = 2
			) : false
		) : false;
	});
}

// Défini le vecteur initial de la balle de manière aléatoire

let initialVector = () => {
	(((ship.x + (ship.w/2)) >= 0) && ((ship.x + (ship.w/2)) <= 200)) ? (
		vbX = Math.round(Math.random() * -2) - 4,
		vbY = Math.round(Math.random() * -2) - 2
	) : false;
	(((ship.x + (ship.w/2)) > 200) && ((ship.x + (ship.w/2)) <= 400)) ? (
		vbX = Math.round(Math.random() * -2) - 2,
		vbY = Math.round(Math.random() * -2) - 4
	) : false;
 	(((ship.x + (ship.w/2)) > 400) && ((ship.x + (ship.w/2)) <= 600)) ? (
 		vbX = Math.round(Math.random() * (Math.random() * -1)),
		vbY = Math.round(Math.random()) + 5
 	) : false;
 	(((ship.x + (ship.w/2)) > 600) && ((ship.x + (ship.w/2)) <= 800)) ? (
 		vbX = Math.round(Math.random() * 2) + 2,
		vbY = Math.round(Math.random() * -2) - 4
 	) : false;
 	(((ship.x + (ship.w/2)) >= 800) && ((ship.x + (ship.w/2)) <= 1000)) ? (
 		vbX = Math.round(Math.random() * 2) + 4,
		vbY = Math.round(Math.random() * -2) - 2
 	) : false;
	launcher = 0;
}

// Phase de lancement de la balle; permet de réinitialiser la balle sur le paddle lors d'un changement de niveau
// ou de la perte d'un point de vie et de la relancer grâce au ballLauncher

let launcherOnPhaseOne = () => {
	launcher === 1 ? (
		stickTheBallOnTheShip(),
		ballLauncher()
	) : false;
}

// Phase de lancement de la balle

let launcherOnPhaseTwo = () => (launcher === 2 && vbY === 0 && vbX === 0) ? initialVector() : false;

// Manager de la réinitialisation de la balle et de son lancement

let launcherSwitch = () => {
	launcherOnPhaseOne();
	launcherOnPhaseTwo();
}

// Gain de point en fonction du temps de survie dans le jeu (de manière active, s'arrête entre les niveaux)

let gainPoint = () => {
	(startEvent && !swtchInLvl) ? (
		timePoint++,
		timePoint === 50 ? (
			score += 1,
			timePoint = 0
		) : false
	) : false;
}

// Manager de collision permettant de différencier les types de rebond en fonction de l'endroit de la collision
// entre la balle et une brique

let collisionEffect = brick => {	
	collisions(brick,blc) && !inCollision ? (
		inCollision = true,
		brick.pv > 0 ? boundSnd.play() : (destroySnd.play(), score += 1000),
		//Collision sur la gauche ou la droite
		((blc.y + (blc.h/2) >= brick.y) && ((blc.y + (blc.h/2)) <= (brick.y + brick.h))) ? (
			(blc.x <= (brick.x + brick.w)) || ((blc.x + blc.w) >= brick.x) ? (
				vbX *= -1,
				score += 100,
				brick.pv -= 1
			) : false
		) : false,
		//Collision sur le haut ou le bas
		(((blc.x + (blc.w/2)) >= brick.x) && ((blc.x + (blc.w/2)) <= (brick.x + brick.w))) ? (
			(blc.y <= (brick.y + brick.h)) || ((blc.y + blc.h) >= brick.y) ? (
				vbY *= -1,
				score += 100,
				brick.pv -= 1 
			) : false
		) : false
	) : false,
	!collisions(brick,blc) ? inCollision = false : false
}

// Manager permettant générer de manière dynamique l'intégralité des collisions entre la balle et les briques

let packOfCollisionEffect = (tab,level) => {
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j =0; j < tab[i].length; j++){
			translateFunction("if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv > 0){collisionEffect(brk" + ((level * 1000) + (i + memoryLength)) + ");}");
			memoryLength++;
		}
	}
}

// ATTENTION: Ensemble de fonctions permettant la gestion du rebond de la balle en fonction de l'endroit où à frappé
// la balle sur le paddle de jeu et également en fonction des vectorielles qui composent la direction de la balle

// Côté gauche

let leftShipCollision = () => {
	((blc.x + (blc.w / 2) -1) >= ship.x) && ((blc.x + (blc.w / 2) -1) <= ship.x + (ship.w / 5) -1) ? (
		(vbX < 0 && vbX > -6) ? vbX -= 1 : (
			(vbX > 0 && vbX < 6) ? vbX = (vbX * -1) -1 : vbX = -2
		),
		vbY > 0 ? (
			vbY < 4 ? vbY *= -1 : vbY = (vbY * -1) +1
		) : false
	) : false;
}

// Côté centre gauche

let middleLeftShipCollision = () => {
	((blc.x + (blc.w / 2) -1) > ship.x + (ship.w / 5) -1) && ((blc.x + (blc.w / 2) -1) <= ship.x + ((ship.w * 2) / 5 -1)) ? (
		vbY *= -1,
		vbX < 0 ? vbX *= 1 : 
			vbX > 0 ? vbX *= -1 : vbX = -1
	) : false;
}

// Centre

let middleShipCollision = () => {
	launcher != 2 ? (
		(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 2) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + (((ship.w * 3) / 5) -1))) ? (
			vbX > 0 ? vbX -= 1 : 
				vbX < 0 ? vbX += 1 : false,
			vbY < 6 ? vbY = (vbY * -1) -1 : vbY *= -1
		) : false
	) : false;
}

// Côté centre droit

let middleRightShipCollision = () => {
	(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 3) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + (((ship.w * 4) / 5) -1))) ? (
		vbY *= -1,
		vbX < 0 ? vbX *= -1 : 
			vbX > 0 ? vbX *= 1 : vbX = 1
	) : false;
}

// Côté droit

let rightShipCollision = () => {
	(((blc.x + (blc.w / 2) -1) > ship.x + (((ship.w * 4) / 5) -1)) && ((blc.x + (blc.w / 2) -1) <= ship.x + ship.w - 1)) ? (
		(vbX < 0 && vbX > -6) ? vbX = (vbX * -1) +1 : 
			(vbX > 0 && vbX < 6) ? vbX += 1 : vbX = 2,
		vbY > 0 ? (
			vbY < 4 ? vbY *= -1 : vbY = (vbY * -1) +1
		) : false
	) : false;
}

// Manager des collisions entre la balle et le paddle

let shipCollisionManager = () => {
	collisions(ship,blc) ? (
		launcher != 1 ? boundSnd.play() : false,
		leftShipCollision(),
		middleLeftShipCollision(),
		middleShipCollision(),
		middleRightShipCollision(),
		rightShipCollision()
	) : false;
}

// Gestionnaire des effets lors de la sortie de la balle en bas de l'écran

let looseLife = () => {
	blc.y > 490 ? (
		deadSnd.play(),
		life -= 1,
		stickTheBallOnTheShip(),
		launcher = 1
	) : false;
	launcherSwitch();
}

// Fin de la partie lorsque l'on a perdu tous ses points de vie

let looseGame = () => {
	life <= 0 ? (
		looseGameCount = true,
		startEvent = false
	) : false;
}

// Fonction vérifiant que tous les points de vie des briques du niveau sont à zéro
// Renvoi faux si l'une d'entres elles en possède encore; et vrai dans le cas contraire

let winLevel = (tab,level) => {
	bricksCleared = true;
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			translateFunction("if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv > 0){bricksCleared = false;}");
			memoryLength++;
		}	
	}
	return bricksCleared;
}

// Fonction s'activant lorsque la victoire d'un niveau est vérifié et permettant le lancement soit de l'entre-niveau
// soit de la fin du jeu

let passLevel = (tab,level) => {
	(winLevel(tab,level) && !launchReady) ? (
		launcher = 1,
		launchReady = true,
		setTimeout(function(){
			launcher = 1;
			swtchInLvl = true;
			swtchStoryScreen = true;
			counterLevel++;
			launchReady = false;
			life < 3 ? life += 1 : false;
			counterLevel === 4 ? (
				endGame = true,
				endGameStory = true
			) : false;
		}, 4300)
	) : false;
}

// Gestionnaire de la musique principale du niveau

let levelMusic = token => {
	(translateFunction("musicLevel" + token + ".currentTime === 0")) ? 
		translateFunction("musicLevel" + token + ".play();") : false;
	(translateFunction("musicLevel" + token + ".currentTime === musicLevel" + token + ".duration;")) ? (
		translateFunction("musicLevel" + token + ".pause();"),
		translateFunction("musicLevel" + token + ".currentTime = 0;")
	) : false;
}

// Gestionnaire de la musique lors de la victoire d'un niveau

let winLevelMusicLauncher = (tab,level) => {
	winLevel(tab,level) ? (
		translateFunction("musicLevel" + level + ".pause();"),
		translateFunction("musicLevel" + level + ".currenTime = 0;"),
		winLevelMusic.play()
	) : false;
}

// Gestionnaire des musiques inter-niveaux

let storyLevelMusic = () => {
	swtchStoryScreen ? (
 		winLevelMusic.pause(),
		winLevelMusic.currentTime = 0,
		storyMusic.play()
	) : false;
}

let chapterMusic = () => {
	swtchlvlScreen ? (
		storyMusic.pause(),
		storyMusic.currentTime = 0
	) : false;
}

let interLevelMusicManager = () => {
	storyLevelMusic();
	chapterMusic();
}

// Gestionnaire des musiques de la fin du jeu

let endStoryLevelMusic = () => {
	endGameStory ? (
		winLevelMusic.pause(),
		winLevelMusic.currentTime = 0,
		storyMusic.play()
	) : false;
}

let creditsMusic = () => {
	endGameCredits ? (
		storyMusic.pause(),
		storyMusic.currentTime = 0,
		endGameMusic.play()
	) : false;
}

let endGameMusicManager = () => {
	endStoryLevelMusic();
	creditsMusic();
}

// Gestionnaire de la musique de Game Over

let gameOverMusicManager = token => {
	looseGameCount ? (
		translateFunction("musicLevel" + token + ".pause();"),
		gameOverMusic.play(),
		(gameOverMusic.currentTime === gameOverMusic.duration) ? (
			gameOverMusic.currentTime = 0,
			gameOverMusic.play()
		) : false
	) : false;
}