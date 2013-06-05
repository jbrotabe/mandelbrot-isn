	
	var xmin=-2.0;var xmax=1.0; var ymin=-1.0; var ymax=1.0;
	var vzoom=1;var iterations;//iterations max
	function Mandelbrot(){	
		iterations= document.getElementById('iterations').value;
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		var largeur = context.canvas.width;
		var hauteur = context.canvas.height;
		var image = context.createImageData(largeur, hauteur);
		var pix = image.data;
		var x = 0.0; var y = 0.0;//coord pix DU POINT(le c dans les formules générales)
		var zx = 0.0; var zx0 = 0.0; var zy = 0.0;
		var zx2 = 0.0; var zy2 = 0.0;
		var ivzoom=vzoom;
		vzoom=ivzoom/2;
		var r0 = 0; var v0 = 0; var b0 = 0;  
    			while(r0 == v0 || r0 == b0 || v0 == b0) 
     			 	{
      					r0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3));
      					v0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3));
      					b0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3)); 
     			 	} 
				var r1 = 256 / r0; var v1 = 256 / v0; var b1 = 256 / b0; 
		//on travail pour chaque pixel
		for (var ky = 0; ky < hauteur; ky++)//variable hauteur
		{
			y = ymin + (ymax - ymin) * ky / hauteur;//reperage des pixels, "avancement" en fonction de la taille de l'image, transformation en coordonné complexe
			
			for(var kx = 0; kx < largeur; kx++)//variable largeur
			{
				x = xmin + (xmax - xmin) * kx / largeur;
				zx = x; zy = y;// coordonné de "c"
				//on regarde en combien d'itérations la suite diverge(ou pas)
				for(var i = 0; i < iterations; i++)
				{
					zx2 = zx * zx; zy2 = zy * zy;//ces 2 lignes determinent la divergence
					if(zx2 + zy2 > 4) break;
					zx0 = zx2 - zy2 + x;
					zy = 2 * zx * zy + y;
					zx = zx0;
				}
				
					//on colore : en noir quand elle converge et puis en fonction de la rapidité de la divergence
				var p = (largeur * ky + kx) * 4;
				if (i==iterations){			
					pix[p] = 0;   
					pix[p + 1] = 0; 
					pix[p + 2] = 0; 
			
				}
				else{			
       			pix[p] = i % r0 * r1;    //formule empirique trouvé(possible explication mais pas trouvé)
      			pix[p + 1] = i % v0 * v1; 
       			pix[p + 2] = i % b0 * b1; 
 
				}
				pix[p + 3] = 255;
		}
	context.putImageData(image, 0, 0);
}
	}
	//Zoom
	function zoom(event){
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		var largeur = context.canvas.width;
		var hauteur = context.canvas.height;
		event = event || window.event;
		//coordonnée absolue de la souris
		var ax = event.clientX;
		var ay = event.clientY;
		//coordonné du bloc
		var alc = canvas.offsetLeft;
		var ahc = canvas.offsetTop;
		//coordonné de la souris dans le bloc(relative)
		var sx = ax-alc;
		var sy = ay-ahc;
		//coordonné complexe de la souris dans le plan
		var cx = sx*((xmax-xmin)/largeur)+xmin;
		var cy = sy*((ymax-ymin)/hauteur)+ymin;
		//zoom
		xmin = cx-vzoom;
		xmax = cx+vzoom;
		ymin = cy-vzoom;
		ymax = cy+vzoom;
		Mandelbrot();
	}
	
	function afficher(button,Afficher){
		var div=document.getElementById(Afficher)
		 if(div.style.display=="none")
        {
                div.style.display="block";
        }
        else
        {
                div.style.display="none";
        }
	}
	
	function ref(){
		xmin=-2; xmax=1; ymin=-1; ymax=1;
		Mandelbrot();
	}
