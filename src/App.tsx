import React from 'react';
import CountryStats from './components/country-stats';
// import GlobeContainer from './components/globe-container';
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

class App extends React.Component<{ actions: any, country: any, dimensions: string[], questionId: number, isSidebarVisible: boolean }, { width: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      width: window.innerWidth
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { actions, country, dimensions, questionId, isSidebarVisible } = this.props;
    const { width } = this.state;
    const isMobile = width <= 500;
    return(
      <div className={`${isMobile ? 'mobile' : 'desktop'}`}>
        <HappinessHeader />
        <div className='globe bg-purple-darker'>
            <P5Wrapper
              sketch={earth}
              isMobile={isMobile}
              selectedCountry={country}
              sizeFactor={dimensions[questionId]}
            />
        </div>
      </div>
    //   <Sidebar.Pushable as={Segment}>
    //     <CountryStats />
    //     <Sidebar.Pusher>
    //       <Segment basic className="mainContainer">
    //         <div className="mainContainer-icons--topRight">
    //           <Icon name='question' size='large' circular link />
    //           <Icon onClick={actions.toggleSidebar} name='chart bar outline' rotated='clockwise' size='large' circular link />
    //         </div>
    //         <div className='legend'>
    //           <P5Wrapper
    //               sketch={legend}
    //               sizeFactor={DIMENSIONS_MAP[dimensions[questionId]].SHORT}
    //             />
    //         </div>
    //         <div className='questionFlipper'>
    //           <QuestionFlipper />
    //         </div>
    //         <div className="mainContainer-icons--bottomLeft">
    //           <Icon name='arrows alternate' size='large' />
    //         </div>
    //     </Segment>
    //     </Sidebar.Pusher>
    // </Sidebar.Pushable>
    )
  }
}

const mapStateToProps = (state: { data: any}) => ({
  country: state.data.country,
  dimensions: state.data.dimensions,
  questionId: state.data.questionId,
  isSidebarVisible: state.data.isSidebarVisible
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CountryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
