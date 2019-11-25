import { Country } from "./country";
export const TWO_PI = 2*Math.PI;
export const EARTH_RADIUS = 275;

export default function sketch (p: any) {
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let coord: {
      x: number,
      y: number,
      z: number
    };
    let listOfCountries: Country[] = [];
    let countries = [ // lat, lon
      [40.647560, -74.006340], // ny
      [19.075983, 72.877655], // mumbai
      [22.282150, 114.156883], // hong kong
      [14.599512, 120.984222], // manila
      [51.507351, -0.127758] // london
    ]; // 2d array

    let width = 800;
    let height = 800;

    let earth: any; // image
    
    p.setup = function() {
      p.createCanvas(width, height, p.WEBGL);
      coord = p.createVector();
      earth = p.loadImage('earth.jpg');

      // Create the country objects
      for (let i = 0; i < countries.length; i++) {
        listOfCountries[i] = new Country(4, countries[i][0], countries[i][1]);
      }
    }

    p.mouseDragged = function() {
      angleY += (p.mouseX - p.pmouseX) * -0.03;
      angleX += (p.mouseY - p.pmouseY) * -0.01;
    }

    p.mouseClicked = function() {
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
      p.sphere(EARTH_RADIUS);
      
      // points
      p.fill(255,0,0);
      p.stroke(255,0,0);
      p.strokeWeight(20);
      
      for (let i=0; i<listOfCountries.length; i++) {
        p.point(listOfCountries[i].coord.x, listOfCountries[i].coord.y, listOfCountries[i].coord.z);
      }
  }
}
