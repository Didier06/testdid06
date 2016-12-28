function dessin_etiquettes_zim(larg,haut,texte,size,color) {// 	
		
		if(typeof(color)==='undefined') color ="black";
		this.larg = larg;
		this.haut = haut;
		this.texte = texte;
		this.size = size;
		this.color = color;
		this.container = new zim.Container(0,0,this.larg,this.haut); // conteneur dans lequel on va dessiner le rectangle
		this.container.x = 0;
		this.container.y = 0;
		
		
		this.initialise =  function(){
			//var s = new zim.Shape(); // nouveau dessin dans le conteneur
			var label = new zim.Label({
				text:this.texte,
				size: this.size,
				font:"arial",
				color: this.color,
				rollColor:"red",
				fontOptions:"italic bold"
			});
			
			
			var rect = new zim.Rectangle(this.larg, this.haut, "skyblue", "black",2,10);
			//rect.alpha = 0.85; // transparence
			label.centerReg(); // mets l'origine de l'étiquette au centre du label
			label.x = this.larg/2;
			label.y = this.haut/2;
			this.container.addChild(rect,label); // ajoute le rect dans la scène
		}
		
		this.initialise();
}	