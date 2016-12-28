function dessin_bmp_etiquettes_zim(Image,larg,haut,rot,Echelle,texte,size,color) {
	// definition de l'objet  image (téléchargée par frame.loadAsset, larg, haut,rotation, échelle, texte, taille texte, couleur texte)
		
		if(typeof(Echelle)==='undefined') Echelle = 1;
		if(typeof(color)==='undefined') color ="black";
		
		this.larg = larg;
		this.haut = haut;
		this.rot = rot;
		this.color = color;
		//this.nomImage ="images/daisy.png";
		//this.img.crossOrigin="Anonymous";	
		this.container = new zim.Container(this.largeur,this.hauteur);
		this.container.x = 0;
		this.container.y = 0;
		this.Echelle = Echelle;
		this.texte = texte;
		this.size = size;
		this.Image = Image.clone();// pour pouvoir créer deux étiquettes avec la même image
		this.Image.rotation = this.rot;
		var label = new zim.Label({
			text:this.texte,
			size: this.size/this.Echelle,
			font:"arial",
			color: this.color,
			rollColor:"blue",
			fontOptions:"italic bold"
		});
		label.centerReg(); // origine au centre de l'image
		label.y = this.haut/2+this.size;
		this.container.scaleX = this.container.scaleY = this.Echelle;
			
		this.Image.width = this.larg;
		this.Image.height = this.haut;
		this.Image.centerReg(); // origine au centre de l'image
		this.container.addChild(this.Image,label);
		
}
		

