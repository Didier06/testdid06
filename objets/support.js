function support(Id,x,y,dessin){	// Id �tiquette (1, 2, 3,...) position, dessin qui est un conteneur ZIM ou EASELJS
	this.Id = Id;// identifiant �tiquette, entier diff�rent de z�ro (1, 2,3,...)
	this.Ide = 0; // identifiant de l'�tiquette pr�sente sur ce support (0 par d�faut)
	this.x = x;// position support
	this.y = y;
	
	this.dessin=dessin; // dessine le support (container EaselJS)
	this.dessin.container.x = this.x; 
	this.dessin.container.y = this.y;
	this.dessin.container.name = this.Id;

	
}

