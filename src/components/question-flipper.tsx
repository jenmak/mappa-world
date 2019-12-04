import React, { Component } from 'react';
import { DIMENSIONS_MAP } from '../constants/dimensions';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';

export interface IQuestionFlipperProps {
  changeSizeFactor: (s: string) => void;
  sizeFactor: string;
}

export interface IQuestionFlipperState {
  dimensions: string[];
  sizeFactor: string;
  sizeFactorIndex: number;
}

export class QuestionFlipper extends Component<IQuestionFlipperProps, IQuestionFlipperState> {
  
  constructor(props: IQuestionFlipperProps) {
    super(props);
    const dimensions = Object.keys(DIMENSIONS_MAP);
    this.state = {
      dimensions,
      sizeFactor: this.props.sizeFactor,
      sizeFactorIndex: dimensions.indexOf(this.props.sizeFactor)
    };
    this.nextSizeFactor = this.nextSizeFactor.bind(this);
    this.prevSizeFactor = this.prevSizeFactor.bind(this);
  }

  prevSizeFactor() {
    this.setState({
      sizeFactorIndex: this.state.sizeFactorIndex - 1,
      sizeFactor: this.state.dimensions[this.state.sizeFactorIndex - 1]
    })
    // this.props.changeSizeFactor(this.state.sizeFactor);
  }

  nextSizeFactor() {
    this.setState({
      sizeFactorIndex: this.state.sizeFactorIndex + 1,
      sizeFactor: this.state.dimensions[this.state.sizeFactorIndex + 1]
    })
    // this.props.changeSizeFactor(this.state.sizeFactor);
  }
  
  render() {
    // const { sizeFactor } = this.props;
    let { dimensions, sizeFactor, sizeFactorIndex } = this.state;
    console.log(this.state);
    return (
      <div>
        <Grid verticalAlign='middle'>
          <Grid.Column width='1'>
            <Header size='huge'>“</Header>
          </Grid.Column>
          <Grid.Column width='14'>
            <Header size='medium' as='h2'>{ DIMENSIONS_MAP[sizeFactor].QUESTION }</Header>
          </Grid.Column>
          <Grid.Column width='1'>
            <Header size='huge'>”</Header>
          </Grid.Column>
        </Grid>
        {
          sizeFactorIndex != 0 &&
          <Button onClick={this.prevSizeFactor}>
            <Icon name='arrow left' />
          </Button>
        }
        {
          sizeFactorIndex < dimensions.length - 1 && 
          <Button onClick={this.nextSizeFactor}>
            <Icon name='arrow right' />
          </Button>
        }
      </div>

    );
  }
}

export default QuestionFlipper;