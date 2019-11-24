// import debounce from '../utils/debounce';
// import throttle from '../utils/throttle';
export const TWO_PI = 2*Math.PI;
export const HALF_PI = Math.PI/2;

export default function sketch (p) {
    // let n = 30; // int: number of points
    let r = 275; // float: sphere's radius
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let lat; // float
    let lon; // float
    let coord; // PVector
    let points = []; // 2d array

    let width = 800;
    let height = 800;

    let earth; // image
    
    p.setup = function() {
      p.createCanvas(width, height, p.WEBGL);
      coord = p.createVector();
      earth = p.loadImage('earth.jpg');

      points = [
        // [-63.0649892654, 18.2239595023], // uk
        // [-170.718025746, -14.3044599708], // us,
        [0.0,0.0],
        // [0, 90.0],
        // [0, -90.0]
      ]
      console.log(points);
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
      p.strokeWeight(100);
      
      for (let i=1; i<points.length; i++) {
        // wgs84 -> cartesian coordinate conversion
        lat = points[i][0];
        lon = points[i][1];
        console.log(lat, lon);
        coord.x = r * Math.cos(lat) * Math.cos(lon);
        coord.y = r * Math.cos(lat) * Math.sin(lon);
        coord.z = r * Math.sin(lat);
        console.log(coord);
        p.point(coord.x, coord.y, coord.z);
      }
    }
}