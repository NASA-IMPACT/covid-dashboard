import React from 'react';
import { PropTypes as T } from 'prop-types';
import styled from 'styled-components';
import { format } from 'date-fns';

import Dropdown from './dropdown';
import Button from '../../styles/button/button';
import DateRange from './date-range';

const DATE_FORMAT = 'MMM dd, yyyy';

const DropdownDatePicker = styled(Dropdown)`
  width: auto;
  max-width: none;

  .react-datepicker {
    border: none;
    border-radius: 0;
  }

  .react-datepicker__header {
    background: none;
    border-radius: 0;
  }
`;

class DatePicker extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      // This is a controlled component and the global onChange method is called
      // when the value should be applied. However, there are cases when the
      // props are updates and we need to update the internal state.
      // With the deprecation of componentWillReceiveProps,
      // the getDerivedStateFromProps is used for this purpose but since this
      // method fires on both prop and state changes, local updates to the
      // controlled value are ignored, because the prop's version always
      // overrides it.
      // One of the solutions is to set a component key which makes the
      // component remount but in doing so, the dropdown closing animation is
      // cancelled. Another solution is to keep track of the "committed" prop
      // value and comparing that with the new prop.
      // Committed props are tracked with a double leading underscore.
      // See getDerivedStateFromProps below.
      // https://reactjs.org/blog/2018/05/23/react-v-16-4.html#bugfix-for-getderivedstatefromprops
      __date: props.dateState,
      date: props.dateState
    };

    this.onDateChange = this.onDateChange.bind(this);

    this.dropdownRef = React.createRef();
  }

  static getDerivedStateFromProps (props, state) {
    if (props.dateState !== state.__date) {
      return {
        __date: props.dateState,
        date: props.dateState
      };
    }
    return null;
  }

  onDropdownClose () {
    // There must always be a date set.
    // If the date was cleared, reset to original.
    if (!this.state.date) {
      this.setState(state => ({
        date: state.__date
      }));
    }
  }

  onDateChange (date) {
    this.setState({ date: date.start }, () => {
      this.props.onChange(this.state.date);
      this.dropdownRef.current.close();
    });
  }

  getTriggerLabel () {
    const { dateState } = this.props;
    return dateState ? format(dateState, DATE_FORMAT) : 'Select date';
  }

  render () {
    const { id, label, dateDomain } = this.props;
    const { date } = this.state;

    const dateRangeVal = {
      start: date,
      end: date
    };

    return (
      <DropdownDatePicker
        ref={this.dropdownRef}
        onChange={(open) => !open && this.onDropdownClose()}
        alignment='right'
        direction='up'
        triggerElement={
          <Button variation='base-plain' size='small' title='Select a date'>
            {this.getTriggerLabel()}
          </Button>
        }
      >
        <DateRange
          id={id}
          label={label}
          value={dateRangeVal}
          min={dateDomain[0]}
          max={dateDomain[1]}
          onChange={this.onDateChange}
          onPickerChange={() => this.dropdownRef.current.reposition()}
        />
      </DropdownDatePicker>
    );
  }
}

DatePicker.propTypes = {
  dateState: T.object,
  dateDomain: T.array,
  id: T.string,
  label: T.string,
  onChange: T.func
};

export default DatePicker;
