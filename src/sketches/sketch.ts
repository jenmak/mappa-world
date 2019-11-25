// import debounce from '../utils/debounce';
// import throttle from '../utils/throttle';
export const TWO_PI = 2*Math.PI;
export const HALF_PI = Math.PI/2;

export default function sketch (p) {
    let r = 275; // float: sphere's radius
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let coord; // PVector
    let points = [ // lat, lon
      [40.647560, -74.006340], // ny
      [19.075983, 72.877655], // mumbai
      [22.282150, 114.156883], // hong kong
      [14.599512, 120.984222], // manila
      [51.507351, -0.127758] // london
    ]; // 2d array

    let width = 800;
    let height = 800;

    let earth; // image
    
    p.setup = function() {
      p.createCanvas(width, height, p.WEBGL);
      coord = p.createVector();
      earth = p.loadImage('earth.jpg');
    }

    p.mouseDragged = function() {
      angleY += (p.mouseX - p.pmouseX) * -0.03;
      angleX += (p.mouseY - p.pmouseY) * -0.01;
    }

    p.mouseClicked = function(event) {
        // console.log(event);
    }
    
    p.draw = function() {
      p.background(0);
      coord.x = 0;
      coord.y = 0;
      coord.z = 0;
      p.translate(coord);
      p.rotateX(angleX);
      p.rotateY(angleY);
      p.rotateZ(angleZ);

      // earth
      p.texture(earth);
      p.noStroke();
      p.sphere(r);
      
      // points
      p.fill(255,0,0);
      p.stroke(255,0,0);
      p.strokeWeight(20);
      
      for (let i=0; i<points.length; i++) {
        let radians = toRadians(points[i][0], points[i][1]);
        let cartesian = sphereToCart(radians, r);
        p.point(cartesian.x, cartesian.y, cartesian.z);
      }
    }

    function toRadians(lat, lon) {
      return {
        theta: p.radians(lat),
        phi: p.radians(lon) + HALF_PI
      };
    };

   function sphereToCart(rad, r) {
    return {
      x: r * p.cos(rad.theta) * p.cos(rad.phi),
      y: -1 * r * p.sin(rad.theta),
      z: -1 * r  * p.cos(rad.theta) * p.sin(rad.phi)
    };
  };


}