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
    AVERAGE: 5.43716,
    MIN: 2.6,
    MAX: 10,
    QUESTION: 'Please imagine a ladder, with steps numbered from 0 at the bottom to 10 at the top. The top of the ladder represents the best possible life for you and the bottom of the ladder represents the worst possible life for you. On which step of the ladder would you say you personally feel you stand at this time?'
  },
  'Confidence in national government': {
    MIN: 0,
    MAX: 1
  },
  'Freedom to make life choices': {
    AVERAGE: .73382,
    MIN: .2,
    MAX: 1,
    QUESTION: 'Are you satisfied or dissatisfied with your freedom to choose what you do with your life?'
  },
  'Generosity': {
    AVERAGE: 0.00008,
    MIN: -.5,
    MAX: .7,
    QUESTION: 'Have you donated money to a charity in the past month?'
  },
  'Healthy life expectancy at birth': {
    MIN: 30,
    MAX: 80
  },
  'Perceptions of corruption': {
    AVERAGE: .75132,
    MIN: 0,
    MAX: 1,
    QUESTION: 'Is corruption widespread throughout the government or not? Is corruption widespread within businesses or not?'
  },
  'Social support': {
    AVERAGE: .81057,
    MIN: .2,
    MAX: 1,
    QUESTION: 'If you were in trouble, do you have relatives or friends you can count on to help you whenever you need them, or not?'
  },
  'Log GDP per capita': {
    MIN: 6,
    MAX: 12
  },
  'Positive affect': {
    AVERAGE: .70937,
    MIN: .3,
    MAX: 1,
    QUESTION: 'Did you experience happiness or enjoyment during A LOT OF THE DAY yesterday? Did you smile or laugh a lot yesterday?'
  },
  'Negative affect': {
    AVERAGE: .26568,
    MIN: 0,
    MAX: .7,
    QUESTION: 'Did you experience worry, sadness or anger during A LOT OF THE DAY yesterday?'
  }
};
