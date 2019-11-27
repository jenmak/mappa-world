export const EARTH_RADIUS = 200;
export const HALF_PI = Math.PI/2;

export const DIMENSIONS_MAP: any = {
  'Life Ladder': {
    MIN: 0,
    MAX: 10
  },
  'Freedom to make life choices': {
    MIN: .2,
    MAX: 1
  }
};

export default function sketch (p: any) {
  // canvas
  let width: number = 800;
  let height: number = 800;

  // earth
  let earth: any; // image
  let angleX: number = 0;
  let angleY: number = -2.4;
  let angleZ: number = .3;

  // data
  let json: any = {};
  let listOfCountries: Country[] = [];
  let currentYear: number = 2018;
  let sizeFactor: string = 'Life Ladder';

  p.preload = function() {
    json = p.loadJSON('countries.json');
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props: any) {	
    console.log(props);
    if (props.sizeFactor) {
      sizeFactor = props.sizeFactor;
    }
  };
    
  p.setup = function() {
    // Set up the canvas with the earth
    p.createCanvas(width, height, p.WEBGL);
    earth = p.loadImage('earth.jpg');
  }

  p.mouseDragged = function() {
    angleY += (p.mouseX - p.pmouseX) * -0.03;
    angleX += (p.mouseY - p.pmouseY) * -0.01;
  }

  p.draw = function() {
    p.background(0);
    p.lights();
    p.translate(0, 0, 0);
    p.rotateX(angleX);
    p.rotateY(angleY);
    p.rotateZ(angleZ);
  
    // earth
    p.push();
    p.texture(earth);
    p.noStroke();
    p.sphere(EARTH_RADIUS);
    p.pop();

    json[currentYear].forEach((country: any, i: number) => {
      listOfCountries[i] = new Country(country.name, country['Life Ladder'], country[sizeFactor], country.Latitude, country.Longitude)
      listOfCountries[i].draw();
    });
  }

  class Country {
    public name: string;
    public lat: number;
    public lon: number;
    public happiness: number;
    public coord: any;
    private rv: number; // red value
    private boxh: number;
    private radians: {
      theta: number;
      phi: number;
    };
  
    // happiness: 2 - 9
    constructor(name: string, happiness: number, size: number, lat: number, lon: number) {
      this.name = name;
      this.happiness = happiness;
      this.lat = lat;
      this.lon = lon;
      this.radians = this.toRadians(lat, lon);
      let cart = this.sphereToCart(this.radians, EARTH_RADIUS);
      this.coord = new p.createVector(cart.x, cart.y, cart.z);
      // this.boxh = p.map(p.pow(10, sizeFactor), 0, 10, 1, 2);
      this.boxh = p.map(size, DIMENSIONS_MAP[sizeFactor].MIN, DIMENSIONS_MAP[sizeFactor].MAX, 1, 2);
      this.rv = p.map(this.happiness, 2, 9, 255, 0);
    }
  
    public draw() {
      p.push();
      p.stroke(Math.floor(this.rv), 188, 255); // 151, blue to 222, pink
      p.line(this.coord.x, this.coord.y, this.coord.z, this.coord.x*this.boxh, this.coord.y*this.boxh, this.coord.z*this.boxh);
      p.translate(this.coord.x*this.boxh, this.coord.y*this.boxh, this.coord.z*this.boxh);
      p.noStroke();
      p.fill(Math.floor(this.rv), 188, 255); // 151, blue to 222, pink
      p.sphere(this.boxh*5);
      // p.box(this.boxh);
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
