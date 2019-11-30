export const EARTH_RADIUS = 160;
export const HALF_PI = Math.PI/2;

export const DIMENSION_NAMES = {
  CORRUPTION: 'Perceptions of corruption',
  GDP: 'Log GDP per capita',
  GENEROSITY: 'Generosity',
  GOVT_CONFIDENCE: 'Confidence in national government',
  FREEDOM: 'Freedom to make life choices',
  LIFE_EXPECTANCY: 'Healthy life expectancy at birth',
  LIFE_LADDER: 'Life Ladder',
  NEGATIVE_AFFECT: 'Negative affect',
  POSITIVE_AFFECT: 'Positive affect',
  SOCIAL_SUPPORT: 'Social support'
}

export const DIMENSIONS_MAP: any = {
  'Life Ladder': {
    MIN: 2.6,
    MAX: 10
  },
  'Confidence in national government': {
    MIN: 0,
    MAX: 1
  },
  'Freedom to make life choices': {
    MIN: .2,
    MAX: 1
  },
  'Generosity': {
    MIN: -.5,
    MAX: .7
  },
  'Healthy life expectancy at birth': {
    MIN: 30,
    MAX: 80
  },
  'Perceptions of corruption': {
    MIN: 0,
    MAX: 1
  },
  'Social support': {
    MIN: .2,
    MAX: 1
  },
  'Log GDP per capita': {
    MIN: 6,
    MAX: 12
  },
  'Positive affect': {
    MIN: .3,
    MAX: 1
  },
  'Negative affect': {
    MIN: 0,
    MAX: .7
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

  p.preload = function() {
    json = p.loadJSON('countries.json');
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function (props: any) {	
    if (props.sizeFactor) {
      listOfCountries.forEach((country: Country) => {
        country.setSizeFactor(props.sizeFactor);
      })
    }
    // if (props.selectedCountry) {
    // }
  };
    
  p.setup = function() {
    // Set up the canvas with the earth
    p.createCanvas(width, height, p.WEBGL);
    earth = p.loadImage('world.jpg');

    // Create country objects
    json[currentYear].forEach((country: any, i: number) => {
      listOfCountries[i] = new Country(country)
    });
  }

  p.mouseDragged = function() {
    angleY += (p.mouseX - p.pmouseX) * -0.03;
    angleX += (p.mouseY - p.pmouseY) * -0.01;
  }

  p.draw = function() {
    p.background(255);
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

    listOfCountries.forEach((country: Country) => {
      country.draw();
    });
  }

  class Country {
    public name: string;
    public lat: number;
    public lon: number;
    public govtConfidence: number;
    public gdp: number;
    public generosity: number;
    public lifeExpectancy: number;
    public happiness: number;
    public corruption: number;
    public freedom: number;
    public support: number;
    public positiveAffect: number;
    public negativeAffect: number;
    public coord: any;
    private rv: number; // red value
    private boxh: number;
  
    // happiness: 2 - 9
    constructor(country: any) {
      this.name = country.Name;
      this.govtConfidence = country[DIMENSION_NAMES.GOVT_CONFIDENCE];
      this.happiness = country[DIMENSION_NAMES.LIFE_LADDER];
      this.corruption = country[DIMENSION_NAMES.CORRUPTION];
      this.freedom = country[DIMENSION_NAMES.FREEDOM];
      this.support = country[DIMENSION_NAMES.SOCIAL_SUPPORT];
      this.gdp = country[DIMENSION_NAMES.GDP];
      this.generosity = country[DIMENSION_NAMES.GENEROSITY];
      this.lifeExpectancy = country[DIMENSION_NAMES.LIFE_EXPECTANCY];
      this.positiveAffect = country[DIMENSION_NAMES.POSITIVE_AFFECT];
      this.negativeAffect = country[DIMENSION_NAMES.NEGATIVE_AFFECT];
      this.lat = country.Latitude;
      this.lon = country.Longitude;
      this.boxh = 0;
      let radians = this.toRadians(this.lat, this.lon);
      let cart = this.sphereToCart(radians, EARTH_RADIUS);
      this.coord = new p.createVector(cart.x, cart.y, cart.z);
      this.rv = p.map(this.happiness, DIMENSIONS_MAP['Life Ladder'].MIN, DIMENSIONS_MAP['Life Ladder'].MAX, 255, 0);
      this.setSizeFactor('Life Ladder');
    }

    public setSizeFactor(sizeFactor: string) {
      let size = null;
      switch(sizeFactor) {
        case DIMENSION_NAMES.LIFE_LADDER:
          size = this.happiness;
          break;
        case DIMENSION_NAMES.GOVT_CONFIDENCE:
          size = this.govtConfidence;
          break;
        case DIMENSION_NAMES.CORRUPTION:
          size = this.corruption;
          break;
        case DIMENSION_NAMES.FREEDOM:
          size = this.freedom;
          break;
        case DIMENSION_NAMES.GDP:
          size = this.gdp;
          break;
        case DIMENSION_NAMES.SOCIAL_SUPPORT:
          size = this.support;
          break;
        case DIMENSION_NAMES.GENEROSITY:
          size = this.generosity;
          break;
        case DIMENSION_NAMES.LIFE_EXPECTANCY:
          size = this.lifeExpectancy;
          break;
        case DIMENSION_NAMES.POSITIVE_AFFECT:
          size = this.positiveAffect;
          break;
        case DIMENSION_NAMES.NEGATIVE_AFFECT:
          size = this.negativeAffect;
          break;
        default:
          size = this.happiness;
          break;
      }
      this.boxh = p.map(size, DIMENSIONS_MAP[sizeFactor].MIN, DIMENSIONS_MAP[sizeFactor].MAX, 1, 2);
    }
  
    public draw() {
      p.push();
      p.stroke(Math.floor(this.rv), 188, 255); // 151, blue to 222, pink
      p.line(this.coord.x, this.coord.y, this.coord.z, this.coord.x*this.boxh, this.coord.y*this.boxh, this.coord.z*this.boxh);
      p.translate(this.coord.x*this.boxh, this.coord.y*this.boxh, this.coord.z*this.boxh);
      p.noStroke();
      p.fill(Math.floor(this.rv), 188, 255); // 151, blue to 222, pink
      p.sphere(this.boxh*5);
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
