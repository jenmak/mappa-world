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
    SHORT: 'Happiness',
    IS_BOOLEAN: false,
    AVERAGE: 5.50213,
    MIN: 2.6,
    MAX: 10,
    UNITS: 'Happiness score',
    QUESTION: 'Please imagine a ladder, with steps numbered from 0 at the bottom to 10 at the top. The top of the ladder represents the best possible life for you and the bottom of the ladder represents the worst possible life for you. On which step of the ladder would you say you personally feel you stand at this time?'
  },
  'Confidence in national government': {
    SHORT: 'Government confidence',
    IS_BOOLEAN: true,
    AVERAGE: .49512,
    MIN: 0,
    MAX: 1,
    QUESTION: 'Are you confident in the military? The judicial system and courts? The national government? How about honesty of elections?'
  },
  'Freedom to make life choices': {
    SHORT: 'Freedom of choice',
    IS_BOOLEAN: true,
    AVERAGE: .78453,
    MIN: .3,
    MAX: 1,
    QUESTION: 'Are you satisfied or dissatisfied with your freedom to choose what you do with your life?'
  },
  'Generosity': {
    SHORT: 'Generosity',
    IS_BOOLEAN: true,
    AVERAGE: -0.0291,
    MIN: -.4,
    MAX: .5,
    QUESTION: 'Have you donated money to a charity in the past month?'
  },
  'Healthy life expectancy at birth': {
    SHORT: 'Life expectancy',
    IS_BOOLEAN: false,
    AVERAGE: 64.6708,
    MIN: 48,
    MAX: 77,
    UNITS: 'Years',
    QUESTION: 'Healthy life expectancy at birth'
  },
  'Perceptions of corruption': {
    SHORT: 'Corruption',
    IS_BOOLEAN: true,
    AVERAGE: .73174,
    MIN: 0,
    MAX: 1,
    QUESTION: 'Is corruption widespread throughout the government and business?'
  },
  'Social support': {
    SHORT: 'Support',
    IS_BOOLEAN: true,
    AVERAGE: .81054,
    MIN: .4,
    MAX: 1,
    QUESTION: 'If you were in trouble, do you have relatives or friends you can count on to help you whenever you need them?'
  },
  'Log GDP per capita': {
    SHORT: 'GDP',
    IS_BOOLEAN: false,
    AVERAGE: 9.25039,
    MIN: 6.5,
    MAX: 11.5,
    UNITS: 'Log GDP per capita',
    QUESTION: 'Gross Domestic Product'
  },
  'Positive affect': {
    SHORT: 'Positivity',
    IS_BOOLEAN: true,
    AVERAGE: .70963,
    MIN: .4,
    MAX: .9,
    QUESTION: 'Did you experience happiness or enjoyment during A LOT OF THE DAY yesterday? Did you smile or laugh a lot yesterday?'
  },
  'Negative affect': {
    SHORT: 'Negativity',
    IS_BOOLEAN: true,
    QUESTION_ID: 9,
    AVERAGE: .29367,
    MIN: 0,
    MAX: .6,
    QUESTION: 'Did you experience worry, sadness or anger during A LOT OF THE DAY yesterday?'
  }
};
