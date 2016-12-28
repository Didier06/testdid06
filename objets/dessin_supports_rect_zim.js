function dessin_supports_rect_zim(larg,haut,alpha,texte,size) {// 	
		if(typeof(texte)==='undefined') texte ="";
		if(typeof(size)==='undefined') size = 18;
		this.alpha = alpha;
		this.larg = larg;
		this.haut = haut;
		this.texte = texte;
		this.size = size;
		this.container = new zim.Container(larg,haut); // conteneur avec largeur et hauteur dans lequel on va dessiner  
		this.container.x = 0;
		this.container.y = 0;
		
		
		this.initialise =  function(){
			if (this.alpha == 0){ this.alpha = 0.01} // car si Zéro la fonction hitTest ne marche pas 
			var s = new zim.Shape(); // nouveau dessin dans le conteneur
			//var largeur = 20;

			//var txt = new createjs.Text(this.texte, "20px Arial", "#000");
			s.graphics.setStrokeStyle(2).beginStroke("green").moveTo(this.larg/2,0).lineTo(this.larg/2,this.haut)
			.moveTo(0,this.haut/2).lineTo(this.larg, this.haut/2); 
			//s.alpha = 0.2; // transparence
			var rect = new zim.Rectangle(this.larg, this.haut, 0, "blue", 2,0);
			rect.alpha = s.alpha = this.alpha;
			
			var label = new zim.Label({
				text:this.texte,
				size: this.size,
				font:"arial",
				color: "black",
				fontOptions:"italic bold"
			});
			label.alpha = this.alpha;
			label.centerReg(); // mets l'origine de l'étiquette au centre du label
			label.y = this.haut+this.size/2;
			label.x = this.larg/2;
			
			this.container.addChild(rect,s,label); // ajoute le carré dans la scène
		}
		this.initialise();
}	