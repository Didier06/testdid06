function etiquette_zim(Id,x,y,dessin,drag){	// Id �tiquette (1, 2, 3,...) position, dessin qui est un conteneur Zim ouEASELJS; drag vrai ou faux
	if(typeof(drag)==='undefined') drag = true;
	this.Id = Id;// identifiant �tiquette, entier diff�rent de z�ro (1, 2,3,...)
	this.Idr = 0; // identifiant du support qui contient cette �tiquette (0 par d�faut)
	this.x = x;// position �tiquette
	this.y = y;
	this.xin = x;// position initiale de l'�tiquette (m�morisation pour un retour � la position initiale)
	this.yin = y;
	this.dessin=dessin; // dessine de l'�tiquette (container EaselJS)
	this.dessin.container.x = this.x; 
	this.dessin.container.y = this.y;
	this.dessin.container.name = this.Id;
	this.drag = drag;
	
	
	// propri�t�s de drap et drop pour l'�tiquette	
	if (this.drag) {
		this.dessin.container.drag({currentTarget:true}); 
	}else {
		this.dessin.container.noDrag(); 
	};
	
	// d�finition des �venements envoy�s par l'�tiquette 
	finDrag = function(evt){
		//console.log(" etiquette Mouse up : Id = "+ Id);
	this.dispatchEvent("FinGlissement");
	};
	
	debutDrag = function(evt){
		this.dispatchEvent("DebutGlissement");
		//console.log(" etiquette Mouse down : "+evt.target);
	};
	
	this.dessin.container.on("pressup", finDrag); // �v�nement cr�� lorsqu'on presse la souris
	this.dessin.container.on("mousedown", debutDrag);
	
}

// methode pour d�finier l'Id du support
etiquette_zim.prototype = {
	setIdr : function (val) {
			this.Idr = val;
	}
	
};	
