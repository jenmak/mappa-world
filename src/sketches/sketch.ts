export const EARTH_RADIUS = 275;
export const HALF_PI = Math.PI/2;

export default function sketch (p: any) {
    let angleX = 0;
    let angleY = -2.4;
    let angleZ = .3;
    let coord: {
      x: number,
      y: number,
      z: number
    };
    let data: any;
    let listOfCountries: Country[] = [];

    let width = 800;
    let height = 800;

    let earth: any; // image

    p.preload = function() {
      data = p.loadJSON('countries.json');
      // console.log(data);
    }
    
    p.setup = function() {

      // Create the country objects
      Object.keys(data).forEach((countryName, i) => {
        listOfCountries[i] = new Country(countryName, 10, data[countryName].Latitude, data[countryName].Longitude)
      });

      // Set up the canvas with the earth
      p.createCanvas(width, height, p.WEBGL);
      coord = p.createVector();
      earth = p.loadImage('earth.jpg');
    }

    p.mouseDragged = function() {
      angleY += (p.mouseX - p.pmouseX) * -0.03;
      angleX += (p.mouseY - p.pmouseY) * -0.01;
    }

    p.mouseClicked = function() {
      for (let i=0; i<listOfCountries.length; i++) {
        listOfCountries[i].clicked();
      }
    }
    
    p.draw = function() {
      p.background(0);
      coord.x = 0;
      coord.y = 0;
      coord.z = 0;
      p.lights();
      p.translate(coord);
      p.rotateX(angleX);
      p.rotateY(angleY);
      p.rotateZ(angleZ);
    
      // earth
      p.push();
      p.texture(earth);
      p.noStroke();
      p.sphere(EARTH_RADIUS);
      p.pop();

      for (let i=0; i<listOfCountries.length; i++) {
        listOfCountries[i].draw();
      }
  }

  class Country {
    public name: string;
    public lat: number;
    public lon: number;
    public mag: number;
    public h: number;
    public coord: {
      x: number;
      y: number;
      z: number;
    };
    private radians: {
      theta: number;
      phi: number;
    };
  
    constructor(name: string, mag: number, lat: number, lon: number) {
      this.name = name;
      this.mag = mag;
      this.lat = lat;
      this.lon = lon;
      this.radians = this.toRadians(lat, lon);
      this.coord = this.sphereToCart(this.radians, EARTH_RADIUS);
      this.h = Math.pow(10, mag);
    }
  
    public clicked() {
      var d = p.dist(p.mouseX, p.mouseY, this.coord.x, this.coord.y)
      if (d < 50) {
        console.log(this.name);
        console.log(d);
      }
    }
  
    public draw() {
      let maxh: number = p.pow(10, 10);
      let boxh: number = p.map(this.h, 0, maxh, 0, 1.5);
      let pos = new p.createVector(this.coord.x, this.coord.y, this.coord.z);
      p.push();
      p.stroke(236, 195, 11,10);
      p.line(pos.x,pos.y,pos.z,pos.x*boxh, pos.y*boxh, pos.z*boxh);
      p.translate(pos.x*boxh, pos.y*boxh, pos.z*boxh);
      p.sphere(boxh*1.1);
      p.pop();
    }
  
    public degreesToRadians(deg: number) {
      return deg/180 * Math.PI;
    }
    
    public toRadians(lat: number, lon: number) {
      return {
        theta: this.degreesToRadians(lat),
        phi: this.degreesToRadians(lon) + HALF_PI
      };
    };
    
    public sphereToCart(rad: { theta: number, phi: number }, r: number) {
      return {
        x: r * Math.cos(rad.theta) * Math.cos(rad.phi),
        y: -1 * r * Math.sin(rad.theta),
        z: -1 * r  * Math.cos(rad.theta) * Math.sin(rad.phi)
      }
    }
  }
}
