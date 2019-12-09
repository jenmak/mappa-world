import React from 'react';
import CountryStats from './components/country-stats';
import GlobeContainer from './components/globe-container';
import QuestionFlipper from './components/question-flipper';
import { Grid, Header, Reveal, Image, Icon, Menu, Segment, Sidebar, CommentActions } from 'semantic-ui-react'
import { render } from 'react-dom';
import earth from './sketches/earth';
// @ts-ignore
import P5Wrapper from 'react-p5-wrapper';
import { connect } from 'react-redux';
import { DIMENSIONS_MAP } from './constants/dimensions';
import { bindActionCreators } from 'redux';
import * as CountryActions from './actions';

class App extends React.Component<{ actions: any, country: any, dimensions: string[], questionId: number, isSidebarVisible: boolean }, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { actions, country, dimensions, questionId, isSidebarVisible } = this.props;
    return(
      <Sidebar.Pushable as={Segment}>
        <CountryStats />
        <Sidebar.Pusher>



          <Segment basic className="mainContainer">
            <Header as='h3'>Application Content</Header>
            <div className="mainContainer-icons--topRight">
              <Icon name='question' size='large' circular link />
              <Icon onClick={actions.toggleSidebar} name='chart bar outline' rotated='clockwise' size='large' circular link />
            </div>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

            <div className="mainContainer-icons--bottomLeft">
              <Icon name='arrows alternate' size='large' />
            </div>
        </Segment>
        </Sidebar.Pusher>
    </Sidebar.Pushable>
    )
      // <Header size='huge' as='h1'>{ DIMENSIONS_MAP[dimensions[questionId]].QUESTION }</Header>
        // <div className='globe'>
        //     <P5Wrapper
        //       sketch={earth}
        //       selectedCountry={country}
        //       sizeFactor={dimensions[questionId]}
        //     />
        // </div>
    // )
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
