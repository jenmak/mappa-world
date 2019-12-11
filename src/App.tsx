import React from 'react';
import CountryStats from './components/country-stats';
// import GlobeContainer from './components/globe-container';
// import QuestionFlipper from './components/question-flipper';
import { Dimmer, Icon, Loader, Segment, Sidebar } from 'semantic-ui-react'
// import { render } from 'react-dom';
import legend from './sketches/legend';
// @ts-ignore
import P5Wrapper from 'react-p5-wrapper';
import { connect } from 'react-redux';
import { DIMENSIONS_MAP } from './constants/dimensions';
import { bindActionCreators } from 'redux';
import * as CountryActions from './actions';

class App extends React.Component<{ actions: any, country: any, dimensions: string[], questionId: number, isSidebarVisible: boolean }, { isLoading: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    if (this.state.isLoading) {
      setTimeout(() => {
        this.setState({ isLoading: false});
      }, 3000);
    }
  }

  render() {
    const { actions, country, dimensions, questionId, isSidebarVisible } = this.props;
    let { isLoading } = this.state;
    return(
      <Sidebar.Pushable as={Segment}>
        <CountryStats />
        <Sidebar.Pusher>
          <Segment basic className="mainContainer">
            {
              isLoading &&
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            }
            <div className="mainContainer-icons--topRight">
              <Icon name='question' size='large' circular link />
              <Icon onClick={actions.toggleSidebar} name='chart bar outline' rotated='clockwise' size='large' circular link />
            </div>
            <P5Wrapper
                sketch={legend}
                sizeFactor={DIMENSIONS_MAP[dimensions[questionId]].SHORT}
              />
            {/* <div className='globe'>
                <P5Wrapper
                  sketch={earth}
                  selectedCountry={country}
                  sizeFactor={dimensions[questionId]}
                />
            </div> */}
            <div className="mainContainer-icons--bottomLeft">
              <Icon name='arrows alternate' size='large' />
            </div>
        </Segment>
        </Sidebar.Pusher>
    </Sidebar.Pushable>
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
