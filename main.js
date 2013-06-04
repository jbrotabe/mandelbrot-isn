	function Mandelbrot(){	
		//var xmin = document.getElementById("xmin");
		//var ymin = document.getElementById("ymin");
		//var xmax = document.getElementById("xmax");
		//var ymax = document.getElementById("ymax");
		var xmin= -2;var xmax= 1; var ymin=-1; var ymax= 1;
		var canvas = document.getElementById('canvas');
		var context = canvas.getContext('2d');
		var xr = context.canvas.width;
		var yr = context.canvas.height;
		var image = context.createImageData(xr, yr);
		var pix = image.data;
		var r0 = 0; var v0 = 0; var b0 = 0;	
		while(r0 == v0 || r0 == b0 || v0 == b0) 
			{
			r0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3));
			v0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3));
			b0 = Math.pow(2, Math.ceil(Math.random() * 3 + 3)); 
			}

		var r1 = 256 / r0; var v1 = 256 / v0; var b1 = 256 / b0;
		var maxIt = 256;//iteration
		var x = 0; var y = 0;//coord pix DU POINT(le c dans les formules générales)
		var zx = 0; var zx0 = 0; var zy = 0;
		var zx2 = 0; var zy2 = 0;

		for (var ky = 0; ky < yr; ky++)//variable hauteur
		{
			y = ymin + (ymax - ymin) * ky / yr;//reperage des pixels, "avancement" en fonction de la taille de l'image
			
			for(var kx = 0; kx < xr; kx++)//variable largeur
			{
				x = xmin + (xmax - xmin) * kx / xr;
				zx = x; zy = y;// coordonné de "c"
				
				for(var i = 0; i < maxIt; i++)
				{
					zx2 = zx * zx; zy2 = zy * zy;//ces 2 lignes determinent la divergence
					if(zx2 + zy2 > 4) break;
					zx0 = zx2 - zy2 + x;
					zy = 2 * zx * zy + y;
					zx = zx0;
				}
				
				var p = (xr * ky + kx) * 4;
				pix[p] = i % r0 * r1;    //formule empirique trouvé(possible explication mais pas trouvé)
				pix[p + 1] = i % v0 * v1; 
				pix[p + 2] = i % b0 * b1; 
				pix[p + 3] = 255;          
			}
		}

	context.putImageData(image, 0, 0);
	
	}
	//Zoom
	//document.getElementById('canvas').onclick = 
	function zoom(){
	var oxmin=xmin;
	var oxmax=xmax;
	var oymin=ymin;
	var oymax=ymax;
	alert(oxmin)
	}
	
