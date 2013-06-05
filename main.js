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
				//on color:en noir quand elle converge et puis en fonction de la rapidité de la divergence
				var p = (largeur * ky + kx) * 4;
				if (i==iterations){			
					pix[p] = 0;   
					pix[p + 1] = 0; 
					pix[p + 2] = 0; 
			
				}
				else{	
					//formule empirique			
					var c = 3*Math.log(i)/Math.log(iterations);
					if (c < 1)
					{
						pix[p] = 0*c;
						pix[p+1] = 0;
						pix[p+2] = 0;
				
					}
					else if (c < 2)
					{
						pix[p] = 0;
						pix[p+1] = 255*(c-1);
						pix[p+2] = 0;
					
					}
					else
					{
						pix[p] = 255;
						pix[p+1] = 0;
						pix[p+2] = 255*(c-1);
					
					}	
					
				
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
