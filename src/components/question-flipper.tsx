import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import * as CountryActions from '../actions';
import { ICountryState } from '../reducers/countryReducer';
import { DIMENSIONS_MAP } from '../constants/dimensions';

export interface IQuestionFlipperProps {
  dimensions: string[];
  questionId: number;
  actions: any;
}

const QuestionFlipper = ({ dimensions, questionId, actions}: IQuestionFlipperProps) => (
  <div>
    <Grid verticalAlign='middle'>
      <Grid.Column width='1'>
        <Header size='huge'>“</Header>
      </Grid.Column>
      <Grid.Column width='14'>
        <Header size='medium' as='h2'>{ DIMENSIONS_MAP[dimensions[questionId]].QUESTION }</Header>
      </Grid.Column>
      <Grid.Column width='1'>
        <Header size='huge'>”</Header>
      </Grid.Column>
    </Grid>
    {
      questionId !== 0 &&
      <Button onClick={actions.getPrevQuestion}>
        <Icon name='arrow left' />
      </Button>
    }
    {
      questionId < dimensions.length - 1 && 
      <Button onClick={actions.getNextQuestion}>
        <Icon name='arrow right' />
      </Button>
    }
  </div>
)

const mapStateToProps = (state: { data: ICountryState}) => ({
  dimensions: state.data.dimensions,
  questionId: state.data.questionId
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CountryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionFlipper);