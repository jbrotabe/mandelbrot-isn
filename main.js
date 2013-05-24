function Mandelbrot_iter(cx, cy, maxiter)
{
  var i;
  var x = 0.0;
  var y = 0.0;
  for (i = 0; i < maxiter && x*x + y*y <= 10000; ++i)
  {
    var tmp = 2*x*y;
    x = x*x - y*y + cx;
    y = tmp + cy;
  }
  return i;
}
 
function Mandelbrot()
{
  var width = 900;
  var height = 600;
  var cd = document.getElementById('menu');
  var xmin = -2;
  var xmax = 1;
  var ymin = -1;
  var ymax = 1;
 

  var iterations = parseInt(cd.iterations.value);
  var ctx = document.getElementById('image').getContext("2d");
  var img = ctx.getImageData(0, 0, width, height);
  var pix = img.data;
  for ( var ix = 0;ix < width; ++ix){
    for (  var iy = 0; iy < height; ++iy)
    {
      var x = xmin + (xmax-xmin)*ix/(width-1);
      var y = ymin + (ymax-ymin)*iy/(height-1);
      var i = Mandelbrot_iter(x, y, iterations);
      var ppos = 4*(900*iy + ix);
      if (i == iterations)
      {
    // interieur
        pix[ppos] = 0;
        pix[ppos+1] = 0;
        pix[ppos+2] = 0;
      }
      else
      {
        var c = 3*Math.log(i)/Math.log(iterations-1);
		
        if (c < 1)
        { // exterieur
          pix[ppos] = 0*(1-c);
          pix[ppos+1] = 150*(1-c);
          pix[ppos+2] = 255*(1-c); 
        }
        else if (c < 1.5)
        {//bord
          pix[ppos] =0*(c-1);
          pix[ppos+1] = 255*(c-1);
          pix[ppos+2] = 0*(c-1);
        }
		else if (c < 2)
        {//bord
          pix[ppos] =255*(c-1);
          pix[ppos+1] = 0*(c-1);
          pix[ppos+2] = 0*(c-1);
        }
		else if (c < 2.5)
        {//bord
          pix[ppos] =0*(c-1);
          pix[ppos+1] = 0*(c-1);
          pix[ppos+2] = 255*(c-1);
        }
        else
        {// ptit trait
          pix[ppos] = 255*(c-2);
          pix[ppos+1] = 255*(c-2);
          pix[ppos+2] = 255*(c-2);
        }
      }
      pix[ppos+3] = 255;//opacité
    }
  ctx.putImageData(img,0,0);
  }
}

