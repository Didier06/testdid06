function dessin_supports_simple_zim() {// 	
		
		//this.texte = texte;
		this.container = new zim.Container(); // conteneur dans lequel on va dessiner le rectangle
		this.container.x = 0;
		this.container.y = 0;
		
		
		this.initialise =  function(){
			var s = new zim.Shape(); // nouveau dessin dans le conteneur
			var largeur = 20;

			s.graphics.setStrokeStyle(2).beginStroke("green").moveTo(0,-largeur/2).lineTo(0,largeur/2)
			.moveTo(-largeur/2,0).lineTo(largeur/2, 0); 
			
		
			s.alpha = 0.91; // transparence
			
			this.container.addChild(s); // ajoute le graphique dans le container
		}
		this.initialise();
}	