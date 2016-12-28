function etiquette_zim(Id,x,y,dessin,drag){	// Id étiquette (1, 2, 3,...) position, dessin qui est un conteneur Zim ouEASELJS; drag vrai ou faux
	if(typeof(drag)==='undefined') drag = true;
	this.Id = Id;// identifiant étiquette, entier différent de zéro (1, 2,3,...)
	this.Idr = 0; // identifiant du support qui contient cette étiquette (0 par défaut)
	this.x = x;// position étiquette
	this.y = y;
	this.xin = x;// position initiale de l'étiquette (mémorisation pour un retour à la position initiale)
	this.yin = y;
	this.dessin=dessin; // dessine de l'étiquette (container EaselJS)
	this.dessin.container.x = this.x; 
	this.dessin.container.y = this.y;
	this.dessin.container.name = this.Id;
	this.drag = drag;
	
	
	// propriétés de drap et drop pour l'étiquette	
	if (this.drag) {
		this.dessin.container.drag({currentTarget:true}); 
	}else {
		this.dessin.container.noDrag(); 
	};
	
	// définition des évenements envoyés par l'étiquette 
	finDrag = function(evt){
		//console.log(" etiquette Mouse up : Id = "+ Id);
	this.dispatchEvent("FinGlissement");
	};
	
	debutDrag = function(evt){
		this.dispatchEvent("DebutGlissement");
		//console.log(" etiquette Mouse down : "+evt.target);
	};
	
	this.dessin.container.on("pressup", finDrag); // événement créé lorsqu'on presse la souris
	this.dessin.container.on("mousedown", debutDrag);
	
}

// methode pour définier l'Id du support
etiquette_zim.prototype = {
	setIdr : function (val) {
			this.Idr = val;
	}
	
};	
