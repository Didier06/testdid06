function liaison_etiq_support_zim(stage,TabE,TabS,sons){	// 
	if(typeof(sons)==='undefined') sons = false;
	
	this.TabE = TabE;// tableau �tiquettes
	this.TabS = TabS; // tableau de  supports
	this.stage = stage;
	this.sons = sons;
	
	var point; // pour calculer la position locale de l'�tiquette / au support
	
	// Lance un �v�nement de la sc�ne � la fin de l'animation (lorsque cet �v�nement sera per�u on pourra declencher une action)
	support_occupe = function(obj,Et_Id,Sup_Id,ocup){
	var event = new createjs.Event("support_occupe");
	event.Etiq_Id = Et_Id; // cr�e la variable event.Sup_Id pour transmettre l'id du support dans l'�v�nement support_occupe 
    event.Sup_Id = Sup_Id;
	event.libre = !ocup;
	obj.dispatchEvent(event);
	}
	
	debut_glissement = function(evt) {	
		
		var k = parseInt(evt.target.name)-1; // r�cup�re lindice de l'�tiquette dans le tableau
		var h = parseInt(TabE[k].Idr-1); // indice du support li� � l'etiquette (existe si h >=0)
		if (h>=0){
		TabS[h].Ide = 0; // le support devient libre
		TabE[k].Idr = 0; // l'etiquette devient libre
		support_occupe(stage,TabE[k].Id,TabS[h].Id,false);
		}
		
		//console.log("debut du glissement "+ evt.target.name+" k ="+k+ " Idr : "+TabE[k].Idr);
		
	};
	
	fin_glissement =function(evt) {	
			var i = parseInt(evt.target.name)-1; // r�cup�re lindice de l'�tiquette dans le tableau
				// v�rification des positions des �tiquettes sur les supports
				for (j= 0; j < TabS.length; j++) {
					point = TabE[i].dessin.container.globalToLocal(TabS[j].x, TabS[j].y);// coordonn�es locales du support par rapport � l'�tiquette
					//if(TabE[i].dessin.container.hitTest(point.x,point.y)==true && TabE[i].Idr == 0 && TabS[j].Ide == 0) {
					if(TabE[i].dessin.container.hitTestBounds(TabS[j].dessin.container) == true && TabE[i].Idr == 0 && TabS[j].Ide == 0) {	
						
						zim.move(TabE[i].dessin.container, TabS[j].x, TabS[j].y, 500, "backOut"); // deplacement de l'�tiquette sur le support
						
						TabE[i].Idr = TabS[j].Id;
						TabS[j].Ide = TabE[i].Id;
						support_occupe(stage,TabE[i].Id,TabS[j].Id,true); // envoie evt support occup�
						
						if (sons == true){
							//createjs.Sound.play("son1");
							frame.asset("sons/household007.mp3").play();
						}
						//console.log(" TabE "+TabE[i].Idr)
					}
				}	
					
				if (TabE[i].Idr==0) { // remise des �tiquettes en position initiale
					zim.move(TabE[i].dessin.container, TabE[i].xin, TabE[i].yin, 300, "linear");
					
					if (sons ==true){
					//createjs.Sound.play("son2");
					frame.asset("sons/household008.mp3").play();
					}
				}
				

	}	
	
	
	dessine = function (){ // def de la methode dessine(affiche les etiquettes et supports et d�fint les evenements )
		
		for (i = 0; i < TabS.length; i++) {// ajoute les supports dans la sc�ne
			//
			TabS[i].dessin.container.centerReg(); // mets le point origine au centre de l'objet si ses dimensions sont d�finies : new zim.Container(0,0,larg,haut);
			stage.addChild(TabS[i].dessin.container);
		}
		
		for (i = 0; i < TabE.length; i++) {// ajoute les �tiquettes dans la sc�ne et d�finit les evenements
			TabEtiq[i].dessin.container.addEventListener('FinGlissement', fin_glissement, false);
			TabEtiq[i].dessin.container.addEventListener('DebutGlissement', debut_glissement, false);
			TabEtiq[i].dessin.container.centerReg(); //mets le point origine au centre de l'�tiquette ( les dim du conteneur doivent �tre d�finie)
			stage.addChild(TabE[i].dessin.container);// ajoute les �tiquettes dans la sc�ne
		}
		//createjs.Sound.registerSound("sons/household007.mp3", "son1"); //ajout des sons
		//createjs.Sound.registerSound("sons/household008.mp3", "son2");
		//createjs.Sound.registerSound("sons/quotes001.mp3", "son3");
		stage.update();
	};	
	
	this.dessine = dessine; // methode pour afficher les �tiquettes et supports dans la sc�ne

	verification = function (){ // def de la methode verification
		var note = 0;
		var total = TabS.length;
		var valid = true;
		
			for (i = 0; i < TabS.length; i++) {// v�rifie si tous les supports ont une �tiquette
				if (TabS[i].Ide == 0){
						valid = false;
				}
			}
			if (valid == true) {
				for (j = 0; j < TabS.length; j++) {
							if ( TabS[j].Id == TabS[j].Ide) { // v�rifie support 1 avec �tiquette 1 autant qu'il y a de supports 
								note += 1;
							}
						}
				
			}else {
				note = -1; // il y a des supports vides
				
			}
			
						
		return note;
	};
			

	this.verification = verification; // methode pour afficher les �tiquettes et supports dans la sc�ne

	RemiseZero = function (){
		 // remise des �tiquettes en position initiale et Idr = 0
		for (i = 0; i < TabE.length; i++) {
			TabE[i].Idr = 0;
			
			//var tween = createjs.Tween.get(TabE[i].dessin.container, {loop: false})
			//.to({x: TabE[i].xin, y: TabE[i].yin}, 800, createjs.Ease.cubicOut);
			zim.move(TabE[i].dessin.container, TabE[i].xin, TabE[i].yin, 800, "cubicOut");
		}
		for (i = 0; i < TabS.length; i++) { // support Ide =0
			TabS[i].Ide = 0;
		}
		if (sons == true){
				//createjs.Sound.play("son3");
				frame.asset("sons/quotes001.mp3").play();
		}
	}
	
	this.RemiseZero = RemiseZero; // methode pour initialiser les �tiquettes dans la sc�ne

}// fin objet liaison Etiquette support