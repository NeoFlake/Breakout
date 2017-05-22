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
launchReady = false;
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

let createStoryScreen = token => "storyLevel" + token + "Screen = new Image(); storyLevel" + token + "Screen.src = 'img/interLevelScreen/story/storyscreenlvl" + token + ".png';";
let createLoadingScreen = token => "level" + token + "Screen = new Image(); level" + token + "Screen.src = 'img/interLevelScreen/chapter/chapter" + token + ".png';";

let initLife = () => {
	for(let i = 1; i <= life; i++){
		translateFunction("vie" + i + " = new Image(); vie" + i + ".src = 'img/gameObject/cursor/minispaceship.png';");
	}
}

// Liaison entre les objets Image et leurs sources dans les fichier png 

background.src = "img/standardScreen/background.png";
star.src = "img/gameObject/cursor/star.png";
spaceship.src = "img/gameObject/cursor/spaceship.png";
start.src = "img/standardScreen/start.png";
ball.src = "img/gameObject/cursor/ball1.png";
over.src = "img/standardScreen/gameOver.png";
finalStory.src = "img/interLevelScreen/end/endStory.png";
credits.src = "img/interLevelScreen/end/credits.png";
finalScreen.src = "img/interLevelScreen/end/finalScreen.png";

// Initialisation de la banque de son utilisé dans le jeu

deadSnd = new Audio("sound/GlobalMusic/wilhelm.wav");
deadSnd.volume = .6;

boundSnd = new Audio("sound/GlobalMusic/rebond.wav");
boundSnd.volume = .7;

destroySnd = new Audio("sound/GlobalMusic/break.mp3");
destroySnd.volume = .7;

winLevelMusic = new Audio("sound/EndMusic/endLevel.mp3");
winLevelMusic.volume = .4;

storyMusic = new Audio("sound/GlobalMusic/storyMusic.mp3");
storyMusic.volume = .4;

endGameMusic = new Audio("sound/EndMusic/endGame.mp3");
endGameMusic.volume = .4;

gameOverMusic = new Audio("sound/EndMusic/gameOver.mp3");
gameOverMusic.volume = .4;

let initMusicLevel = () => {
	for(let i = 1; i < 4; i++){
		translateFunction("musicLevel" + i + " = new Audio('sound/LevelMusic/musicLevel" + i + ".mp3'); musicLevel" + i + ".volume = .4;");
	}
}

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

brickpositionLevel1 = [[[0,200],[50,200],[100,200],[150,200],[200,200],[250,200],[300,200],[350,200],[400,200],[450,200],[500,200],
						[550,200],[600,200],[650,200],[700,200],[750,200],[800,200],[850,200],[900,200],[950,200],[0,220],[50,220],
						[100,220],[150,220],[200,220],[250,220],[300,220],[350,220],[400,220],[450,220],[500,220],[550,220],[600,220],
						[650,220],[700,220],[750,220],[800,220],[850,220],[900,220],[950,220],[0,240],[50,240],[100,240],[150,240],
						[550,240],[600,240],[650,240],[700,240],[200,240],[250,240],[300,240],[350,240],[400,240],[450,240],[500,240],
						[900,240],[950,240],[0,260],[50,260],[100,260],[150,260],[200,260],[250,260],[750,240],[800,240],[850,240],
						[300,260],[350,260],[400,260],[450,260],[500,260],[550,260],[600,260],[650,260],[700,260],[750,260],[800,260],
						[850,260],[900,260],[950,260]],
					   [[0,160],[150,160],[200,160],[350,160],[400,160],[550,160],[600,160],[750,160],[800,160],[950,160],
						[0,180],[150,180],[200,180],[350,180],[400,180],[550,180],[600,180],[750,180],[800,180],[950,180]]];

