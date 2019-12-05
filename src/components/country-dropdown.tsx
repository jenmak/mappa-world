
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CountryActions from '../actions';
import { Dropdown } from 'semantic-ui-react';
import { ICountryState } from '../reducers/countryReducer';

export interface ICountryDropdownProps {
  countries: any[];
  actions: any;
}

export class CountryDropdown extends Component<ICountryDropdownProps, {}> {

  constructor(props: ICountryDropdownProps) {
    super(props);
    this.onCountryChange = this.onCountryChange.bind(this);
  }

  onCountryChange(event: any, data: any) {
    this.props.actions.setCurrentCountry(data.value);
  }

  render() {
    const { countries } = this.props;
    return (
    <div>
      <h5>Now viewing</h5>
      <Dropdown
        placeholder='Select Country'
        fluid
        search
        selection
        onChange={this.onCountryChange}
        options={countries}
      /> 
    </div>
    )
  }
}

const mapStateToProps = (state: { data: ICountryState }) => ({
    countries: state.data.countries.map((c: any) => {
      return {
        text: c.Name,
        value: c.Name
      }
    })
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(CountryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryDropdown);