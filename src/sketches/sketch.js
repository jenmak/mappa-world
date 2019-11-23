export const TWO_PI = 2*Math.PI;

export default function sketch (p) {
    let n = 30; // int: number of points
    let r = 200; // float: sphere's radius
    let angleX = 0;
    let angleY = 0;
    let lat; // float
    let lon; // float
    let coord; // PVector
    let points = []; // 2d array

    let width = 800;
    let height = 600;
    
    p.setup = function() {
      p.createCanvas(width, height, p.WEBGL);
      coord = p.createVector();
      
      // populate globe w/ random GPS coordinates
      for (let i=0; i<n; i++) {
        points.push(new Array(2));
        points[i][0] = Math.random() * 180 - 90;    // latitude
        points[i][1] = Math.random() * 360 - 180;  // longitude
      }
      console.log(points);
    }

    p.mouseDragged = function(event) {
        angleX = p.map(p.mouseY, 0, width,0,TWO_PI);
        angleY = p.map(p.mouseX,0,height,0,TWO_PI);
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

      // earth
      p.fill(255,255,255);
      p.stroke(0,127,255);
      p.strokeWeight(1);
      p.sphere(r);
      
      // points
      p.fill(255,0,0);
      p.stroke(255,0,0);
      p.strokeWeight(10);
      
      for (let i=1; i<points.length; i++) {
        // wgs84 -> cartesian coordinate conversion
        lat = p.radians(points[i][0]);
        lon = p.radians(points[i][1]);
        coord.x = r * Math.cos(lat) * Math.cos(lon);
        coord.y = r * Math.cos(lat) * Math.sin(lon);
        coord.z = r * Math.sin(lat);
        p.point(coord.x, coord.y, coord.z);
      }
    }
}