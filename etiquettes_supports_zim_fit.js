// Les variables globales :
var stage ; // variable globale pour stage : la scène
var Image1; // variable globale pour l'image téléchargée
var Image2; // variable globale pour l'image téléchargée
var son1, son2, son3; // variables globales pour les sons

var TabEtiq = new Array (); //tableau contenant les étiquettes;
var TabSup = new Array (); //tableau contenant les supports
var Etiq_Sup; // Variable globale pour la liaison étiquettes supports 

var resultat = -1; // nombre de réponses justes -1 pas terminé
var texte1; // variable globale pour les resultats



//fonction qui doit être lancée par le navigateur au démarrage;
function init() {
	stage = frame.stage; // stage nom de la scène 
	var stageW = frame.width; // largeur et hauteur de la scène
	var stageH = frame.height;
	zog("fonction init lancée !!"); // commentaire pour la console
	
	// téléchargement des images et des sons par l'objet frame
	frame.loadAssets(["images/daisy.png","images/fer_a_cheval1.png","sons/household007.mp3","sons/household008.mp3","sons/quotes001.mp3"]); 
	
	frame.on("complete", function() { // lorsque les images sont télechargées on continue ...
		// code qui sera exécuté après le téléchargement 
		Image1 = frame.asset("images/daisy.png"); // définition de l'image1 dans la varaible Image1
		Image2 = frame.asset("images/fer_a_cheval1.png"); // définition de Image2
		initEtiquette(); // définitions étiquettes
		initSupport(); // définition supports
		// liaison étiquettes supports : scène, tableau étiq, tableau support, sons true or false)
		Etiq_Sup = new liaison_etiq_support_zim (stage,TabEtiq, TabSup,true);
		Etiq_Sup.dessine(); // affiche les etiquettes et supports sur la scène
		stage.addEventListener("support_occupe", placement_Etiq_Sup, false); // detecte la placement des etiquettes sur les supports   
	  
		//Texte pour le contrôle des résultats;
		texte1 = new zim.Label({
			text:"Les résultats : "+resultat+ "/?",
			size: 20,
			font:"arial",
			color:"red",
			rollColor:"blue",
			fontOptions:"italic bold"
		});
		texte1.x = 420;
		texte1.y = 580;
		texte1.visible = false;
	
		//Texte du Bouton1
		txt_bt1 = new zim.Label({
		text:"Vérification",
			size: 25,
			font:"arial",
			color:"White",
			fontOptions:"bold"
		});
		//Texte du Bouton2
		txt_bt2 = new zim.Label({
			text:"Initialisation",
			size: 25,
			font:"arial",
			color:"White",
			fontOptions:"bold"
		});
	
	
		// le bouton 1
		var bt1 = new zim.Button(160, 40, txt_bt1,null,null,null,null,10); // larg,haut,....., 10 corner
		bt1.x =550;
		bt1.y=710;
		bt1.on("click", function() { // on() est un évevement qui sera detecté lorqu'on produit une action sur le bouton (ici click)
			// vérification des résultats
			Verif();	
		});
	
		// bouton 2
		var bt2 = new zim.Button(160, 40, txt_bt2,null,null,null,null,10); // larg,haut,....., 10 corner
		bt2.x =750;
		bt2.y=710;
		bt2.on("click", function() { // événement pour le bouton 2
			// initialisation
			Reset();	
		});
	
		stage.addChild(bt1,bt2, texte1); // ajout des éléments sur la scène
		stage.update(); // mise à jour de la scène
	}); // fin de la fonction téléchargement complet end 
}; // fin de la fonction init

// autres fonctions

