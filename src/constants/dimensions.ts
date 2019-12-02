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
