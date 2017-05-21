 //==================================================//
 //    __  __  ___  ____  _____ _          _ ____    //
 //   |  \/  |/ _ \|  _ \| ____| |        | / ___|   //
 //   | |\/| | | | | | | |  _| | |     _  | \___ \   //
 //   | |  | | |_| | |_| | |___| |___ | |_| |___) |  //
 //   |_|  |_|\___/|____/|_____|_____(_)___/|____/   //
 //													 //
 //==================================================//
 
 // Création du Canvas                                            

CANVAS = document.getElementById("canvas");
CONTEXT = CANVAS.getContext("2d");

// Dimensionnement du Canvas

H = 500;
W = 1000;

// Initialisation des valeurs numérales

score = 0;
timePoint = 0;
life = 3;
launcher = 0;
musicTime = 0;
ballRot = 1;
beginGame = 0;
click_x = 0;
click_y = 0;
counterLevel = 1;
vbX = 0;
vbY = 0;

// Initialisation des valeurs booléennes

interlevelOn = false;
startEvent = false;
clickStart = false;
endLevel = false;
looseGameCount = false;
swtchInLvl = false;
swtchStoryScreen = false;
swtchlvlScreen = false;
endGame = false;
endGameStory = false;
endGameCredits = false;
endGameFinalScreen = false;
City = false;

// Initialisation du positionnement souris

let mouseX;
let mouseY;

// Initialisation de la fonction permettant de créer de manière dynamique des variables ainsi que des fonctions

let translateFunction = func => eval(func);

// Initialisation des objets de type Image non récurentes

background = new Image();
star = new Image();
spaceship = new Image();
ball = new Image();
start = new Image();
over = new Image();
finalStory = new Image();
credits = new Image();
finalScreen = new Image();

// Création de manière dynamique des objets de type Image récurentes (pour les entres-niveaux et les points de vie)

let createStoryScreen = token => "storyLevel" + token + "Screen = new Image(); storyLevel" + token + "Screen.src = 'img/storyscreenlvl" + token + ".png';";
let createLoadingScreen = token => "level" + token + "Screen = new Image(); level" + token + "Screen.src = 'img/chapter" + token + ".png';";

let initLife = () => {
	for(let i = 1; i <= life; i++){
		translateFunction("vie" + i + " = new Image(); vie" + i + ".src = 'img/minispaceship.png';");
	}
}

// Liaison entre les objets Image et leurs sources dans les fichier png 

background.src = "img/background.png";
star.src = "img/star.png";
spaceship.src = "img/spaceship2.png";
start.src = "img/start.png";
ball.src = "img/ball1.png";
over.src = "img/gameOver.png";
finalStory.src = "img/endStory.png";
credits.src = "img/credits.png";
finalScreen.src = "img/finalScreen.png";

// Initialisation de la banque de son utilisé dans le jeu

deadSnd = new Audio("sound/wilhelm.wav");
deadSnd.volume = .7;

boundSnd = new Audio("sound/rebond.wav");
boundSnd.volume = .7;

destroySnd = new Audio("sound/break.mp3");
destroySnd.volume = .8;

musicLevel1 = new Audio("sound/celestial.mp3");
musicLevel1.volume = .4;

// Initialisation des objets de type classique non récurentes

blc = {};
crsr = {}; 
ship = {};
st = {};
gm = {};
fnlstr = {};
crdt = {};
fnlscrn = {};

// Initialisation des objets de type classique récurentes

let createLoadingObj = token => "lvl" + token + "scrn = {};";
let createStoryObj = token => "storylvl" + token + "scrn = {};";

// Manager gérant la création dynamique des objets Image et classique gérant les écrans entre-niveaux

let createInterLevelScreenManager = token => {
	translateFunction(createStoryScreen(token));
	translateFunction(createLoadingScreen(token));
	translateFunction(createLoadingObj(token));
	translateFunction(createStoryObj(token));
}

// Création des tableaux permettant la génération des niveaux du jeu
//
// C'est grâce à ces tableaux que nous allons pouvoir créer dynamiquement les patterns (ensemble de brique constituant un niveau)

brickpositionLevel1 = 	[[[400,200],[450,200]]];
brickpositionLevel2 = [[[400,200],[450,200]]];

// Générateur d'objet Image de brique en fonction des tableaux brickposition entrés au-dessus

let brickImage = (tab,level) => {
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			switch(i){
				case 0:
					translateFunction("brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/brick.png';");
					break;
				case 1:
					translateFunction("brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/metalbrick1.png';");
					break;
				case 2:
					translateFunction("brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/goldbrick1.png';");
					break;
				case 3:
					translateFunction("brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/diamondbrick.png';");
					break;
				default:
					break;
			}
			memoryLength++;
		}
	} 
}

// Générateur d'objet classique de brique en fonction des tableaux brickposition entrées au-dessus

let createBrick = (tab,level) => {
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			switch(i){
				case 0:
					translateFunction("brk" + ((level * 1000) + (i + memoryLength)) + " = {}; brk" + ((level * 1000) + (i + memoryLength)) + ".pv = 1;");
					break;
				case 1:
					translateFunction("brk" + ((level * 1000) + (i + memoryLength)) + " = {}; brk" + ((level * 1000) + (i + memoryLength)) + ".pv = 2;");
					break;
				case 2:
					translateFunction("brk" + ((level * 1000) + (i + memoryLength)) + " = {}; brk" + ((level * 1000) + (i + memoryLength)) + ".pv = 3;");
					break;
				case 3:
					translateFunction("brk" + ((level * 1000) + (i + memoryLength)) + " = {}; brk" + ((level * 1000) + (i + memoryLength)) + ".pv = 10;");
					break;
				default:
					break;
			}
			memoryLength++;
		}
	}
}

// Manager permettant de créer dynamiquement les patterns de jeu

let brickBuilder = () => {
	for(let i = 1; i < 3; i++){
		brickImage(eval("brickpositionLevel" + i),i);
		createBrick(eval("brickpositionLevel" + i),i);
	}
}

// Manager gérant les changements d'image en fonction du nombre de point de vie restant à la brique

let brickDesign = (tab,level) => {
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			if(i === 1){
				translateFunction("if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv === 1){ brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/metalbrick2.png'}");
			}
			if(i === 2){
				translateFunction("if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv === 2){ brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/goldbrick2.png'} if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv === 1){ brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/goldbrick3.png'}");
			}
			memoryLength++;
		}
	}
}

// Fonction gérant une simulation de rotation de la balle en fonction d'un incrémenteur qui change en fonction du raffraichissement de main()

let ballRotation = () => {
	switch(ballRot){
		case 0:
			ballRot = 51;
			break;
		case 10:
			ball.src = "img/ball1.png";
			break;
		case 20:
			ball.src = "img/ball2.png";
			break;
		case 30:
			ball.src = "img/ball3.png";
			break;
		case 40:
			ball.src = "img/ball4.png";
			break;
		case 50:
			ball.src = "img/ball5.png";
			break;
		default:
			break;
	}
	ballRot--;
}