brickpositionLevel2 = [[[400,140],[500,140],[300,160],[600,160],[200,180],[700,180],[400,200],[500,200],[50,220],[100,220],[800,220],
						[850,220],[50,240],[100,240],[800,240],[850,240],[150,260],[750,260],],
					   [[450,160],[350,180],[400,180],[450,180],[500,180],[550,180],[200,200],[250,200],[300,200],[350,200],[400,200],
					    [450,200],[500,200],[550,200],[600,200],[650,200],[700,200],[150,220],[250,220],[300,220],[350,220],[400,220],
					    [500,220],[550,220],[600,220],[650,220],[750,220],[150,240],[200,240],[250,240],[300,240],[350,240],[400,240],
					    [450,240],[500,240],[550,240],[600,240],[650,240],[700,240],[750,240],[200,260],[250,260],[300,260],[350,260],
					    [400,260],[450,260],[500,260],[550,260],[600,260],[650,260],[700,260]],
					   [[450,140],[350,160],[400,160],[500,160],[550,160],[250,180],[300,180],[600,180],[650,180],[250,280],[300,280],
					    [450,280],[500,280],[650,280],[700,280]],
					   [[200,220],[450,220],[700,220]]];

brickpositionLevel3 = [[[200,60],[300,60],[650,60],[750,60],[200,80],[300,80],[650,80],[750,80],[150,120],[350,120],[600,120],],
					   [[200,100],[250,100],[300,100],[650,100],[700,100],[750,100],[800,100],[250,120],[700,120],[150,140],
					    [200,140],[250,140],[300,140],[350,140],[600,140],[650,140],[700,140],[750,140],[800,140],[200,160],
					    [300,160],[650,160],[750,160],[250,180],[700,180],[100,200],[400,200],[550,200],[850,200],[100,220],
					    [400,220],[550,220],[850,220],[100,240],[400,240],[550,240],[850,240],[100,260],[400,260],[550,260],
					    [850,260],[150,300],[350,300],[600,300],[800,300],[150,320],[350,320],[600,320],[800,320],[150,340],
					    [350,340],[600,340],[800,340],[150,360],[350,360],[600,360],[800,360],],
					   [[250,160],[700,160],[150,200],[200,200],[250,200],[300,200],[350,200],[600,200],[650,200],[700,200],
					    [750,200],[800,200],[200,220],[250,220],[300,220],[650,220],[700,220],[750,220],[200,240],[250,240],
					    [300,240],[650,240],[700,240],[750,240],[200,280],[250,280],[300,280],[650,280],[700,280],[750,280],
					    [200,300],[250,300],[300,300],[650,300],[700,300],[750,300]],
					   [[200,120],[300,120],[650,120],[750,120],[800,120],[200,260],[250,260],[300,260],[650,260],[700,260],
					    [750,260]]];

// Générateur d'objet Image de brique en fonction des tableaux brickposition entrés au-dessus

let brickImage = (tab,level) => {
	memoryLength = 0;
	for(let i = 0; i < tab.length; i++){
		for(let j = 0; j < tab[i].length; j++){
			switch(i){
				case 0:
					translateFunction("brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/gameObject/brick/brick.png';");
					break;
				case 1:
					translateFunction("brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/gameObject/brick/metalbrick1.png';");
					break;
				case 2:
					translateFunction("brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/gameObject/brick/goldbrick1.png';");
					break;
				case 3:
					translateFunction("brick" + ((level * 1000) + (i + memoryLength)) + " = new Image(); brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/gameObject/brick/diamondbrick.png';");
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
	for(let i = 1; i < 4; i++){
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
				translateFunction("if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv === 1){ brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/gameObject/brick/metalbrick2.png'}");
			}
			if(i === 2){
				translateFunction("if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv === 2){ brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/gameObject/brick/goldbrick2.png'} if(brk" + ((level * 1000) + (i + memoryLength)) + ".pv === 1){ brick" + ((level * 1000) + (i + memoryLength)) + ".src = 'img/gameObject/brick/goldbrick3.png'}");
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
			ball.src = "img/gameObject/cursor/ball1.png";
			break;
		case 20:
			ball.src = "img/gameObject/cursor/ball2.png";
			break;
		case 30:
			ball.src = "img/gameObject/cursor/ball3.png";
			break;
		case 40:
			ball.src = "img/gameObject/cursor/ball4.png";
			break;
		case 50:
			ball.src = "img/gameObject/cursor/ball5.png";
			break;
		default:
			break;
	}
	ballRot--;
}