import React from 'react';
import CountryStats from './components/country-stats';
import QuestionFlipper from './components/question-flipper';
import legend from './sketches/legend';
import earth from './sketches/earth';
// @ts-ignore
import P5Wrapper from 'react-p5-wrapper';
import { connect } from 'react-redux';
import { DIMENSIONS_MAP } from './constants/dimensions';
import { bindActionCreators } from 'redux';
import * as CountryActions from './actions';
import HappinessHeader from './components/happiness-header';

class App extends React.Component<{ actions: any, country: any, dimensions: string[], questionId: number, isGlobeVisible: boolean }, { width: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      width: window.innerWidth
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { country, dimensions, questionId, isGlobeVisible } = this.props;
    const { width } = this.state;
    const isMobile = width <= 640;
    return(
      <div className={`${isMobile ? 'mobile' : 'desktop'}`}>
        <HappinessHeader />
        <QuestionFlipper />
        <div className='globe bg-purple-darker z-0 flex justify-center align-center h-auto md:h-screen'>
            <P5Wrapper
              sketch={earth}
              isMobile={isMobile}
              selectedCountry={country}
              sizeFactor={dimensions[questionId]}
            />
        </div>
        <div className={`sm:fixed bottom-0 left-0 z-30 sm:mb-32 sm:ml-16 ${isGlobeVisible ? 'fadeIn' : 'fadeOut'}`}>
          <P5Wrapper
              sketch={legend}
              sizeFactor={DIMENSIONS_MAP[dimensions[questionId]].SHORT}
            />
        </div>
        <p className={`hidden sm:block fixed bottom-0 left-0 right-0 text-xs uppercase text-purple text-center p-5 ${isGlobeVisible ? 'fadeIn' : 'fadeOut'}`}>Drag to move</p>
        <CountryStats />
      </div>
    )
  }
}

const mapStateToProps = (state: { data: any}) => ({
  country: state.data.country,
  dimensions: state.data.dimensions,
  questionId: state.data.questionId,
  isGlobeVisible: state.data.isGlobeVisible
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CountryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