// définitions des étiquettes
function initEtiquette(){
	// le dessin de l'étiquette etiq1 : larg, haut, texte, taille police, couleur police
	var dess_etiq1 = new dessin_etiquettes_zim(150,40,"Etiquette 1",20,"black");
	// le numéro des étiquettes doit être un entier positif différent de zéro (1, 2,3,...)
	// etiquette_zim : Id, larg, haut, dessin zim, drag (vrai ou faux) 
	var etiq1 = new etiquette_zim(1,100,650,dess_etiq1,true); // étiquette 1
	TabEtiq.push(etiq1);
	var etiq2 = new etiquette_zim(2,300,650,new dessin_etiquettes_zim(150,40,"Etiquette 2",20,"black"),true); // étiquette 2
	TabEtiq.push(etiq2);
	var etiq3 = new etiquette_zim(3,500,650,new dessin_etiquettes_zim(150,40,"Etiquette 3",20,"black"),true); // étiquette 3
	TabEtiq.push(etiq3);
	var etiq4 = new etiquette_zim(4,700,650,new dessin_etiquettes_zim(150,40,"Etiquette 4",20,"purple"),true); // étiquette 4
	TabEtiq.push(etiq4);
	// desin_bmp_etiquettes_zim : Image 5 téléchargée, larg, haut, rotation, echelle, texte, police , couleur texte 
	var etiq5 = new etiquette_zim(5,300,420,new dessin_bmp_etiquettes_zim(Image1,80,80,0,0.8,"Une fleur...",20,"green"),true); // étiquette 5 contient une image bmp
	TabEtiq.push(etiq5);
	var etiq6 = new etiquette_zim(6,600,440,new dessin_bmp_etiquettes_zim(Image2,200,197,-65,0.6,"fer à cheval",20,"red"),true); // étiquette 5 contient une image bmp
	TabEtiq.push(etiq6);
	var etiq7 = new etiquette_zim(7,830,360,new dessin_bmp_etiquettes_zim(Image1,80,80,-80,0.6," une autre...",20,"white"),true); // étiquette 5 contient une image bmp
	TabEtiq.push(etiq7);
};
	
// définitions des supports
function initSupport(){
	// le numéro des supports doit être un entier positif différent de zéro (1, 2,3,...)
	// pour support : id, x, y, objet dessin zim)
	var support1 = new support(1,150,100,new dessin_supports_rect_zim(40,30,0.8,"1")); 
	//pour dessin support : larg, haut, transparence (entre 0 et 1, texte, taille texte) 
	TabSup.push(support1);
	var support2 = new support(2,350,100,new dessin_supports_rect_zim(20,20,0.2));
	TabSup.push(support2);
	var support3 = new support(3,850,80,new dessin_supports_rect_zim(20,20,0.2));
	TabSup.push(support3);
	var support4 = new support(4,680,220,new dessin_supports_rect_zim(100,100,0.2,"4",30));
	TabSup.push(support4);
	var support5 = new support(5,100,460,new dessin_supports_rect_zim(20,20,0.8,"fleur...",15));
	TabSup.push(support5);
};


// fonction exécutée chaque fois fois qu'un support est occupé ou libéré ( renvoie les identifiants de l'étiquette et du support)
function placement_Etiq_Sup(event){
	console.log("etiq : "+event.Etiq_Id +" supp : +"+event.Sup_Id+" libre = "+event.libre);
	
}

function Verif() {
	resultat = Etiq_Sup.verification(); // demande des resultats , renvoie la nombre de bonnes réponses
	//console.log("les resultats : "+ resultat );
	if (resultat ==-1){ // certains support n'ont pas d'étiquette
		texte1.x = 420;
		texte1.color = "red";
		texte1.rollColor = "blue";
		texte1.text ="Veuillez mettre une étiquette sur chaque support !";
	}else {
		texte1.x = 620;
		texte1.color ="blue";
		texte1.rollColor ="red";
		texte1.text ="Les résultats : "+resultat+ "/"+TabSup.length;
	}
	texte1.visible = true;
	stage.update();
};

function Reset() {
	Etiq_Sup.RemiseZero();
	texte1.visible = false;
	//stage.update();
};





